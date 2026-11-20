/**
 * The true-colour screen.
 *
 * The game works in a 320x200 coordinate system ("game pixels"). The surface backing it has
 * `scale` real pixels for every game pixel in each direction, so artwork drawn at that resolution is
 * shown without being resampled, while lower-resolution images are enlarged by pixel replication.
 * All rectangles taken by this class are in real pixels, half-open: [x0, x1) x [y0, y1).
 */

export const WIDTH = 320;
export const HEIGHT = 200;

// `src` over `dst`, both packed 0xAABBGGRR, `dst` opaque; `a` is the coverage 0..255.
export function blend(src, dst, a) {
  const k = 255 - a;
  const r = ((src & 255) * a + (dst & 255) * k + 127) / 255;
  const g = (((src >>> 8) & 255) * a + ((dst >>> 8) & 255) * k + 127) / 255;
  const b = (((src >>> 16) & 255) * a + ((dst >>> 16) & 255) * k + 127) / 255;
  return ((255 << 24) | ((b | 0) << 16) | ((g | 0) << 8) | (r | 0)) >>> 0;
}

export class Surface {
  constructor(canvas, scale) {
    this.scale = scale;
    this.width = WIDTH * scale;
    this.height = HEIGHT * scale;
    canvas.width = this.width;
    canvas.height = this.height;
    canvas.dataset.scale = scale;
    this.ctx = canvas.getContext('2d');
    this.imageData = this.ctx.createImageData(this.width, this.height);
    this.px = new Uint32Array(this.imageData.data.buffer);
    this.columns = new Int32Array(this.width);
  }

  fill(color) { this.px.fill(color); }

  fillRect(x0, y0, x1, y1, color) {
    const { px, width, height } = this;
    const xa = Math.max(0, x0);
    const xb = Math.min(width, x1);
    if (xa >= xb) return;
    for (let y = Math.max(0, y0); y < Math.min(height, y1); y++) px.fill(color, y * width + xa, y * width + xb);
  }

  // Moves the picture up by `rows` and clears the rows that become free at the bottom.
  scrollUp(rows, color) {
    const { px, width, height } = this;
    px.copyWithin(0, width * rows);
    px.fill(color, width * (height - rows));
  }

  /**
   * Draws `img` stretched to the rectangle (left, top, w, h), optionally mirrored. Indexed images
   * go through `lut` (the live palette); true-colour images keep their own colours and are blended
   * by their alpha, or skipped where they match the image's colour key.
   */
  blit(img, lut, left, top, w, h, flipX, flipY) {
    const { px, width, height, columns } = this;
    const x0 = Math.max(0, -left);
    const x1 = Math.min(w, width - left);
    const y0 = Math.max(0, -top);
    const y1 = Math.min(h, height - top);
    if (x0 >= x1 || y0 >= y1) return;
    for (let dx = x0; dx < x1; dx++) {
      const sx = Math.floor((dx * img.w) / w);
      columns[dx - x0] = flipX ? img.w - 1 - sx : sx;
    }
    const count = x1 - x0;
    const indexed = img.kind === 'indexed';
    const src = indexed ? img.idx : img.rgba;
    for (let dy = y0; dy < y1; dy++) {
      const sy = Math.floor((dy * img.h) / h);
      const row = (flipY ? img.h - 1 - sy : sy) * img.w;
      let d = (top + dy) * width + left + x0;
      if (indexed) {
        const { tr, clearIdx } = img;
        for (let i = 0; i < count; i++, d++) {
          const p = src[row + columns[i]];
          if (p !== tr && p !== clearIdx) px[d] = lut[p];
        }
      } else {
        const { key } = img;
        for (let i = 0; i < count; i++, d++) {
          const c = src[row + columns[i]];
          const a = c >>> 24;
          if (a === 0 || (c & 0xffffff) === key) continue;
          px[d] = a === 255 ? c : blend(c, px[d], a);
        }
      }
    }
  }

  present() { this.ctx.putImageData(this.imageData, 0, 0); }
}
