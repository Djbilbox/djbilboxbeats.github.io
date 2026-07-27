/* ============================================================
   particles.glsl.js — GLSL for the gold-dust field.

   The stack note asked for .vert/.frag files. Those need a bundler
   plugin to import as strings; this site is plain GitHub Pages with
   no build step, so the same GLSL ships as exported template
   literals. Identical shader, one fewer moving part.
   ============================================================ */

export const particlesVert = /* glsl */`
uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uAudio;      // 0..1 — live audio level, drives size + brightness
uniform float uSpread;     // scroll-driven: pushes the field outward

attribute float aSize;
attribute float aAlpha;
attribute float aSeed;
attribute vec3  aColor;

varying float vAlpha;
varying vec3  vColor;

void main () {
  /* Motion is purely orbital — no linear velocity. Linear drift
     eventually throws every mote out of the frustum and forces a
     wrap, and the wrap pops. Sinusoids can't escape.               */
  float s = aSeed * 6.2831853;

  vec3 pos = position * (1.0 + uSpread * 0.22);
  pos.x += sin(uTime * 0.22 + s)        * 0.42;
  pos.y += cos(uTime * 0.17 + s * 1.7)  * 0.34;
  pos.z += sin(uTime * 0.13 + s * 2.3)  * 0.38;

  /* slow vertical rise, like dust caught in a warm updraft */
  pos.y += sin(uTime * 0.06 + s * 0.5) * 0.9;

  vec4 mv = modelViewMatrix * vec4(pos, 1.0);
  float depth = max(-mv.z, 0.001);

  float twinkle = 0.5 + 0.5 * sin(uTime * 1.7 + aSeed * 27.0);

  /* Fade the motes that come too close to the camera, otherwise a
     single mote can fill the screen with a bright disc. */
  float near = smoothstep(0.6, 2.4, depth);

  vAlpha = aAlpha * twinkle * near * (1.0 + uAudio * 0.9);
  vColor = aColor;

  gl_PointSize = uSize * aSize * uPixelRatio * (1.0 + uAudio * 0.55) * (8.0 / depth);
  gl_Position  = projectionMatrix * mv;
}
`

export const particlesFrag = /* glsl */`
varying float vAlpha;
varying vec3  vColor;

void main () {
  float d = length(gl_PointCoord - vec2(0.5));
  float a = smoothstep(0.5, 0.0, d);
  a = pow(a, 1.7);                      // tighter core, softer halo

  if (a * vAlpha < 0.004) discard;

  /* Linear output on purpose: EffectComposer's OutputPass does the
     tone mapping and sRGB conversion at the end of the chain, so
     converting here would apply it twice. */
  gl_FragColor = vec4(vColor, a * vAlpha);
}
`
