"""Builds the throne room artwork in several resolutions, in true colour. For each resolution `s` (pixels per game
pixel) it writes throne.png and throneBackground.png: s=2 in assets/HD/stage/, s=4 in assets/HD4/stage/ and s=6 in
assets/HD6/stage/. The game picks the resolution that suits the display (see js/gfx/resolution.js and "variants" in
assets/manifest.json), so every resolution is reduced here, once, from the painting with the best filter, never
stretched or shrunk at run time.

The room is a heroic-fantasy oil painting (tools/throne_painting.jpg: made with an image model from a layout
reference of the room, in the manner of 1970s sword-and-sorcery cover art, then retouched). This script maps it
onto the game grid, so the room is 252x145 game pixels (1.738:1) and the painting is scaled to its width without
stretching: the stairs end where the floor starts (game y 168), and the rows that do not fit are taken from the
stairs, which get flatter from the first step down. A bronze plate holds the "1PLR" / "2PLR" label. Kept from the
C64 picture: the logo and HUD area, the two pillars with their snakes (shared by all stages) and the snake tails
in the bottom corners.

With another painting, set PAINTING_TOP, FLATTEN_FROM and STAIRS_BASE (rows of the painting) to match it. The
best fit is a painting at 1.738:1 with the stairs ending at 74.5% of its height, as wide as the largest
resolution (252 x 6 = 1512 pixels).

throneBackground.png is the strip of the picture that the game draws again on every frame (game pixels
32,96 to 288,176), so it is cut from the picture of the same resolution. Run from the repository root:
python tools/draw_throne.py   (needs Pillow and NumPy; the output is deterministic)
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/C64/stage/throne.png'
PAINTING = ROOT / 'tools/throne_painting.jpg'

# resolution (pixels per game pixel) -> folder of assets/ that holds its pictures
FOLDERS = {2: 'HD', 4: 'HD4', 6: 'HD6'}
# unsharp mask (radius, percent) that gives back what the reduction takes away: less as the reduction gets smaller
SHARPEN = {2: (1.5, 70), 4: (1.2, 55), 6: (0.9, 35)}

# The part of the picture that is painted (game pixels); everything else is the C64 picture.
ROOM = (34, 55, 286, 200)

PAINTING_TOP = 28     # first row of the painting that is used (just above the wing tips)
FLATTEN_FROM = 430    # painting row of the first step: from here down the stairs are flattened gradually
STAIRS_BASE = 808     # painting row where the stairs end and the floor starts
FLOOR_START = 168     # game y where the floor starts in the game


def source_rows(scale, floor_row):
    """Painting row at the top of every room row, from the top of the room down to the floor.

    The painting is wider than it is tall for the room, so figures, windows and walls keep the horizontal
    scale; the few rows that do not fit are taken from the stairs, which get flatter from the first step down."""
    def room_rows(end_scale):
        ys = np.arange(PAINTING_TOP, STAIRS_BASE + 0.25, 0.5)
        k = np.where(ys < FLATTEN_FROM, scale,
                     scale + (end_scale - scale) * (ys - FLATTEN_FROM) / (STAIRS_BASE - FLATTEN_FROM))
        return ys, np.concatenate([[0], np.cumsum(0.5 / k[:-1])])

    low, high = scale, scale * 20
    for _ in range(60):
        middle = (low + high) / 2
        if room_rows(middle)[1][-1] > floor_row:
            low = middle
        else:
            high = middle
    ys, rows = room_rows(high)
    return lambda row: np.interp(row, rows, ys)


def lanczos(x, a=3):
    return np.where(np.abs(x) < a, np.sinc(x) * np.sinc(x / a), 0.0)


def resample_weights(starts, ends, size):
    """Weights (output sample x source sample) of a Lanczos filter, as wide as each output sample is large."""
    centres = (starts + ends) / 2
    widths = np.maximum(ends - starts, 1.0)
    weights = lanczos((np.arange(size) + 0.5 - centres[:, None]) / widths[:, None])
    return (weights / weights.sum(axis=1, keepdims=True)).astype(np.float32)


def paint_room(s):
    """The painting at the size of the room, with the stairs ending where the floor starts in the game.

    Rows and columns are resampled in one pass each, so the flattened stairs are filtered as finely as the rest."""
    room_w, room_h = (ROOM[2] - ROOM[0]) * s, (ROOM[3] - ROOM[1]) * s
    painting = np.asarray(Image.open(PAINTING).convert('RGB'), np.float32)
    height, width, _ = painting.shape
    scale = width / room_w
    floor_row = (FLOOR_START - ROOM[1]) * s
    rows = np.arange(room_h + 1)
    source = source_rows(scale, floor_row)
    edges = np.where(rows <= floor_row, source(np.minimum(rows, floor_row)),
                     STAIRS_BASE + (rows - floor_row) * (height - STAIRS_BASE) / (room_h - floor_row))
    columns = np.arange(room_w + 1) * scale
    room = np.tensordot(resample_weights(edges[:-1], edges[1:], height), painting, axes=(1, 0))
    room = np.moveaxis(np.tensordot(room, resample_weights(columns[:-1], columns[1:], width), axes=(1, 1)), 1, 2)
    room = Image.fromarray(np.clip(np.rint(room), 0, 255).astype(np.uint8))
    radius, percent = SHARPEN[s]
    room = room.filter(ImageFilter.UnsharpMask(radius=radius, percent=percent, threshold=2))
    return np.asarray(room, np.float32)


def nameplate(out, s):
    """A bronze plate under the label (an opaque 32x8 picture drawn at 142,192) and the label itself."""
    x0, y0, x1, y1 = 139 * s, 189 * s, 177 * s, 200 * s
    plate = np.zeros((y1 - y0, x1 - x0, 3), np.float32)
    plate[:] = (132, 92, 44)
    plate[:s] = (226, 176, 98)
    plate[:, :s] = (190, 140, 70)
    plate[:, -s:] = (64, 42, 18)
    out[y0:y1, x0:x1] = plate


def snake_tails(out, original, s):
    """The tails of the pillar snakes curl into the floor in the corners: the C64 pixels, kept."""
    index = np.asarray(Image.open(SOURCE))
    core = (index == 14) | (index == 5)
    window = np.zeros_like(core)
    window[183:, ROOM[0]:80] = True
    window[183:, 252:ROOM[2]] = True
    core &= window
    grown = core.copy()
    for dy in (-1, 0, 1):
        for dx in (-1, 0, 1):
            grown |= np.roll(np.roll(core, dy, 0), dx, 1)
    keep = grown & np.isin(index, (0, 3, 14, 5)) & window
    mask = np.kron(keep, np.ones((s, s), bool))
    out[mask] = original[mask]


def compose(s):
    original = np.asarray(Image.open(SOURCE).convert('RGB').resize((320 * s, 200 * s), Image.NEAREST), np.float32)
    out = original.copy()
    x0, y0, x1, y1 = (v * s for v in ROOM)
    out[y0:y1, x0:x1] = paint_room(s)
    nameplate(out, s)
    snake_tails(out, original, s)
    # the "2PLR" label is part of the C64 picture: the game draws "1PLR" / "DEMO" over it
    label = (142 * s, 192 * s, 174 * s, 200 * s)
    out[label[1]:label[3], label[0]:label[2]] = original[label[1]:label[3], label[0]:label[2]]
    return np.clip(np.rint(out), 0, 255).astype(np.uint8)


def main():
    for s, folder in FOLDERS.items():
        picture = compose(s)
        stage = ROOT / 'assets' / folder / 'stage'
        stage.mkdir(parents=True, exist_ok=True)
        Image.fromarray(picture).save(stage / 'throne.png', optimize=True)
        # the strip the game draws on every frame: game pixels 32,96 to 288,176
        Image.fromarray(picture[96 * s:176 * s, 32 * s:288 * s]).save(stage / 'throneBackground.png', optimize=True)


if __name__ == '__main__':
    main()
