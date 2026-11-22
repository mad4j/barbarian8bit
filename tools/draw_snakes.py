"""Puts the painted snake pillars and life skulls of the throne room onto the game grid.

The C64 picture has, at both sides of the arena, a pillar with a snake coiled round it and a skull on its top, a
snake head that the game draws again in three poses when the fighter next to it is hurt, and, at the top corners, the
life of each fighter as 6 brown blobs. They are painted here in the style of the painted throne room:
tools/snakes_painting.png is an oil painting made with an image model, in the style of tools/throne_painting.jpg, from
a layout reference (tools/snakes_layout.png: the pillar with its base and the snake coiled round it, the three head
poses as they sit on the game grid, and a big skull) on a black background. It holds the column on a stepped base, with
the violet snake (the colour of player A's) wrapped round it in a spiral, its last coil crossing the front and its tail
falling in front of the shaft and the base and lying on the floor, the head in the two poses of a hurt snake, and the
skull. The column is capped by a capital made of skulls only. This script maps it onto the game:

* the column goes into throne.png at both sides (`paint_pillars`): player B's is player A's mirrored and recoloured
  green, as in the C64 picture. The base and the tail on the floor reach into the room, so the column is laid over the
  room picture where the painting is not black, with a soft shadow on the floor;
* the three poses of the head (`snake_head`) are what the game draws at row 16 of each side: pose 0 is the calm head
  of the picture, the other two are painted over it and fade into it below the skull, so the picture stays seamless;
* the blobs become skulls (`paint_life_skulls`).

draw_throne.py calls these for every resolution; they are reduced from the painting with the best filter. To paint
the column again, make a new painting from the layout and measure the marks below on it. Needs Pillow and NumPy.
"""
from functools import lru_cache
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
PAINTING = ROOT / 'tools/snakes_painting.png'

MASTER = 6                   # pixels per game pixel of the column that is kept here, before it is reduced further
PX_X, PX_Y = 7.05, 7.49      # pixels of the painting per game pixel, across and down: the model paints the column a little
                             # taller than the layout, and these give back the proportions of the layout (see below)
FLOOR = 200
HEAD_TOP, HEAD_ROWS, HEAD_WIDTH = 16, 64, 62   # where the game draws the head poses, and their size: they end at row 80, a
                                               # little below where the column that the fighters walk behind starts (OVERLAY_TOP)
SPAN = 98                    # game pixels covered by the column, from the edge of the screen: the tail reaches there
CLEAR = 34                   # the C64 picture has its pillar up to this column
PILLAR_TOP = 60              # the game row of the top of the column (RIM_Y), the top of its skulls
SHADOW_FROM = 172            # the game row where the floor starts: the base and the tail cast a shadow on it
FLOOR_VISIBLE = SHADOW_FROM  # the floor goes on to the edge of the screen, under and beside the base (the room's floor, mirrored)
# the fighters walk behind the column: what covers them is cut out of the picture, from the top of what a fighter of the
# throne stage covers (viewTop of its `view`) to its floor, and as wide as the column with its coils and base. The tail
# lies on the floor below that, where nobody walks.
OVERLAY_TOP, OVERLAY_ROWS, OVERLAY_WIDTH = 70, 120, 46

# marks on the painting (pixels): game column 0 (the left of the coils), the top of the column (the top of its skulls) and
# its foot, the column and the rows of the poses' sheet (it holds only the poses to the right of that column and above that
# row), where the first guess of the two other head poses is, and the big skull. The top is at row 60 of the game and the
# foot at about 196, which with the width of the shaft gives PX_X and PX_Y.
COLUMN_X = 24
RIM_Y = 307
SHEET_X, SHEET_Y = 328, 1170
POSE_GUESS = {1: (310, 342), 2: (310, 690)}
# the first row of the painting that belongs to each of these poses (above it the sheet holds the picture before)
POSE_START = {1: 500, 2: 850}
SKULL_AREA = (665, 130, 900, 370)
# the part of the column that the head poses are lined up on: the skulls, rows and columns
MATCH = (300, 460, 60, 290)
# The skulls of the column never move: in every pose they are the ones of the calm pose, and only what is snake (violet,
# or the red of the mouth and the tongue) is taken from the pose. The box that holds them, in game pixels (left, right,
# top; it goes down to the bottom of the poses' pictures):
STILL_BOX = (6.5, 37.5, 59.0)
# game rows where the painted pose fades into the picture: below the skulls' jaws, above the bottom of the pose's picture
FADE = (PILLAR_TOP + 15.0, PILLAR_TOP + 18.0)
# the key that turns the black of the painting into transparency: brightness below LOW is clear, above HIGH solid
KEY = (8, 30)


