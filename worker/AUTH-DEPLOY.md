# Comptes clients — déploiement (worker/auth.js)

Tout est écrit. Il ne reste que des **clics dans le tableau de bord Cloudflare**,
comme pour le worker Spotify. Aucune ligne de commande, aucune application
développeur à créer.

Tant que l'étape 5 n'est pas faite, le site continue de fonctionner : la page
`account.html` retombe sur l'ancien mode local (le compte ne vit que dans le
navigateur du visiteur). Rien n'est cassé pendant la transition.

---

## Étape 1 — Créer la base de données

1. https://dashboard.cloudflare.com → **Storage & Databases** → **D1**
2. **Create database**
   - Nom : `djbilbox-users`
3. Valider. Il n'y a **aucune table à créer** : le worker crée la sienne au
   premier appel.

## Étape 2 — Créer le worker

1. Menu gauche → **Workers & Pages** → **Create** → **Create Worker**
2. Nom : `djbilbox-auth`
3. **Deploy**, puis **Edit code**
4. Effacer le code par défaut, coller **tout** le contenu de `worker/auth.js`
5. **Deploy**

## Étape 3 — Lier la base au worker

1. Dans le worker → **Settings** → **Bindings** → **Add** → **D1 database**
   - Variable name : `DB`   ← exactement ce nom, le code l'utilise tel quel
   - Database : `djbilbox-users`
2. **Deploy**

## Étape 4 — Ajouter le secret de signature

1. **Settings** → **Variables and Secrets** → **Add**
   - Type : **Secret**
   - Nom : `AUTH_SECRET`
   - Valeur : une longue chaîne aléatoire, 40 caractères ou plus.
     Elle signe les jetons de session ; si elle change, tout le monde est
     déconnecté (sans perdre son compte).
2. **Deploy**

Vérification : ouvrir `https://djbilbox-auth.<ton-sous-domaine>.workers.dev/health`
Réponse attendue : `{"ok":true}`

## Étape 5 — Brancher le site

Dans `account.html`, renseigner l'URL du worker :

```js
const AUTH_API = 'https://djbilbox-auth.<ton-sous-domaine>.workers.dev';
```

À partir de là, les comptes sont réels : le même client se reconnecte depuis
son téléphone et son ordinateur, et vider le cache ne détruit plus rien.

---

## Voir tes membres

Dashboard → **D1** → `djbilbox-users` → **Console** :

```sql
SELECT name, email, provider, created FROM users ORDER BY created DESC;
```

C'est la liste que le mode local ne pouvait pas te donner.

---

## Optionnel — connexion Google / Facebook

Le worker les accepte déjà (`/social`), et il **vérifie la signature du
fournisseur** avant de créer le compte : un navigateur qui prétendrait être
`quelquun@gmail.com` est rejeté.

Il faut juste déclarer le site auprès du fournisseur, une fois :

- **Google** — console.cloud.google.com → *APIs & Services* → *Credentials* →
  *OAuth client ID* → *Web application*. Origines autorisées :
  `https://djbilboxbeats.com` et `https://djbilbox.github.io`.
  Coller l'identifiant dans `GOOGLE_CLIENT_ID` (`account.html`).
  Le mettre **aussi** en variable `GOOGLE_CLIENT_ID` sur le worker : il sert
  à vérifier que le jeton a bien été émis pour ton site et pas pour un autre.

- **Facebook** — developers.facebook.com/apps → *Create app* → *Consumer* →
  ajouter *Facebook Login* → *Web*, site `https://djbilboxbeats.com`.
  Coller l'App ID dans `FACEBOOK_APP_ID` (`account.html`).

Un fournisseur dont l'identifiant reste vide n'affiche simplement pas son
bouton : le visiteur ne voit jamais un contrôle mort.

**TikTok** n'est pas inclus : sa connexion exige un échange de jeton avec un
secret client et une validation d'application par TikTok. C'est faisable dans
ce même worker, mais c'est un chantier à part.

---

## Ce que fait le worker, en clair

- Mot de passe haché en **PBKDF2-SHA256, 150 000 itérations**, avec un sel
  aléatoire par utilisateur. Il remplace un hachage maison de 4 lignes,
  non cryptographique, où deux mots de passe différents pouvaient ouvrir le
  même compte. Le mot de passe n'est jamais stocké, ni côté serveur ni côté
  navigateur.
- Session par **jeton signé (HMAC)** portant sa propre expiration à 30 jours.
- « E-mail ou mot de passe incorrect » dans les deux cas, avec le même temps
  de calcul : distinguer les deux reviendrait à offrir la liste de tes clients
  à qui veut la lire.
- CORS limité à tes domaines. Un worker d'authentification ouvert à `*`
  laisserait n'importe quel site lire les réponses au nom de tes visiteurs.
