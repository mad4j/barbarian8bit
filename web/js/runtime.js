/**
 * Minimal QB64 runtime for the translated Barbarian C64 program.
 *
 * Emulates just what the original uses: a 320x200 indexed-colour screen
 * (SCREEN 7 / SCREEN 13) with a palette, 8x8 and TrueType text, _PUTIMAGE with
 * palette matching and transparency, keyboard / gamepad input, sound, and the
 * cooperative scheduling of SLEEP / _LIMIT.
 */
import { FONT8X8 } from './font8x8.js';

const W = 320;
const H = 200;

const EGA16 = [
  [0, 0, 0], [0, 0, 170], [0, 170, 0], [0, 170, 170],
  [170, 0, 0], [170, 0, 170], [170, 85, 0], [170, 170, 170],
  [85, 85, 85], [85, 85, 255], [85, 255, 85], [85, 255, 255],
  [255, 85, 85], [255, 85, 255], [255, 255, 85], [255, 255, 255],
];

// Standard VGA default 256-colour palette (SCREEN 13).
function vgaPalette() {
  const six = (v) => Math.round((v * 255) / 63);
  const pal = EGA16.map((c) => c.slice());
  [0, 5, 8, 11, 14, 17, 20, 24, 28, 32, 36, 40, 45, 50, 56, 63]
    .forEach((v) => pal.push([six(v), six(v), six(v)]));
  const groups = [[63, 0], [63, 31], [63, 45], [28, 0], [28, 14], [28, 20], [16, 0], [16, 8], [16, 11]];
  for (const [hi, lo] of groups) {
    const step = (hi - lo) / 4;
    const ramp = (k) => Math.round(lo + step * k);
    const rgb = (r, g, b) => pal.push([six(r), six(g), six(b)]);
    for (let k = 0; k < 4; k++) rgb(ramp(k), lo, hi);
    for (let k = 0; k < 4; k++) rgb(hi, lo, ramp(4 - k));
    for (let k = 0; k < 4; k++) rgb(hi, ramp(k), lo);
    for (let k = 0; k < 4; k++) rgb(ramp(4 - k), hi, lo);
    for (let k = 0; k < 4; k++) rgb(lo, hi, ramp(k));
    for (let k = 0; k < 4; k++) rgb(lo, ramp(4 - k), hi);
  }
  while (pal.length < 256) pal.push([0, 0, 0]);
  return pal;
}

// Custom glyphs for the few CP437 control codes the program prints
// (written MSB-left, converted to the LSB-left layout of FONT8X8).
const reverseBits = (b) => parseInt(b.toString(2).padStart(8, '0').split('').reverse().join(''), 2);
const ARROWS = Object.fromEntries(Object.entries({
  24: [0x18, 0x3c, 0x7e, 0x18, 0x18, 0x18, 0x18, 0x00],
  25: [0x18, 0x18, 0x18, 0x18, 0x7e, 0x3c, 0x18, 0x00],
  26: [0x00, 0x18, 0x0c, 0xfe, 0x0c, 0x18, 0x00, 0x00],
  27: [0x00, 0x30, 0x60, 0xfe, 0x60, 0x30, 0x00, 0x00],
}).map(([code, rows]) => [code, rows.map(reverseBits)]));

const norm = (p) => String(p).replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase();

const TTF_ROW_HEIGHT = 18;
// Calibrated so that the 18px Zepto digits sit inside the 39..51 HUD strip.
const TTF_BASELINE = 15;

export class Runtime {
  constructor({ canvas, manifest, blob, assetBase = 'assets/' }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(W, H);
    this.pixels32 = new Uint32Array(this.imageData.data.buffer);
    this.manifest = manifest;
    this.blob = blob;
    this.assetBase = assetBase;

    this.KEEPBACKGROUND = 1;
    this.FILLBACKGROUND = 2;
    this.OFF = 0;
    this.MIDDLE = 1;

    this.fb = new Uint8Array(W * H);
    this.pal = new Uint8Array(768);
    this.palVer = 0;
    this.mode = 13;
    this.fg = 15;
    this.bg = 0;
    this.row = 1;
    this.col = 1;
    this.curFont = 8;
    this.printMode = this.FILLBACKGROUND;

    this.images = [null];
    this.imageCache = new Map();
    this.fonts = [null];
    this.fontFamilies = new Map();
    this.glyphCache = new Map();
    this.sounds = new Map();
    this.audioHandles = [null];
    this.ac = null;

    this.down = new Set();
    this.tapped = new Set();
    this.keyBuffer = [];
    this.keySeq = 0;
    this.pads = [];
    this.wait = null;
    this.nextFrame = 0;
    this.stopped = false;
    this.onExit = () => {};
    this.onFullscreen = () => {};

    this.screen(13);
  }

