/**
 * The palette of the emulated screen.
 *
 * The screen itself is true-colour; the palette only gives a meaning to colour *numbers*:
 * the colours of `COLOR`, `LINE` and `PRINT`, and the indexed images that are drawn through it
 * (`_LOADIMAGE(file, 256)`), which is how the opponent gets a different colour on every level.
 */

export const EGA16 = [
  [0, 0, 0], [0, 0, 170], [0, 170, 0], [0, 170, 170],
  [170, 0, 0], [170, 0, 170], [170, 85, 0], [170, 170, 170],
  [85, 85, 85], [85, 85, 255], [85, 255, 85], [85, 255, 255],
  [255, 85, 85], [255, 85, 255], [255, 255, 85], [255, 255, 255],
];

// Standard VGA default 256-colour palette (SCREEN 13).
export function vgaPalette() {
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

// Pixels are stored as 0xAABBGGRR (little-endian RGBA), the layout of canvas ImageData.
export const packRgba = (r, g, b, a = 255) => ((a << 24) | (b << 16) | (g << 8) | r) >>> 0;

export class Palette {
  constructor() {
    this.rgb = new Uint8Array(768);
    this.version = 0;
    this.packed = new Uint32Array(256);
    this.packedVersion = -1;
  }

  reset(colors) {
    this.rgb.fill(0);
    colors.forEach((c, i) => this.rgb.set(c, i * 3));
    this.version++;
  }

  // `rgb` is a QB64 colour value: 0xRRGGBB.
  set(index, rgb) {
    if (index < 0 || index > 255) return;
    this.rgb[index * 3] = (rgb >> 16) & 255;
    this.rgb[index * 3 + 1] = (rgb >> 8) & 255;
    this.rgb[index * 3 + 2] = rgb & 255;
    this.version++;
  }

  load(bytes) {
    this.rgb.fill(0);
    this.rgb.set(bytes.subarray(0, Math.min(768, bytes.length)));
    this.version++;
  }

  // The 256 colours as packed pixels, rebuilt only after the palette changed.
  get lut() {
    if (this.packedVersion !== this.version) {
      for (let i = 0; i < 256; i++) {
        this.packed[i] = packRgba(this.rgb[i * 3], this.rgb[i * 3 + 1], this.rgb[i * 3 + 2]);
      }
      this.packedVersion = this.version;
    }
    return this.packed;
  }

  color(index) { return this.lut[index & 255]; }
}
