/* ============================================================
   ORIENTAL INSTRUMENT — 3D showcase entry point.

   Boot order matters and is deliberately defensive: nothing here is
   allowed to take the sales page down. If WebGL is missing, if the
   CDN is unreachable, if a texture 404s — the page falls back to the
   CSS/<img> version it had before, which is fully functional.

   The 3D layer is additive, never load-bearing.
   ============================================================ */
import { SceneManager, webglAvailable, PALETTE } from './scene/SceneManager.js'
import { ParticleSystem } from './scene/ParticleSystem.js'
import { Instrument3D }   from './scene/Instrument3D.js'
import { mountPanels }    from './scene/PluginUI3D.js'
import { AudioReactive }  from './scene/AudioReactive.js'
import { ScrollController } from './controls/ScrollController.js'
import * as THREE from 'three'

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

async function boot () {
  if (!webglAvailable()) {
    console.info('[oriental3d] no WebGL — keeping the CSS showcase')
    return
  }

  /* ---------- canvas ---------- */
  const canvas = document.createElement('canvas')
  canvas.id = 'ori-webgl'
  canvas.setAttribute('aria-hidden', 'true')
  document.body.insertBefore(canvas, document.body.firstChild)

  let sm
  try {
    sm = new SceneManager(canvas, { reducedMotion: REDUCED })
  } catch (err) {
    console.warn('[oriental3d] renderer refused to start:', err)
    canvas.remove()
    return
  }

  /* Hand the page over to WebGL. Every transparency rule and every
     "stop animating the DOM image" rule is scoped under this class,
     so up to this line the page is byte-for-byte what it was. */
  document.documentElement.classList.add('ori-3d-on')

  /* The CSS pass wrote --ty/--rot/--sc/--mx/--my inline before we
     booted. The stylesheet neutralises the transforms, but the
     custom properties would come back the moment something reads
     them, so clear them out. */
  document.querySelectorAll('.ori-render').forEach(el => {
    ;['--ty', '--rot', '--sc', '--mx', '--my'].forEach(p => el.style.removeProperty(p))
  })

  /* ---------- content ---------- */
  const particles = new ParticleSystem(sm, {
    count: window.innerWidth < 900 ? 1500 : 4200,
    radius: 13
  })

  /* Instruments live well behind the panel plane (z = 0) and off to
     the sides, so they are atmosphere around the product rather than
     clutter across the copy. `anchor` is a fraction of the visible
     extent at that depth, so they hold the same place in frame on a
     27" monitor and on a phone. */
  const instruments = [
    new Instrument3D(sm, {
      type: 'oud',
      position: new THREE.Vector3(0, 0, -6.5), anchor: { x: -0.62, y: 0.12 },
      rotation: new THREE.Euler(0.18, 0.5, -0.22),
      scale: 0.62, spin: 0.10, reducedMotion: REDUCED
    }),
    new Instrument3D(sm, {
      type: 'qanun',
      position: new THREE.Vector3(0, 0, -7.5), anchor: { x: 0.70, y: -0.44 },
      rotation: new THREE.Euler(-0.5, -0.45, 0.14),
      scale: 0.9, spin: -0.07, reducedMotion: REDUCED
    }),
    new Instrument3D(sm, {
      type: 'darbuka',
      position: new THREE.Vector3(0, 0, -5.5), anchor: { x: -0.52, y: -0.68 },
      rotation: new THREE.Euler(0.12, 0.3, 0.1),
      scale: 0.85, spin: 0.16, reducedMotion: REDUCED
    })
  ]

  const panels = mountPanels(sm, { reducedMotion: REDUCED })

  /* ---------- pointer tilt on each slot ---------- */
  if (!REDUCED && window.matchMedia('(hover: hover)').matches) {
    panels.forEach(panel => {
      const host = panel.img.closest('.ori-render') || panel.img
      host.addEventListener('mousemove', e => {
        const r = host.getBoundingClientRect()
        panel.setPointer(
          (e.clientX - r.left) / r.width - 0.5,
          (e.clientY - r.top) / r.height - 0.5
        )
      }, { passive: true })
      host.addEventListener('mouseleave', () => panel.setPointer(0, 0), { passive: true })
    })
  }

  /* ---------- scroll choreography ---------- */
  let gsapBundle = null
  try {
    const [core, st] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ])
    gsapBundle = { gsap: core.gsap || core.default, ScrollTrigger: st.ScrollTrigger || st.default }
  } catch (err) {
    console.info('[oriental3d] GSAP unavailable, using the native scroll pass')
  }

  const scroll = new ScrollController({
    sceneManager: sm, panels, instruments, particles,
    reducedMotion: REDUCED, gsap: gsapBundle
  })

  /* ---------- optional audio reactivity ---------- */
  const audio = new AudioReactive({ synthetic: true })
  audio.autoAttach()

  /* ---------- the loop ---------- */
  sm.addUpdate((t, dt) => {
    const level = audio.update(t)
    particles.setAudio(level)
    particles.update(t)
    for (let i = 0; i < instruments.length; i++) instruments[i].update(t, dt)
    for (let i = 0; i < panels.length; i++) panels[i].update(t, dt)
  })

  sm.start()

  /* ---------- teardown ---------- */
  window.addEventListener('pagehide', () => {
    scroll.kill()
    sm.stop()
  })

  /* Handle for debugging from the console. */
  window.ORIENTAL3D = { sm, panels, instruments, particles, scroll, audio, THREE, PALETTE, REDUCED }
  console.log('%c ORIENTAL 3D ', 'background:#E8B54D;color:#050403;font-weight:700',
    `${panels.length} panels · ${particles.count} motes · gsap:${!!gsapBundle} · reduced-motion:${REDUCED}`)
}

/* Boot after layout has settled — the panels anchor to DOM rects,
   so measuring before the images have their intrinsic size would
   place every one of them at the wrong scale for a frame. */
if (document.readyState === 'complete') {
  boot()
} else {
  window.addEventListener('load', boot, { once: true })
}
