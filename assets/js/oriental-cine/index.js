/* ============================================================
   ORIENTAL CINE — point d'entrée.

   Ordre de démarrage, et il est défensif : rien ici n'a le droit de
   faire tomber une page de vente. Pas de WebGL, CDN injoignable, texture
   en 404 — on retombe sur la version CSS du hero, qui affiche le produit
   de face avec son titre, son prix et ses boutons. La 3D est un plus,
   jamais un porteur.
   ============================================================ */
import * as THREE from 'three'

const root = document.documentElement
const section = document.querySelector('.ori-cine')

if (section) boot()

function webglDispo () {
  try {
    const c = document.createElement('canvas')
    return !!(window.WebGLRenderingContext &&
      (c.getContext('webgl2') || c.getContext('webgl')))
  } catch (e) { return false }
}

function repli (raison) {
  console.info('[ori-cine] repli statique :', raison)
  root.classList.add('ori-cine-fallback')
  root.classList.remove('ori-cine-gl', 'ori-cine-loading')
  document.body.style.removeProperty('overflow')
}

async function boot () {
  const REDUIT = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* Demande explicite de moins de mouvement : on ne joue pas la
     chorégraphie et on ne laisse pas non plus la scène figée sur son
     premier état — un VST couché à 58 degrés n'est pas un visuel. */
  if (REDUIT) { root.classList.add('ori-cine-static'); return }
  if (!webglDispo()) return repli('pas de WebGL')

  const bar = document.querySelector('.ori-cine-load-bar > i')
  const pct = document.querySelector('.ori-cine-load-pct')

  /* Le preloader bloque le défilement : laisser scroller pendant le
     chargement ferait défiler une scène vide, et ScrollTrigger
     démarrerait sur une position déjà avancée. */
  root.classList.add('ori-cine-loading')
  document.body.style.overflow = 'hidden'

  /* Garde-fou : si un asset ne répond jamais, le manager n'appelle ni
     onLoad ni onError et le visiteur reste bloqué sur le loader. */
  const secours = setTimeout(() => repli('délai de chargement dépassé'), 12000)

  const manager = new THREE.LoadingManager()
  let affiche = 0
  manager.onProgress = (url, charges, total) => {
    const cible = total ? charges / total : 0
    affiche = Math.max(affiche, cible)
    const v = Math.round(affiche * 100)
    if (bar) bar.style.width = v + '%'
    if (pct) pct.textContent = v + '%'
  }

  try {
    const [{ createScene }, { mountChoreo }, core, st] = await Promise.all([
      import('./scene.js?v=26072920'),
      import('./choreo.js?v=26072920'),
      import('gsap'),
      import('gsap/ScrollTrigger')
    ])

    const gsap = core.gsap || core.default
    const ScrollTrigger = st.ScrollTrigger || st.default
    if (!gsap || !ScrollTrigger) throw new Error('GSAP incomplet')
    gsap.registerPlugin(ScrollTrigger)

    const canvas = document.querySelector('.ori-cine-canvas')
    const view = createScene({
      canvas,
      manager,
      textureUrl: section.dataset.texture || 'img/vst/ui/oriental-ui.png',
      /* Aucun .glb dans le dépôt aujourd'hui. Poser data-model sur la
         section suffit à basculer sur un vrai modèle : le chargeur, le
         cadrage automatique et le post-processing sont déjà en place. */
      modelUrl: section.dataset.model || null
    })

    /* L'animation ne commence qu'à 100 %, comme demandé. */
    await new Promise((ok, ko) => {
      manager.onLoad = ok
      manager.onError = (url) => ko(new Error('asset illisible : ' + url))
      /* Rien à charger (tout en cache) : le manager ne déclenche jamais
         onLoad, il faut donc le débloquer soi-même. */
      if (!manager.itemsTotal) ok()
    })

    clearTimeout(secours)
    if (bar) bar.style.width = '100%'
    if (pct) pct.textContent = '100%'

    root.classList.add('ori-cine-gl')

    mountChoreo({
      gsap,
      ScrollTrigger,
      view,
      section,
      els: {
        copyA: document.querySelector('.ori-cine-copy-a'),
        copyB: document.querySelector('.ori-cine-copy-b'),
        hotspots: document.querySelector('.ori-cine-hotspots')
      }
    })

    /* Le rendu tourne : on rend la main au défilement et on retire le
       voile. L'ordre compte — libérer le scroll avant que la première
       frame soit peinte laisse voir un trou noir. */
    requestAnimationFrame(() => {
      document.body.style.removeProperty('overflow')
      root.classList.remove('ori-cine-loading')
      root.classList.add('ori-cine-ready')
    })

    window.ORIENTAL_CINE = { view, gsap, ScrollTrigger }
    console.log('%c ORIENTAL CINE ', 'background:#E8B54D;color:#050403;font-weight:700',
      'WebGL · PBR+env · bloom+DOF · ' + (view.hasRealModel ? 'modèle GLTF' : 'châssis texturé'))
  } catch (err) {
    clearTimeout(secours)
    repli(err && err.message ? err.message : err)
  }
}