  // ------------------------------------------------------------ screen
  screen(mode) {
    this.mode = mode;
    const src = mode === 13 ? vgaPalette() : EGA16;
    this.pal.fill(0);
    src.forEach((c, i) => this.pal.set(c, i * 3));
    this.palVer++;
    this.fg = 15;
    this.bg = 0;
    this.curFont = 8;
    this.printMode = this.FILLBACKGROUND;
    this.cls();
  }

  cls() {
    this.fb.fill(this.bg);
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

  display() {
    const { pixels32, fb, pal } = this;
    const lut = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      lut[i] = (255 << 24) | (pal[i * 3 + 2] << 16) | (pal[i * 3 + 1] << 8) | pal[i * 3];
    }
    for (let i = 0; i < fb.length; i++) pixels32[i] = lut[fb[i]];
    this.ctx.putImageData(this.imageData, 0, 0);
  }

  // ------------------------------------------------------------ palette
  get colorCount() { return this.mode === 13 ? 256 : 16; }

  palettecolor(i, rgb) {
    if (i < 0 || i > 255) return;
    this.pal[i * 3] = (rgb >> 16) & 255;
    this.pal[i * 3 + 1] = (rgb >> 8) & 255;
    this.pal[i * 3 + 2] = rgb & 255;
    this.palVer++;
  }

  // PALETTE attribute, colour: colours are taken from the 16 EGA colours.
  palette(attr, color) {
    const c = EGA16[color & 15];
    this.palettecolor(attr, (c[0] << 16) | (c[1] << 8) | c[2]);
  }

  rgb(r, g, b) { return ((r & 255) << 16) | ((g & 255) << 8) | (b & 255); }

  copypalette(src, dst) {
    if (src !== undefined) {
      const img = this.images[src];
      if (img && img.kind === 8) {
        this.pal.fill(0);
        this.pal.set(img.pal.subarray(0, Math.min(768, img.pal.length)));
        this.palVer++;
      }
    } else if (dst !== undefined) {
      const img = this.images[dst];
      if (img && img.kind === 8) img.pal = this.pal.slice();
    }
  }

  // ------------------------------------------------------------ drawing
  line(x1, y1, x2, y2, color, mode) {
    const c = color === undefined ? this.fg : color;
    if (mode !== 'BF' && mode !== 'B') return;
    const xa = Math.max(0, Math.min(x1, x2));
    const xb = Math.min(W - 1, Math.max(x1, x2));
    const ya = Math.max(0, Math.min(y1, y2));
    const yb = Math.min(H - 1, Math.max(y1, y2));
    for (let y = ya; y <= yb; y++) {
      const edgeRow = y === Math.min(y1, y2) || y === Math.max(y1, y2);
      for (let x = xa; x <= xb; x++) {
        if (mode === 'BF' || edgeRow || x === Math.min(x1, x2) || x === Math.max(x1, x2)) this.fb[y * W + x] = c;
      }
    }
  }

  // ------------------------------------------------------------ images
  loadimage(path, mode) {
    const key = norm(path);
    const asset = this.manifest.images[key];
    if (!asset) return -1;
    const want8 = mode === 256 && asset.k === 'p';
    const cacheKey = `${key}|${want8 ? 8 : 32}`;
    if (this.imageCache.has(cacheKey)) return this.imageCache.get(cacheKey);

    const { w, h } = asset;
    let img;
    if (asset.k === 'p') {
      const idx = new Uint8Array(this.blob, asset.o, w * h);
      const pal = new Uint8Array(768);
      pal.set(asset.pal);
      if (want8) {
        img = { kind: 8, w, h, idx, pal, tr: asset.t, clearIdx: -1 };
      } else {
        const rgba = new Uint32Array(w * h);
        for (let i = 0; i < idx.length; i++) {
          const p = idx[i];
          rgba[i] = p === asset.t ? 0 : (255 << 24) | (pal[p * 3 + 2] << 16) | (pal[p * 3 + 1] << 8) | pal[p * 3];
        }
        img = { kind: 32, w, h, rgba, clearRGB: -1 };
      }
    } else {
      const bytes = new Uint8Array(this.blob, asset.o, w * h * 4);
      const rgba = new Uint32Array(w * h);
      for (let i = 0; i < rgba.length; i++) {
        const a = bytes[i * 4 + 3];
        rgba[i] = a < 128 ? 0 : (255 << 24) | (bytes[i * 4 + 2] << 16) | (bytes[i * 4 + 1] << 8) | bytes[i * 4];
      }
      img = { kind: 32, w, h, rgba, clearRGB: -1 };
    }
    this.images.push(img);
    const handle = this.images.length - 1;
    this.imageCache.set(cacheKey, handle);
    return handle;
  }

