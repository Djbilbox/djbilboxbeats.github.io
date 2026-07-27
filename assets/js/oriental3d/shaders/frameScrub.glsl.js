/* ============================================================
   frameScrub.glsl.js — the scroll-scrubbed frame material.

   This is the technique the reference site (bujaabeats.com/orient)
   actually uses: not live 3D at all, but ~230 pre-rendered frames of
   a turntable painted onto a fixed canvas, with the frame index
   driven by scroll position. Apple has been doing it for a decade.
   Offline rendering is why it looks better than anything realtime.

   ORIENTAL has 2-3 real angles of the unit, not 230, so the scrub
   here cross-fades between them instead of hard-cutting: at that
   frame count a dissolve reads as the object turning, where a cut
   would read as a slideshow. The uniform is a float frame index, so
   the day a proper 60-200 frame turntable exists this file does not
   change — you pass more URLs and the dissolve becomes a cut,
   exactly like the reference.

   Colour management, deliberately blunt: the textures are tagged
   NoColorSpace and written straight out with no conversion and no
   tone mapping chunk. The material is drawn in SceneManager's
   overlay pass, after OutputPass, so raw sRGB in == raw sRGB out.
   Your render reaches the screen bit-for-bit as authored.
   ============================================================ */
import * as THREE from 'three'

export const frameScrubVert = /* glsl */`
varying vec2 vUv;
void main () {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

export const frameScrubFrag = /* glsl */`
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uMix;         // 0 = A, 1 = B
uniform float uOpacity;
uniform float uSheenTime;
uniform float uSheenGain;
uniform vec3  uSheenColor;
uniform vec2  uFade;        // alpha multiplier at vUv.y = 0 and 1

varying vec2 vUv;

void main () {
  vec4 a = texture2D(uTexA, vUv);
  vec4 b = texture2D(uTexB, vUv);

  /* Cross-fade in premultiplied space. Straight mix() on two cut-out
     renders bleeds the transparent border of one into the body of
     the other and leaves a dark halo around the unit mid-dissolve. */
  vec3 pa = a.rgb * a.a;
  vec3 pb = b.rgb * b.a;
  float alpha = mix(a.a, b.a, uMix);
  vec3  pre   = mix(pa, pb, uMix);
  vec3  col   = alpha > 0.001 ? pre / alpha : vec3(0.0);

  /* Diagonal highlight travelling over the surface — the one thing a
     flat <img> can never do, and what sells the panel as a physical
     object rather than a picture of one. */
  float band  = fract((vUv.x * 0.75 + vUv.y * 0.55) - uSheenTime * 0.16);
  float sweep = smoothstep(0.445, 0.5, band) * (1.0 - smoothstep(0.5, 0.555, band));
  col += sweep * smoothstep(0.02, 0.35, alpha) * uSheenGain * uSheenColor;

  alpha *= mix(uFade.x, uFade.y, vUv.y);

  if (alpha * uOpacity < 0.003) discard;
  gl_FragColor = vec4(col, alpha * uOpacity);
}
`

/**
 * Build the material. Textures must be tagged NoColorSpace by the
 * caller — see the colour-management note above.
 */
export function makeFrameScrubMaterial (textures) {
  const uniforms = {
    uTexA:       { value: textures[0] },
    uTexB:       { value: textures[Math.min(1, textures.length - 1)] },
    uMix:        { value: 0 },
    uOpacity:    { value: 1 },
    uSheenTime:  { value: 0 },
    uSheenGain:  { value: 0.5 },
    uSheenColor: { value: new THREE.Vector3(1.0, 0.80, 0.42) },
    uFade:       { value: new THREE.Vector2(1, 1) }
  }

  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader: frameScrubVert,
    fragmentShader: frameScrubFrag,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    side: THREE.DoubleSide
  })

  /**
   * Scrub to a fractional frame index.
   * @param {number} f  0 … frames-1
   */
  material.setFrame = f => {
    const n = textures.length
    if (n === 1) return
    const clamped = Math.min(Math.max(f, 0), n - 1)
    const i = Math.floor(clamped)
    const j = Math.min(i + 1, n - 1)
    uniforms.uTexA.value = textures[i]
    uniforms.uTexB.value = textures[j]
    uniforms.uMix.value = clamped - i
  }

  material.frameCount = textures.length
  material.uniformsRef = uniforms
  return material
}
