/* ============================================================
   ORIENTAL CINE — la scène WebGL.

   Renderer, environnement PBR, unité, particules, post-processing.
   Aucune logique de scroll ici : choreo.js pilote, scene.js expose.
   ============================================================ */
import * as THREE from 'three'
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js'
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js'
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js'

export const GOLD = 0xE8B54D

export function createScene ({ canvas, manager, modelUrl, textureUrl }) {
  /* ---------------- renderer ---------------- */
  const renderer = new THREE.WebGLRenderer({
    canvas, antialias: true, alpha: true, powerPreference: 'high-performance'
  })
  /* Plafonné à 2 : au-delà, un écran 3x triple le coût de remplissage
     pour un gain que personne ne voit, et le DOF est déjà cher. */
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.18
  renderer.outputColorSpace = THREE.SRGBColorSpace

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.set(0, 0, 7.2)

  /* ---------------- environnement PBR ----------------
     RoomEnvironment plutôt qu'un fichier .hdr : les reflets sur le
     châssis et les potentiomètres viennent bien d'une environment map
     360°, mais elle est GÉNÉRÉE ici et passée au PMREMGenerator. Aucun
     téléchargement de 2 à 6 Mo, aucune dépendance CORS sur un CDN
     d'assets, et rien à versionner. Pour un vrai HDRI de studio,
     remplacer par RGBELoader + la même passe PMREM. */
  const pmrem = new THREE.PMREMGenerator(renderer)
  pmrem.compileEquirectangularShader()
  const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04)
  scene.environment = envRT.texture

  /* ---------------- lumières d'accentuation ----------------
     L'environment map fait le gros du travail. Ces trois sources ne
     servent qu'à sculpter : une clé douce, un rim doré qui décolle le
     contour du fond noir, un fill froid pour que le dessous ne meure
     pas en aplat. */
  const key = new THREE.DirectionalLight(0xfff0d8, 2.9)
  key.position.set(-3.4, 4.2, 4.6)
  scene.add(key)

  const rim = new THREE.DirectionalLight(GOLD, 3.4)
  rim.position.set(3.8, 1.6, -3.2)
  scene.add(rim)

  const fill = new THREE.DirectionalLight(0x8db4dd, 0.55)
  fill.position.set(2.2, -3.4, 2.0)
  scene.add(fill)

  /* Halo chaud derrière l'unité — un sprite à dégradé radial, pas un
     cône. Le cône que ceci remplace se voyait comme un triangle marron
     à arête franche : une géométrie ouverte en additif garde ses bords,
     et un bord net ne ressemble jamais à de la lumière. Un dégradé n'a
     pas de bord, donc pas de forme à trahir. */
  const halo = (() => {
    const c = document.createElement('canvas')
    c.width = c.height = 256
    const g = c.getContext('2d').createRadialGradient(128, 128, 0, 128, 128, 128)
    g.addColorStop(0, 'rgba(255,214,150,0.85)')
    g.addColorStop(0.42, 'rgba(216,140,60,0.22)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    const ctx = c.getContext('2d')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 256, 256)
    const tex = new THREE.CanvasTexture(c)
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: tex, transparent: true, opacity: 0.55,
      depthWrite: false, depthTest: false, blending: THREE.AdditiveBlending
    }))
    s.position.set(0, 0, -2.4)
    return s
  })()
  scene.add(halo)
  const spot = halo

  /* Le halo était dimensionné en dur (13 x 9 unités monde). Sur un écran
     étroit la caméra voit beaucoup moins large, donc ce même halo couvrait
     une part bien plus grande du cadre : sur téléphone la scène virait au
     lavis lumineux et ne ressemblait plus du tout au rendu desktop. Sa
     taille se déduit maintenant de ce que la caméra voit réellement à sa
     profondeur, et son intensité baisse en portrait où il occupe
     forcément plus de place. */
  function ajusteHalo () {
    const d = Math.max(0.1, camera.position.z - halo.position.z)
    const h = 2 * Math.tan((camera.fov * Math.PI) / 360) * d
    const w = h * camera.aspect
    halo.scale.set(w * 1.2, h * 1.1, 1)
    halo.material.opacity = camera.aspect < 1 ? 0.26 : 0.55
  }
  ajusteHalo()

  /* ---------------- l'unité ---------------- */
  const unit = new THREE.Group()
  scene.add(unit)

  const texLoader = new THREE.TextureLoader(manager)
  const uiTex = texLoader.load(textureUrl)
  uiTex.colorSpace = THREE.SRGBColorSpace
  uiTex.anisotropy = renderer.capabilities.getMaxAnisotropy()

  let hasRealModel = false

  if (modelUrl) {
    /* Le chargeur est câblé : déposer un .glb et renseigner data-model
       sur la section suffit à remplacer le châssis texturé, sans
       toucher à la chorégraphie ni au post-processing. */
    new GLTFLoader(manager).load(modelUrl, (gltf) => {
      const m = gltf.scene
      const box = new THREE.Box3().setFromObject(m)
      const size = box.getSize(new THREE.Vector3())
      m.scale.setScalar(4.4 / Math.max(size.x, size.y, size.z))
      box.setFromObject(m)
      m.position.sub(box.getCenter(new THREE.Vector3()))
      unit.add(m)
      hasRealModel = true
    })
  }

  /* Repli — et, en l'état du dépôt, le cas réel : il n'existe aucun
     modèle 3D du plugin, seulement des captures d'interface. On monte
     donc un châssis épais en géométrie réelle (arêtes biseautées,
     métal PBR) et on y applique l'interface en façade. Ce n'est pas un
     instrument modélisé et ça ne prétend pas l'être : c'est un boîtier
     crédible qui réagit correctement à la lumière et aux reflets. */
  const W = 4.6, H = W * 855 / 1255, D = 0.30

  const chassis = new THREE.Mesh(
    new RoundedBoxGeometry(W + 0.14, H + 0.14, D, 5, 0.075),
    new THREE.MeshStandardMaterial({
      color: 0x1b1712, metalness: 0.92, roughness: 0.31,
      envMapIntensity: 1.25
    })
  )
  unit.add(chassis)

  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(W, H),
    new THREE.MeshPhysicalMaterial({
      map: uiTex,
      /* Mat, pas vitré. Une façade imprimée renvoie une réflexion large
         et douce ; à faible rugosité la lumière-clé se pose en nappe
         spéculaire nette et l'interface devient illisible. */
      roughness: 0.58,
      metalness: 0.0,
      /* Un vernis léger donne le reflet de surface d'un panneau réel
         sans toucher à la lisibilité de la sérigraphie. */
      clearcoat: 0.35,
      clearcoatRoughness: 0.42,
      /* Émission volontairement basse. L'idée — les LED dépassent le
         seuil du bloom, le reste non — se retourne dès que la texture
         contient de grandes zones claires : à 0.34 le clavier, blanc et
         large, franchissait le seuil et ressortait en barre blanche
         cramée qui mangeait la moitié de la façade. À 0.12 seuls les
         témoins et les segments allumés débordent. */
      emissive: 0xffffff,
      emissiveMap: uiTex,
      emissiveIntensity: 0.12,
      envMapIntensity: 1.0
    })
  )
  face.position.z = D / 2 + 0.001
  unit.add(face)

  /* ---------------- particules ---------------- */
  const COUNT = window.innerWidth < 900 ? 420 : 900
  const pos = new Float32Array(COUNT * 3)
  const seed = new Float32Array(COUNT)
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 22
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14
    pos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 2
    seed[i] = Math.random() * Math.PI * 2
  }
  const dustGeo = new THREE.BufferGeometry()
  dustGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({
    color: 0xffe4b0, size: 0.032, transparent: true, opacity: 0.55,
    sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending
  }))
  scene.add(dust)

  /* ---------------- post-processing ---------------- */
  const composer = new EffectComposer(renderer)
  composer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  composer.setSize(window.innerWidth, window.innerHeight)
  composer.addPass(new RenderPass(scene, camera))

  /* Seuil haut et force modeste. Le réglage précédent (0.42 / 0.82)
     attrapait le clavier entier ; ici seules les vraies sources — LED,
     valeurs allumées, liseré doré — franchissent la barre. */
  const bloom = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), 0.26, 0.55, 0.90
  )
  composer.addPass(bloom)

  const bokeh = new BokehPass(scene, camera, {
    focus: 7.2, aperture: 0.00042, maxblur: 0.011
  })
  composer.addPass(bokeh)
  composer.addPass(new OutputPass())

  /* ---------------- redimensionnement ---------------- */
  function resize () {
    const w = window.innerWidth, h = window.innerHeight
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer.setSize(w, h)
    composer.setSize(w, h)
    bloom.setSize(w, h)
    ajusteHalo()
  }
  window.addEventListener('resize', resize, { passive: true })

  function dispose () {
    window.removeEventListener('resize', resize)
    envRT.dispose(); pmrem.dispose(); composer.dispose(); renderer.dispose()
  }

  return {
    THREE, renderer, scene, camera, composer, unit, face, chassis, dust, seed,
    bloom, bokeh, spot, halo, ajusteHalo, dispose,
    get hasRealModel () { return hasRealModel }
  }
}
