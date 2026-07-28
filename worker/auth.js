/* ============================================================
   DJBILBOX BEATS — service de comptes clients (Cloudflare Worker).

   Pourquoi ce worker existe : jusqu'ici les comptes vivaient dans le
   localStorage du navigateur de chaque visiteur. Un client inscrit sur
   son telephone n'avait aucun compte sur son ordinateur, vider le cache
   effacait le compte, et le site n'avait aucune liste de ses membres.
   Un compte, par definition, doit exister ailleurs que chez celui qui
   s'y connecte.

   Stockage : base D1 (SQLite gere par Cloudflare), binding `DB`.
   Secret   : AUTH_SECRET, une chaine aleatoire longue.

   Endpoints
     POST /signup  {name, email, password}  -> {token, user}
     POST /login   {email, password}        -> {token, user}
     GET  /me      Authorization: Bearer …  -> {user}
     POST /social  {provider, email, name, picture, assertion}
     GET  /health                           -> {ok:true}

   La deconnexion est cote client : le jeton est signe et porte sa propre
   expiration, il n'y a pas de session a detruire sur le serveur.
   ============================================================ */

const ORIGINES = [
  'https://djbilboxbeats.com',
  'https://www.djbilboxbeats.com',
  'https://djbilbox.github.io'
]

const DUREE_JETON = 60 * 60 * 24 * 30   // 30 jours, en secondes

/* ---------------------------------------------------------- outils */

const enc = new TextEncoder()

function b64url (buf) {
  const b = btoa(String.fromCharCode(...new Uint8Array(buf)))
  return b.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}
function deb64url (s) {
  s = s.replace(/-/g, '+').replace(/_/g, '/')
  const bin = atob(s + '='.repeat((4 - (s.length % 4)) % 4))
  return Uint8Array.from(bin, c => c.charCodeAt(0))
}

/* Comparaison a temps constant : comparer deux signatures avec === fuit
   leur longueur commune par le temps de reponse. */
function memeSignature (a, b) {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  return diff === 0
}

/* PBKDF2-SHA256, 150 000 iterations, sel aleatoire par utilisateur.
   Remplace un hachage maison de 4 lignes, non cryptographique, qui
   produisait des collisions triviales : deux mots de passe differents
   pouvaient ouvrir le meme compte. */
async function hachePass (motDePasse, selHex) {
  const sel = selHex
    ? Uint8Array.from(selHex.match(/../g).map(h => parseInt(h, 16)))
    : crypto.getRandomValues(new Uint8Array(16))

  const cle = await crypto.subtle.importKey(
    'raw', enc.encode(motDePasse), 'PBKDF2', false, ['deriveBits'])
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: sel, iterations: 150000, hash: 'SHA-256' }, cle, 256)

  const hex = a => [...new Uint8Array(a)].map(b => b.toString(16).padStart(2, '0')).join('')
  return { hash: hex(bits), sel: hex(sel) }
}

async function signe (charge, secret) {
  const cle = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign'])
  return b64url(await crypto.subtle.sign('HMAC', cle, enc.encode(charge)))
}

async function faitJeton (user, secret) {
  const charge = b64url(enc.encode(JSON.stringify({
    e: user.email, n: user.name, x: Math.floor(Date.now() / 1000) + DUREE_JETON
  })))
  return charge + '.' + await signe(charge, secret)
}

async function litJeton (jeton, secret) {
  if (!jeton || jeton.indexOf('.') < 0) return null
  const [charge, sig] = jeton.split('.')
  if (!memeSignature(sig, await signe(charge, secret))) return null
  try {
    const d = JSON.parse(new TextDecoder().decode(deb64url(charge)))
    if (!d.x || d.x < Math.floor(Date.now() / 1000)) return null
    return d
  } catch (e) { return null }
}

/* ---------------------------------------------------------- HTTP */

function entetes (origine) {
  /* Liste blanche stricte : un worker d'authentification qui repond
     Access-Control-Allow-Origin: * laisse n'importe quel site lire les
     reponses au nom de vos visiteurs. */
  const ok = ORIGINES.includes(origine)
  return {
    'Access-Control-Allow-Origin': ok ? origine : ORIGINES[0],
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization',
    'Access-Control-Max-Age': '86400',
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store'
  }
}

const repond = (data, statut, origine) =>
  new Response(JSON.stringify(data), { status: statut, headers: entetes(origine) })

const emailValide = e => typeof e === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e)

async function assureTable (db) {
  await db.exec(
    'CREATE TABLE IF NOT EXISTS users (' +
    'email TEXT PRIMARY KEY, name TEXT NOT NULL, pass_hash TEXT, salt TEXT, ' +
    'provider TEXT DEFAULT \'email\', picture TEXT, created TEXT NOT NULL)')
}

const publique = u => ({
  name: u.name, email: u.email, provider: u.provider || 'email',
  picture: u.picture || '', joined: u.created
})

