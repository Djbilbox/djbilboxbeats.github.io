/* ============================================================
   SceneManager — renderer, camera, lights, post-processing, loop.

   Two deliberate departures from a generic three.js boilerplate:

   1. The camera NEVER moves or rotates. Every plug-in render in the
      scene is anchored to the screen-space rectangle of its DOM slot
      (see PluginUI3D), and that mapping is only valid for an
      un-rotated camera on the Z axis. Depth and parallax come from
      moving the objects and the dust, not the eye.

   2. Updates are registered with addUpdate() instead of the caller
      monkey-patching the animation loop. Reassigning the loop from
      outside works until the day something else does it too.
   ============================================================ */
import * as THREE from 'three'
import { EffectComposer }   from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass }       from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass }  from 'three/addons/postprocessing/UnrealBloomPass.js'
import { OutputPass }       from 'three/addons/postprocessing/OutputPass.js'

export const PALETTE = {
  ink:       0x050403,
  gold:      0xE8B54D,
  goldLight: 0xF6D98A,
  goldDeep:  0xB8860B,
  copper:    0xB85A14,
  teal:      0x2E8B8B    // a cool rim only, so the gold reads as gold
}

export class SceneManager {
  constructor (canvas, opts = {}) {
    this.canvas = canvas
    this.reduced = !!opts.reducedMotion
    this.updates = []
    this.clock = new THREE.Clock()
    this.time = 0            // accumulated CLAMPED time — see start()
    this.running = false

    this.initRenderer()
    this.initScene()
    this.initCamera()
    this.initLights()
    this.initPostProcessing()
    this.initResize()
  }

