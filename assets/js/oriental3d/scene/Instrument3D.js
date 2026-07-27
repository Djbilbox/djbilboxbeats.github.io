/* ============================================================
   Instrument3D — the oriental instruments floating in the room.

   These are built procedurally. No .glb is shipped with the site and
   buying one would drag a licence into a commercial page, so the oud,
   qanun and darbuka are extruded from real outlines instead: a bezier
   pear for the oud body, a trapezoid for the qanun, a lathed profile
   for the darbuka. They read as instruments at the scale and blur
   they are used at, and they cost nothing to download.

   loadGLTF() is still wired: pass `modelUrl` and a real model takes
   over, no other code changes.
   ============================================================ */
import * as THREE from 'three'
import { loadGLTF } from '../utils/loader.js?v=26072724'
import { PALETTE } from './SceneManager.js?v=26072724'

/* ---------- shared materials ---------- */
const MAT = {
  wood: () => new THREE.MeshStandardMaterial({
    color: 0x5A2E10, roughness: 0.44, metalness: 0.06
  }),
  board: () => new THREE.MeshStandardMaterial({
    color: 0xC79A5C, roughness: 0.62, metalness: 0.03
  }),
  gold: () => new THREE.MeshStandardMaterial({
    color: PALETTE.gold, roughness: 0.24, metalness: 0.92,
    emissive: PALETTE.goldDeep, emissiveIntensity: 0.35
  }),
  skin: () => new THREE.MeshStandardMaterial({
    color: 0xE8DCC4, roughness: 0.85, metalness: 0.0
  }),
  /* Strings are unlit and untonemapped so the bloom pass actually
     catches them — that thin bright line is most of the effect. */
  string: () => new THREE.MeshBasicMaterial({
    color: 0xFFE9B8, toneMapped: false, transparent: true, opacity: 0.75
  })
}

/* ---------- outlines ---------- */
function oudOutline () {
  const s = new THREE.Shape()
  s.moveTo(0, 0.95)
  s.bezierCurveTo(0.56, 0.90, 0.87, 0.26, 0.80, -0.30)
  s.bezierCurveTo(0.74, -0.86, 0.31, -1.06, 0, -1.06)
  s.bezierCurveTo(-0.31, -1.06, -0.74, -0.86, -0.80, -0.30)
  s.bezierCurveTo(-0.87, 0.26, -0.56, 0.90, 0, 0.95)
  return s
}

function qanunOutline () {
  // asymmetric trapezoid — long bass side, short treble side
  const s = new THREE.Shape()
  s.moveTo(-1.15, -0.62)
  s.lineTo(1.15, -0.62)
  s.lineTo(1.15, 0.10)
  s.lineTo(-1.15, 0.62)
  s.closePath()
  return s
}

/* ============================================================ */
export class Instrument3D {
  constructor (sceneManager, options = {}) {
    this.sm = sceneManager
    this.options = Object.assign({
      type: 'oud',                       // 'oud' | 'qanun' | 'darbuka'
      position: new THREE.Vector3(0, 0, 0),
      /* Placement in FRACTIONS of the visible extent at this depth
         (-1 = left/bottom edge, +1 = right/top), resolved every
         frame. Fixed world coordinates put every instrument outside
         a phone's frustum — a 375px viewport sees barely a quarter
         of the world width a desktop does, so the whole atmosphere
         layer silently vanished on mobile. Only `z` is absolute. */
      anchor: null,                      // {x, y} | null → use `position`
      anchorEnd: null,                   // travels here across the page
      /* Full turns performed across one page scroll. THIS is the
         scroll-scrub feel from the reference site: rotation locked
         to the wheel rather than merely drifting on a timer, so
         moving the mouse turns the object and stopping stops it. */
      scrollTurns: 1.2,
      rotation: new THREE.Euler(0, 0, 0),
      scale: 1,
      spin: 0.13,                        // radians / second
      /* ~29px of travel at the depth these sit at. Anything under
         about 15px reads as a still image, however correct the
         maths is. */
      floatAmp: 0.45,
      floatSpeed: 0.55,
      phase: Math.random() * Math.PI * 2,
      reducedMotion: false,
      modelUrl: null
    }, options)

    this.group = new THREE.Group()
    this.group.position.copy(this.options.position)
    this.group.rotation.copy(this.options.rotation)
    this.group.scale.setScalar(this.options.scale)
    this.baseY = this.options.position.y
    this.scrollOffset = 0
    this.pageProgress = 0
    this.idleY = 0              // free-running spin, accumulated
    this.scrollSpin = 0         // scroll-locked spin, absolute
    this.mixer = null
    this._clock = new THREE.Clock()

    this.sm.add(this.group)
    this.layout()
    this.build()
  }

