/* ============================================================
   ExplodedPlugin — phase 2 of the scrollytelling brief.

   The interface comes apart on the Z axis as you scroll, then
   reassembles. Header, macro column, centre browser, FX chain and
   keyboard separate in depth, and the knobs turn.

   WHY THIS IS POSSIBLE NOW, and was not before:

   The plug-in's own source (github.com/Djbilbox/oriental-instrument-vst)
   draws the UI as separate JUCE components — BackgroundComponent,
   KnobComponent, FXPanel, PresetBrowser, PianoComponent — and
   Source/Utils/Constants.h + PluginEditor::resized() give the exact
   geometry: 980x640, 50px header, 148px keyboard, 170px macro
   column, 162px FX column, six macro knobs stacked below a 20px
   label. So the cuts below are not guesses about where one part
   ends and the next begins. They are the real component bounds.

   Every layer samples a sub-rectangle of ONE texture — your own flat
   UI capture, img/vst/ui/oriental-ui.png. Nothing is redrawn, no
   part of the interface is reconstructed. The pixels are yours; all
   this does is cut them along seams the source code told us about
   and move the pieces apart.

   The knobs work because a knob is radially symmetric apart from its
   pointer: crop a disc, spin the disc, and it reads as the control
   being turned.
   ============================================================ */
import * as THREE from 'three'
import { loadTexture } from '../utils/loader.js?v=26072727'

/* ---------- the capture, measured ----------
   oriental-ui.png is 1075x671 and carries a little window chrome, so
   it is not simply 980x640 scaled. These two affine maps were fitted
   to borders detected in the image itself (the FX column edge landed
   at 83.44% against the source's 83.47%). */
const IMG_W = 1075
const IMG_H = 671
const SX = 1.0602, OX = 29.8        // source px -> image px, horizontal
const SY = 1.0181, OY = 22.1        // source px -> image px, vertical

const UI_W = 980, UI_H = 640
const HEADER = 50, PIANO_TOP = 492, LEFT_COL = 170, RIGHT_COL_X = 818

/** Source-space rect -> UV rect (v flipped for GL). */
function uvRect (x, y, w, h) {
  const u0 = (SX * x + OX) / IMG_W
  const u1 = (SX * (x + w) + OX) / IMG_W
  const v1 = 1 - (SY * y + OY) / IMG_H
  const v0 = 1 - (SY * (y + h) + OY) / IMG_H
  return { u0, u1, v0, v1 }
}

/* Layers, in source coordinates, with the depth each one flies to.
   Depth is a fraction of the plug-in's width so it scales with the
   panel. The chassis goes back, the controls come forward — the
   brief's "châssis en arrière, éléments de surface vers l'écran". */
const LAYERS = [
  { name: 'header', x: 0,           y: 0,         w: UI_W,               h: HEADER,            depth:  0.09 },
  { name: 'macro',  x: 0,           y: HEADER,    w: LEFT_COL,           h: PIANO_TOP - HEADER, depth: 0.34 },
  { name: 'centre', x: LEFT_COL,    y: HEADER,    w: RIGHT_COL_X - LEFT_COL, h: PIANO_TOP - HEADER, depth: -0.28 },
  { name: 'fx',     x: RIGHT_COL_X, y: HEADER,    w: UI_W - RIGHT_COL_X, h: PIANO_TOP - HEADER, depth:  0.34 },
  { name: 'piano',  x: 0,           y: PIANO_TOP, w: UI_W,               h: UI_H - PIANO_TOP,  depth:  0.19 }
]

/* Six macro knobs stacked in the left column under a 20px label,
   plus the FX MIX knob in the bottom 70px of the right column. */
function knobSpecs () {
  const out = []
  const colTop = HEADER + 20
  const colH = PIANO_TOP - colTop
  const step = colH / 6
  for (let i = 0; i < 6; i++) {
    /* The dial sits in the upper part of each cell, with its label
       beneath — matches KnobComponent's paint order. */
    out.push({ cx: LEFT_COL / 2, cy: colTop + step * i + step * 0.40, r: 25, turns: 1.4 + i * 0.25 })
  }
  out.push({ cx: RIGHT_COL_X + (UI_W - RIGHT_COL_X) / 2, cy: PIANO_TOP - 40, r: 25, turns: -1.8 })
  return out
}

function planeWithUV (w, h, uv) {
  const g = new THREE.PlaneGeometry(w, h, 1, 1)
  g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([
    uv.u0, uv.v1,  uv.u1, uv.v1,
    uv.u0, uv.v0,  uv.u1, uv.v0
  ]), 2))
  return g
}

export class ExplodedPlugin {
  constructor (sceneManager, img, opts = {}) {
    this.sm = sceneManager
    this.img = img
    this.opts = Object.assign({ z: 0, reducedMotion: false, spread: 1 }, opts)

    this.group = new THREE.Group()
    this.group.visible = false
    this.ready = false
    this.progress = 0
    this.layers = []
    this.knobs = []

    this.sm.addOverlay(this.group)
    this.build()
  }

