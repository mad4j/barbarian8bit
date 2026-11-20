/**
 * Text: the 8x8 bitmap font of `PRINT`, and TrueType fonts (`_LOADFONT`) rasterised for the HUD.
 *
 * Positions are in real pixels (see Surface); glyphs are sized by the screen `scale`, so text is as
 * sharp as the artwork. TrueType text is anti-aliased once the screen is above the original
 * resolution; at 1x it is thresholded to keep the crisp look of the original.
 */
import { FONT8X8 } from '../font8x8.js';
import { blend } from './surface.js';

export const CELL = 8; // the bitmap font is 8x8 game pixels, 40 x 25 cells on the screen
export const TTF_ROW_HEIGHT = 18;
// Calibrated so that the 18px Zepto digits sit inside the 39..51 HUD strip.
const TTF_BASELINE = 15;

// Custom glyphs for the few CP437 control codes the program prints
// (written MSB-left, converted to the LSB-left layout of FONT8X8).
const reverseBits = (b) => parseInt(b.toString(2).padStart(8, '0').split('').reverse().join(''), 2);
const ARROWS = Object.fromEntries(Object.entries({
  24: [0x18, 0x3c, 0x7e, 0x18, 0x18, 0x18, 0x18, 0x00],
  25: [0x18, 0x18, 0x18, 0x18, 0x7e, 0x3c, 0x18, 0x00],
  26: [0x00, 0x18, 0x0c, 0xfe, 0x0c, 0x18, 0x00, 0x00],
  27: [0x00, 0x30, 0x60, 0xfe, 0x60, 0x30, 0x00, 0x00],
}).map(([code, rows]) => [code, rows.map(reverseBits)]));

function glyph8(code) {
  if (ARROWS[code]) return ARROWS[code];
  if (code === 219) return [255, 255, 255, 255, 255, 255, 255, 255];
  return code < 128 ? FONT8X8[code] : FONT8X8[63];
}

// One character of the bitmap font in the cell whose top-left real pixel is (x, y); `bg` null keeps what is there.
export function drawChar8(surface, code, x, y, fg, bg) {
  const s = surface.scale;
  const rows = glyph8(code);
  if (bg !== null) surface.fillRect(x, y, x + CELL * s, y + CELL * s, bg);
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if ((rows[row] >> col) & 1) {
        surface.fillRect(x + col * s, y + row * s, x + (col + 1) * s, y + (row + 1) * s, fg);
      }
    }
  }
}

const rasterCache = new Map();

/**
 * `text` in a TrueType font as coverage values (0..255), one row height tall.
 * `advance` is the width of the text in game pixels.
 */
export function rasterizeText(family, size, text, scale) {
  const key = `${family}|${size}|${scale}|${text}`;
  let g = rasterCache.get(key);
  if (g) return g;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const spec = `${size * scale}px "${family}"`;
  ctx.font = spec;
  const advance = ctx.measureText(text).width;
  canvas.width = Math.max(1, Math.ceil(advance) + 2 * scale);
  canvas.height = TTF_ROW_HEIGHT * scale;
  ctx.font = spec;
  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text, 0, TTF_BASELINE * scale);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const alpha = new Uint8Array(canvas.width * canvas.height);
  for (let i = 0; i < alpha.length; i++) {
    const a = data[i * 4 + 3];
    alpha[i] = scale > 1 ? a : (a >= 110 ? 255 : 0);
  }
  g = { w: canvas.width, h: canvas.height, alpha, advance: advance / scale };
  rasterCache.set(key, g);
  return g;
}

// A rasterised text with its top-left corner at real pixel (x, y); `bg` null keeps what is there.
export function drawRaster(surface, g, x, y, fg, bg) {
  const { px, width, height } = surface;
  for (let row = 0; row < g.h; row++) {
    const py = y + row;
    if (py < 0 || py >= height) continue;
    for (let col = 0; col < g.w; col++) {
      const pxX = x + col;
      if (pxX < 0 || pxX >= width) continue;
      const a = g.alpha[row * g.w + col];
      const d = py * width + pxX;
      if (a === 255) px[d] = fg;
      else if (bg !== null) px[d] = a === 0 ? bg : blend(fg, bg, a);
      else if (a > 0) px[d] = blend(fg, px[d], a);
    }
  }
}
