"""Doubles the resolution of every sprite: the C64 artwork in assets/C64/sprites*/ becomes
assets/HD/sprites*/ at 2x (each pixel repeated, so the blocky look and the palette indices are kept)
and assets/manifest.json points the sprites at the new files with "imageScales": 2.

The sprites still cover the same area of the 320x200 game; only the pixels behind each game pixel
double. Run from the repository root:  python tools/double_sprites.py   (needs Pillow)
"""
import json
import re
from pathlib import Path

from PIL import Image

FACTOR = 2
ASSETS = Path('assets')
SPRITE_FILE = re.compile(r'^(?:C64|HD)/(sprites[AB]?)/(.+\.png)$')


def double(src, dst):
    im = Image.open(src)
    out = im.resize((im.width * FACTOR, im.height * FACTOR), Image.NEAREST)
    dst.parent.mkdir(parents=True, exist_ok=True)
    out.save(dst, **({'transparency': im.info['transparency']} if 'transparency' in im.info else {}))


def dump(manifest):
    # the same layout as the hand-kept file: one entry per line, the palette on a single line
    lines = []
    for key, value in manifest.items():
        text = json.dumps(value, indent=1)
        if key == 'palette':
            text = json.dumps(value)
        lines.append(f' {json.dumps(key)}: ' + text.replace('\n', '\n '))
    return '{\n' + ',\n'.join(lines) + '\n}\n'


def main():
    path = ASSETS / 'manifest.json'
    manifest = json.loads(path.read_text(encoding='utf-8'))
    scales = manifest.pop('imageScales', {})
    for key, file in manifest['images'].items():
        match = SPRITE_FILE.match(file)
        if not match:
            continue
        folder, name = match.groups()
        double(ASSETS / 'C64' / folder / name, ASSETS / 'HD' / folder / name)
        manifest['images'][key] = f'HD/{folder}/{name}'
        scales[key] = FACTOR
    # "imageScales" goes right after "scale"
    ordered = {'scale': manifest.pop('scale'), 'imageScales': scales, **manifest}
    path.write_text(dump(ordered), encoding='utf-8')


if __name__ == '__main__':
    main()
