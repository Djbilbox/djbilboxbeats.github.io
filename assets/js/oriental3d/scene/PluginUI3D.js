/* ============================================================
   PluginUI3D — your plug-in renders, promoted into the 3D scene.

   The important decision here: the panel is textured with YOUR OWN
   render (img/vst/ui/oriental-3d-*.png), shown exactly as authored.
   Rebuilding the ORIENTAL interface out of procedural knobs and
   boxes would have thrown away the real artwork and replaced it with
   an approximation. So the artwork stays, and what three.js adds is
   the thing a flat <img> cannot do: real perspective, a light sweep
   travelling over the surface, a glow that lives in the same space,
   a floor reflection, and scroll-driven rotation.

   Each panel is anchored to the screen-space rectangle of the <img>
   it replaces. The DOM keeps the layout and the alt text (so the
   page still reflows and still indexes); the pixels come from WebGL.
   Because the anchoring maps a DOM rect straight to the view plane,
   it is only valid while the camera stays on the Z axis, un-rotated
   — see the note in SceneManager.
   ============================================================ */
import * as THREE from 'three'
import { loadTexture, verticalFadeAlphaMap, radialGlowTexture } from '../utils/loader.js'
import { applySheen } from '../shaders/sheen.glsl.js'

export class PluginUI3D {
  /**
   * @param {SceneManager} sceneManager
   * @param {HTMLImageElement} img   the <img> whose slot this panel takes over
   * @param {object} opts
   */
  constructor (sceneManager, img, opts = {}) {
    this.sm = sceneManager
    this.img = img
    this.opts = Object.assign({
      z: 0,                     // world depth of the panel plane
      flip: false,              // mirror the rotation (alternating sections)
      /* float and drift are FRACTIONS OF THE PANEL'S OWN WIDTH, not
         world units. Fixed world units gave a ±2px bob on a 645px
         render — technically animating, visually nothing, which is
         exactly the "je vois zéro animation" failure from the CSS
         version. Tied to the panel size, 0.04 is ~26px here and
         stays proportionate on any viewport. */
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

    this.sm.add(this.group)
    this.build()
  }

  async build () {
    /* currentSrc, not src: the browser has already downloaded and
       decoded this exact file for the <img>, so the texture comes
       out of cache instead of costing a second request. */
    const url = this.img.currentSrc || this.img.src
    const tex = await loadTexture(url, { anisotropy: this.sm.maxAnisotropy })

    if (!tex) {
      console.warn('[oriental3d] texture unavailable, leaving the DOM image in place:', url)
      return
    }

    this.aspect = (tex.image.width || 1) / (tex.image.height || 1)

    /* Unlit + toneMapped:false — the render already carries its own
       lighting and colour grade. Anything else here would re-light
       and re-grade your artwork. The bloom pass still picks up its
       bright highlights, which is the part we do want. */
    this.material = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      toneMapped: false,
      fog: false,            // scene fog would tint your artwork toward black
      depthTest: false,
      depthWrite: false,
      side: THREE.DoubleSide
    })
    this.sheen = applySheen(this.material, {
      color: [1.0, 0.80, 0.42],
      width: 0.05,
      strength: 0.55
    })

    const geo = new THREE.PlaneGeometry(1, 1 / this.aspect, 1, 1)
    this.panel = new THREE.Mesh(geo, this.material)
    this.panel.renderOrder = 20
    this.group.add(this.panel)

    this.buildGlow()
    if (this.opts.reflection) this.buildReflection(tex)

    this.ready = true
    this.group.visible = true

    /* Hand the slot over. opacity (not display/visibility) so the
       layout box — which is what we anchor to — stays exactly put. */
    this.img.style.transition = 'opacity .45s ease'
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
        opacity: 0.55
      })
    )
    g.position.z = -0.02
    g.renderOrder = 18
    this.glow = g
    this.group.add(g)
  }

  /** Mirrored copy fading downward — the unit sitting on a floor. */
  buildReflection (tex) {
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      alphaMap: verticalFadeAlphaMap([0.0, 0.42]),
      transparent: true,
      toneMapped: false,
      fog: false,
      depthTest: false,
      depthWrite: false,
      opacity: 0.5,
      side: THREE.DoubleSide
    })
    const h = 1 / this.aspect
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1, h, 1, 1), mat)
    m.scale.y = -1                       // mirror
    m.position.y = -h * 1.03
    m.renderOrder = 19
    this.reflection = m
    this.group.add(m)
  }

  /* ---------- pointer ---------- */
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

    this.group.scale.setScalar(worldW)
    this.group.position.set(cx, cy, this.opts.z)

    /* --- pose ---
       A resting three-quarter turn that eases through frontal as the
       panel crosses the middle of the screen, exactly like the CSS
       version it replaces — the object never goes flat, and never
       turns far enough to fight the lighting baked into the render. */
    const dir = this.opts.flip ? 1 : -1
    const soft = this.opts.reducedMotion ? 0.35 : 1
    const p = this.progress

    // pointer tilt eases toward its target instead of snapping
    const k = 1 - Math.pow(0.0016, dt)
    this.pointer.x += (this._pointerTarget.x - this.pointer.x) * k
    this.pointer.y += (this._pointerTarget.y - this.pointer.y) * k

    const D = THREE.MathUtils.degToRad
    const size = worldW                       // amplitudes scale with the panel
    const floatY = Math.sin(t * 0.62 + (this.opts.flip ? Math.PI : 0)) * this.opts.float * size * soft

    this.group.rotation.y = D(dir * (17 - 14 * p) * soft) + this.pointer.x * D(14) * soft
    this.group.rotation.x = D(-5 * p * soft) - this.pointer.y * D(10) * soft
    this.group.rotation.z = D(dir * 2.2 * p * soft)
    this.group.position.y += floatY - (this.opts.reducedMotion ? 0 : p * this.opts.drift * size)

    /* --- shader time --- */
    this.sheen.uSheenTime.value = t
    /* Sweep hardest while the panel is centred: that is when someone
       is actually looking at it. */
    this.sheen.uSheenGain.value = 0.30 + 0.45 * (1 - Math.min(Math.abs(p), 1))

    if (this.glow) {
      this.glow.material.opacity = 0.34 + 0.26 * (1 - Math.min(Math.abs(p), 1))
        + Math.sin(t * 1.1) * 0.04
    }
  }

  /** Put the DOM image back — used if WebGL is torn down. */
  restore () {
    this.img.style.opacity = ''
    this.group.visible = false
  }

  dispose () {
    this.restore()
    this.sm.remove(this.group)
    this.group.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) o.material.dispose()
    })
  }
}

/** Convenience: wrap every `.ori-render img` on the page. */
export function mountPanels (sceneManager, opts = {}) {
  const imgs = [].slice.call(document.querySelectorAll('.ori-render img'))
  return imgs.map((img, i) => new PluginUI3D(sceneManager, img, {
    z: 0,
    flip: img.closest('.ori-render')?.classList.contains('flip') || false,
    reducedMotion: opts.reducedMotion,
    float: 0.04 + (i % 2) * 0.012      // de-sync the panels slightly
  }))
}