  /** Resolve `anchor` against the current viewport. Cheap, so it runs
      every frame and a resize needs no wiring at all. */
  layout () {
    const o = this.options
    if (!o.anchor) return
    const v = this.sm.viewSizeAt(o.position.z)

    /* Travel across the page, so the instruments cross the frame as
       you scroll instead of hovering in one corner for 4000px. */
    const b = o.anchorEnd || o.anchor
    const p = this.pageProgress
    const ax = o.anchor.x + (b.x - o.anchor.x) * p
    const ay = o.anchor.y + (b.y - o.anchor.y) * p

    this.group.position.x = ax * v.width / 2
    this.baseY = ay * v.height / 2
  }

  async build () {
    if (this.options.modelUrl) {
      const gltf = await loadGLTF(this.options.modelUrl)
      if (gltf) return this.adoptGLTF(gltf)
      // fall through to the procedural build if the model 404s
    }

    if (this.options.type === 'qanun')        this.buildQanun()
    else if (this.options.type === 'darbuka') this.buildDarbuka()
    else                                      this.buildOud()
  }

  adoptGLTF (gltf) {
    const root = gltf.scene
    root.traverse(child => {
      if (!child.isMesh || !child.material) return
      // keep imported PBR inside a range the bloom pass can live with
      child.material.metalness = Math.min(child.material.metalness ?? 0, 0.5)
      child.material.roughness = Math.max(child.material.roughness ?? 0.6, 0.25)
    })
    this.group.add(root)

    if (gltf.animations?.length) {
      this.mixer = new THREE.AnimationMixer(root)
      gltf.animations.forEach(clip => this.mixer.clipAction(clip).play())
    }
  }

