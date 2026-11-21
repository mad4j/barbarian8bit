"""Builds the throne room artwork at 2x in true colour: assets/HD/stage/throne.png and
assets/HD/stage/throneBackground.png.

The room is a heroic-fantasy oil painting (tools/throne_painting.jpg: made with an image model from a layout
reference of the room, in the manner of 1970s sword-and-sorcery cover art, then retouched). This script maps it
onto the game grid, so the room is 252x145 game pixels (1.738:1) and the painting is scaled to its width without
stretching: the stairs end where the floor starts (game y 168), and the rows that do not fit are taken from the
stairs, which get flatter from the first step down. A bronze plate holds the "1PLR" / "2PLR" label. Kept from the
C64 picture: the logo and HUD area, the two pillars with their snakes (shared by all stages) and the snake tails
in the bottom corners.

With another painting, set PAINTING_TOP, FLATTEN_FROM and STAIRS_BASE (rows of the painting) to match it. The
best fit is a painting at 1.738:1 (such as 1512x870) with the stairs ending at 74.5% of its height.

throneBackground.png is the strip of the picture that the game draws again on every frame (game pixels
32,96 to 288,176), so it is cut from the new picture. Run from the repository root:
python tools/draw_throne.py   (needs Pillow and NumPy; the output is deterministic)
"""
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'assets/C64/stage/throne.png'
PAINTING = ROOT / 'tools/throne_painting.jpg'
PICTURE = ROOT / 'assets/HD/stage/throne.png'
BACKGROUND = ROOT / 'assets/HD/stage/throneBackground.png'

S = 2                 # pixels per game pixel
W, H = 320 * S, 200 * S

# The part of the picture that is painted (game pixels); everything else is the C64 picture.
ROOM = (34, 55, 286, 200)
ROOM_W, ROOM_H = (ROOM[2] - ROOM[0]) * S, (ROOM[3] - ROOM[1]) * S

PAINTING_TOP = 28     # first row of the painting that is used (just above the wing tips)
FLATTEN_FROM = 430    # painting row of the first step: from here down the stairs are flattened gradually
STAIRS_BASE = 808     # painting row where the stairs end and the floor starts
FLOOR_START = 168     # game y where the floor starts in the game
BAND = 6              # rows of the room resampled at a time


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


def paint_room():
    """The painting at the size of the room, with the stairs ending where the floor starts in the game."""
    painting = Image.open(PAINTING).convert('RGB')
    width, height = painting.size
    scale = width / ROOM_W
    floor_row = (FLOOR_START - ROOM[1]) * S
    room = Image.new('RGB', (ROOM_W, ROOM_H))
    source = source_rows(scale, floor_row)
    for top in range(0, floor_row, BAND):
        bottom = min(top + BAND, floor_row)
        box = (0, float(source(top)), width, float(source(bottom)))
        room.paste(painting.resize((ROOM_W, bottom - top), Image.LANCZOS, box=box), (0, top))
    floor = painting.resize((ROOM_W, ROOM_H - floor_row), Image.LANCZOS, box=(0, STAIRS_BASE, width, height))
    room.paste(floor, (0, floor_row))
    room = room.filter(ImageFilter.UnsharpMask(radius=1.0, percent=40, threshold=2))
    return np.asarray(room, np.float32)


def nameplate(out):
    """A bronze plate under the label (an opaque 32x8 picture drawn at 142,192) and the label itself."""
    x0, y0, x1, y1 = 139 * S, 189 * S, 177 * S, H
    plate = np.zeros((y1 - y0, x1 - x0, 3), np.float32)
    plate[:] = (132, 92, 44)
    plate[:S] = (226, 176, 98)
    plate[:, :S] = (190, 140, 70)
    plate[:, -S:] = (64, 42, 18)
    out[y0:y1, x0:x1] = plate


def snake_tails(out, original):
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
    mask = np.kron(keep, np.ones((S, S), bool))
    out[mask] = original[mask]


def compose():
    original = np.asarray(Image.open(SOURCE).convert('RGB').resize((W, H), Image.NEAREST), np.float32)
    out = original.copy()
    x0, y0, x1, y1 = (v * S for v in ROOM)
    out[y0:y1, x0:x1] = paint_room()
    nameplate(out)
    snake_tails(out, original)
    # the "2PLR" label is part of the C64 picture: the game draws "1PLR" / "DEMO" over it
    label = (142 * S, 192 * S, 174 * S, 200 * S)
    out[label[1]:label[3], label[0]:label[2]] = original[label[1]:label[3], label[0]:label[2]]
    return np.clip(np.rint(out), 0, 255).astype(np.uint8)


def main():
    picture = compose()
    Image.fromarray(picture).save(PICTURE, optimize=True)
    # the strip the game draws on every frame: game pixels 32,96 to 288,176
    Image.fromarray(picture[96 * S:176 * S, 32 * S:288 * S]).save(BACKGROUND, optimize=True)


if __name__ == '__main__':
    main()
