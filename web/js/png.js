/**
 * Minimal PNG decoder that preserves palette indices.
 *
 * The browser's own decoders (<img>, createImageBitmap) always expand to
 * 32-bit RGBA, but the runtime emulates an indexed-colour screen and the
 * original's palette tricks need the raw indices of the paletted sprites.
 *
 * Supports what the committed assets use: 8-bit depth, colour type 3
 * (indexed, PLTE + optional tRNS) and colour type 6 (RGBA), non-interlaced,
 * any scanline filter. Inflate is delegated to DecompressionStream.
 */

const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

async function inflate(bytes) {
  const stream = new Blob([bytes]).stream().pipeThrough(new DecompressionStream('deflate'));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

const paeth = (a, b, c) => {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  return pa <= pb && pa <= pc ? a : (pb <= pc ? b : c);
};

function unfilter(raw, w, h, bpp) {
  const stride = w * bpp;
  const out = new Uint8Array(stride * h);
  for (let y = 0; y < h; y++) {
    const type = raw[y * (stride + 1)];
    const row = y * stride;
    const src = y * (stride + 1) + 1;
    for (let x = 0; x < stride; x++) {
      const left = x >= bpp ? out[row + x - bpp] : 0;
      const up = y > 0 ? out[row + x - stride] : 0;
      const corner = y > 0 && x >= bpp ? out[row + x - stride - bpp] : 0;
      let v = raw[src + x];
      switch (type) {
        case 1: v += left; break;
        case 2: v += up; break;
        case 3: v += (left + up) >> 1; break;
        case 4: v += paeth(left, up, corner); break;
        default: break; // 0 = None
      }
      out[row + x] = v & 255;
    }
  }
  return out;
}

/**
 * Decode a PNG into the runtime's asset format:
 * - indexed:  { k: 'p', w, h, idx: Uint8Array(w*h), pal: Uint8Array(768), t }
 * - RGBA:     { k: 'rgba', w, h, bytes: Uint8Array(w*h*4) }
 */
export async function decodePng(buffer) {
  const u8 = new Uint8Array(buffer);
  if (!SIGNATURE.every((b, i) => u8[i] === b)) throw new Error('not a PNG');
  const view = new DataView(buffer);
  let pos = 8;
  let w = 0;
  let h = 0;
  let colorType = -1;
  let plte = null;
  let trns = null;
  const idat = [];
  while (pos < u8.length) {
    const len = view.getUint32(pos);
    const tag = String.fromCharCode(u8[pos + 4], u8[pos + 5], u8[pos + 6], u8[pos + 7]);
    const body = u8.subarray(pos + 8, pos + 8 + len);
    if (tag === 'IHDR') {
      w = view.getUint32(pos + 8);
      h = view.getUint32(pos + 12);
      const depth = u8[pos + 16];
      colorType = u8[pos + 17];
      if (depth !== 8 || u8[pos + 20] !== 0 || (colorType !== 3 && colorType !== 6)) {
        throw new Error('unsupported PNG (need 8-bit indexed or RGBA, non-interlaced)');
      }
    } else if (tag === 'PLTE') plte = body.slice();
    else if (tag === 'tRNS') trns = body.slice();
    else if (tag === 'IDAT') idat.push(body);
    else if (tag === 'IEND') break;
    pos += 12 + len;
  }

  const compressed = new Uint8Array(idat.reduce((n, c) => n + c.length, 0));
  let off = 0;
  for (const c of idat) { compressed.set(c, off); off += c.length; }
  const bpp = colorType === 3 ? 1 : 4;
  const px = unfilter(await inflate(compressed), w, h, bpp);

  if (colorType === 3) {
    const pal = new Uint8Array(768);
    pal.set(plte.subarray(0, 768));
    let t = -1;
    if (trns) for (let i = 0; i < trns.length; i++) if (trns[i] < 128) { t = i; break; }
    return { k: 'p', w, h, idx: px, pal, t };
  }
  return { k: 'rgba', w, h, bytes: px };
}
