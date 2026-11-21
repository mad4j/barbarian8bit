"""Builds the throne room artwork at 2x in true colour: assets/HD/stage/throne.png and
assets/HD/stage/throneBackground.png.

The room is a heroic-fantasy oil painting (tools/throne_painting.jpg: made with an image model from a layout
reference of the room, in the manner of 1970s sword-and-sorcery cover art). This script maps it onto the game
grid: the stairs end where the floor starts (game y 163), the shadows behind the fighters are lifted so the dark
sprites stay readable, and a bronze plate holds the "1PLR" / "2PLR" label. Kept from the C64 picture: the logo
and HUD area, the two pillars with their snakes (shared by all stages) and the snake tails in the bottom corners.

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

STAIRS_BASE = 806     # row of the painting where the stairs end and the floor starts
FLOOR_START = 163     # game y where the floor starts in the game


def smoothstep(x):
    x = np.clip(x, 0, 1)
    return x * x * (3 - 2 * x)


def paint_room():
    """The painting at the size of the room, the floor and the stairs placed where the game expects them."""
    painting = Image.open(PAINTING).convert('RGB')
    width, height = painting.size
    floor_row = (FLOOR_START - ROOM[1]) * S
    stairs = painting.resize((ROOM_W, floor_row), Image.LANCZOS, box=(0, 0, width, STAIRS_BASE))
    floor = painting.resize((ROOM_W, ROOM_H - floor_row), Image.LANCZOS, box=(0, STAIRS_BASE, width, height))
    room = Image.new('RGB', (ROOM_W, ROOM_H))
    room.paste(stairs, (0, 0))
    room.paste(floor, (0, floor_row))
    room = room.filter(ImageFilter.UnsharpMask(radius=1.2, percent=70, threshold=2))
    px = np.asarray(room, np.float32) / 255

    # the throne stays dramatic; behind the fighters the shadows are lifted (gamma < 1)
    rows = np.arange(ROOM_H, dtype=np.float32)
    gamma = 1 - 0.40 * smoothstep((rows - 70) / 50) + 0.16 * smoothstep((rows - floor_row) / 18)
    px = px ** gamma[:, None, None]

    # a shadow under the logo, and a soft edge towards the pillars
    ceiling = 1 - smoothstep(rows / 14)
    px *= (1 - 0.92 * ceiling)[:, None, None]
    cols = np.arange(ROOM_W, dtype=np.float32)
    edge = np.minimum(cols, ROOM_W - 1 - cols)
    px *= (0.55 + 0.45 * smoothstep(edge / 18))[None, :, None]
    return px * 255


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