export default {
  async fetch (req, env) {
    const url = new URL(req.url)
    const origine = req.headers.get('Origin') || ''

    if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: entetes(origine) })
    if (url.pathname === '/health') return repond({ ok: true }, 200, origine)

    if (!env.DB) return repond({ error: 'base D1 non liee (binding DB manquant)' }, 500, origine)
    if (!env.AUTH_SECRET) return repond({ error: 'AUTH_SECRET manquant' }, 500, origine)

    try {
      await assureTable(env.DB)

      /* ---- profil courant ---- */
      if (url.pathname === '/me') {
        const jeton = (req.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '')
        const d = await litJeton(jeton, env.AUTH_SECRET)
        if (!d) return repond({ error: 'session expiree' }, 401, origine)
        const u = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(d.e).first()
        if (!u) return repond({ error: 'compte introuvable' }, 404, origine)
        return repond({ user: publique(u) }, 200, origine)
      }

      if (req.method !== 'POST') return repond({ error: 'methode refusee' }, 405, origine)
      const corps = await req.json().catch(() => ({}))
      const email = String(corps.email || '').trim().toLowerCase()

      /* ---- inscription ---- */
      if (url.pathname === '/signup') {
        const nom = String(corps.name || '').trim()
        const mdp = String(corps.password || '')
        if (!nom) return repond({ error: 'Nom requis.' }, 400, origine)
        if (!emailValide(email)) return repond({ error: 'Adresse e-mail invalide.' }, 400, origine)
        if (mdp.length < 6) return repond({ error: 'Mot de passe : 6 caracteres minimum.' }, 400, origine)

        const deja = await env.DB.prepare('SELECT email FROM users WHERE email = ?').bind(email).first()
        if (deja) return repond({ error: 'Un compte existe deja avec cet e-mail.' }, 409, origine)

        const { hash, sel } = await hachePass(mdp)
        const cree = new Date().toISOString()
        await env.DB.prepare(
          'INSERT INTO users (email,name,pass_hash,salt,provider,picture,created) VALUES (?,?,?,?,?,?,?)'
        ).bind(email, nom, hash, sel, 'email', '', cree).run()

        const user = { email, name: nom, provider: 'email', picture: '', created: cree }
        return repond({ token: await faitJeton(user, env.AUTH_SECRET), user: publique(user) }, 200, origine)
      }

      /* ---- connexion ---- */
      if (url.pathname === '/login') {
        const mdp = String(corps.password || '')
        const u = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first()

        /* Meme message et meme cout dans les deux cas : distinguer
           « compte inconnu » de « mauvais mot de passe » revient a offrir
           un annuaire de vos clients a qui veut le lire. */
        if (!u || !u.pass_hash) {
          await hachePass(mdp, '00000000000000000000000000000000')
          return repond({ error: 'E-mail ou mot de passe incorrect.' }, 401, origine)
        }
        const { hash } = await hachePass(mdp, u.salt)
        if (!memeSignature(hash, u.pass_hash)) {
          return repond({ error: 'E-mail ou mot de passe incorrect.' }, 401, origine)
        }
        return repond({ token: await faitJeton(u, env.AUTH_SECRET), user: publique(u) }, 200, origine)
      }

      /* ---- connexion sociale ----
         N'accepte un profil que si le fournisseur l'a signe et que la
         signature est verifiee ici. Faire confiance a un e-mail envoye
         par le navigateur laisserait n'importe qui reclamer le compte de
         n'importe qui en changeant une ligne dans la console. */
      if (url.pathname === '/social') {
        const fournisseur = String(corps.provider || '')
        let profil = null

        if (fournisseur === 'google' && corps.assertion) {
          const r = await fetch('https://oauth2.googleapis.com/tokeninfo?id_token=' +
            encodeURIComponent(corps.assertion))
          if (r.ok) {
            const t = await r.json()
            if (!env.GOOGLE_CLIENT_ID || t.aud === env.GOOGLE_CLIENT_ID) {
              profil = { email: (t.email || '').toLowerCase(), name: t.name || 'Member', picture: t.picture || '' }
            }
          }
        } else if (fournisseur === 'facebook' && corps.assertion) {
          const r = await fetch('https://graph.facebook.com/me?fields=name,email,picture.width(160)' +
            '&access_token=' + encodeURIComponent(corps.assertion))
          if (r.ok) {
            const t = await r.json()
            if (t && t.id) {
              profil = {
                email: (t.email || (t.id + '@facebook.local')).toLowerCase(),
                name: t.name || 'Member',
                picture: (t.picture && t.picture.data && t.picture.data.url) || ''
              }
            }
          }
        }

        if (!profil || !profil.email) {
          return repond({ error: 'Connexion sociale refusee par le fournisseur.' }, 401, origine)
        }

        const cree = new Date().toISOString()
        await env.DB.prepare(
          'INSERT INTO users (email,name,pass_hash,salt,provider,picture,created) VALUES (?,?,NULL,NULL,?,?,?) ' +
          'ON CONFLICT(email) DO UPDATE SET name=excluded.name, picture=excluded.picture'
        ).bind(profil.email, profil.name, fournisseur, profil.picture, cree).run()

        const u = await env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(profil.email).first()
        return repond({ token: await faitJeton(u, env.AUTH_SECRET), user: publique(u) }, 200, origine)
      }

      return repond({ error: 'route inconnue' }, 404, origine)
    } catch (e) {
      return repond({ error: 'erreur serveur', detail: String(e && e.message || e) }, 500, origine)
    }
  }
}
