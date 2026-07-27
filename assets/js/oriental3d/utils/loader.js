/* ============================================================
   loader.js — texture / model loading helpers.

   Everything returns a promise and nothing here ever rejects into
   the void: a missing asset resolves to null so the caller can fall
   back instead of taking the whole scene down with it. The page has
   to survive a 404 on a decorative render.
   ============================================================ */
import * as THREE from 'three'

const texLoader = new THREE.TextureLoader()
const cache = new Map()

/** Load one texture. Resolves to null (never throws) if it 404s. */
export function loadTexture (url, opts = {}) {
  if (cache.has(url)) return cache.get(url)

  const p = new Promise(resolve => {
    texLoader.load(
      url,
      tex => {
        /* NOT `opts.colorSpace || SRGBColorSpace`: THREE.NoColorSpace
           is the empty string, so `||` silently swapped it back to
           sRGB. The GPU then converted the texture to linear on
           sample and the raw-output path wrote linear values into an
           sRGB canvas — the artwork came out roughly half as bright
           as authored. */
        tex.colorSpace = opts.colorSpace !== undefined
          ? opts.colorSpace
          : THREE.SRGBColorSpace
        tex.anisotropy = opts.anisotropy || 4
        tex.generateMipmaps = true
        tex.minFilter = THREE.LinearMipmapLinearFilter
        tex.magFilter = THREE.LinearFilter
        resolve(tex)
      },
      undefined,
      () => resolve(null)
    )
  })

  cache.set(url, p)
  return p
}

/** Try a list of URLs in order, return the first that loads. */
export async function loadFirstTexture (urls, opts) {
  for (const url of urls) {
    const tex = await loadTexture(url, opts)
    if (tex) return tex
  }
  return null
}

/** Lazily pull in GLTFLoader — only paid for if a .glb is actually used. */
export async function loadGLTF (url) {
  try {
    const { GLTFLoader } = await import('three/addons/loaders/GLTFLoader.js')
    return await new GLTFLoader().loadAsync(url)
  } catch (err) {
    console.warn('[oriental3d] GLTF failed:', url, err)
    return null
  }
}

/* A vertical alpha ramp, drawn on a canvas rather than shipped as a
   file. Used to fade the floor reflections out as they fall away. */
export function verticalFadeAlphaMap (stops = [0.55, 0]) {
  const c = document.createElement('canvas')
  c.width = 4
  c.height = 128
  const ctx = c.getContext('2d')
  const g = ctx.createLinearGradient(0, 0, 0, 128)
  g.addColorStop(0, `rgba(255,255,255,${stops[0]})`)
  g.addColorStop(1, `rgba(255,255,255,${stops[1]})`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 4, 128)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.NoColorSpace
  return tex
}

/* A soft radial blob — the warm pool of light the renders sit in.
   Cheaper and softer than a blurred DOM box-shadow, and it lives in
   the same 3D space as the object so it parallaxes correctly. */
export function radialGlowTexture (rgb = [232, 181, 77]) {
  const S = 256
  const c = document.createElement('canvas')
  c.width = c.height = S
  const ctx = c.getContext('2d')
  const g = ctx.createRadialGradient(S / 2, S / 2, 0, S / 2, S / 2, S / 2)
  g.addColorStop(0.0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.85)`)
  g.addColorStop(0.35, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.28)`)
  g.addColorStop(1.0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
  ctx.fillStyle = g
  ctx.fillRect(0, 0, S, S)

  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}
