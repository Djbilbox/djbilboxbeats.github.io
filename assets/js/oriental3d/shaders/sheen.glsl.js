/* ============================================================
   sheen.glsl.js — the diagonal light sweep that travels across the
   plug-in renders, the way a highlight crawls over real anodised
   metal when you turn it.

   Injected into a stock three material with onBeforeCompile rather
   than written as a whole ShaderMaterial, so the material keeps its
   own texture handling, transparency and colour management.
   ============================================================ */

/**
 * @param {THREE.Material} material  any material with a `map`
 * @param {object}   opts
 * @param {number[]} opts.color      sweep tint, linear RGB 0..1
 * @param {number}   opts.width      band width (0.01 tight … 0.2 wide)
 * @param {number}   opts.strength   additive gain
 * @returns {{uSheenTime:{value:number}, uSheenGain:{value:number}}} uniforms to animate
 */
export function applySheen (material, opts = {}) {
  const uSheenTime = { value: 0 }
  const uSheenGain = { value: opts.strength ?? 0.6 }
  const color = opts.color || [1.0, 0.82, 0.45]
  const width = opts.width ?? 0.055

  material.onBeforeCompile = shader => {
    shader.uniforms.uSheenTime = uSheenTime
    shader.uniforms.uSheenGain = uSheenGain

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
         uniform float uSheenTime;
         uniform float uSheenGain;`
      )
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
         {
           /* vMapUv is three's r152+ name for the map's UV varying. */
           float band = fract((vMapUv.x * 0.75 + vMapUv.y * 0.55) - uSheenTime * 0.16);
           float sweep = smoothstep(0.5 - ${width.toFixed(4)}, 0.5, band)
                       * (1.0 - smoothstep(0.5, 0.5 + ${width.toFixed(4)}, band));
           /* Only lift pixels that already carry some signal, so the
              sweep rides the artwork instead of glowing in the
              transparent cut-out around it. */
           float mask = smoothstep(0.02, 0.35, diffuseColor.a);
           diffuseColor.rgb += sweep * mask * uSheenGain
                             * vec3(${color[0]}, ${color[1]}, ${color[2]});
         }`
      )
  }

  // force a recompile if the material was already used
  material.needsUpdate = true

  return { uSheenTime, uSheenGain }
}
