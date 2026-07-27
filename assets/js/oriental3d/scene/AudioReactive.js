/* ============================================================
   AudioReactive — optional. Turns whatever is playing on the page
   into a 0..1 level that drives particle size and bloom.

   Two hard constraints shape this file:

   1. An AudioContext created before a user gesture starts suspended
      and stays that way, so the graph is only built on 'play'.
   2. Routing a media element through Web Audio takes over its
      output — if the graph is ever torn down without reconnecting
      to the destination, the page goes silent. So the source node
      is created once per element and cached.

   With nothing playing it falls back to a slow synthetic envelope,
   so the scene still breathes on a page that has no audio at all.
   ============================================================ */

export class AudioReactive {
  constructor (opts = {}) {
    this.ctx = null
    this.analyser = null
    this.data = null
    this.sources = new WeakMap()
    this.level = 0
    this.active = false
    this.smoothing = opts.smoothing ?? 0.12
    this.gain = opts.gain ?? 1.6
    this.synthetic = opts.synthetic !== false
  }

  /** Wire a media element in. Safe to call repeatedly. */
  connect (media) {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext
        if (!AC) return false
        this.ctx = new AC()
        this.analyser = this.ctx.createAnalyser()
        this.analyser.fftSize = 512
        this.analyser.smoothingTimeConstant = 0.75
        this.data = new Uint8Array(this.analyser.frequencyBinCount)
        // the analyser is a tap, not a stage — it also feeds the speakers
        this.analyser.connect(this.ctx.destination)
      }

      if (this.ctx.state === 'suspended') this.ctx.resume()

      if (!this.sources.has(media)) {
        const src = this.ctx.createMediaElementSource(media)
        src.connect(this.analyser)
        this.sources.set(media, src)
      }

      this.active = true
      return true
    } catch (err) {
      // cross-origin media, or an element already routed elsewhere
      console.warn('[oriental3d] audio-reactive unavailable:', err.message)
      this.active = false
      return false
    }
  }

  /** Attach to every media element on the page, lazily on first play. */
  autoAttach () {
    const media = document.querySelectorAll('audio, video')
    media.forEach(m => {
      m.addEventListener('play', () => this.connect(m), { once: false })
    })
    return media.length
  }

  /** 0..1 — call once per frame. */
  update (t) {
    if (this.active && this.analyser) {
      this.analyser.getByteFrequencyData(this.data)

      /* Weight the low end: percussion and bass are what a viewer
         perceives as "the track moving", not the hats. */
      const n = this.data.length
      let sum = 0
      let wsum = 0
      for (let i = 0; i < n; i++) {
        const w = 1 - (i / n) * 0.75
        sum += this.data[i] * w
        wsum += w
      }
      const raw = Math.min((sum / wsum / 255) * this.gain, 1)
      this.level += (raw - this.level) * this.smoothing
      return this.level
    }

    if (this.synthetic) {
      // slow double-pulse, roughly a resting heartbeat
      const s = Math.sin(t * 0.9) * 0.5 + Math.sin(t * 0.37) * 0.5
      this.level = Math.max(0, s) * 0.22
      return this.level
    }

    this.level = 0
    return 0
  }

  dispose () {
    try { this.ctx && this.ctx.close() } catch (e) { /* already closed */ }
    this.ctx = null
    this.active = false
  }
}
