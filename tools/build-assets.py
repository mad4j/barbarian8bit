"""Packs the original C64/ resources into web/assets, under English names.

* images (gif/png/bmp) -> assets/images.bin + assets/manifest.json
  Paletted images keep their raw indices and palette (QB64 loads them in
  256-colour mode in several places); RGBA images are stored as plain RGBA.
* sounds and the TrueType font are copied as they are.
* File names come from tools/asset-names.json (French -> English), generated
  by tools/naming.mjs, the same module the QB64 translator uses for the paths
  in game.js, so code and files always agree.

Usage: python tools/build-assets.py [path/to/barbarianC64/C64]
Requires Pillow.
"""
import json
import shutil
import sys
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "_resources" / "barbarianC64" / "C64"
OUT = ROOT / "web" / "assets"
NAMES = json.loads((ROOT / "tools" / "asset-names.json").read_text())
IMAGE_EXT = {".gif", ".png", ".bmp"}
COPY_EXT = {".ogg", ".wav", ".ttf"}


def main():
    if not SRC.is_dir():
        sys.exit(f"resource folder not found: {SRC}")
    if OUT.exists():
        shutil.rmtree(OUT)
    OUT.mkdir(parents=True)

    manifest = {}
    files = []
    blob = bytearray()

    for path in sorted(SRC.rglob("*")):
        ext = path.suffix.lower()
        if not path.is_file() or ext not in IMAGE_EXT | COPY_EXT:
            continue
        english = NAMES.get(path.relative_to(SRC).as_posix().lower())
        if english is None:
            sys.exit(f"no English name for {path}: run 'node tools/naming.mjs'")
        rel = "C64/" + english
        if ext in IMAGE_EXT:
            im = Image.open(path)
            if english == "menu/icon.gif":
                im.convert("RGBA").save(OUT / "favicon.png")
            entry = {"w": im.width, "h": im.height, "o": len(blob)}
            if im.mode == "P":
                pal = (im.getpalette() or [])[: 256 * 3]
                tr = im.info.get("transparency")
                entry.update(k="p", t=tr if isinstance(tr, int) else -1, pal=pal)
                blob += bytes(im.tobytes())
            else:
                entry["k"] = "rgba"
                blob += im.convert("RGBA").tobytes()
            manifest[rel] = entry
        elif ext in COPY_EXT:
            dest = OUT / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            shutil.copyfile(path, dest)
            files.append(rel)

    (OUT / "images.bin").write_bytes(bytes(blob))
    (OUT / "manifest.json").write_text(json.dumps({"images": manifest, "files": files}, separators=(",", ":")))
    print(f"{len(manifest)} images, {len(blob)} bytes")


if __name__ == "__main__":
    main()
