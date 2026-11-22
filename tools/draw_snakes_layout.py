"""Draws tools/snakes_layout.png: the layout that the image model paints tools/snakes_painting.png from (see
draw_snakes.py). It is a rough 3D render on a black background, so that what the model paints is coherent:

* a stone column on a stepped base, and the snake as ONE tube that winds round it in a regular helix: it crosses the
  front slanting down to the right, goes round the right edge, behind the shaft (where only what sticks out at the
  sides shows) and comes back round the left edge. Its tail leaves the last turn, hangs down in front of the base and
  lies on the floor. At the top the neck rises along the left edge and the head faces the arena, above a skull;
* the same top of the column in three poses of the head (calm, mouth half open with the tongue out, mouth wide open
  with fangs), one under the other, to the right of the column: the head of a plain snake, as wide as its neck;
* a big skull, from which the skulls of the life indicators are cut.

Everything is placed where draw_snakes.py expects it (COLUMN_X, RIM_Y, SHEET_X, SHEET_Y, SKULL_AREA). Run from the
repository root: python tools/draw_snakes_layout.py   (needs Pillow and NumPy; the output is deterministic)
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

OUT = Path(__file__).resolve().parent / 'snakes_layout.png'

W, H, SS = 1024, 1536, 2                        # the sheet, and how much finer it is drawn than it is saved
CX, SHAFT = 162.5, 80.5                         # the axis of the column and the radius of its shaft
TOP, BASE = 405, 1100                           # the rows of the top of the shaft and of its foot
TUBE = 27                                       # the radius of the snake's body
HELIX = SHAFT + TUBE                            # the radius of the helix its centre follows
PITCH, START = 160, 462                         # the height of a turn, and the row where the first one begins
LIGHT = np.array([0.55, -0.5, 0.67]) / np.linalg.norm([0.55, -0.5, 0.67])   # from the right, above, in front
SNAKE, STONE, BONE = (118, 98, 196), (112, 84, 62), (226, 208, 172)

# the poses of the head: tilt (degrees, positive = down), how far the mouth is open (degrees), the position of the end
# of the neck and how much it arches over the skull (0..1), whether the fangs and the tongue show, and how far the tongue
# reaches. The open mouth turns towards the fighter (down and to the right), as in a strike.
POSES = [
    dict(tilt=-4, jaw=0, neck=(122, 285), arch=0.0, fangs=False, tongue=0),
    dict(tilt=12, jaw=22, neck=(176, 270), arch=0.6, fangs=False, tongue=58),
    dict(tilt=26, jaw=44, neck=(214, 262), arch=1.0, fangs=True, tongue=70),
]
PANEL_DX, PANEL_DY, PANEL_BOTTOM = 295, (0, 322, 640), 447


class Sheet:
    """Colours and depths at SS times the size of the sheet; what is nearer to the viewer (larger z) is on top."""

    def __init__(self):
        self.z = np.full((H * SS, W * SS), -1e9, np.float32)
        self.rgb = np.zeros((H * SS, W * SS, 3), np.float32)

    def paint(self, window, z, rgb, inside):
        y0, y1, x0, x1 = window
        better = inside & (z > self.z[y0:y1, x0:x1])
        self.z[y0:y1, x0:x1][better] = z[better]
        self.rgb[y0:y1, x0:x1][better] = rgb[better]

    def sphere(self, cx, cy, cz, r, base):
        x0, x1 = max(int((cx - r) * SS), 0), min(int((cx + r) * SS) + 1, W * SS)
        y0, y1 = max(int((cy - r) * SS), 0), min(int((cy + r) * SS) + 1, H * SS)
        yy, xx = np.mgrid[y0:y1, x0:x1]
        dx, dy = (xx + 0.5) / SS - cx, (yy + 0.5) / SS - cy
        d2 = dx * dx + dy * dy
        nz = np.sqrt(np.maximum(r * r - d2, 0))
        lam = np.clip((dx * LIGHT[0] + dy * LIGHT[1] + nz * LIGHT[2]) / r, 0, 1)
        self.paint((y0, y1, x0, x1), cz + nz, shade(base, lam), d2 <= r * r)

    def tube(self, points, r, base=SNAKE):
        """A tube along the 3D `points`, as a string of spheres: `r` is its radius, or the radii from its start to its end."""
        points = np.asarray(points, float)
        radius = np.interp(np.linspace(0, 1, len(points)), np.linspace(0, 1, np.size(r)), np.ravel(r)) if np.size(r) > 1 else np.full(len(points), r)
        for p, rr in zip(points, radius):
            self.sphere(p[0], p[1], p[2], rr, base)

    def shape(self, mask, z, base, bulge=9.0, spec=True):
        """A flat shape (a mask at SS) drawn as if puffed up: lit by the slope of its blurred outline."""
        ys, xs = np.where(mask > 0.5)
        if not len(ys):
            return
        pad = int(bulge * SS * 4) + 2
        y0, y1 = max(ys.min() - pad, 0), min(ys.max() + pad + 1, H * SS)
        x0, x1 = max(xs.min() - pad, 0), min(xs.max() + pad + 1, W * SS)
        part = mask[y0:y1, x0:x1]
        blurred = Image.fromarray((part * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(bulge * SS))
        gy, gx = np.gradient(np.asarray(blurred, np.float32) / 255 * bulge * SS * 0.8)
        n = np.dstack([-gx, -gy, np.ones_like(gx)])
        n /= np.linalg.norm(n, axis=2, keepdims=True)
        lam = np.clip(n @ LIGHT, 0, 1)
        self.paint((y0, y1, x0, x1), np.full(part.shape, z, np.float32), shade(base, lam, spec), part > 0.5)


def shade(base, lam, spec=True):
    base = np.asarray(base, np.float32)
    rgb = base * (0.26 + 0.9 * lam[..., None])
    if spec:
        rgb = rgb + 70 * (lam ** 14)[..., None]
    return np.clip(rgb, 0, 255)


def polygon_mask(polygons, ellipses=()):
    image = Image.new('L', (W * SS, H * SS), 0)
    draw = ImageDraw.Draw(image)
    for p in polygons:
        draw.polygon([(float(x) * SS, float(y) * SS) for x, y in p], fill=255)
    for cx, cy, rx, ry in ellipses:
        draw.ellipse([(cx - rx) * SS, (cy - ry) * SS, (cx + rx) * SS, (cy + ry) * SS], fill=255)
    return np.asarray(image, np.float32) / 255


def smooth(points, rounds=3):
    p = np.asarray(points, float)
    for _ in range(rounds):
        q = np.roll(p, -1, axis=0)
        p = np.stack([0.75 * p + 0.25 * q, 0.25 * p + 0.75 * q], axis=1).reshape(-1, 2)
    return p


def bezier(p, count):
    p = np.asarray(p, float)
    t = np.linspace(0, 1, count)[:, None]
    return (1 - t) ** 3 * p[0] + 3 * (1 - t) ** 2 * t * p[1] + 3 * (1 - t) * t ** 2 * p[2] + t ** 3 * p[3]


def spline(points, count):
    """A smooth curve through the 3D `points` (Catmull-Rom), `count` samples in all."""
    p = np.asarray(points, float)
    p = np.vstack([2 * p[0] - p[1], p, 2 * p[-1] - p[-2]])
    per = max(count // (len(p) - 3), 2)
    out = []
    for i in range(1, len(p) - 2):
        for u in np.linspace(0, 1, per, endpoint=False):
            out.append(0.5 * (2 * p[i] + (-p[i - 1] + p[i + 1]) * u + (2 * p[i - 1] - 5 * p[i] + 4 * p[i + 1] - p[i + 2]) * u ** 2
                              + (-p[i - 1] + 3 * p[i] - 3 * p[i + 1] + p[i + 2]) * u ** 3))
    out.append(p[-2])
    return np.asarray(out)


# ---------------------------------------------------------------------------------------------------- the column
def draw_column(sheet, with_base=True, bottom=None):
    """The shaft with its drums, the cap on top of it and, below, the stepped base."""
    last = BASE if bottom is None else bottom
    xs = np.arange(int((CX - SHAFT) * SS), int((CX + SHAFT) * SS))
    dx = ((xs + 0.5) / SS - CX) / SHAFT
    nz = np.sqrt(np.maximum(1 - dx ** 2, 0))
    lam = np.clip(dx * LIGHT[0] + nz * LIGHT[2], 0, 1)
    column = shade(STONE, lam, False)
    for y in range(TOP * SS, last * SS):
        seam = (y / SS - TOP) % 174 < 3 and y / SS > TOP + 20
        sheet.paint((y, y + 1, xs[0], xs[-1] + 1), (nz * SHAFT)[None, :], (column * (0.45 if seam else 1))[None, :, :], np.ones((1, len(xs)), bool))
    # the cap on top of the shaft: a little wider, rounded
    cap = np.arange(int((CX - 90) * SS), int((CX + 90) * SS))
    cdx = ((cap + 0.5) / SS - CX) / 90
    cnz = np.sqrt(np.maximum(1 - cdx ** 2, 0))
    ccol = shade((126, 96, 70), np.clip(cdx * LIGHT[0] + cnz * LIGHT[2], 0, 1), False)
    for y in range((TOP - 24) * SS, (TOP + 8) * SS):
        sheet.paint((y, y + 1, cap[0], cap[-1] + 1), (cnz * 90 + 1)[None, :], ccol[None, :, :], np.ones((1, len(cap)), bool))
    if not with_base:
        return
    steps = [(BASE, BASE + 24, 88, (130, 98, 70), True), (BASE + 24, BASE + 76, 94, (116, 88, 64), False),
             (BASE + 76, BASE + 124, 112, (98, 74, 56), False)]
    for top, bottom_, half, colour, round_ in steps:
        x = np.arange(int((CX - half) * SS), int((CX + half) * SS))
        u = ((x + 0.5) / SS - CX) / half
        nzz = np.sqrt(np.maximum(1 - u ** 2, 0)) if round_ else np.full(len(u), 0.9)
        col = shade(colour, np.clip(u * 0.5 * LIGHT[0] * 2 + nzz * LIGHT[2] * 0.9, 0, 1), False)
        for y in range(top * SS, bottom_ * SS):
            edge = 1.35 if y < (top + 3) * SS else 1.0
            sheet.paint((y, y + 1, x[0], x[-1] + 1), (nzz * half + 1)[None, :], np.clip(col * edge, 0, 255)[None, :, :], np.ones((1, len(x)), bool))


def skull_image(width, height):
    """A front view skull, lit from the right, as RGBA at SS times `width` x `height`."""
    w, h = width * SS, height * SS
    image = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(image)
    d.ellipse([w * 0.02, h * 0.0, w * 0.98, h * 0.78], fill=255)
    d.polygon([(w * 0.22, h * 0.6), (w * 0.78, h * 0.6), (w * 0.74, h * 0.9), (w * 0.64, h), (w * 0.36, h), (w * 0.26, h * 0.9)], fill=255)
    bone = np.asarray(image, np.float32) / 255
    holes = Image.new('L', (w, h), 0)
    d = ImageDraw.Draw(holes)
    d.ellipse([w * 0.14, h * 0.34, w * 0.44, h * 0.64], fill=255)
    d.ellipse([w * 0.56, h * 0.34, w * 0.86, h * 0.64], fill=255)
    d.polygon([(w * 0.5, h * 0.6), (w * 0.43, h * 0.78), (w * 0.57, h * 0.78)], fill=255)
    for k in range(4):
        x = w * (0.40 + 0.067 * k)
        d.rectangle([x - w * 0.008, h * 0.88, x + w * 0.008, h], fill=255)
    holes = np.asarray(holes, np.float32) / 255
    blur = np.asarray(Image.fromarray((bone * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(h * 0.09)), np.float32) / 255
    gy, gx = np.gradient(blur * h * 0.5)
    n = np.dstack([-gx, -gy, np.ones_like(gx)])
    n /= np.linalg.norm(n, axis=2, keepdims=True)
    lam = np.clip(n @ LIGHT, 0, 1)
    rgb = shade(BONE, lam, False) * (1 - 0.8 * holes[..., None]) + 0
    return np.dstack([rgb, bone * 255]).astype(np.float32)


def draw_skull(sheet, x, y, width, height, z):
    """The skull from `skull_image` with its top left corner at (x, y), put where it is nearer than z."""
    sk = skull_image(width, height)
    y0, x0 = int(y * SS), int(x * SS)
    window = (y0, y0 + sk.shape[0], x0, x0 + sk.shape[1])
    sheet.paint(window, np.full(sk.shape[:2], z, np.float32), sk[..., :3], sk[..., 3] > 127)


# ---------------------------------------------------------------------------------------------------- the snake
def helix_points(turns=4, exit_angle=np.pi / 2 + 0.65):
    """The centre of the body from the left edge of the column at its top (the neck is joined there) down to where the last
    turn has gone round the right edge and behind the column: 3D points (x, y, z), z towards the viewer."""
    last = -np.pi / 2 + 2 * np.pi * (turns - 1) + np.pi / 2 + exit_angle
    phi = np.linspace(-np.pi / 2 - 0.25, last, int((last + np.pi / 2) * HELIX / 3))
    k = PITCH / (2 * np.pi)
    return np.stack([CX + HELIX * np.sin(phi), START + k * (phi + np.pi / 2), HELIX * np.cos(phi)], axis=1)


def neck_points(pose, count=110):
    """From the head down the left edge of the column to where the helix starts, as 3D points. The more the pose arches, the
    further the neck rises before it bends over towards the head."""
    nx, ny = pose['neck']
    a = pose['arch']
    top = bezier([(CX - HELIX, START), (CX - HELIX, START - 130 - 40 * a), (CX - HELIX + 14 + a * (nx - 123), ny + 70 - a * 100), (nx, ny)], count)
    return np.column_stack([top, np.zeros(count)])


def tail_points(end):
    """The tail: the body goes on behind the column from `end` (where the last turn has gone behind it), comes out from
    behind the right edge of the column, lower than that turn, hangs down in front of the base and lies on the floor to the
    right, tapering to a thin tip. The part behind the shaft is hidden; only the end of it shows beside the shaft."""
    x0, y0, z0 = end
    right = CX + HELIX
    path = [(x0, y0, z0), (CX + 48, y0 + 34, -HELIX * 0.85), (CX + 84, y0 + 62, -HELIX * 0.55), (right + 8, y0 + 92, -30),
            (right + 36, y0 + 124, -6), (right + 46, 1170, 50), (right + 50, 1215, 132), (right + 76, 1252, 140),
            (right + 140, 1264, 140), (right + 205, 1250, 140), (right + 270, 1258, 140), (right + 330, 1248, 140)]
    return spline(path, 340)


def draw_head(sheet, pose, dx=0, dy=0):
    """The head of a plain snake: a rounded wedge as wide as the neck, with the eye, the nostril and the mouth. The lower
    jaw swings open about its hinge; the fangs and the tongue show as the pose says."""
    nx, ny = pose['neck']
    tilt = np.radians(pose['tilt'])
    c, s = np.cos(tilt), np.sin(tilt)

    def place(points, jaw=0.0):
        out = []
        for x, y in points:
            if jaw:
                a = np.radians(jaw)
                x, y = 20 + (x - 20) * np.cos(a) - (y - 6) * np.sin(a), 6 + (x - 20) * np.sin(a) + (y - 6) * np.cos(a)
            out.append((nx + dx + x * c - y * s, ny + dy + x * s + y * c))
        return out

    upper = smooth([(-12, -30), (22, -37), (66, -36), (108, -29), (140, -17), (158, -5), (158, 5), (120, 6), (60, 6), (20, 7), (-12, 12)], 3)
    lower = smooth([(150, 6), (118, 17), (66, 30), (14, 32), (-12, 28), (-12, 8), (20, 7), (66, 8), (122, 8)], 3)
    jaw = pose['jaw']
    if jaw:
        mouth = polygon_mask([place([(20, 6), (154, 4), (146, 24), (60, 33), (20, 22)], jaw * 0.5)])
        sheet.shape(mouth, 290, (120, 14, 30), 4, False)
    sheet.shape(polygon_mask([place(lower, jaw)]), 296, tuple(int(v * 0.86) for v in SNAKE))
    if pose['tongue']:
        root = place([(150, 5)], jaw * 0.6)[0]
        tip = (root[0] + pose['tongue'] * (c * 0.95), root[1] + pose['tongue'] * (s * 0.95 + 0.12))
        mid = (root[0] + (tip[0] - root[0]) * 0.8, root[1] + (tip[1] - root[1]) * 0.8)
        image = Image.new('L', (W * SS, H * SS), 0)
        d = ImageDraw.Draw(image)
        for a, b in ([root, mid], [mid, (tip[0], tip[1] - 9)], [mid, (tip[0], tip[1] + 9)]):
            d.line([(a[0] * SS, a[1] * SS), (b[0] * SS, b[1] * SS)], fill=255, width=int(5 * SS))
        sheet.shape(np.asarray(image, np.float32) / 255, 300, (186, 30, 44), 2, False)
    sheet.shape(polygon_mask([place(upper)]), 310, SNAKE)
    if pose['fangs']:
        for x in (118, 98):
            sheet.shape(polygon_mask([place([(x - 5, 5), (x + 5, 5), (x + 3, 36)])]), 320, (240, 236, 222), 1.5, False)
    ex, ey = place([(88, -14)])[0]
    sheet.shape(polygon_mask([], [(ex, ey, 8.5, 8.5)]), 330, (232, 170, 30), 2, False)
    sheet.shape(polygon_mask([[(ex - 1.8, ey - 7), (ex + 1.8, ey - 7), (ex + 1.8, ey + 7), (ex - 1.8, ey + 7)]]), 332, (10, 6, 6), 0.8, False)
    nxp, nyp = place([(143, -6)])[0]
    sheet.shape(polygon_mask([], [(nxp, nyp, 2.6, 2.0)]), 330, (30, 16, 40), 1, False)


def add_top(sheet, pose, with_base):
    """The top of the column with its skull, and the neck and the head in `pose`."""
    draw_column(sheet, with_base=with_base, bottom=None if with_base else PANEL_BOTTOM)
    draw_skull(sheet, CX - 48, TOP - 66, 98, 80, 250)
    sheet.tube(neck_points(pose), TUBE)
    draw_head(sheet, pose)


def main():
    sheet = Sheet()
    # the column with the snake: the neck, the body winding round the shaft, and the tail
    add_top(sheet, POSES[0], True)
    helix = helix_points()
    sheet.tube(helix, TUBE)
    sheet.tube(tail_points(helix[-1]), [TUBE, TUBE, TUBE, TUBE, TUBE * 0.9, TUBE * 0.7, TUBE * 0.45, TUBE * 0.2, 2])
    # the three poses, to the right, each with the top of the column down to PANEL_BOTTOM
    for pose, dy in zip(POSES, PANEL_DY):
        panel = Sheet()
        add_top(panel, pose, False)
        rows = slice(0, (PANEL_BOTTOM + 2) * SS)
        mask = panel.z[rows, :W * SS - PANEL_DX * SS] > -1e8
        target = sheet.rgb[dy * SS + rows.start:dy * SS + rows.stop, PANEL_DX * SS:]
        target[mask] = panel.rgb[rows, :W * SS - PANEL_DX * SS][mask]
    draw_skull(sheet, 658, 154, 208, 192, 0)
    Image.fromarray(np.clip(sheet.rgb, 0, 255).astype(np.uint8)).resize((W, H), Image.LANCZOS).save(OUT, optimize=True)


if __name__ == '__main__':
    main()
