/* ============================================================
   PanelJourney — ONE plug-in that travels down the page.

   This replaces three independently anchored panels, each of which
   faded in and out inside its own section. The reference site
   (bujaabeats.com/orient) keeps a single object on screen for the
   whole page and lets scrolling move it, and that continuity is most
   of why it feels like a product film rather than a brochure.

   How it works:

   - Every `.ori-render img` on the page is a STOP on the journey.
     The <img> stays in the DOM at opacity 0 — it still holds the
     layout open and still carries its alt text for search — and its
     screen rectangle is what the panel flies to.
   - Scroll position picks the segment. When the viewport centre
     passes a stop, the panel sits exactly on that stop's rectangle,
     pixel for pixel. Between two stops it interpolates.
   - Each stop has a DIFFERENT render (the full unit, the QANUN
     category, the low angle). Dissolving between them ghosts badly —
     they are separate compositions, not turntable frames. So the
     swap happens mid-flight, at the exact moment the panel is turned
     edge-on and invisible. You see an object turning over, not a
     cross-fade.

   The camera never moves; see the note in SceneManager for why that
   matters to the anchoring maths.
   ============================================================ */
import * as THREE from 'three'
import { loadTexture, radialGlowTexture } from '../utils/loader.js?v=26072724'
import { makeFrameScrubMaterial } from '../shaders/frameScrub.glsl.js?v=26072724'

const clamp01 = v => v < 0 ? 0 : (v > 1 ? 1 : v)
const smooth = v => v * v * (3 - 2 * v)
const lerp = (a, b, t) => a + (b - a) * t

export class PanelJourney {
  constructor (sceneManager, imgs, opts = {}) {
    this.sm = sceneManager
    this.imgs = imgs
    this.opts = Object.assign({
      z: 0,
      float: 0.035,             // fraction of the panel's own width
      flipDeg: 88,              // how far it turns over between stops
      lift: 0.12,               // how much it rises mid-flight
      reducedMotion: false
    }, opts)

    this.group = new THREE.Group()
    this.group.visible = false
    this.ready = false
    this.texIndex = 0
    this.pointer = { x: 0, y: 0 }
    this._pointerTarget = { x: 0, y: 0 }
    this.bornAt = null

    /* Overlay, not the main scene: OutputPass tone maps everything it
       touches and re-grading finished artwork is what we avoid. */
    this.sm.addOverlay(this.group)
    this.build()
  }

