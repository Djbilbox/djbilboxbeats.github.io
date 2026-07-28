"""
ORIENTAL INSTRUMENT — the opening shot, rendered offline. Pass 2.

Run headless:
  blender -b -P oriental_rise2.py -- <ui_png> <outdir> <frames>

Same idea as pass 1 — a printed slab standing up off a surface, scrubbed
by scroll — but pass 1 shipped a render in which the unit was a 680x138
sliver welded to the bottom edge of the frame. Two faults, both fixed
here:

1. SIZE. `primitive_plane_add(size=1)` builds a plane one unit across
   (-0.5..+0.5). Pass 1 then scaled it by FACE_W/2, which is the
   convention for the size=2 default. Every dimension came out at half
   its intended value, and the "bottom edge" pivot ended up floating
   below the geometry it was supposed to hinge on. Both primitives are
   now built with size=2 so the /2 scaling means what it says.

2. FRAMING. The camera sat at z=0.62 tilted 5.5 degrees down while the
   panel stood centred on z=0, so the shot pointed above the product
   and clipped it against the bottom of the frame. The camera is now
   placed on an orbit around the panel's centre: fixed distance, fixed
   elevation, aimed at z=0, with the distance derived from the lens and
   the sensor so the standing unit fills ~79% of the frame instead of
   whatever happened to land.

The opening angle is also pulled back from -74 to -70 degrees. At -74,
with the camera nearly level, the slab was edge-on to the lens for the
first third of the move: 47 byte-identical frames of nothing. -70
against a 9-degree camera elevation keeps the face readable from the
very first frame.
"""
import bpy
import sys
import os
import math
from mathutils import Matrix

# ---------------------------------------------------------------- args
argv = sys.argv
argv = argv[argv.index("--") + 1:] if "--" in argv else []
UI_PNG = argv[0]
OUTDIR = argv[1]
N_FRAMES = int(argv[2]) if len(argv) > 2 else 150

RES_X, RES_Y = 1600, 900
LENS = 62.0
SENSOR = 36.0                      # Blender's default horizontal fit

# ------------------------------------------------------------ clean up
bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene

# -------------------------------------------------------------- source
img = bpy.data.images.load(UI_PNG)
IW, IH = img.size
ASPECT = IW / IH

FACE_W = 2.0
FACE_H = FACE_W / ASPECT
DEPTH = 0.085 * FACE_W
BEZEL = 0.018 * FACE_W


def new_material(name):
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    for n in list(nt.nodes):
        nt.nodes.remove(n)
    out = nt.nodes.new("ShaderNodeOutputMaterial")
    return m, nt, out


# ------------------------------------------------------------ the face
# size=2 -> spans -1..+1, so scaling by FACE_W/2 yields FACE_W across.
bpy.ops.mesh.primitive_plane_add(size=2)
face = bpy.context.object
face.name = "ORIENTAL_face"
face.scale = (FACE_W / 2, FACE_H / 2, 1)
bpy.ops.object.transform_apply(scale=True)
face.rotation_euler[0] = math.radians(90)
bpy.ops.object.transform_apply(rotation=True)
face.location = (0, -DEPTH / 2 - 0.001, 0)

mat, nt, out = new_material("ORIENTAL_screen")
tex = nt.nodes.new("ShaderNodeTexImage")
tex.image = img
tex.interpolation = "Cubic"
tex.extension = "CLIP"

bsdf = nt.nodes.new("ShaderNodeBsdfPrincipled")
bsdf.inputs["Roughness"].default_value = 0.34
bsdf.inputs["Metallic"].default_value = 0.15

emis = nt.nodes.new("ShaderNodeEmission")
add = nt.nodes.new("ShaderNodeAddShader")
transp = nt.nodes.new("ShaderNodeBsdfTransparent")
mix = nt.nodes.new("ShaderNodeMixShader")

nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
nt.links.new(tex.outputs["Color"], emis.inputs["Color"])
nt.links.new(bsdf.outputs["BSDF"], add.inputs[0])
nt.links.new(emis.outputs["Emission"], add.inputs[1])
nt.links.new(tex.outputs["Alpha"], mix.inputs["Fac"])
nt.links.new(transp.outputs["BSDF"], mix.inputs[1])
nt.links.new(add.outputs["Shader"], mix.inputs[2])
nt.links.new(mix.outputs["Shader"], out.inputs["Surface"])
if hasattr(mat, "blend_method"):
    mat.blend_method = "BLEND"
face.data.materials.append(mat)

EMIS = emis.inputs["Strength"]

# --------------------------------------------------------- the chassis
bpy.ops.mesh.primitive_cube_add(size=2)
body = bpy.context.object
body.name = "ORIENTAL_body"
body.scale = (FACE_W / 2 + BEZEL, DEPTH / 2, FACE_H / 2 + BEZEL)
bpy.ops.object.transform_apply(scale=True)
bpy.ops.object.shade_smooth()

bmat, bnt, bout = new_material("ORIENTAL_chassis")
bb = bnt.nodes.new("ShaderNodeBsdfPrincipled")
bb.inputs["Base Color"].default_value = (0.035, 0.030, 0.026, 1)
bb.inputs["Roughness"].default_value = 0.28
bb.inputs["Metallic"].default_value = 0.85
bnt.links.new(bb.outputs["BSDF"], bout.inputs["Surface"])
body.data.materials.append(bmat)

bev = body.modifiers.new("Bevel", "BEVEL")
bev.width = 0.012 * FACE_W
bev.segments = 3

# ------------------------------------------------------------- the rig
# Hinge on the real bottom edge. With the size bug gone this now lands
# exactly on the geometry instead of half a panel below it.
pivot = bpy.data.objects.new("ORIENTAL_pivot", None)
scene.collection.objects.link(pivot)
pivot.location = (0, 0, -FACE_H / 2)

# Written out rather than read back from pivot.matrix_world: the pivot
# was linked a moment ago and the depsgraph has not evaluated it yet, so
# matrix_world is still the identity. Inverting that gives a no-op
# parent inverse, and every child silently drops by FACE_H/2 — which is
# what pushed the unit through the bottom of the frame in pass 1.
inv = Matrix.Translation((0, 0, FACE_H / 2))
for ob in (face, body):
    ob.parent = pivot
    ob.matrix_parent_inverse = inv

# ------------------------------------------------------------- camera
# Distance is solved from the lens so the standing panel fills a known
# fraction of the frame, rather than being dialled in by eye.
FILL = 0.79                                   # of frame height
sensor_v = SENSOR * RES_Y / RES_X
view_h = FACE_H / FILL
DIST = view_h * LENS / sensor_v
ELEV = math.radians(9.0)                      # a shade above the panel

cam_data = bpy.data.cameras.new("cam")
cam_data.lens = LENS
cam = bpy.data.objects.new("cam", cam_data)
scene.collection.objects.link(cam)
scene.camera = cam
cam.location = (0, -DIST * math.cos(ELEV), DIST * math.sin(ELEV))
cam.rotation_euler = (math.radians(90) - ELEV, 0, 0)
print(f"[oriental] face {FACE_W:.3f}x{FACE_H:.3f}  cam dist {DIST:.3f}")

# ------------------------------------------------------------- lights
def add_light(name, kind, loc, energy, size=3.0, color=(1, 1, 1)):
    d = bpy.data.lights.new(name, kind)
    d.energy = energy
    d.color = color
    if kind == "AREA":
        d.size = size
    o = bpy.data.objects.new(name, d)
    o.location = loc
    scene.collection.objects.link(o)
    return o


key = add_light("key", "AREA", (-2.6, -3.2, 3.4), 900, size=4.0,
                color=(1.0, 0.93, 0.82))
key.rotation_euler = (math.radians(40), 0, math.radians(-34))

rim = add_light("rim", "AREA", (3.1, 1.9, 1.5), 700, size=3.0,
                color=(1.0, 0.71, 0.30))
