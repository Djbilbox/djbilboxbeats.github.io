/* ============================================================
   PluginUI3D — your plug-in renders, promoted into the 3D scene.

   The important decision here: the panel is textured with YOUR OWN
   renders (img/vst/ui/oriental-3d-*.png), shown exactly as authored.
   Rebuilding the ORIENTAL interface out of procedural knobs and
   boxes would have thrown away the real artwork and replaced it with
   an approximation.

   What three.js adds is deliberately restrained: a few degrees of
   perspective, a slow float, a faint highlight sweep, a faded floor
   reflection and a soft pool of light. Nothing that competes with
   the render itself.

   It used to add much more — a two-frame cross-fade meant to read as
   a turntable, a 22deg rotation, a bright sheen, a full mirrored
   reflection. All of it made the page worse and all of it is gone or
   dialled down; the individual reasons are noted at each site. The
   short version: the render is already a finished piece of work, and
   the job here is to make it feel like an object in a room, not to
   perform on top of it.

   SCROLL SCRUB is still implemented (shaders/frameScrub.glsl.js) and
   still the right technique — it is what the reference site does —
   but it needs a real turntable sequence, not two unrelated angles.
   See EXTRA_FRAMES at the bottom.

   Each panel is anchored to the screen-space rectangle of the <img>
   it replaces. The DOM keeps the layout and the alt text (so the
   page still reflows and still indexes); the pixels come from WebGL.
   That mapping is only valid while the camera stays on the Z axis,
   un-rotated — see the note in SceneManager.
   ============================================================ */
import * as THREE from 'three'
import { loadTexture, radialGlowTexture } from '../utils/loader.js?v=26072723'
import { makeFrameScrubMaterial } from '../shaders/frameScrub.glsl.js?v=26072723'

export class PluginUI3D {
  /**
   * @param {SceneManager} sceneManager
   * @param {HTMLImageElement} img   the <img> whose slot this panel takes over
   * @param {object} opts
   * @param {string[]} [opts.frames] extra angles to scrub through; the
   *        <img>'s own source is always frame 0
   */
  constructor (sceneManager, img, opts = {}) {
    this.sm = sceneManager
    this.img = img
    this.opts = Object.assign({
      z: 0,                     // world depth of the panel plane
      flip: false,              // mirror the rotation (alternating sections)
      frames: [],
      /* float and drift are FRACTIONS OF THE PANEL'S OWN WIDTH, not
         world units. Fixed world units gave a ±2px bob on a 645px
         render — technically animating, visually nothing. Tied to
         the panel size, 0.04 is ~26px here and stays proportionate
         on any viewport. */
      float: 0.04,
      drift: 0.11,              // scroll parallax, same units (~70px)
      reducedMotion: false,
      reflection: true
    }, opts)

    this.group = new THREE.Group()
    this.group.visible = false
    this.ready = false
    this.progress = 0           // -1 (below the fold) … +1 (above it)
    this.pointer = { x: 0, y: 0 }
    this._pointerTarget = { x: 0, y: 0 }
    this.aspect = 1
    this.bornAt = null          // set on the first frame after load

    /* Overlay, not the main scene: the composer's OutputPass tone
       maps everything it touches, and re-grading finished artwork is
       exactly what we are avoiding. */
    this.sm.addOverlay(this.group)
    this.build()
  }

  async build () {
    /* currentSrc, not src: the browser has already downloaded and
       decoded this exact file for the <img>, so frame 0 comes out of
       cache instead of costing a second request. */
    const urls = [this.img.currentSrc || this.img.src, ...this.opts.frames]

    const loaded = await Promise.all(urls.map(u => loadTexture(u, {
      anisotropy: this.sm.maxAnisotropy,
      /* NoColorSpace + the overlay pass = the bytes in your PNG are
         the bytes on screen. Any conversion here would be undone
         wrongly later, or not undone at all. */
      colorSpace: THREE.NoColorSpace
    })))
    const textures = loaded.filter(Boolean)

    if (!textures.length) {
      console.warn('[oriental3d] no texture loaded, leaving the DOM image in place:', urls[0])
      return
    }

    const first = textures[0]
    this.aspect = (first.image.width || 1) / (first.image.height || 1)
    this.textures = textures

    this.material = makeFrameScrubMaterial(textures)
    this.material.uniformsRef.uOpacity.value = 0        // faded in by the entrance

    const geo = new THREE.PlaneGeometry(1, 1 / this.aspect, 1, 1)
    this.panel = new THREE.Mesh(geo, this.material)
    this.panel.renderOrder = 20
    this.group.add(this.panel)

    this.buildGlow()
    if (this.opts.reflection) this.buildReflection(textures)

    this.ready = true
    this.group.visible = true

    /* Hand the slot over. opacity (not display/visibility) so the
       layout box — which is what we anchor to — stays exactly put. */
    this.img.style.transition = 'opacity .5s ease'
    this.img.style.opacity = '0'
  }

