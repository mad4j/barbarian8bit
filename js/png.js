/**
 * Image decoding for the asset loader.
 *
 * The browser's own decoders (<img>, createImageBitmap) always expand to 32-bit RGBA, but the
 * runtime can draw palette images *through the live palette* (the opponent's colours of the
 * original are palette tricks), which needs the raw indices of the paletted sprites. So PNGs are
 * decoded here, losslessly: indexed (1 to 8 bit, PLTE + optional tRNS) and 8-bit grey, grey+alpha,
 * RGB and RGBA, non-interlaced, any scanline filter. Anything else (16-bit or interlaced PNG, JPEG,
 * WebP, a PNG with a colour-key tRNS, …) is handed to the browser and arrives as true-colour RGBA.
 * Inflate is delegated to DecompressionStream.
 */

const SIGNATURE = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];

// Samples per pixel of the PNG colour types (greyscale, RGB, indexed, grey + alpha, RGBA).
const SAMPLES = { 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 };

// 1, 2 and 4-bit indexed rows (packed, MSB first) -> one index per byte.
function unpackIndices(packed, stride, w, h, depth) {
  const out = new Uint8Array(w * h);
  const mask = (1 << depth) - 1;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const bit = x * depth;
      out[y * w + x] = (packed[y * stride + (bit >> 3)] >> (8 - depth - (bit & 7))) & mask;
    }
  }
  return out;
}

class UnsupportedPng extends Error {}

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

function unfilter(raw, stride, h, bpp) {
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

// Greyscale, grey+alpha and RGB samples -> RGBA bytes.
function toRgba(px, w, h, colorType) {
  if (colorType === 6) return px;
  const out = new Uint8Array(w * h * 4);
  for (let i = 0; i < w * h; i++) {
    if (colorType === 2) {
      out[i * 4] = px[i * 3];
      out[i * 4 + 1] = px[i * 3 + 1];
      out[i * 4 + 2] = px[i * 3 + 2];
      out[i * 4 + 3] = 255;
    } else {
      const grey = px[i * (colorType === 4 ? 2 : 1)];
      out[i * 4] = grey;
      out[i * 4 + 1] = grey;
      out[i * 4 + 2] = grey;
      out[i * 4 + 3] = colorType === 4 ? px[i * 2 + 1] : 255;
    }
  }
  return out;
}

/**
 * Decode an 8-bit PNG into the runtime's asset format:
 * - indexed:  { k: 'p', w, h, idx: Uint8Array(w*h), pal: Uint8Array(768), t }
 *             (`t` = first palette entry that is mostly transparent, or -1)
 * - otherwise: { k: 'rgba', w, h, bytes: Uint8Array(w*h*4) }
 * Throws UnsupportedPng for what it cannot decode exactly.
 */
export async function decodePng(buffer) {
  const u8 = new Uint8Array(buffer);
  if (!SIGNATURE.every((b, i) => u8[i] === b)) throw new UnsupportedPng('not a PNG');
  const view = new DataView(buffer);
  let pos = 8;
  let w = 0;
  let h = 0;
  let colorType = -1;
  let depth = 0;
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
      depth = u8[pos + 16];
      colorType = u8[pos + 17];
      const packedDepth = colorType === 3 && (depth === 1 || depth === 2 || depth === 4);
      if ((depth !== 8 && !packedDepth) || u8[pos + 20] !== 0 || !(colorType in SAMPLES)) {
        throw new UnsupportedPng('need 8-bit (or 1-4 bit indexed), non-interlaced');
      }
    } else if (tag === 'PLTE') plte = body.slice();
    else if (tag === 'tRNS') trns = body.slice();
    else if (tag === 'IDAT') idat.push(body);
    else if (tag === 'IEND') break;
    pos += 12 + len;
  }
  if (trns && (colorType === 0 || colorType === 2)) throw new UnsupportedPng('colour-key transparency');
  if (colorType === 3 && !plte) throw new UnsupportedPng('missing palette');

  const compressed = new Uint8Array(idat.reduce((n, c) => n + c.length, 0));
  let off = 0;
  for (const c of idat) { compressed.set(c, off); off += c.length; }
  const bitsPerPixel = depth * SAMPLES[colorType];
  const stride = Math.ceil((w * bitsPerPixel) / 8);
  let px = unfilter(await inflate(compressed), stride, h, Math.max(1, bitsPerPixel >> 3));

  if (colorType === 3) {
    if (depth < 8) px = unpackIndices(px, stride, w, h, depth);
    const pal = new Uint8Array(768);
    pal.set(plte.subarray(0, 768));
    let t = -1;
    if (trns) for (let i = 0; i < trns.length; i++) if (trns[i] < 128) { t = i; break; }
    return { k: 'p', w, h, idx: px, pal, t };
  }
  return { k: 'rgba', w, h, bytes: toRgba(px, w, h, colorType) };
}

async function decodeWithBrowser(buffer) {
  const bitmap = await createImageBitmap(new Blob([buffer]), {
    premultiplyAlpha: 'none',
    colorSpaceConversion: 'none',
  });
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  ctx.drawImage(bitmap, 0, 0);
  const { width: w, height: h } = bitmap;
  bitmap.close();
  return { k: 'rgba', w, h, bytes: new Uint8Array(ctx.getImageData(0, 0, w, h).data.buffer) };
}

// Any image the browser can show: exact where decodePng can be, true-colour RGBA otherwise.
export async function decodeImage(buffer) {
  try {
    return await decodePng(buffer);
  } catch (e) {
    if (!(e instanceof UnsupportedPng)) throw e;
    return decodeWithBrowser(buffer);
  }
}