  async build () {
    /* currentSrc: the browser already downloaded and decoded these
       for the <img> tags, so the textures come out of cache. */
    const loaded = await Promise.all(this.imgs.map(img => loadTexture(
      img.currentSrc || img.src,
      { anisotropy: this.sm.maxAnisotropy, colorSpace: THREE.NoColorSpace }
    )))

    this.stops = []
    loaded.forEach((tex, i) => {
      if (!tex) return
      this.stops.push({
        img: this.imgs[i],
        tex,
        aspect: (tex.image.width || 1) / (tex.image.height || 1)
      })
    })
    if (!this.stops.length) {
      console.warn('[oriental3d] no render loaded — leaving the DOM images in place')
      return
    }

    this.material = makeFrameScrubMaterial(this.stops.map(s => s.tex))
    this.material.uniformsRef.uOpacity.value = 0
    this.material.setFrame(0)

    /* Unit plane. The mesh carries the aspect ratio (which differs
       per render) and the group carries the on-screen width, so a
       stop with a different shape costs one scale write, not a new
       geometry. */
    this.panel = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), this.material)
    this.panel.renderOrder = 20
    this.group.add(this.panel)

    this.buildGlow()
    this.buildReflection()

    this.ready = true
    this.stops.forEach(s => {
      s.img.style.transition = 'opacity .5s ease'
      s.img.style.opacity = '0'
    })
  }

  buildGlow () {
    this.glow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 1, 1),
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
    this.glow.position.z = -0.02
    this.glow.renderOrder = 18
    this.group.add(this.glow)
  }

  buildReflection () {
    const mat = makeFrameScrubMaterial(this.stops.map(s => s.tex))
    mat.uniformsRef.uSheenGain.value = 0
    mat.uniformsRef.uOpacity.value = 0
    /* Mirrored, so vUv.y = 0 is the edge nearest the object and has
       to be the opaque end of the ramp. Kept faint: a reflection
       should suggest a surface, not reprint the keyboard. */
    mat.uniformsRef.uFade.value.set(0.17, 0.0)
    mat.setFrame(0)

    this.reflection = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 1, 1), mat)
    this.reflection.renderOrder = 19
    this.reflectionMat = mat
    this.group.add(this.reflection)
  }

  setPointer (nx, ny) {
    this._pointerTarget.x = nx
    this._pointerTarget.y = ny
  }

  /** Which stop are we on, and how far to the next one. */
  locate () {
    const vh = window.innerHeight || 1
    const focus = window.scrollY + vh / 2

    const marks = this.stops.map(s => {
      const r = s.img.getBoundingClientRect()
      return { r, centre: r.top + window.scrollY + r.height / 2 }
    })

    const last = marks.length - 1
    if (focus <= marks[0].centre) return { marks, i: 0, j: 0, t: 0, last }
    if (focus >= marks[last].centre) return { marks, i: last, j: last, t: 0, last }

    for (let k = 0; k < last; k++) {
      if (focus >= marks[k].centre && focus <= marks[k + 1].centre) {
        const span = Math.max(marks[k + 1].centre - marks[k].centre, 1)
        return { marks, i: k, j: k + 1, t: (focus - marks[k].centre) / span, last }
      }
    }
    return { marks, i: last, j: last, t: 0, last }
  }

  /** A DOM rect → world position and width on the panel plane. */
  toWorld (r, view) {
    const vw = window.innerWidth || 1
    const vh = window.innerHeight || 1
    return {
      x: ((r.left + r.width / 2) / vw - 0.5) * view.width,
      y: -((r.top + r.height / 2) / vh - 0.5) * view.height,
      w: (r.width / vw) * view.width
    }
  }

  update (t, dt) {
    if (!this.ready) return

    const { marks, i, j, t: raw, last } = this.locate()
    const e = smooth(clamp01(raw))
    const view = this.sm.viewSizeAt(this.opts.z)

    const A = this.toWorld(marks[i].r, view)
    const B = this.toWorld(marks[j].r, view)

    /* --- the swap ---
       Second half of the flight shows the next stop's render. The
       panel is edge-on at exactly that moment, so the change is
       hidden rather than blended. */
    const wanted = e < 0.5 ? i : j
    if (wanted !== this.texIndex) {
      this.texIndex = wanted
      this.material.setFrame(wanted)
      this.reflectionMat.setFrame(wanted)
    }
    const aspect = this.stops[this.texIndex].aspect

    /* --- fade out past the final stop ---
       Otherwise the unit rides along over the presets, the pricing
       and the closing CTA, none of which are about the picture. */
    const vh = window.innerHeight || 1
    const past = (window.scrollY + vh / 2) - marks[last].centre
    const tail = 1 - clamp01(past / (vh * 0.75))

    if (tail <= 0.001) { this.group.visible = false; return }
    this.group.visible = true

    /* --- entrance, once --- */
    if (this.bornAt === null) this.bornAt = t
    const enter = 1 - Math.pow(1 - Math.min((t - this.bornAt) / 1.15, 1), 3)

    /* --- place it --- */
    const worldW = lerp(A.w, B.w, e)
    this.group.scale.setScalar(worldW * (0.82 + 0.18 * enter))
    this.group.position.set(lerp(A.x, B.x, e), lerp(A.y, B.y, e), this.opts.z)

    const soft = this.opts.reducedMotion ? 0.45 : 1
    const D = THREE.MathUtils.degToRad

    // pointer tilt eases toward its target instead of snapping
    const k = 1 - Math.pow(0.0016, dt)
    this.pointer.x += (this._pointerTarget.x - this.pointer.x) * k
    this.pointer.y += (this._pointerTarget.y - this.pointer.y) * k

    /* Arc: rises off its straight line mid-flight so the move reads
       as a throw rather than a slide. */
    const arc = Math.sin(e * Math.PI)
    this.group.position.y += arc * this.opts.lift * worldW * soft
    this.group.position.y += Math.sin(t * 0.62) * this.opts.float * worldW * soft

    /* Turn-over. Only between stops — parked on a stop it sits nearly
       square to camera, because the render already carries its own
       baked perspective and stacking more on top looks wrong. */
    this.group.rotation.y = D(arc * this.opts.flipDeg * (i % 2 ? -1 : 1))
                          + D((i % 2 ? 1 : -1) * 4 * (1 - arc)) * soft
                          + this.pointer.x * D(5) * soft
    this.group.rotation.x = -this.pointer.y * D(3.5) * soft
    this.group.rotation.z = D(arc * 2.5 * soft)

    /* Shapes follow whichever render is showing. */
    this.panel.scale.set(1, 1 / aspect, 1)
    this.reflection.scale.set(1, -1 / aspect, 1)
    this.reflection.position.y = -(1 / aspect) * 1.02
    this.glow.scale.set(1.9, (1.9 / aspect) * 1.35, 1)

    /* --- opacity ---
       A narrow dip right at the turn-over. The plane is edge-on there
       so it is already almost gone; this covers the sliver that
       perspective leaves when the panel is off to one side. */
    const nearSwap = Math.max(0, 1 - Math.abs(e - 0.5) / 0.08)
    const dip = 1 - nearSwap * nearSwap
    const alpha = enter * tail * dip

    const u = this.material.uniformsRef
    u.uSheenTime.value = t
    u.uSheenGain.value = 0.10 * alpha        // barely there, on purpose
    u.uOpacity.value = alpha
    this.reflectionMat.uniformsRef.uOpacity.value = alpha

    /* --- breathing glow ---
       Two sine waves at different rates, so the pulse never settles
       into an obvious loop. Reads as a unit that is powered up and
       idling rather than a picture with a light behind it. Deeper
       while parked on a stop, since that is when it is being looked
       at; suppressed mid-flight where the arc is already the motion. */
    const breath = 0.5 + 0.5 * (Math.sin(t * 0.85) * 0.65 + Math.sin(t * 1.37) * 0.35)
    const parked = 1 - arc
    this.glow.material.opacity = (0.10 + 0.075 * breath * parked) * alpha
    this.glow.scale.multiplyScalar(1 + 0.04 * breath * parked)
  }

  restore () {
    this.stops?.forEach(s => { s.img.style.opacity = '' })
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

/** Build the journey from every `.ori-render img` on the page, in order. */
export function mountJourney (sceneManager, opts = {}) {
  const imgs = [].slice.call(document.querySelectorAll('.ori-render img'))
  if (!imgs.length) return null
  return new PanelJourney(sceneManager, imgs, opts)
}