  clearcolor(color, handle) {
    const img = this.images[handle];
    if (!img) return;
    if (img.kind === 32) {
      img.clearRGB = color;
      img.mapped = null;
    } else {
      img.clearIdx = -1;
      for (let i = 0; i < 256; i++) {
        const rgb = (img.pal[i * 3] << 16) | (img.pal[i * 3 + 1] << 8) | img.pal[i * 3 + 2];
        if (rgb === color) { img.clearIdx = i; break; }
      }
    }
  }

  // 32-bit image -> indices in the current palette (255 marks transparent).
  mapped(img) {
    const n = this.colorCount;
    if (img.mapped && img.mappedVer === this.palVer && img.mappedN === n) return img.mapped;
    const out = new Uint8Array(img.w * img.h);
    const memo = new Map();
    const { pal } = this;
    for (let i = 0; i < out.length; i++) {
      const px = img.rgba[i];
      if (px >>> 24 === 0) { out[i] = 255; continue; }
      const r = px & 255;
      const g = (px >>> 8) & 255;
      const b = (px >>> 16) & 255;
      if (img.clearRGB === ((r << 16) | (g << 8) | b)) { out[i] = 255; continue; }
      const k = px & 0xffffff;
      let best = memo.get(k);
      if (best === undefined) {
        let bd = Infinity;
        best = 0;
        for (let c = 0; c < n; c++) {
          const dr = pal[c * 3] - r;
          const dg = pal[c * 3 + 1] - g;
          const db = pal[c * 3 + 2] - b;
          const d = dr * dr + dg * dg + db * db;
          if (d < bd) { bd = d; best = c; }
        }
        memo.set(k, best);
      }
      out[i] = best;
    }
    img.mapped = out;
    img.mappedVer = this.palVer;
    img.mappedN = n;
    return out;
  }

  putimage(handle, x1, y1, x2, y2) {
    const img = this.images[handle];
    if (!img) return;
    let ax; let ay; let bx; let by;
    if (x1 === undefined) { ax = 0; ay = 0; bx = W - 1; by = H - 1; }
    else if (x2 === undefined) { ax = x1; ay = y1; bx = x1 + img.w - 1; by = y1 + img.h - 1; }
    else { ax = x1; ay = y1; bx = x2; by = y2; }
    const dw = Math.abs(bx - ax) + 1;
    const dh = Math.abs(by - ay) + 1;
    const flipX = ax > bx;
    const flipY = ay > by;
    const left = Math.min(ax, bx);
    const top = Math.min(ay, by);
    const src = img.kind === 8 ? img.idx : this.mapped(img);
    const skip = img.kind === 8 ? -1 : 255;
    const tr = img.kind === 8 ? img.tr : -1;
    const clr = img.kind === 8 ? img.clearIdx : -1;
    const { fb } = this;
    for (let dy = Math.max(0, -top); dy < dh && top + dy < H; dy++) {
      let sy = Math.floor((dy * img.h) / dh);
      if (flipY) sy = img.h - 1 - sy;
      const srow = sy * img.w;
      const drow = (top + dy) * W;
      for (let dx = Math.max(0, -left); dx < dw && left + dx < W; dx++) {
        let sx = Math.floor((dx * img.w) / dw);
        if (flipX) sx = img.w - 1 - sx;
        const p = src[srow + sx];
        if (p === skip || p === tr || p === clr) continue;
        fb[drow + left + dx] = p;
      }
    }
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
    this.fb.copyWithin(0, W * 8);
    this.fb.fill(this.bg, W * 192);
    this.row = 25;
  }

  glyph8(code) {
    if (ARROWS[code]) return ARROWS[code];
    if (code === 219) return [255, 255, 255, 255, 255, 255, 255, 255];
    return code < 128 ? FONT8X8[code] : FONT8X8[63];
  }