  /** Warm pool of light behind the unit, in-scene so it parallaxes. */
  buildGlow () {
    const g = new THREE.Mesh(
      new THREE.PlaneGeometry(1.9, 1.9 / this.aspect * 1.35),
      new THREE.MeshBasicMaterial({
        map: radialGlowTexture([232, 181, 77]),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthTest: false,
        depthWrite: false,
        toneMapped: false,
        fog: false,
        opacity: 0
      })
    )
    g.position.z = -0.02
    g.renderOrder = 18
    this.glow = g
    this.group.add(g)
  }

  /** Mirrored copy fading downward — the unit sitting on a floor. */
  buildReflection (textures) {
    const mat = makeFrameScrubMaterial(textures)
    mat.uniformsRef.uSheenGain.value = 0
    mat.uniformsRef.uOpacity.value = 0
    /* Mirrored geometry, so vUv.y = 0 is the edge nearest the object
       and has to be the opaque end of the ramp. */
    mat.uniformsRef.uFade.value.set(0.17, 0.0)

    /* Full-height plane, faded hard. Shortening the plane instead
       would have to crop the UVs to match or the whole unit gets
       squashed into the strip; letting alpha do the work keeps the
       geometry honest. The previous 0.45 left a second, near-legible
       keyboard under the first that pulled the eye straight off the
       product — a reflection should suggest a surface, not compete. */
    const h = 1 / this.aspect
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, h, 1, 1), mat)
    m.scale.y = -1
    m.position.y = -h * 1.02
    m.renderOrder = 19
    this.reflection = m
    this.reflectionMat = mat
    this.group.add(m)
  }

  /* ---------- inputs ---------- */
  setPointer (nx, ny) {          // -0.5 … +0.5 within the slot
    this._pointerTarget.x = nx
    this._pointerTarget.y = ny
  }

  /** -1 … +1 as the slot crosses the viewport. Fed by ScrollController. */
  setProgress (p) { this.progress = p }

  /* ---------- per-frame ---------- */
  update (t, dt) {
    if (!this.ready) return

    const r = this.img.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const vw = window.innerWidth || 1

    // off-screen: stop paying for it entirely
    if (r.bottom < -260 || r.top > vh + 260 || r.width < 2) {
      this.group.visible = false
      return
    }
    this.group.visible = true

    /* --- anchor to the DOM rect --- */
    const view = this.sm.viewSizeAt(this.opts.z)
    const worldW = (r.width / vw) * view.width
    const cx = ((r.left + r.width / 2) / vw - 0.5) * view.width
    const cy = -((r.top + r.height / 2) / vh - 0.5) * view.height

    /* --- entrance ---
       Held until the panel first appears rather than fired at boot,
       so the second and third units animate in when you reach them
       instead of having already played off-screen. */
    if (this.bornAt === null) this.bornAt = t
    const e = Math.min((t - this.bornAt) / 1.15, 1)
    const enter = 1 - Math.pow(1 - e, 3)              // ease-out cubic

    this.group.scale.setScalar(worldW * (0.72 + 0.28 * enter))
    this.group.position.set(cx, cy, this.opts.z)

    /* --- pose ---
       Small on purpose. The render already has its own perspective,
       lighting and vanishing point baked in by whatever produced it.
       Turning the plane another 22deg stacks a second, disagreeing
       perspective on top of the first and the unit reads as a skewed
       photograph rather than an object. A few degrees is enough to
       make it feel like it occupies space; past that it just looks
       wrong. */
    const dir = this.opts.flip ? 1 : -1
    const soft = this.opts.reducedMotion ? 0.4 : 1
    const p = this.progress

    // pointer tilt eases toward its target instead of snapping
    const k = 1 - Math.pow(0.0016, dt)
    this.pointer.x += (this._pointerTarget.x - this.pointer.x) * k
    this.pointer.y += (this._pointerTarget.y - this.pointer.y) * k

    const D = THREE.MathUtils.degToRad
    const size = worldW
    const floatY = Math.sin(t * 0.62 + (this.opts.flip ? Math.PI : 0)) * this.opts.float * size * soft

    this.group.rotation.y = D(dir * (5 - 4.5 * p) * soft)
                          + this.pointer.x * D(5) * soft
                          + D((1 - enter) * dir * -9)       // entrance swing
    this.group.rotation.x = D(-1.6 * p * soft) - this.pointer.y * D(3.5) * soft
    this.group.rotation.z = D(dir * 0.7 * p * soft)
    this.group.position.y += floatY - (this.opts.reducedMotion ? 0 : p * this.opts.drift * size)

    /* --- FRAME SCRUB ---
       progress -1 … +1 maps onto the whole frame range, so the unit
       turns once as its section travels the viewport. This is the
       part that reproduces the reference site's effect. */
    const frames = this.material.frameCount
    if (frames > 1) {
      const f01 = Math.min(Math.max((p + 1) / 2, 0), 1)
      this.material.setFrame(f01 * (frames - 1))
      if (this.reflectionMat) this.reflectionMat.setFrame(f01 * (frames - 1))
    }

    /* --- shader time --- */
    const u = this.material.uniformsRef
    u.uSheenTime.value = t
    /* Barely there. At 0.75 the sweep crossed the keyboard as a
       visible smear that read as a dirty screen, not a highlight.
       This should be something you notice only if you watch for it. */
    u.uSheenGain.value = (0.05 + 0.07 * (1 - Math.min(Math.abs(p), 1))) * enter
    u.uOpacity.value = enter
    if (this.reflectionMat) this.reflectionMat.uniformsRef.uOpacity.value = enter

    if (this.glow) {
      /* Was 0.34-0.60. Combined with the hero's own radial gradients
         it washed the whole area olive-brown and the unit sat in
         murk instead of on black. */
      this.glow.material.opacity = (0.10 + 0.09 * (1 - Math.min(Math.abs(p), 1))
        + Math.sin(t * 1.1) * 0.015) * enter
    }
  }

  /** Put the DOM image back — used if WebGL is torn down. */
  restore () {
    this.img.style.opacity = ''
    this.group.visible = false
  }

  dispose () {
    this.restore()
    this.sm.removeOverlay(this.group)
    this.group.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
  }
}