def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / (hi - lo), 0, 1)
    return t * t * (3 - 2 * t)


@lru_cache(maxsize=None)
def painting():
    return np.asarray(Image.open(PAINTING).convert('RGB'), np.float32)


def resized(rgb, size):
    """The float array `rgb` (rows x columns, 1 or 3 channels) as one of (width, height) pixels, with a Lanczos filter."""
    channels = [rgb] if rgb.ndim == 2 else [rgb[..., i] for i in range(rgb.shape[2])]
    done = [np.asarray(Image.fromarray(np.clip(np.rint(c), 0, 255).astype(np.uint8)).resize(size, Image.LANCZOS), np.float32)
            for c in channels]
    return done[0] if rgb.ndim == 2 else np.stack(done, axis=-1)


def window(x, y, width, height):
    """The painting from pixel (x, y), `width` x `height` game pixels, as an RGB float array at MASTER."""
    p = painting()
    x0, y0 = int(round(x)), int(round(y))
    w, h = int(round(width * PX_X)), int(round(height * PX_Y))
    crop = np.zeros((h, w, 3), np.float32)                  # what is outside the painting is black
    sy, sx = max(y0, 0), max(x0, 0)
    part = p[sy:y0 + h, sx:x0 + w]
    crop[sy - y0:sy - y0 + part.shape[0], sx - x0:sx - x0 + part.shape[1]] = part
    return resized(crop, (int(width * MASTER), int(height * MASTER)))


def opaque(rgb):
    """The alpha of a picture on black: where it is bright, plus the dark holes that are inside it (the black that can not
    be reached from the border of the picture, going through black only)."""
    bright = rgb.max(axis=2)
    alpha = smoothstep(*KEY, bright)
    solid = np.pad(np.where(bright > KEY[0] * 1.5, 255, 0).astype(np.uint8), 1)   # with a black border all round
    image = Image.fromarray(solid).copy()                                         # a copy: floodfill needs it
    ImageDraw.floodfill(image, (0, 0), 128)
    inside = np.asarray(image)[1:-1, 1:-1] == 0
    return np.where(inside, 1.0, alpha).astype(np.float32)


@lru_cache(maxsize=None)
def column():
    """The painted column of player A as (RGB, alpha) float arrays at MASTER: rows HEAD_TOP to FLOOR, columns 0 to SPAN of
    the picture. Where the alpha is 0 the painting is black and the picture shows through."""
    rows = FLOOR - HEAD_TOP
    top = RIM_Y - (PILLAR_TOP - HEAD_TOP) * PX_Y
    rgb = window(COLUMN_X, top, SPAN, rows)
    sheet = int((SHEET_X - COLUMN_X) / PX_X * MASTER)      # to the right of this the painting holds the other poses
    cut = int((SHEET_Y - top) / PX_Y * MASTER)
    rgb[:cut, sheet:] = 0
    return rgb, opaque(rgb)


@lru_cache(maxsize=None)
def pose_offset(pose):
    """Where the painting of head pose 1 or 2 stands relative to the column: found by lining up the skull."""
    gray = painting().mean(axis=2)
    top, bottom, left, right = MATCH
    ref = gray[top:bottom, left:right]
    ref = ref - ref.mean()
    gx, gy = POSE_GUESS[pose]
    best = None
    for dy in range(-30, 31):
        for dx in range(-30, 31):
            part = gray[top + gy + dy:bottom + gy + dy, left + gx + dx:right + gx + dx]
            score = ((part - part.mean() - ref) ** 2).sum()
            if best is None or score < best[0]:
                best = (score, gx + dx, gy + dy)
    return best[1:]


@lru_cache(maxsize=None)
def pose_shot(pose):
    """The painting of head pose 1 or 2 on the grid of the column, at MASTER: HEAD_ROWS x HEAD_WIDTH game pixels."""
    dx, dy = pose_offset(pose)
    top = RIM_Y + dy - (PILLAR_TOP - HEAD_TOP) * PX_Y
    shot = window(COLUMN_X + dx, top, HEAD_WIDTH, HEAD_ROWS)
    shot[:max(0, int((POSE_START[pose] - top) / PX_Y * MASTER))] = 0
    return shot


def green(rgb):
    """The violet of the snake turned green, as player B's is; the stone, the bone and the fire light are kept."""
    image = Image.fromarray(np.clip(np.rint(rgb), 0, 255).astype(np.uint8)).convert('HSV')
    h, s, v = (np.asarray(c, np.float32) for c in image.split())
    degrees = (h - 188) / 255 * 360                        # the violet is at 265 degrees (188 of 255)
    weight = (1 - smoothstep(50, 85, np.abs(degrees))) * smoothstep(12, 45, s)
    h = h + (74 + degrees * 0.4 / 360 * 255 - h) * weight    # to 105 degrees
    v = v * (1 - 0.08 * weight)
    merged = Image.merge('HSV', [Image.fromarray(np.clip(np.rint(c), 0, 255).astype(np.uint8)) for c in (h, s, v)])
    return np.asarray(merged.convert('RGB'), np.float32)