  printBitmap(text) {
    for (let i = 0; i < text.length; i++) {
      if (this.col > 40) { this.col = 1; this.row++; if (this.row > 25) this.scroll(); }
      const rows = this.glyph8(text.charCodeAt(i) & 255);
      const x0 = (this.col - 1) * 8;
      const y0 = (this.row - 1) * 8;
      for (let y = 0; y < 8; y++) {
        const bits = rows[y];
        for (let x = 0; x < 8; x++) {
          const on = (bits >> x) & 1;
          if (on) this.fb[(y0 + y) * W + x0 + x] = this.fg;
          else if (this.printMode === this.FILLBACKGROUND) this.fb[(y0 + y) * W + x0 + x] = this.bg;
        }
      }
      this.col++;
    }
  }

  printTtf(text) {
    const font = this.fonts[this.curFont];
    if (!font || !text) return;
    const g = this.ttfBitmap(font, text);
    const x0 = this.col - 1;
    const y0 = (this.row - 1) * TTF_ROW_HEIGHT;
    for (let y = 0; y < g.h; y++) {
      const py = y0 + y;
      if (py < 0 || py >= H) continue;
      for (let x = 0; x < g.w; x++) {
        const px = x0 + x;
        if (px < 0 || px >= W) continue;
        if (g.mask[y * g.w + x]) this.fb[py * W + px] = this.fg;
        else if (this.printMode === this.FILLBACKGROUND) this.fb[py * W + px] = this.bg;
      }
    }
    this.col += Math.round(g.advance);
  }

