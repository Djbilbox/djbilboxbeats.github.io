/* ============================================================
   ScrollController — binds the page's scroll to the 3D scene.

   GSAP ScrollTrigger drives it when it is available. It is loaded
   from a CDN, so it may not be: the fallback runs the identical
   numbers off a rAF-throttled scroll listener. Same choreography
   either way, and a CDN outage costs the smoothing, not the page.
   ============================================================ */

export class ScrollController {
  /**
   * @param {object} deps
   * @param {SceneManager}  deps.sceneManager
   * @param {Instrument3D[]} deps.instruments
   * @param {ParticleSystem} deps.particles
   * @param {boolean}       deps.reducedMotion
   * @param {object|null}   deps.gsap     {gsap, ScrollTrigger} or null
   */
  constructor (deps) {
    Object.assign(this, deps)
    this.pageProgress = 0
    this.triggers = []

    if (this.gsap) this.initGSAP()
    else this.initFallback()
  }

  /* ---------- shared choreography ----------
     The travelling panel is NOT driven from here. PanelJourney reads
     window.scrollY itself on every frame, which keeps it exact even
     when GSAP's ticker is throttled, and means the main effect has no
     dependency on a CDN. This is left owning the haze and the bloom. */

  /** Whole-page progress, 0 at the top … 1 at the bottom. */
  applyPage (p) {
    this.pageProgress = p

    // dust pushes outward and the room opens up as you descend
    this.particles?.setSpread(p)

    /* Bloom now only reaches the dust — the plug-in renders are
       composited afterwards in the overlay pass. So this is a haze
       control, and at 0.62-1.2 the haze was hiding the black the
       product needs to sit on. */
    if (this.sceneManager.bloomPass) {
      this.sceneManager.bloomPass.strength = 0.28 + 0.22 * this._easeIn(p)
    }

    this.instruments?.forEach((inst, i) => {
      /* The turntable runs even under reduced motion. Scroll-locked
         rotation is direct manipulation — it moves when the user
         moves and stops when they stop — not the drifting parallax
         that the preference actually exists to suppress. */
      inst.setPageProgress(p)

      // that drifting parallax, on the other hand, is gated
      if (!this.reducedMotion) inst.setScrollOffset(p * (1.6 + i * 0.9))
    })
  }

  _easeIn (x) { return x * x }

  /* ---------- GSAP path ---------- */
  initGSAP () {
    const { gsap, ScrollTrigger } = this.gsap
    gsap.registerPlugin(ScrollTrigger)

    this.triggers.push(ScrollTrigger.create({
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: self => this.applyPage(self.progress)
    }))

    ScrollTrigger.refresh()
  }

  /* ---------- no-GSAP path ---------- */
  initFallback () {
    let ticking = false

    this._frame = () => {
      ticking = false
      const vh = window.innerHeight || 1

      const max = Math.max(document.body.scrollHeight - vh, 1)
      this.applyPage(Math.min(Math.max(window.scrollY / max, 0), 1))
    }

    this._onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(this._frame)
    }

    window.addEventListener('scroll', this._onScroll, { passive: true })
    window.addEventListener('resize', this._onScroll, { passive: true })
    this._frame()
  }

  kill () {
    this.triggers.forEach(t => t.kill && t.kill())
    this.triggers.length = 0
    if (this._onScroll) {
      window.removeEventListener('scroll', this._onScroll)
      window.removeEventListener('resize', this._onScroll)
    }
  }
}