/* Extra angles to scrub through, per slot, keyed by a fragment of the
   filename so re-ordering the page cannot silently mis-pair them.

   DELIBERATELY EMPTY. It was wired to cross-fade oriental-3d-hero
   into oriental-3d-angle, on the assumption that two views of the
   same unit would read as a turn. They do not. They are two separate
   compositions at different framings and scales, not two frames of
   one turntable, so the dissolve rendered every label twice —
   "ORIENTAL INSTRUMENT" and every preset name doubled and ghosted.
   A dissolve only reads as rotation when consecutive frames are a
   couple of degrees apart.

   The machinery stays: drop a real 60-200 frame turntable in here
   and the scrub works as intended, with the dissolve between
   near-identical frames doing what it is supposed to do. */
const EXTRA_FRAMES = {}

/** Convenience: wrap every `.ori-render img` on the page. */
export function mountPanels (sceneManager, opts = {}) {
  const imgs = [].slice.call(document.querySelectorAll('.ori-render img'))
  return imgs.map((img, i) => {
    const src = img.getAttribute('src') || ''
    const key = Object.keys(EXTRA_FRAMES).find(k => src.includes(k))
    return new PluginUI3D(sceneManager, img, {
      z: 0,
      flip: img.closest('.ori-render')?.classList.contains('flip') || false,
      frames: key ? EXTRA_FRAMES[key] : [],
      reducedMotion: opts.reducedMotion,
      float: 0.04 + (i % 2) * 0.012      // de-sync the panels slightly
    })
  })
}