  ttfBitmap(font, text) {
    const key = `${font.family}|${text}`;
    let g = this.glyphCache.get(key);
    if (g) return g;
    const c = document.createElement('canvas');
    const ctx = c.getContext('2d', { willReadFrequently: true });
    const spec = `${font.size}px "${font.family}"`;
    ctx.font = spec;
    const advance = ctx.measureText(text).width;
    c.width = Math.max(1, Math.ceil(advance) + 2);
    c.height = TTF_ROW_HEIGHT;
    ctx.font = spec;
    ctx.fillStyle = '#fff';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText(text, 0, TTF_BASELINE);
    const data = ctx.getImageData(0, 0, c.width, c.height).data;
    const mask = new Uint8Array(c.width * c.height);
    for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] >= 110 ? 1 : 0;
    g = { w: c.width, h: c.height, mask, advance };
    this.glyphCache.set(key, g);
    return g;
  }

  string_(n, code) { return String.fromCharCode(code).repeat(Math.max(0, n)); }
  chr_(code) { return String.fromCharCode(code); }
  len(s) { return String(s).length; }
  left_(s, n) { return String(s).slice(0, n); }
  right_(s, n) { return n > 0 ? String(s).slice(-n) : ''; }
  str_(n) { return this.fmt(n).replace(/ $/, ''); }
  rnd() { return Math.random(); }
  timer() { return performance.now() / 1000; }

  // ------------------------------------------------------------ input
  static keyCodes(e) {
    const codes = [];
    const code = e.code || '';
    if (/^Key[A-Z]$/.test(code)) codes.push(97 + code.charCodeAt(3) - 65);
    else if (/^(Digit|Numpad)[0-9]$/.test(code)) codes.push(48 + Number(code.slice(-1)));
    else {
      const map = {
        ArrowUp: 18432, ArrowDown: 20480, ArrowLeft: 19200, ArrowRight: 19712,
        Enter: 13, NumpadEnter: 13, Escape: 27, Space: 32,
      };
      if (map[code]) codes.push(map[code]);
      if (code === 'ShiftLeft' || code === 'ShiftRight') codes.push(100303, 100304);
    }
    return codes;
  }

  attachInput(target) {
    const handled = (e) => !(e.ctrlKey || e.metaKey || e.altKey) && Runtime.keyCodes(e).length > 0;
    target.addEventListener('keydown', (e) => {
      if (!handled(e)) return;
      e.preventDefault();
      if (e.repeat) return;
      let char = '\0';
      if (e.key && e.key.length === 1) char = e.key;
      else if (e.key === 'Enter') char = '\r';
      else if (e.key === 'Escape') char = '\x1b';
      this.press(Runtime.keyCodes(e), char);
    });
    target.addEventListener('keyup', (e) => this.release(Runtime.keyCodes(e)));
    window.addEventListener('blur', () => this.down.clear());
  }

  // Shared by the keyboard handlers and the on-screen touch buttons.
  press(codes, char = '\0') {
    for (const k of codes) { this.down.add(k); this.tapped.add(k); }
    this.keySeq++;
    this.keyBuffer.push(char);
  }

  release(codes) {
    for (const k of codes) this.down.delete(k);
  }

  keydown(k) { return this.down.has(k) || this.tapped.has(k) ? -1 : 0; }
  inkey() { return this.keyBuffer.length ? this.keyBuffer.shift() : ''; }

  pollPads() {
    this.pads = [...(navigator.getGamepads ? navigator.getGamepads() : [])].filter(Boolean);
  }

  padAxis(pad, axis) {
    if (!pad) return 128;
    let v = pad.axes[axis] || 0;
    if (axis === 0) v += (pad.buttons[15]?.pressed ? 1 : 0) - (pad.buttons[14]?.pressed ? 1 : 0);
    if (axis === 1) v += (pad.buttons[13]?.pressed ? 1 : 0) - (pad.buttons[12]?.pressed ? 1 : 0);
    v = Math.max(-1, Math.min(1, v));
    return Math.round(128 + v * 127);
  }

  stick(n) { return this.padAxis(this.pads[n >> 1], n & 1); }

  strig(n) {
    const pad = this.pads[(n - 1) >> 1];
    return pad && pad.buttons.slice(0, 4).some((b) => b.pressed) ? -1 : 0;
  }

  // ------------------------------------------------------------ sound
  async initAudio() {
    if (!this.ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ac = new AC();
    }
    if (this.ac.state === 'suspended') await this.ac.resume();
  }

  async loadSounds() {
    const effects = this.manifest.files.filter((f) => /\.(ogg|wav)$/.test(f) && !f.endsWith('theme.ogg'));
    await Promise.all(effects.map(async (f) => {
      try {
        const res = await fetch(this.assetBase + f);
        const data = await res.arrayBuffer();
        if (this.ac) this.sounds.set(f, await this.ac.decodeAudioData(data));
      } catch (e) {
        console.warn('sound not loaded', f, e);
      }
    }));
  }

  sndplayfile(path) {
    const buf = this.sounds.get(norm(path));
    if (!buf || !this.ac) return;
    const src = this.ac.createBufferSource();
    src.buffer = buf;
    src.connect(this.ac.destination);
    src.start();
  }

  sndopen(path) {
    const a = new Audio(this.assetBase + norm(path));
    a.preload = 'auto';
    this.audioHandles.push(a);
    return this.audioHandles.length - 1;
  }

  sndloop(h) {
    const a = this.audioHandles[h];
    if (!a) return;
    a.loop = true;
    a.currentTime = 0;
    a.play().catch(() => {});
  }

  sndstop(h) {
    const a = this.audioHandles[h];
    if (!a) return;
    a.pause();
    a.currentTime = 0;
  }

  // ------------------------------------------------------------ system
  title(text) { document.title = text; }
  fullscreen(arg) {
    try { this.onFullscreen(arg !== this.OFF); } catch (e) { /* needs a user gesture */ }
  }

  async preloadFonts() {
    for (const f of this.manifest.files.filter((n) => n.endsWith('.ttf'))) {
      const family = `qb-${f.replace(/\W+/g, '-')}`;
      const face = new FontFace(family, `url(${this.assetBase}${f})`);
      await face.load();
      document.fonts.add(face);
      this.fontFamilies.set(f, family);
    }
  }

  // ------------------------------------------------------------ scheduling
  limit(fps) {
    this.tapped.clear();
    const now = performance.now();
    this.nextFrame += 1000 / fps;
    if (this.nextFrame < now - 50) this.nextFrame = now;
    this.pollPads();
    return { type: 'limit', until: this.nextFrame };
  }

  sleep(seconds) {
    this.tapped.clear();
    this.display();
    return {
      type: 'sleep',
      until: seconds ? performance.now() + seconds * 1000 : Infinity,
      seq: this.keySeq,
    };
  }

  system() { return { type: 'system' }; }

  async start(program) {
    this.gen = program(this);
    this.nextFrame = performance.now();
    this.wait = null;
    const tick = () => {
      if (this.stopped) return;
      requestAnimationFrame(tick);
      const now = performance.now();
      const w = this.wait;
      if (w) {
        const ready = w.type === 'limit'
          ? now >= w.until
          : this.keySeq > w.seq || now >= w.until;
        if (!ready) return;
        this.wait = null;
      }
      for (let guard = 0; guard < 1000 && !this.wait; guard++) {
        const r = this.gen.next();
        if (r.done) { this.exit(); return; }
        const y = r.value;
        if (y && y.type === 'system') { this.exit(); return; }
        this.wait = y;
      }
    };
    requestAnimationFrame(tick);
  }

  exit() {
    this.stopped = true;
    this.onExit();
  }
}
