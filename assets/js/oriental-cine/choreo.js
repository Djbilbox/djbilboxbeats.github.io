/* ============================================================
   ORIENTAL CINE — chorégraphie, micro-interactions, hotspots.

   Le pinning est du `position: sticky` en CSS. ScrollTrigger ne pin
   RIEN : il mesure la progression et scrubbe une timeline. Le pin de
   ScrollTrigger injecte un pin-spacer, réécrit la hauteur du document et
   doit être rafraîchi à chaque changement de layout ; `sticky` fait le
   même travail nativement et ne peut pas se désynchroniser.
   ============================================================ */

/* Points d'ancrage, en coordonnées LOCALES de l'unité (le plan de façade
   fait 4.6 x 3.13). Ils suivent donc toutes les rotations sans qu'aucune
   position écran ne soit codée en dur. */
const HOTSPOTS = [
  { x: -1.72, y: 0.35, z: 0.22, titre: 'MACRO KNOBS', texte: 'Glide · Space · Filter · Orient · Reso · Depth' },
  { x: 0.15, y: 0.72, z: 0.22, titre: 'MAQAM ENGINE', texte: 'Accordage en quarts de ton · Rast, Hijaz, Bayati, Kurd…' },
  { x: 1.78, y: 0.10, z: 0.22, titre: 'FX CHAIN', texte: '8 slots · Reverb, Echo, Chorus, Distort, EQ, Phaser…' },
  { x: 0.10, y: -1.18, z: 0.22, titre: '280+ INSTRUMENTS', texte: '7 familles, 40 presets chacune, taggés ville & tonalité' }
]

/* Largeur à garder dans le cadre : l'unité fait 4.6, plus une marge. */
const LARGEUR_CADREE = 5.3