def side_of(rgb, side):
    """A's RGB picture as it is for 'left', B's (mirrored and green) for 'right'."""
    return rgb if side == 'left' else green(rgb[:, ::-1])


def shifted(a, dy, dx):
    """The 2D array `a` moved down by `dy` and right by `dx` pixels (either may be negative); what moves out is lost."""
    out = np.zeros_like(a)
    h, w = a.shape
    out[max(dy, 0):h + min(dy, 0), max(dx, 0):w + min(dx, 0)] = a[max(-dy, 0):h - max(dy, 0), max(-dx, 0):w - max(dx, 0)]
    return out


@lru_cache(maxsize=None)
def side_column(side, s):
    """The column of player A ('left') or B ('right') as (RGB, alpha) at `s` pixels per game pixel, in the columns of the
    screen it covers: from 0 for A, up to 320 for B."""
    rgb, alpha = column()
    size = (SPAN * s, (FLOOR - HEAD_TOP) * s)
    alpha = alpha if side == 'left' else alpha[:, ::-1]
    alpha = np.clip(resized(alpha * 255, size) / 255, 0, 1)
    return resized(side_of(rgb, side), size), np.where(alpha < 0.03, 0, alpha)


def clear_pillars(out, s):
    """Takes the C64 pillars out of the RGB picture `out` (float, 200 x 320 game pixels at `s`): the margins beside the
    room go black, and the floor goes on to the edge of the screen (the room's floor, mirrored)."""
    for side in ('left', 'right'):
        clear = slice(0, CLEAR * s) if side == 'left' else slice((320 - CLEAR) * s, 320 * s)
        out[HEAD_TOP * s:, clear] = 0
        mirrored = slice(CLEAR * s, 2 * CLEAR * s) if side == 'left' else slice((320 - 2 * CLEAR) * s, (320 - CLEAR) * s)
        out[FLOOR_VISIBLE * s:, clear] = out[FLOOR_VISIBLE * s:, mirrored][:, ::-1]


def paint_pillars(out, s):
    """Paints both columns over the RGB picture `out` (float, 200 x 320 game pixels at `s`) that `clear_pillars` has
    cleared, with the shadow that the base and the tail cast on the floor."""
    for side, x0 in (('left', 0), ('right', 320 - SPAN)):
        rgb, alpha = side_column(side, s)
        area = out[HEAD_TOP * s:FLOOR * s, x0 * s:(x0 + SPAN) * s]
        floor = alpha.copy()
        floor[:(SHADOW_FROM - HEAD_TOP) * s] = 0
        moved = shifted(floor, int(round(1.6 * s)), int(round(1.5 * s)) * (-1 if side == 'left' else 1))
        blurred = Image.fromarray(np.rint(moved * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.4 * s))
        shadow = np.asarray(blurred, np.float32) / 255
        area *= (1 - 0.6 * shadow * (1 - alpha))[..., None]
        area += (rgb - area) * alpha[..., None]


def column_overlay(picture, side, s):
    """The part of the column that the fighters walk behind, of player A's side ('left') or B's ('right'), as an RGBA
    array of OVERLAY_ROWS x OVERLAY_WIDTH game pixels at `s`, cut out of the finished throne picture `picture` (uint8,
    200 x 320 game pixels at `s`). The game draws it over the fighters (STAGES.throne in js/game/stage.js): where
    nothing stands behind it, it is the picture itself, so it can not be seen."""
    _, alpha = side_column(side, s)
    rows = slice((OVERLAY_TOP - HEAD_TOP) * s, (OVERLAY_TOP + OVERLAY_ROWS - HEAD_TOP) * s)
    if side == 'left':
        columns, shown = slice(0, OVERLAY_WIDTH * s), slice(0, OVERLAY_WIDTH * s)
    else:
        columns, shown = slice((SPAN - OVERLAY_WIDTH) * s, SPAN * s), slice((320 - OVERLAY_WIDTH) * s, 320 * s)
    colour = picture[OVERLAY_TOP * s:(OVERLAY_TOP + OVERLAY_ROWS) * s, shown]
    mask = np.rint(alpha[rows, columns] * 255).astype(np.uint8)
    return np.dstack([colour, mask])


