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

    await Promise.all(promises)
    this.ready = true
    this.loading = false

    /* Report what actually arrived, not what was requested. A missing
       frame resolves rather than rejects (a partial set still scrubs),
       so counting the requests would report success even when every
       single URL 404s — which is exactly how a wrong path stayed
       invisible for a whole deploy. */
    const got = this.frames.size
    if (got === this.frameCount) {
      console.log(`[FrameScrubber] loaded ${got}/${this.frameCount} frames`)
    } else {
      console.warn(
        `[FrameScrubber] only ${got}/${this.frameCount} frames loaded — ` +
        `check the path "${this.framePattern}0001.webp"`
      )
    }
  }

  loadFrame(index, url) {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        this.frames.set(index, img)
        /* Paint the first frame the moment it lands so the canvas is
           never a black hole while the rest of the set streams in. */
        if (this.currentFrame === -1 && index === 0) this.paint(0)
        resolve()
      }
      img.onerror = () => {
        // A partial set still scrubs; don't take the whole page down.
        resolve()
      }
      img.src = url
    })
  }

  /** Paint frame based on scroll progress (0...1). */
  update(scrollProgress) {
    const progress = Math.max(0, Math.min(1, scrollProgress))
    this.paint(Math.round(progress * (this.frameCount - 1)))
  }

  /** Paint one frame by index, skipping redundant repaints. */
  paint(frameIndex) {
    if (frameIndex === this.currentFrame) return

    /* Hold the last good frame rather than blanking the canvas: a
       gap in the set should read as a dropped frame, not as the
       product vanishing mid-rise. */
    const frame = this.frames.get(frameIndex)
    if (!frame) return

    this.currentFrame = frameIndex
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    this.ctx.drawImage(frame, 0, 0, this.canvas.width, this.canvas.height)
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

  /* The rise plays out over the cinema hold — the one viewport of
     empty scroll that `.ori-cinema-content { margin-top:100vh }`
     creates — not over the whole document. Spread across the full
     page height the plug-in would creep up by a third of a frame per
     wheel notch and only stand up at the footer. */
  const distance = () => Math.max(1, window.innerHeight)

  let queued = false
  const onScroll = () => {
    if (queued) return
    queued = true
    requestAnimationFrame(() => {
      queued = false
      scrubber.update(window.scrollY / distance())
    })
  }

  /* Wired before the preload resolves: scrolling during the download
     still tracks, and each frame paints as soon as it exists. */
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  scrubber.preload().then(onScroll)

  return scrubber
}