  /* ---------- renderer ---------- */
  initRenderer () {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: window.devicePixelRatio < 1.5,   // DPR>=1.5 already resolves edges
      alpha: false,
      powerPreference: 'high-performance',
      stencil: false
    })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setPixelRatio(this.pixelRatio())
    this.renderer.setClearColor(PALETTE.ink, 1)
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping
    this.renderer.toneMappingExposure = 1.15
    this.renderer.outputColorSpace = THREE.SRGBColorSpace
    this.renderer.shadowMap.enabled = false      // nothing here casts a useful shadow
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy()
  }

  /* Phones do not need 2x on a full-screen bloom chain. */
  pixelRatio () {
    const dpr = window.devicePixelRatio || 1
    const cap = window.innerWidth < 900 ? 1.5 : 2
    return Math.min(dpr, cap)
  }

  initScene () {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(PALETTE.ink)
    this.scene.fog = new THREE.FogExp2(PALETTE.ink, 0.028)

    /* Second scene, drawn straight to the canvas AFTER the composer.
       Everything in the main scene goes through OutputPass, which
       applies ACES tone mapping to the whole buffer — a material's
       own `toneMapped:false` cannot opt out of that. The plug-in
       renders are already colour-graded artwork, so re-grading them
       is exactly what we do not want. Drawing them in a separate
       pass is the only way they reach the screen untouched.
       Trade-off, deliberate: they no longer feed the bloom. Their
       glow is baked in anyway. */
    this.overlayScene = new THREE.Scene()
  }

  addOverlay (o) { this.overlayScene.add(o) }
  removeOverlay (o) { this.overlayScene.remove(o) }

  initCamera () {
    this.camera = new THREE.PerspectiveCamera(
      42, window.innerWidth / window.innerHeight, 0.1, 120
    )
    this.camera.position.set(0, 0, 8)
    this.camera.lookAt(0, 0, 0)
  }

  /* ---------- lights ----------
     A studio rig without an HDRI file: warm key, cool rim, soft fill,
     plus three roaming accent lamps that make the procedural
     instruments read as solid objects rather than flat silhouettes. */
  initLights () {
    this.scene.add(new THREE.AmbientLight(0xffffff, 0.32))

    const key = new THREE.DirectionalLight(0xFFD9B3, 2.4)
    key.position.set(4, 6, 6)
    this.scene.add(key)

    const rim = new THREE.DirectionalLight(PALETTE.teal, 1.1)
    rim.position.set(-5, 2, -4)
    this.scene.add(rim)

    this.scene.add(new THREE.HemisphereLight(0xFFF5E6, 0x120C06, 0.75))

    this.accentLights = [PALETTE.copper, PALETTE.gold, PALETTE.goldLight]
      .map((hex, i) => {
        const l = new THREE.PointLight(hex, 0, 14, 2)
        l.position.set(Math.sin(i * 2.1) * 4, 0.5 + i * 0.8, Math.cos(i * 2.1) * 4)
        this.scene.add(l)
        return l
      })
  }

  /* ---------- post ---------- */
  initPostProcessing () {
    this.composer = new EffectComposer(this.renderer)
    this.composer.setPixelRatio(this.pixelRatio())
    this.composer.setSize(window.innerWidth, window.innerHeight)

    this.composer.addPass(new RenderPass(this.scene, this.camera))

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      /* Must match ScrollController's floor. This is the value the
         hero shows before the first scroll event ever fires, so
         leaving it at the old 0.62 meant the top of the page loaded
         hazy and only cleared once you moved. */
      0.28,   // strength — ScrollController raises it toward the CTA
      0.55,   // radius
      0.72    // threshold
    )
    this.composer.addPass(this.bloomPass)
    this.composer.addPass(new OutputPass())
  }

  /* ---------- resize ---------- */
  initResize () {
    let t = 0
    this._onResize = () => {
      clearTimeout(t)
      t = setTimeout(() => this.onResize(), 120)
    }
    window.addEventListener('resize', this._onResize, { passive: true })
    window.addEventListener('orientationchange', this._onResize, { passive: true })
  }

  onResize () {
    const w = window.innerWidth
    const h = window.innerHeight
    const pr = this.pixelRatio()

    this.camera.aspect = w / h
    this.camera.updateProjectionMatrix()

    this.renderer.setPixelRatio(pr)
    this.renderer.setSize(w, h)
    this.composer.setPixelRatio(pr)
    this.composer.setSize(w, h)
    this.bloomPass.setSize(w, h)
  }

  updateAccentLights (t) {
    const amp = this.reduced ? 1.4 : 3.6
    this.accentLights.forEach((light, i) => {
      light.intensity = (0.6 + Math.sin(t * 0.7 + i * 2.1) * 0.5) * 6
      light.position.x = Math.sin(t * 0.22 + i * 2.1) * amp
      light.position.z = Math.cos(t * 0.22 + i * 2.1) * amp
    })
  }

  /* ---------- loop ---------- */
  addUpdate (fn) { this.updates.push(fn) }

  start () {
    if (this.running) return
    this.running = true

    this.renderer.setAnimationLoop(() => {
      // A backgrounded tab still gets frames in some browsers; skip them.
      if (document.hidden) return

      /* Time is accumulated from the CLAMPED delta rather than read
         off clock.elapsedTime. Come back to a tab after a minute
         away and elapsedTime has jumped a minute forward, which
         teleports every float and light sweep mid-animation. This
         way the scene resumes exactly where it paused. */
      const dt = Math.min(this.clock.getDelta(), 0.05)
      this.time += dt
      const t = this.time

      this.updateAccentLights(t)
      for (let i = 0; i < this.updates.length; i++) this.updates[i](t, dt)

      this.composer.render()
      this.renderOverlay()
    })
  }

  /** Composite the untouched artwork on top of the graded scene. */
  renderOverlay () {
    if (!this.overlayScene.children.length) return
    this.renderer.autoClear = false
    this.renderer.clearDepth()
    this.renderer.render(this.overlayScene, this.camera)
    this.renderer.autoClear = true
  }

  stop () {
    this.running = false
    this.renderer.setAnimationLoop(null)
  }

  /* ---------- helpers used by DOM-anchored objects ----------
     Size of the visible plane at a given z, for the current camera.
     Only correct because the camera stays put and un-rotated.     */
  viewSizeAt (z) {
    const dist = this.camera.position.z - z
    const h = 2 * Math.tan(THREE.MathUtils.degToRad(this.camera.fov) / 2) * dist
    return { width: h * this.camera.aspect, height: h }
  }

  add (o) { this.scene.add(o) }
  remove (o) { this.scene.remove(o) }
  getScene () { return this.scene }
  getCamera () { return this.camera }
  getRenderer () { return this.renderer }

  dispose () {
    this.stop()
    window.removeEventListener('resize', this._onResize)
    window.removeEventListener('orientationchange', this._onResize)
    this.scene.traverse(o => {
      if (o.geometry) o.geometry.dispose()
      if (o.material) {
        const mats = Array.isArray(o.material) ? o.material : [o.material]
        mats.forEach(m => {
          Object.values(m).forEach(v => { if (v && v.isTexture) v.dispose() })
          m.dispose()
        })
      }
    })
    this.composer.dispose?.()
    this.renderer.dispose()
  }
}

/** Cheap WebGL2/WebGL capability probe — used to decide whether to boot at all. */
export function webglAvailable () {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch (e) {
    return false
  }
}