@lru_cache(maxsize=None)
def head_layer(pose):
    """The top of the column of player A with the head in `pose` (0 to 2), as RGB (straight) and alpha arrays at MASTER:
    HEAD_ROWS x HEAD_WIDTH game pixels from the corner of the picture. Pose 0 is the column; the others are painted over
    it down to the skulls and fade into it below, so the column stays seamless."""
    rgb, alpha = column()
    rows, columns = HEAD_ROWS * MASTER, HEAD_WIDTH * MASTER
    rgb0, alpha0 = rgb[:rows, :columns], alpha[:rows, :columns]
    if not pose:
        return rgb0, alpha0
    shot = pose_shot(pose)
    shot_alpha = opaque(shot)
    game_rows = HEAD_TOP + (np.arange(rows) + 0.5) / MASTER
    game_columns = (np.arange(columns) + 0.5) / MASTER
    keep = np.repeat((1 - smoothstep(*FADE, game_rows))[:, None], columns, axis=1)
    # the skulls stay as they are in the calm pose: inside their box only the snake comes from the pose
    left, right, top = STILL_BOX
    inside = (game_columns[None, :] >= left) & (game_columns[None, :] <= right) & (game_rows[:, None] >= top)
    red, green_, blue = shot[..., 0], shot[..., 1], shot[..., 2]
    snake = ((blue > red + 6) | ((red > 130) & (green_ < 70) & (blue < 90))) & (shot_alpha > 0.5)
    snake = np.asarray(Image.fromarray((snake * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(3)), np.float32) / 255
    keep = np.where(inside, np.minimum(keep, snake), keep)
    mixed0, mixed1 = rgb0 * alpha0[..., None], shot * shot_alpha[..., None]
    mixed = mixed0 + (mixed1 - mixed0) * keep[..., None]
    alpha_mix = alpha0 + (shot_alpha - alpha0) * keep
    return mixed / np.maximum(alpha_mix, 1e-4)[..., None], alpha_mix


def snake_head(pose, side, s, backdrop):
    """The pose (0 to 2) of the head of player A (`side` 'left') or B ('right') as an RGB array of HEAD_ROWS x HEAD_WIDTH
    game pixels at `s`: what the game draws at row HEAD_TOP of its side of the arena. It is the painted head over
    `backdrop` (the RGB picture of the room at `s`, float, before the columns are painted), so the head can be as long as
    the painting makes it and pose 0 is exactly what the picture has there."""
    rgb, alpha = head_layer(pose)
    size = (HEAD_WIDTH * s, HEAD_ROWS * s)
    layer = resized(side_of(rgb, side), size)
    cover = np.clip(resized((alpha if side == 'left' else alpha[:, ::-1]) * 255, size) / 255, 0, 1)
    columns = slice(0, HEAD_WIDTH * s) if side == 'left' else slice((320 - HEAD_WIDTH) * s, 320 * s)
    behind = backdrop[HEAD_TOP * s:(HEAD_TOP + HEAD_ROWS) * s, columns]
    sprite = behind + (layer - behind) * np.where(cover < 0.03, 0, cover)[..., None]
    return np.clip(np.rint(sprite), 0, 255).astype(np.uint8)


# The 6 skulls of a fighter: 3 columns x 2 rows, each over two of the 8 x 8 text cells that the game blanks one by one
# as life is lost (hud.js), so a skull is lost in two halves: it is 6 wide and centred on the line between its cells.
SKULL_COLUMNS = {'left': (4, 20, 36), 'right': (276, 292, 308)}
SKULL_ROWS = (0, 8)
SKULL_SIZE = (6, 7)


def life_skull(s):
    """One life skull as an RGB float array of SKULL_SIZE game pixels at `s`, cut out of the painting."""
    left, top, right, bottom = SKULL_AREA
    area = painting()[top:bottom, left:right]
    ys, xs = np.where(area.mean(axis=2) > 30)
    bone = area[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    image = Image.fromarray(np.clip(np.rint(bone), 0, 255).astype(np.uint8))
    image = image.resize((SKULL_SIZE[0] * s, SKULL_SIZE[1] * s), Image.LANCZOS)
    if s < MASTER:
        image = image.filter(ImageFilter.UnsharpMask(radius=1.0, percent=60, threshold=1))
    return np.asarray(image, np.float32)


def paint_life_skulls(out, s):
    """Paints the life skulls of both fighters into the RGB picture `out` (float, 200 x 320 game pixels at `s`),
    where the C64 picture has the brown blobs."""
    skull = life_skull(s)
    for side, columns in SKULL_COLUMNS.items():
        x0 = 0 if side == 'left' else 272
        out[:16 * s, x0 * s:(x0 + 48) * s] = 0
        for x in columns:
            for y in SKULL_ROWS:
                left = (x + (8 - SKULL_SIZE[0]) // 2) * s
                out[y * s:(y + SKULL_SIZE[1]) * s, left:left + SKULL_SIZE[0] * s] = skull
