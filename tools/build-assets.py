"""Packs the original C64/ resources into web/assets.

* images (gif/png/bmp) -> assets/images.bin + assets/manifest.json
  Paletted images keep their raw indices and palette (QB64 loads them in
  256-colour mode in several places); RGBA images are stored as plain RGBA.
* sounds and the TrueType font are copied with lower-case file names, because
  the QB64 source references them with a different letter case than the files
  on disk and web servers are case sensitive.

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
        if not path.is_file():
            continue
        rel = ("c64/" + path.relative_to(SRC).as_posix()).lower()
        ext = path.suffix.lower()
        if ext in IMAGE_EXT:
            im = Image.open(path)
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
    Image.open(SRC / "menu" / "icone.gif").convert("RGBA").save(OUT / "favicon.png")
    (OUT / "manifest.json").write_text(json.dumps({"images": manifest, "files": files}, separators=(",", ":")))
    print(f"{len(manifest)} images, {len(blob)} bytes")


if __name__ == "__main__":
    main()