  async build () {
    const tex = await loadTexture(this.img.currentSrc || this.img.src, {
      anisotropy: this.sm.maxAnisotropy,
      /* Same contract as the travelling panel: raw sRGB straight to
         the canvas through the overlay pass, so the capture is shown
         exactly as authored. */
      colorSpace: THREE.NoColorSpace
    })
    if (!tex) {
      console.warn('[oriental3d] exploded view: capture unavailable, keeping the flat image')
      return
    }
    this.tex = tex

    const mkMat = () => new THREE.MeshBasicMaterial({
      map: tex, transparent: true, toneMapped: false, fog: false,
      depthTest: false, depthWrite: false, side: THREE.DoubleSide
    })

    /* Layers are laid out in a unit-width space: the whole plug-in is
       1 wide, so the group's scale alone controls on-screen size. */
    const aspect = UI_W / UI_H
    LAYERS.forEach(L => {
      const w = L.w / UI_W
      const h = (L.h / UI_H) / aspect
      const cx = (L.x + L.w / 2) / UI_W - 0.5
      const cy = -((L.y + L.h / 2) / UI_H - 0.5) / aspect

      const mesh = new THREE.Mesh(planeWithUV(w, h, uvRect(L.x, L.y, L.w, L.h)), mkMat())
      mesh.position.set(cx, cy, 0)
      mesh.renderOrder = 30
      this.group.add(mesh)
      this.layers.push({ mesh, home: new THREE.Vector3(cx, cy, 0), depth: L.depth, name: L.name })
    })

    /* Knob discs ride in front of the macro and FX layers. A circular
       alpha mask keeps the crop from showing as a square patch. */
    const mask = discMask()
    knobSpecs().forEach(k => {
      const w = (k.r * 2) / UI_W
      const h = ((k.r * 2) / UI_H) / aspect
      const m = new THREE.Mesh(
        planeWithUV(w, h, uvRect(k.cx - k.r, k.cy - k.r, k.r * 2, k.r * 2)),
        new THREE.MeshBasicMaterial({
          map: tex, alphaMap: mask, transparent: true, toneMapped: false,
          fog: false, depthTest: false, depthWrite: false
        })
      )
      m.position.set(k.cx / UI_W - 0.5, -(k.cy / UI_H - 0.5) / aspect, 0)
      m.renderOrder = 31
      this.group.add(m)
      this.knobs.push({ mesh: m, turns: k.turns, home: m.position.clone() })
    })

    this.aspect = aspect
    this.ready = true
    this.img.style.transition = 'opacity .5s ease'
    this.img.style.opacity = '0'
  }

  update (t, dt) {
    if (!this.ready) return

    const r = this.img.getBoundingClientRect()
    const vh = window.innerHeight || 1
    const vw = window.innerWidth || 1

    if (r.bottom < -240 || r.top > vh + 240 || r.width < 2) {
      this.group.visible = false
      return
    }
    this.group.visible = true

    /* 0 as the slot enters from the bottom, 1 as it leaves the top. */
    const p = Math.min(Math.max((vh - r.top) / (vh + r.height), 0), 1)
    this.progress = p

    /* Assembled at both ends, fully apart in the middle: the brief's
       explode-then-reassemble in a single pass, so the unit is whole
       again by the time it leaves the screen. */
    const open = Math.sin(Math.PI * Math.min(Math.max((p - 0.12) / 0.76, 0), 1))
    const eased = open * open * (3 - 2 * open) * this.opts.spread
                * (this.opts.reducedMotion ? 0.45 : 1)

    // anchor to the DOM slot exactly like the travelling panel
    const view = this.sm.viewSizeAt(this.opts.z)
    const worldW = (r.width / vw) * view.width
    this.group.scale.setScalar(worldW)
    this.group.position.set(
      ((r.left + r.width / 2) / vw - 0.5) * view.width,
      -((r.top + r.height / 2) / vh - 0.5) * view.height,
      this.opts.z
    )

    const D = THREE.MathUtils.degToRad
    const soft = this.opts.reducedMotion ? 0.45 : 1
    // a three-quarter turn while open, so the separation is legible
    this.group.rotation.y = D(-22 * eased * soft)
    this.group.rotation.x = D(9 * eased * soft)

    this.layers.forEach(L => {
      L.mesh.position.z = L.home.z + L.depth * eased
      /* Pieces fan outward from the centre as they lift. Without it
         the separation only exists along Z and reads as a blur
         rather than as parts coming apart. */
      L.mesh.position.x = L.home.x * (1 + 0.18 * eased)
      L.mesh.position.y = L.home.y * (1 + 0.20 * eased)
    })

    this.knobs.forEach(k => {
      // must stay proud of the macro layer it sits on (0.34)
      k.mesh.position.z = k.home.z + 0.40 * eased
      k.mesh.position.x = k.home.x * (1 + 0.18 * eased)
      k.mesh.position.y = k.home.y * (1 + 0.20 * eased)
      /* Locked to the wheel: the dial turns while you scroll and
         stops the moment you do. */
      k.mesh.rotation.z = -p * Math.PI * 2 * k.turns
    })
  }

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

/** Soft-edged circular alpha mask, drawn rather than shipped. */
function discMask () {
  const S = 128
  const c = document.createElement('canvas')
  c.width = c.height = S
  const x = c.getContext('2d')
  const g = x.createRadialGradient(S / 2, S / 2, S * 0.30, S / 2, S / 2, S * 0.48)
  g.addColorStop(0, '#fff')
  g.addColorStop(1, '#000')
  x.fillStyle = g
  x.fillRect(0, 0, S, S)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.NoColorSpace
  return t
}

/** Mount on the page's exploded-view slot, if it has one. */
export function mountExploded (sceneManager, opts = {}) {
  const img = document.querySelector('.ori-xplode img')
  return img ? new ExplodedPlugin(sceneManager, img, opts) : null
}