rim.rotation_euler = (math.radians(78), 0, math.radians(126))

fill = add_light("fill", "AREA", (1.4, -3.0, -1.9), 220, size=5.0,
                 color=(0.55, 0.68, 0.85))
fill.rotation_euler = (math.radians(120), 0, math.radians(24))

# ------------------------------------------------------------ the move
LIE = math.radians(-70)
STAND = 0.0

RISE_END = int(N_FRAMES * 0.62)
LIT_START = int(N_FRAMES * 0.42)
LIT_PEAK = int(N_FRAMES * 0.60)
LIT_SETTLE = int(N_FRAMES * 0.68)

pivot.rotation_euler = (LIE, 0, 0)
pivot.keyframe_insert("rotation_euler", frame=1)
pivot.rotation_euler = (STAND, 0, 0)
pivot.keyframe_insert("rotation_euler", frame=RISE_END)
pivot.rotation_euler = (math.radians(2.4), 0, 0)
pivot.keyframe_insert("rotation_euler", frame=int(N_FRAMES * 0.74))
pivot.rotation_euler = (STAND, 0, 0)
pivot.keyframe_insert("rotation_euler", frame=N_FRAMES)

# Rises into frame as it stands. Smaller than pass 1's 0.42: with the
# framing fixed, a big drop pushes the opening frames out of shot.
pivot.location = (0, 0, -FACE_H / 2 - 0.22)
pivot.keyframe_insert("location", frame=1)
pivot.location = (0, 0, -FACE_H / 2)
pivot.keyframe_insert("location", frame=RISE_END)
pivot.keyframe_insert("location", frame=N_FRAMES)

# Blender 5.x moved keyframes into layered actions; fcurves may be absent.
if pivot.animation_data and getattr(pivot.animation_data, "action", None):
    action = pivot.animation_data.action
    if hasattr(action, "fcurves"):
        for fc in action.fcurves:
            for kp in fc.keyframe_points:
                kp.interpolation = "BEZIER"
                kp.easing = "EASE_OUT"

EMIS.default_value = 0.0
EMIS.keyframe_insert("default_value", frame=1)
EMIS.keyframe_insert("default_value", frame=LIT_START)
EMIS.default_value = 1.85
EMIS.keyframe_insert("default_value", frame=LIT_PEAK)
EMIS.default_value = 1.0
EMIS.keyframe_insert("default_value", frame=LIT_SETTLE)
EMIS.keyframe_insert("default_value", frame=N_FRAMES)

# ------------------------------------------------------------- render
engines = [e.identifier for e in
           bpy.types.RenderSettings.bl_rna.properties["engine"].enum_items]
for want in ("BLENDER_EEVEE_NEXT", "BLENDER_EEVEE", "BLENDER_WORKBENCH"):
    if want in engines:
        scene.render.engine = want
        break
print("[oriental] engine:", scene.render.engine)

ee = getattr(scene, "eevee", None)
if ee:
    if hasattr(ee, "taa_render_samples"):
        ee.taa_render_samples = 64
    if hasattr(ee, "use_bloom"):
        ee.use_bloom = True

scene.render.resolution_x = RES_X
scene.render.resolution_y = RES_Y
scene.render.resolution_percentage = 100
scene.render.film_transparent = True
scene.view_settings.view_transform = "Filmic" if "Filmic" in [
    v.name for v in scene.view_settings.bl_rna.properties["view_transform"].enum_items
] else "Standard"

scene.render.image_settings.file_format = "WEBP"
scene.render.image_settings.color_mode = "RGBA"
scene.render.image_settings.quality = 88

scene.frame_start = 1
scene.frame_end = N_FRAMES
os.makedirs(OUTDIR, exist_ok=True)
scene.render.filepath = os.path.join(OUTDIR, "rise-")

print(f"[oriental] rendering {N_FRAMES} frames at {RES_X}x{RES_Y} -> {OUTDIR}")
bpy.ops.render.render(animation=True)
print("[oriental] done")
