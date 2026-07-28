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

    /* The usable slice of the render. The Blender pass starts the slab
       edge-on to the camera, so its opening frames are a zero-thickness
       line — 47 byte-identical images of nothing. Scrubbing them would
       spend the first third of the hold on an empty canvas, which reads
       as a broken page rather than as an entrance. */
    this.start = Math.max(0, this.opts.startFrame)
    this.end = Math.min(frameCount - 1, this.opts.endFrame)
    this.span = Math.max(1, this.end - this.start)
  }

  /** Preload the usable frames. Returns a promise. */
  async preload() {
    if (this.loading || this.ready) return
    this.loading = true

    const promises = []
    for (let i = this.start; i <= this.end; i++) {
      const num = String(i + 1).padStart(4, '0')
      promises.push(this.loadFrame(i, `${this.framePattern}${num}.webp`))
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
    const want = this.end - this.start + 1
    if (got === want) {
      console.log(`[FrameScrubber] loaded ${got}/${want} frames ` +
                  `(${this.start + 1}–${this.end + 1} of ${this.frameCount})`)
    } else {
      console.warn(
        `[FrameScrubber] only ${got}/${want} frames loaded — ` +
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
        if (this.currentFrame === -1 && index === this.start) this.paint(this.start)
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
    this.paint(this.start + Math.round(progress * this.span))
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

  /* Painted straight from the scroll event, with no rAF gate.
     A `queued` boolean guarding a requestAnimationFrame looks like a
     sensible throttle and is a latch waiting to jam: any frame callback
     that never runs — a tab that is not compositing, a stall under load
     — leaves the flag stuck true and silently drops EVERY later scroll.
     Scroll events are already coalesced to about one per frame, and
     paint() returns immediately when the index has not moved, so there
     is nothing here worth deferring. */
  const onScroll = () => scrubber.update(window.scrollY / distance())

  /* Wired before the preload resolves: scrolling during the download
     still tracks, and each frame paints as soon as it exists. */
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll, { passive: true })
  scrubber.preload().then(onScroll)

  return scrubber
}
