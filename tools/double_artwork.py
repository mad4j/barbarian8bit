"""Doubles the resolution of all the artwork: every image of assets/C64/ (fighters and other sprites,
stages, menus) becomes assets/HD/ at 2x (each pixel repeated, so the blocky look, the palette indices
and the transparency are kept) and assets/manifest.json points at the new files with "scale": 2.

The images still cover the same area of the 320x200 game; only the pixels behind each game pixel
double. Run from the repository root:  python tools/double_artwork.py   (needs Pillow)
"""
import json
import re
from pathlib import Path

from PIL import Image

FACTOR = 2
ASSETS = Path('assets')
IMAGE_FILE = re.compile(r'^(?:C64|HD)/(.+\.png)$')


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
    for key, file in manifest['images'].items():
        match = IMAGE_FILE.match(file)
        if not match:
            continue
        name = match.group(1)
        double(ASSETS / 'C64' / name, ASSETS / 'HD' / name)
        manifest['images'][key] = f'HD/{name}'
    manifest['scale'] = FACTOR
    manifest.pop('imageScales', None)
    path.write_text(dump(manifest), encoding='utf-8')


if __name__ == '__main__':
    main()