export function mountChoreo ({ gsap, ScrollTrigger, view, section, els }) {
  const { THREE, camera, unit, dust, seed, bloom, bokeh } = view
  const REDUIT = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  /* ---------------- hotspots : DOM créé une fois ---------------- */
  const layer = els.hotspots
  const pins = HOTSPOTS.map((h) => {
    const el = document.createElement('button')
    el.className = 'ori-cine-hotspot'
    el.type = 'button'
    el.setAttribute('aria-label', h.titre)
    el.innerHTML =
      '<span class="ori-cine-hotspot-dot"></span>' +
      '<span class="ori-cine-hotspot-card"><b>' + h.titre + '</b><span>' + h.texte + '</span></span>'
    layer.appendChild(el)
    return { el, v: new THREE.Vector3(h.x, h.y, h.z) }
  })

  /* ---------------- souris ---------------- */
  const souris = { x: 0, y: 0 }
  const cible = { x: 0, y: 0 }
  if (!REDUIT && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('pointermove', (e) => {
      cible.x = (e.clientX / window.innerWidth) * 2 - 1
      cible.y = (e.clientY / window.innerHeight) * 2 - 1
    }, { passive: true })
  }

  /* La chorégraphie écrit dans `pose` ; la boucle de rendu ajoute par
     dessus la respiration et le parallaxe souris. Séparer les deux évite
     que le scrub et les micro-mouvements se battent pour la même
     propriété — sinon l'un écrase l'autre à chaque frame. */
  const pose = {
    rx: -0.92, ry: 0, rz: 0,
    px: 0, py: -0.25, pz: 0,
    camZ: 8.5, camY: 0, fov: 38,
    hotspots: 0
  }

  const mm = gsap.matchMedia()
  mm.add({ large: '(min-width: 901px)', small: '(max-width: 900px)' }, (ctx) => {
    const { large } = ctx.conditions
    const P1_X = large ? -1.75 : 0
    const P3_X = large ? 0.75 : 0

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.65 }
    })

    /* ---------- PHASE 1 — redressement et ancrage à gauche ---------- */
    tl.to(pose, { rx: 0, px: P1_X, py: 0.18, duration: 1, ease: 'power2.out' }, 0)
      .to(els.copyA, { autoAlpha: 1, y: 0, duration: 0.45 }, 0.5)
      .add(() => els.copyA.classList.add('is-live'), 0.5)

    /* ---------- PHASE 2 — recul caméra ---------- */
    tl.to(els.copyA, { autoAlpha: 0, y: -26, duration: 0.3 }, 1.05)
      .add(() => els.copyA.classList.remove('is-live'), 1.05)
      .to(pose, { camZ: 13.5, px: 0, rx: 0.06, duration: 0.75, ease: 'power2.inOut' }, 1.05)

    /* ---------- PHASE 3 — contre-plongée monumentale ----------
       Deux choses font la contre-plongée, et il faut les deux : la
       caméra DESCEND sous l'objet (camY négatif) et la focale s'ouvre
       (fov 38 -> 62). Une rotation seule donne un objet penché ; c'est
       le grand angle vu d'en dessous qui écrase les fuyantes et rend
       l'instrument imposant. */
    tl.to(pose, {
      camZ: 7.0, camY: -1.55, fov: 55,
      rx: 0.34, ry: -0.16, rz: 0.03, px: P3_X, py: 0.35,
      duration: 1, ease: 'power2.inOut'
    }, 1.85)
      .to(pose, { hotspots: 1, duration: 0.4 }, 2.5)
      .to(els.copyB, { autoAlpha: 1, y: 0, duration: 0.45 }, 2.45)
      .add(() => els.copyB.classList.add('is-live'), 2.45)

    return () => {
      els.copyA.classList.remove('is-live')
      els.copyB.classList.remove('is-live')
    }
  })

  /* ---------------- boucle de rendu ---------------- */
  const proj = new THREE.Vector3()
  let brut = 0
  let vivant = true

  /* Une section haute de 3,6 écrans reste « en vue » presque tout le
     temps ; sans cette garde on continuerait à rendre du WebGL pendant
     que le visiteur lit les tarifs 3000px plus bas. */
  const io = new IntersectionObserver(
    ([e]) => { vivant = e.isIntersecting },
    { rootMargin: '120px' }
  )
  io.observe(section)

  view.renderer.setAnimationLoop((t) => {
    if (!vivant) return
    brut = t * 0.001

    /* Respiration : l'unité n'est jamais parfaitement immobile. */
    const souffle = REDUIT ? 0 : Math.sin(brut * 0.85) * 0.045

    /* Parallaxe souris, amorti. Le lissage compte autant que l'effet :
       en brut, le modèle saute d'un bord à l'autre du curseur. */
    souris.x += (cible.x - souris.x) * 0.045
    souris.y += (cible.y - souris.y) * 0.045

    unit.rotation.set(
      pose.rx + souris.y * 0.10,
      pose.ry + souris.x * 0.16,
      pose.rz
    )
    unit.position.set(pose.px, pose.py + souffle, pose.pz)

    /* Plancher de distance dépendant du format. La chorégraphie raisonne
       en 16:9 ; sur un téléphone en portrait la caméra voit beaucoup moins
       large et l'unité, large de 4.6, sortait du cadre des deux côtés.
       On prend donc toujours la plus grande des deux distances : celle
       voulue par la timeline, ou celle qui garantit que l'unité tient. */
    const distMin = (LARGEUR_CADREE / 2) /
      (Math.tan((pose.fov * Math.PI) / 360) * Math.max(0.2, camera.aspect))
    camera.position.set(0, pose.camY, Math.max(pose.camZ, distMin))
    camera.lookAt(0, pose.camY * 0.35, 0)
    if (Math.abs(camera.fov - pose.fov) > 0.01) {
      camera.fov = pose.fov
      camera.updateProjectionMatrix()
    }
    view.ajusteHalo()

    /* Le point de netteté suit l'unité : c'est ce qui fait respirer la
       profondeur de champ pendant les mouvements de caméra au lieu de
       flouter au hasard. */
    bokeh.uniforms.focus.value = camera.position.distanceTo(unit.position)

    if (!REDUIT) {
      dust.rotation.y = brut * 0.012
      const p = dust.geometry.attributes.position
      for (let i = 0; i < seed.length; i++) {
        p.array[i * 3 + 1] += Math.sin(brut * 0.5 + seed[i]) * 0.0016
      }
      p.needsUpdate = true
    }

    /* Hotspots : projection 3D -> écran à chaque frame, donc les points
       restent collés à la géométrie quelle que soit la rotation. */
    if (pose.hotspots > 0.01) {
      layer.style.opacity = pose.hotspots
      layer.style.pointerEvents = pose.hotspots > 0.9 ? 'auto' : 'none'
      const w = window.innerWidth / 2, h = window.innerHeight / 2
      for (const pin of pins) {
        proj.copy(pin.v).applyMatrix4(unit.matrixWorld).project(camera)
        /* Derrière la caméra, .project() renvoie des coordonnées
           retournées : sans ce test le point réapparaît en miroir. */
        const devant = proj.z < 1
        pin.el.style.display = devant ? '' : 'none'
        if (devant) {
          pin.el.style.transform =
            'translate(-50%,-50%) translate(' + (proj.x * w + w) + 'px,' + (-proj.y * h + h) + 'px)'
        }
      }
    } else if (layer.style.opacity !== '0') {
      layer.style.opacity = '0'
      layer.style.pointerEvents = 'none'
    }

    bloom.strength = 0.26 + Math.sin(brut * 0.6) * 0.035
    view.composer.render()
  })

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => ScrollTrigger.refresh())
  }
}
