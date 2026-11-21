/**
 * Which resolution the game runs at, and which file of the asset pack shows each image at it.
 *
 * An image of the pack can come in several resolutions: its "images" file is drawn at the pack's "scale"
 * (or its "imageScales" entry), and "variants" (by image key, { scale: file }) adds files drawn at other scales.
 * The screen resolution is chosen once, when the game starts, and every image is then loaded in the resolution
 * that fits it best, so artwork is never stretched or shrunk at run time: reducing it is done once, offline.
 */
import { clampScale } from './images.js';
import { WIDTH } from './surface.js';

// Every resolution the pack has artwork for, smallest first.
export function packScales(manifest) {
  const scales = new Set([manifest.scale || 1, ...Object.values(manifest.imageScales || {})]);
  for (const options of Object.values(manifest.variants || {})) {
    for (const scale of Object.keys(options)) scales.add(Number(scale));
  }
  return [...scales].sort((a, b) => a - b);
}

/**
 * The screen scale: `forced` (`?scale=N`) if given, else the smallest resolution of the pack that is hardly
 * coarser than the display. `display` is the widest the game can be shown, in real pixels (see main.js).
 */
export function chooseScale(manifest, forced, display) {
  if (forced) return clampScale(forced);
  const scales = packScales(manifest);
  const wanted = display / WIDTH;
  return clampScale(scales.find((s) => s >= wanted * 0.8) ?? scales[scales.length - 1]);
}

/**
 * The file and the scale of every image at screen scale `scale`: the variant with the highest resolution that
 * the screen can show whole, or the lowest one when they are all finer than the screen.
 */
export function pickImages(manifest, scale) {
  const files = {};
  const scales = {};
  for (const [key, file] of Object.entries(manifest.images)) {
    const own = manifest.imageScales?.[key] ?? manifest.scale ?? 1;
    const options = [[own, file]];
    for (const [s, f] of Object.entries(manifest.variants?.[key] || {})) options.push([Number(s), f]);
    options.sort((a, b) => a[0] - b[0]);
    const fitting = options.filter(([s]) => s <= scale);
    [scales[key], files[key]] = fitting.length ? fitting[fitting.length - 1] : options[0];
  }
  return { files, scales };
}
