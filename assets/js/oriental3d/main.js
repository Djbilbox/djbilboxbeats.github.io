/* ============================================================
   ORIENTAL INSTRUMENT — 3D showcase entry point.

   Boot order matters and is deliberately defensive: nothing here is
   allowed to take the sales page down. If WebGL is missing, if the
   CDN is unreachable, if a texture 404s — the page falls back to the
   CSS/<img> version it had before, which is fully functional.

   The 3D layer is additive, never load-bearing.
   ============================================================ */
import { SceneManager, webglAvailable, PALETTE } from './scene/SceneManager.js?v=26072850'
import { ParticleSystem } from './scene/ParticleSystem.js?v=26072850'
import { Instrument3D }   from './scene/Instrument3D.js?v=26072850'
import { mountJourney }   from './scene/PanelJourney.js?v=26072850'
import { mountFrameScrubber } from './scene/FrameScrubber.js?v=26072850'
import { AudioReactive }  from './scene/AudioReactive.js?v=26072850'
import { ScrollController } from './controls/ScrollController.js?v=26072850'
import * as THREE from 'three'

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/* Try to mount the frame scrubber on the cinema canvas */
const canvas = document.querySelector('#rise-canvas')
if (canvas) {
  const scrubber = mountFrameScrubber(
    '#rise-canvas',
    'img/vst/ui/showcase/rise/rise-',
    150,
    /* The whole set is usable again: the re-render opens with the unit
       already 81% of the frame wide instead of edge-on and invisible.
       startFrame/endFrame stay wired for the next time a pass has dead
       frames at either end. */
    { reducedMotion: REDUCED, startFrame: 0, endFrame: 149 }
  )
  window.ORIENTAL3D = window.ORIENTAL3D || {}
  window.ORIENTAL3D.scrubber = scrubber
}

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
  /* Fewer, dimmer motes than before. At 4200 the dust read as
     sensor noise over the copy rather than atmosphere. */
  const particles = new ParticleSystem(sm, {
    count: window.innerWidth < 900 ? 550 : 1300,
    radius: 13
  })

  /* NO PROCEDURAL INSTRUMENTS.

     There were three — a lathed oud, a qanun, a darbuka — orbiting
     the page. They looked like what they were: untextured primitives
     next to a professionally finished product render. The oud read
     as a frying pan. Worse, they travelled across the frame and
     crossed the sales copy while spinning.

     The reference site this is chasing has nothing of the sort. One
     product, centred, on near-black. The premium feel comes from
     restraint, not from filling the screen.

     Instrument3D is kept: it takes a `modelUrl` and will load a real
     GLTF. If a properly modelled oud ever exists, instantiate here.
     Procedural stand-ins are not worth the page they sit on. */
  const instruments = []

  /* ONE unit that travels between the render slots as you scroll,
     rather than three that each fade in and out on the spot. The
     continuity is the effect. */
  const journey = mountJourney(sm, { reducedMotion: REDUCED })
  if (!journey) {
    console.info('[oriental3d] no render slots on this page')
    canvas.remove()
    document.documentElement.classList.remove('ori-3d-on')
    return
  }

  /* ---------- pointer tilt ---------- */
  if (!REDUCED && window.matchMedia('(hover: hover)').matches) {
    journey.imgs.forEach(img => {
      const host = img.closest('.ori-render') || img
      host.addEventListener('mousemove', e => {
        const r = host.getBoundingClientRect()
        journey.setPointer(
          (e.clientX - r.left) / r.width - 0.5,
          (e.clientY - r.top) / r.height - 0.5
        )
      }, { passive: true })
      host.addEventListener('mouseleave', () => journey.setPointer(0, 0), { passive: true })
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

  /* The journey reads window.scrollY itself every frame, so it needs
     no trigger and cannot desync from a throttled ticker. This is
     left driving the haze and the bloom only. */
  const scroll = new ScrollController({
    sceneManager: sm, instruments, particles,
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
    journey.update(t, dt)
  })

  sm.start()

  /* ---------- teardown ---------- */
  window.addEventListener('pagehide', () => {
    scroll.kill()
    sm.stop()
  })

  /* Handle for debugging from the console. */
  /* Merge, don't replace: the scrubber registered itself here before
     boot() ran, and clobbering the object loses the only handle on it. */
  window.ORIENTAL3D = Object.assign(window.ORIENTAL3D || {},
    { sm, journey, instruments, particles, scroll, audio, THREE, PALETTE, REDUCED })
  console.log('%c ORIENTAL 3D ', 'background:#E8B54D;color:#050403;font-weight:700',
    `${journey.imgs.length} stops · ${particles.count} motes · gsap:${!!gsapBundle} · reduced-motion:${REDUCED}`)
}

/* Boot after layout has settled — the panels anchor to DOM rects,
   so measuring before the images have their intrinsic size would
   place every one of them at the wrong scale for a frame. */
if (document.readyState === 'complete') {
  boot()
} else {
  window.addEventListener('load', boot, { once: true })
}
