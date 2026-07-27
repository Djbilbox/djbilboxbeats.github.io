/* ============================================================
   ParticleSystem — the gold dust hanging in the room.

   Colours come from the ORIENTAL palette (gold / amber / copper,
   with a little teal for cold contrast) rather than the cyan of a
   generic sci-fi look, so the field belongs to this product.

   Colours are converted to LINEAR space up front: the composer
   renders linear and OutputPass does the sRGB conversion at the end.
   Feeding it sRGB values here would wash the whole field out.
   ============================================================ */
import * as THREE from 'three'
import { particlesVert, particlesFrag } from '../shaders/particles.glsl.js?v=26072727'
import { PALETTE } from './SceneManager.js?v=26072727'

export class ParticleSystem {
  constructor (sceneManager, opts = {}) {
    this.sm = sceneManager
    this.count = opts.count ?? (window.innerWidth < 900 ? 1600 : 4200)
    this.radius = opts.radius ?? 13
    this.speed = opts.speed ?? 1
    this.build()
  }

  build () {
    const n = this.count
    const geo = new THREE.BufferGeometry()

    const position = new Float32Array(n * 3)
    const aColor   = new Float32Array(n * 3)
    const aSize    = new Float32Array(n)
    const aAlpha   = new Float32Array(n)
    const aSeed    = new Float32Array(n)

    const palette = [
      new THREE.Color(PALETTE.gold).convertSRGBToLinear(),
      new THREE.Color(PALETTE.goldLight).convertSRGBToLinear(),
      new THREE.Color(PALETTE.copper).convertSRGBToLinear(),
      new THREE.Color(PALETTE.teal).convertSRGBToLinear()
    ]
    // teal is the rare one — one mote in twelve, not one in four
    const pick = [0, 0, 0, 0, 1, 1, 1, 2, 2, 2, 0, 3]

    for (let i = 0; i < n; i++) {
      /* Hollow shell rather than a solid ball: a uniform ball puts
         most of its motes near the camera where they read as noise. */
      const r = this.radius * (0.42 + 0.58 * Math.cbrt(Math.random()))
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      position[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      position[i * 3 + 1] = r * Math.cos(phi) * 0.62      // flatten: a haze, not a sphere
      position[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      const c = palette[pick[i % pick.length]]
      aColor[i * 3]     = c.r
      aColor[i * 3 + 1] = c.g
      aColor[i * 3 + 2] = c.b

      aSize[i]  = 0.40 + Math.random() * 1.1
      aAlpha[i] = 0.06 + Math.random() * 0.22   // halved: it was reading as noise
      aSeed[i]  = Math.random()
    }

    geo.setAttribute('position', new THREE.BufferAttribute(position, 3))
    geo.setAttribute('aColor',   new THREE.BufferAttribute(aColor, 3))
    geo.setAttribute('aSize',    new THREE.BufferAttribute(aSize, 1))
    geo.setAttribute('aAlpha',   new THREE.BufferAttribute(aAlpha, 1))
    geo.setAttribute('aSeed',    new THREE.BufferAttribute(aSeed, 1))
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), this.radius * 2)

    this.uniforms = {
      uTime:       { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uSize:       { value: 7.0 },
      uAudio:      { value: 0 },
      uSpread:     { value: 0 }
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: particlesVert,
      fragmentShader: particlesFrag,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    this.points = new THREE.Points(geo, this.material)
    this.points.frustumCulled = false     // it surrounds the camera
    this.points.renderOrder = 5
    this.sm.add(this.points)
  }

  /** 0..1 — pushes the field outward as the page scrolls. */
  setSpread (v) { this.uniforms.uSpread.value = v }

  /** 0..1 — live audio level. */
  setAudio (v) { this.uniforms.uAudio.value = v }

  update (t) {
    this.uniforms.uTime.value = t * this.speed
    this.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio || 1, 2)
  }

  dispose () {
    this.sm.remove(this.points)
    this.points.geometry.dispose()
    this.material.dispose()
  }
}
