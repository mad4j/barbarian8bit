/**
 * The graphics side of the QB64 runtime: a true-colour screen with the QB64 drawing statements the
 * program uses (`SCREEN`, `COLOR`, `LOCATE`, `PRINT`, `LINE`, `PALETTE`, `_LOADIMAGE`, `_PUTIMAGE`, …).
 *
 * Coordinates are always game pixels of the 320x200 screen. The surface behind them can have more
 * real pixels (`scale`), and the images in the asset pack can have more detail (see images.js);
 * colour numbers go through a palette (see palette.js).
 */
import { EGA16, Palette, vgaPalette } from './palette.js';
import { HEIGHT, Surface, WIDTH } from './surface.js';
import { ImageStore, MAX_SCALE, colorsOf, packScale } from './images.js';
import { CELL, TTF_ROW_HEIGHT, drawChar8, drawRaster, rasterizeText } from './text.js';

const norm = (p) => String(p).replace(/\\/g, '/').replace(/^\.\//, '');

export class Graphics {
  /**
   * `scale` = real pixels per game pixel; by default what the asset pack needs to be shown at its
   * own resolution (manifest "scale" / "imageScales").
   */
  constructor({ canvas, manifest, images, scale }) {
    this.scale = Math.max(1, Math.min(MAX_SCALE, Math.round(scale) || packScale(manifest)));
    this.surface = new Surface(canvas, this.scale);
    this.colors = new Palette();
    // the named colours of a pack whose artwork is true colour and so has no palette of its own
    this.packColors = manifest.palette ? Uint8Array.from(manifest.palette.flat()) : null;
    this.store = new ImageStore({ assets: images, manifest });

    this.KEEPBACKGROUND = 1;
    this.FILLBACKGROUND = 2;

    this.mode = 13;
    this.fg = 15;
    this.bg = 0;
    this.row = 1;
    this.col = 1;
    this.curFont = 8;
    this.printMode = this.FILLBACKGROUND;

    this.fonts = [null];
    this.fontFamilies = new Map();

    this.screen(13);
  }

  // ------------------------------------------------------------ screen
  screen(mode) {
    this.mode = mode;
    this.colors.reset(mode === 13 ? vgaPalette() : EGA16);
    this.fg = 15;
    this.bg = 0;
    this.curFont = 8;
    this.printMode = this.FILLBACKGROUND;
    this.cls();
  }

  cls() {
    this.surface.fill(this.colors.color(this.bg));
    this.row = 1;
    this.col = 1;
  }

  color(fg, bg) {
    if (fg !== undefined) this.fg = fg;
    if (bg !== undefined) this.bg = bg;
  }

  locate(row, col) {
    if (row !== undefined) this.row = row;
    if (col !== undefined) this.col = col;
  }

  display() { this.surface.present(); }

  // ------------------------------------------------------------ palette
  palettecolor(i, rgb) { this.colors.set(i, rgb); }

  // PALETTE attribute, colour: colours are taken from the 16 EGA colours.
  palette(attr, color) {
    const c = EGA16[color & 15];
    this.colors.set(attr, (c[0] << 16) | (c[1] << 8) | c[2]);
  }

  rgb(r, g, b) { return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255); }

  // `_COPYPALETTE`: the screen takes the palette of an image; a true-colour image has none, so the pack's own is used.
  copypalette(src, dst) {
    if (src !== undefined) {
      const img = this.store.get(src);
      if (!img) return;
      if (img.kind === 'indexed') this.colors.load(img.pal);
      else if (this.packColors) this.colors.load(this.packColors);
    } else if (dst !== undefined) {
      const img = this.store.get(dst);
      if (img && img.kind === 'indexed') img.pal = this.colors.rgb.slice();
    }
  }

  // ------------------------------------------------------------ drawing
  line(x1, y1, x2, y2, color, mode) {
    if (mode !== 'BF' && mode !== 'B') return;
    const c = this.colors.color(color === undefined ? this.fg : color);
    const s = this.scale;
    const xa = Math.min(x1, x2) * s;
    const xb = (Math.max(x1, x2) + 1) * s;
    const ya = Math.min(y1, y2) * s;
    const yb = (Math.max(y1, y2) + 1) * s;
    const { surface } = this;
    if (mode === 'BF') {
      surface.fillRect(xa, ya, xb, yb, c);
    } else {
      surface.fillRect(xa, ya, xb, ya + s, c);
      surface.fillRect(xa, yb - s, xb, yb, c);
      surface.fillRect(xa, ya, xa + s, yb, c);
      surface.fillRect(xb - s, ya, xb, yb, c);
    }
  }

  // ------------------------------------------------------------ images
  loadimage(path, mode) { return this.store.load(path, mode); }

  clearcolor(color, handle) { this.store.clearColor(color, handle); }

  // `_WIDTH` / `_HEIGHT` of an image, in game pixels.
  imagewidth(handle) {
    const img = this.store.get(handle);
    return img ? Math.round(img.w / img.scale) : 0;
  }

  imageheight(handle) {
    const img = this.store.get(handle);
    return img ? Math.round(img.h / img.scale) : 0;
  }

  /**
   * `GET`: a copy of the part of the screen (x1, y1)-(x2, y2) (game pixels, corners included) as a new
   * true-colour image, with every pixel as it is on the screen at its resolution.
   */
  getimage(x1, y1, x2, y2) {
    const s = this.scale;
    const w = (x2 - x1 + 1) * s;
    const h = (y2 - y1 + 1) * s;
    return this.store.add(this.surface.copyRect(x1 * s, y1 * s, w, h), w, h, s);
  }

  /**
   * `_PUTIMAGE`: the whole screen, the image at (x1, y1) in its own size (in game pixels, so a
   * higher-resolution image covers the same area), or stretched / mirrored into (x1, y1)-(x2, y2).
   */
  putimage(handle, x1, y1, x2, y2) {
    const img = this.store.get(handle);
    if (!img) return;
    const s = this.scale;
    let left; let top; let w; let h; let flipX = false; let flipY = false;
    if (x1 === undefined) {
      left = 0; top = 0; w = WIDTH * s; h = HEIGHT * s;
    } else if (x2 === undefined) {
      left = x1 * s; top = y1 * s;
      w = Math.round((img.w * s) / img.scale);
      h = Math.round((img.h * s) / img.scale);
    } else {
      left = Math.min(x1, x2) * s; top = Math.min(y1, y2) * s;
      w = (Math.abs(x2 - x1) + 1) * s;
      h = (Math.abs(y2 - y1) + 1) * s;
      flipX = x1 > x2;
      flipY = y1 > y2;
    }
    const lut = img.kind === 'indexed' ? colorsOf(img, this.colors, this.mode === 13 ? 256 : 16) : null;
    this.surface.blit(img, lut, left, top, w, h, flipX, flipY);
  }

  // ------------------------------------------------------------ text
  loadfont(path, size) {
    const family = this.fontFamilies.get(norm(path)) || 'sans-serif';
    this.fonts.push({ family, size });
    return this.fonts.length - 1;
  }

  font(handle) { this.curFont = handle; }
  printmode(mode) { this.printMode = mode; }

  fmt(v) {
    if (typeof v === 'number') return `${v < 0 ? '-' : ' '}${Math.abs(v)} `;
    return String(v);
  }

  print(items, newline) {
    const text = items.map((v) => this.fmt(v)).join('');
    if (this.curFont === 8) this.printBitmap(text);
    else this.printTtf(text);
    if (newline) { this.row++; this.col = 1; }
    if (this.row > 25) this.scroll();
  }

  scroll() {
    this.surface.scrollUp(CELL * this.scale, this.colors.color(this.bg));
    this.row = 25;
  }

  // The colour behind text: null where the print mode keeps the background.
  backColor() {
    return this.printMode === this.FILLBACKGROUND ? this.colors.color(this.bg) : null;
  }

  printBitmap(text) {
    const cell = CELL * this.scale;
    const fg = this.colors.color(this.fg);
    const bg = this.backColor();
    for (let i = 0; i < text.length; i++) {
      if (this.col > 40) { this.col = 1; this.row++; if (this.row > 25) this.scroll(); }
      drawChar8(this.surface, text.charCodeAt(i) & 255, (this.col - 1) * cell, (this.row - 1) * cell, fg, bg);
      this.col++;
    }
  }

  // TrueType text: `col` is a pixel column, `row` a row of TTF_ROW_HEIGHT pixels.
  printTtf(text) {
    const font = this.fonts[this.curFont];
    if (!font || !text) return;
    const g = rasterizeText(font.family, font.size, text, this.scale);
    const s = this.scale;
    drawRaster(this.surface, g, (this.col - 1) * s, (this.row - 1) * TTF_ROW_HEIGHT * s,
      this.colors.color(this.fg), this.backColor());
    this.col += Math.round(g.advance);
  }

  string_(n, code) { return String.fromCharCode(code).repeat(Math.max(0, n)); }
  chr_(code) { return String.fromCharCode(code); }
  len(s) { return String(s).length; }
  left_(s, n) { return String(s).slice(0, n); }
  right_(s, n) { return n > 0 ? String(s).slice(-n) : ''; }
  str_(n) { return this.fmt(n).replace(/ $/, ''); }
  rnd() { return Math.random(); }
  timer() { return performance.now() / 1000; }
}
