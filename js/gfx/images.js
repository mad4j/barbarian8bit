/**
 * Images: decoded assets turned into what `_PUTIMAGE` draws, and `_LOADIMAGE` handles.
 *
 * Two kinds, following how the artwork is stored:
 * - 'indexed' – paletted PNGs ("palette art"): palette indices that are drawn in the colours of the
 *   screen palette. `_LOADIMAGE(file, 256)` uses the indices as they are, so recolouring a palette
 *   entry recolours the image (the opponent's colours of the original); loaded in 32-bit mode, each
 *   colour of the image is matched to the closest colour of the screen palette, as QB64 does.
 * - 'rgba' – RGB / RGBA artwork ("true colour"): drawn exactly as it is, alpha included.
 *
 * Every image has a `scale`: its pixels per game pixel. The C64 artwork is 1; an asset pack that
 * ships artwork at a higher resolution says so in its manifest ("scale", and "imageScales" for the
 * exceptions), and the image then covers the same area of the game, only with more detail.
 */

export const INDEXED = 256;
export const MAX_SCALE = 8;

const norm = (p) => String(p).replace(/\\/g, '/').replace(/^\.\//, '');

export const clampScale = (n) => Math.max(1, Math.min(MAX_SCALE, Math.round(Number(n)) || 1));

// The screen resolution that shows every image of the pack without resampling it down.
export function packScale(manifest) {
  return clampScale(Math.max(manifest.scale || 1, ...Object.values(manifest.imageScales || {})));
}

function paletteImage(asset, scale, snap) {
  const { w, h, idx, pal, t } = asset;
  return { kind: 'indexed', snap, w, h, scale, idx, pal: pal.slice(), tr: t, clearIdx: -1 };
}

function trueColorImage(asset, scale) {
  const { w, h, bytes } = asset;
  const rgba = bytes.byteOffset % 4 === 0
    ? new Uint32Array(bytes.buffer, bytes.byteOffset, w * h)
    : new Uint32Array(bytes.slice().buffer);
  return { kind: 'rgba', w, h, scale, rgba, key: -1 };
}

/**
 * The colours an indexed image is drawn in: the live palette itself, or - for palette art loaded in
 * 32-bit mode - each colour of the image replaced by the closest of the first `count` screen colours.
 */
export function colorsOf(img, palette, count) {
  if (!img.snap) return palette.lut;
  if (img.snapVersion === palette.version && img.snapCount === count) return img.snapLut;
  const live = palette.rgb;
  const packed = palette.lut;
  const lut = img.snapLut || new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    const r = img.pal[i * 3];
    const g = img.pal[i * 3 + 1];
    const b = img.pal[i * 3 + 2];
    let best = 0;
    let bestDistance = Infinity;
    for (let c = 0; c < count; c++) {
      const d = (live[c * 3] - r) ** 2 + (live[c * 3 + 1] - g) ** 2 + (live[c * 3 + 2] - b) ** 2;
      if (d < bestDistance) { bestDistance = d; best = c; }
    }
    lut[i] = packed[best];
  }
  img.snapLut = lut;
  img.snapVersion = palette.version;
  img.snapCount = count;
  return lut;
}

export class ImageStore {
  constructor({ assets, manifest }) {
    this.assets = assets; // decoded files, keyed by the original asset paths
    this.scale = manifest.scale || 1;
    this.scales = manifest.imageScales || {};
    this.images = [null];
    this.cache = new Map();
  }

  get(handle) { return this.images[handle]; }

  load(path, mode) {
    const key = norm(path);
    const asset = this.assets[key];
    if (!asset) return -1;
    const exact = mode === INDEXED;
    const cacheKey = `${key}|${exact}`;
    if (this.cache.has(cacheKey)) return this.cache.get(cacheKey);
    const scale = clampScale(this.scales[key] ?? this.scale);
    this.images.push(asset.k === 'p' ? paletteImage(asset, scale, !exact) : trueColorImage(asset, scale));
    const handle = this.images.length - 1;
    this.cache.set(cacheKey, handle);
    return handle;
  }

  // `_CLEARCOLOR`: the colour (0xRRGGBB) that is left out when the image is drawn.
  clearColor(color, handle) {
    const img = this.images[handle];
    if (!img) return;
    if (img.kind === 'rgba') {
      // pixels are compared as 0xBBGGRR, see Surface.blit
      img.key = ((color & 255) << 16) | (color & 0xff00) | ((color >> 16) & 255);
      return;
    }
    img.clearIdx = -1;
    for (let i = 0; i < 256; i++) {
      if (((img.pal[i * 3] << 16) | (img.pal[i * 3 + 1] << 8) | img.pal[i * 3 + 2]) === color) {
        img.clearIdx = i;
        break;
      }
    }
  }
}
