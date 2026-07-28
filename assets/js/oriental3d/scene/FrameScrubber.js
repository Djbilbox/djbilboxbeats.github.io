/* ============================================================
   FrameScrubber — scroll-driven frame playback in 2D canvas.

   Loads pre-rendered WebP frames and paints the current one based
   on scroll position. This is the bujaabeats/orient technique: offline
   rendering → frame scrubbing → scroll-linked playback.
   ============================================================ */

export class FrameScrubber {
  constructor(canvas, framePattern, frameCount, opts = {}) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: true })
    this.framePattern = framePattern  // "img/vst/ui/showcase/rise-"
    this.frameCount = frameCount      // 150
    this.opts = Object.assign({
      reducedMotion: false,
      startFrame: 0,
      endFrame: frameCount - 1
    }, opts)

    this.currentFrame = -1
    this.frames = new Map()
    this.loading = false
    this.ready = false
    this.error = null
  }

  /** Preload all frames. Returns a promise. */
  async preload() {
    if (this.loading || this.ready) return
    this.loading = true

    const promises = []
    for (let i = 1; i <= this.frameCount; i++) {
      const num = String(i).padStart(4, '0')
      const url = `${this.framePattern}${num}.webp`
      promises.push(this.loadFrame(i - 1, url))
    }

    try {
      await Promise.all(promises)
      this.ready = true
      console.log(`[FrameScrubber] loaded ${this.frameCount} frames`)
    } catch (err) {
      this.error = err
      console.error('[FrameScrubber] preload failed:', err)
    }
    this.loading = false
  }

  loadFrame(index, url) {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.onload = () => {
        this.frames.set(index, img)
        resolve()
      }
      img.onerror = () => reject(new Error(`Failed to load frame ${index}: ${url}`))
      img.src = url
    })
  }

  /** Paint frame based on scroll progress. */
  update(scrollProgress) {
    if (!this.ready) return

    // Clamp and map scroll progress (0...1) to frame index
    const progress = Math.max(0, Math.min(1, scrollProgress))
    const frameIndex = Math.round(progress * (this.frameCount - 1))

    if (frameIndex === this.currentFrame) return

    this.currentFrame = frameIndex
    const frame = this.frames.get(frameIndex)
    if (!frame) return

    // Clear and paint
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(frame, 0, 0)
  }

  dispose() {
    this.frames.clear()
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }
}

/** Mount scrubber on a canvas element. */
export function mountFrameScrubber(canvasSelector, framePattern, frameCount, opts = {}) {
  const canvas = document.querySelector(canvasSelector)
  if (!canvas) return null

  const scrubber = new FrameScrubber(canvas, framePattern, frameCount, opts)

  // Preload and wire to scroll
  scrubber.preload().then(() => {
    window.addEventListener('scroll', () => {
      const vh = window.innerHeight
      const doc = document.documentElement.scrollHeight
      const progress = window.scrollY / (doc - vh)
      scrubber.update(progress)
    }, { passive: true })

    // Trigger initial frame
    window.dispatchEvent(new Event('scroll'))
  })

  return scrubber
}