  /* ---------- OUD ----------
     Body: the pear outline extruded with a heavy bevel, which gives
     the rounded bowl-back without a single hand-placed vertex. */
  buildOud () {
    const shape = oudOutline()

    const body = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.10, bevelEnabled: true, bevelThickness: 0.42,
        bevelSize: 0.13, bevelSegments: 10, curveSegments: 30
      }),
      MAT.wood()
    )
    body.position.z = -0.05
    this.group.add(body)

    // soundboard — flat light face sitting on the front of the bowl
    const board = new THREE.Mesh(new THREE.ShapeGeometry(shape, 30), MAT.board())
    board.scale.setScalar(0.965)
    board.position.z = 0.056
    this.group.add(board)

    // rosette + its gold rim
    const rose = new THREE.Mesh(
      new THREE.RingGeometry(0.10, 0.22, 40), MAT.gold()
    )
    rose.position.set(0, -0.10, 0.062)
    this.group.add(rose)

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(0.225, 0.014, 10, 44), MAT.gold()
    )
    rim.position.set(0, -0.10, 0.062)
    this.group.add(rim)

    // two small side rosettes, as on a real oud
    ;[[-0.40, 0.30], [0.40, 0.30]].forEach(([x, y]) => {
      const r = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.011, 8, 28), MAT.gold())
      r.position.set(x, y, 0.062)
      this.group.add(r)
    })

    // neck
    const neck = new THREE.Mesh(
      new THREE.CylinderGeometry(0.062, 0.082, 1.15, 18), MAT.wood()
    )
    neck.position.set(0, 1.50, -0.01)
    this.group.add(neck)

    // pegbox, folded back the way an oud's is
    const peg = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.46, 0.11), MAT.wood())
    peg.position.set(0, 2.16, -0.16)
    peg.rotation.x = 0.85
    this.group.add(peg)

    // bridge
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.40, 0.05, 0.045), MAT.gold())
    bridge.position.set(0, -0.66, 0.075)
    this.group.add(bridge)

    // 11 strings, bridge to nut
    const sMat = MAT.string()
    const L = 2.68
    for (let i = 0; i < 11; i++) {
      const g = new THREE.CylinderGeometry(0.0055, 0.0055, L, 5)
      const st = new THREE.Mesh(g, sMat)
      st.position.set(-0.13 + i * 0.026, -0.66 + L / 2, 0.092)
      this.group.add(st)
    }
  }

  /* ---------- QANUN ---------- */
  buildQanun () {
    const shape = qanunOutline()

    const box = new THREE.Mesh(
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.11, bevelEnabled: true, bevelThickness: 0.05,
        bevelSize: 0.03, bevelSegments: 4, curveSegments: 4
      }),
      MAT.wood()
    )
    this.group.add(box)

    const board = new THREE.Mesh(new THREE.ShapeGeometry(shape), MAT.board())
    board.scale.setScalar(0.97)
    board.position.z = 0.163
    this.group.add(board)

    // skin-covered bridge area (the qanun's stretched fish-skin patch)
    const patch = new THREE.Mesh(new THREE.PlaneGeometry(0.62, 0.9), MAT.skin())
    patch.position.set(0.62, -0.06, 0.166)
    this.group.add(patch)

    // rose windows
    ;[[-0.55, 0.05], [-0.12, -0.02]].forEach(([x, y], i) => {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(0.10 - i * 0.02, 0.012, 8, 26), MAT.gold()
      )
      r.position.set(x, y, 0.168)
      this.group.add(r)
    })

    // 26 courses fanning across the soundboard
    const sMat = MAT.string()
    for (let i = 0; i < 26; i++) {
      const p = i / 25
      const len = 2.16 - p * 0.62
      const g = new THREE.CylinderGeometry(0.0045, 0.0045, len, 4)
      g.rotateZ(Math.PI / 2)
      const st = new THREE.Mesh(g, sMat)
      st.position.set(-0.02 + p * 0.30, -0.55 + p * 1.06, 0.185)
      st.rotation.z = -0.10 * p
      this.group.add(st)
    }
  }

  /* ---------- DARBUKA ---------- */
  buildDarbuka () {
    const profile = []
    // r, y — goblet: wide head, waist, flared foot
    const pts = [
      [0.00, 0.72], [0.46, 0.72], [0.44, 0.60], [0.30, 0.34],
      [0.19, 0.05], [0.16, -0.30], [0.20, -0.55], [0.34, -0.72], [0.00, -0.72]
    ]
    pts.forEach(([r, y]) => profile.push(new THREE.Vector2(r, y)))

    const shell = new THREE.Mesh(
      new THREE.LatheGeometry(profile, 48),
      new THREE.MeshStandardMaterial({
        color: PALETTE.copper, roughness: 0.3, metalness: 0.85,
        emissive: 0x2A1000, emissiveIntensity: 0.5
      })
    )
    this.group.add(shell)

    const head = new THREE.Mesh(new THREE.CircleGeometry(0.455, 44), MAT.skin())
    head.rotation.x = -Math.PI / 2
    head.position.y = 0.725
    this.group.add(head)

    // engraved gold bands
    ;[0.50, 0.14, -0.42].forEach((y, i) => {
      const r = [0.435, 0.235, 0.175][i]
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.016, 8, 40), MAT.gold())
      ring.rotation.x = Math.PI / 2
      ring.position.y = y
      this.group.add(ring)
    })
  }

  /* ---------- per-frame ---------- */
  setScrollOffset (v) { this.scrollOffset = v }

  /** 0…1 page scroll — drives both the travel path and the turntable. */
  setPageProgress (p) {
    this.pageProgress = p
    this.scrollSpin = p * Math.PI * 2 * this.options.scrollTurns
  }

  update (t, dt) {
    if (this.mixer) this.mixer.update(dt)
    this.layout()

    const o = this.options
    const slow = o.reducedMotion ? 0.35 : 1
    /* Amplitude and frequency are damped separately. Damping only
       the frequency leaves the same 58px of travel, just slower —
       which is the part that actually bothers people who ask for
       reduced motion. Damping only the amplitude leaves it twitchy. */
    const amp = o.floatAmp * (o.reducedMotion ? 0.45 : 1)

    /* Idle drift and scroll scrub are summed, not blended: the
       object always turns with the wheel, and keeps breathing when
       the wheel stops. */
    this.idleY += o.spin * dt * slow
    this.group.rotation.y = this.options.rotation.y + this.idleY + this.scrollSpin

    this.group.position.y =
      this.baseY +
      Math.sin(t * o.floatSpeed * slow + o.phase) * amp +
      this.scrollOffset

    if (!o.reducedMotion) {
      this.group.rotation.z = Math.sin(t * 0.31 + o.phase) * 0.06
      this.group.rotation.x = Math.sin(t * 0.24 + o.phase) * 0.05
    }
  }

  dispose () {
    this.sm.remove(this.group)
    if (this.mixer) this.mixer.uncacheRoot(this.group)
  }
}
