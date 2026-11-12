// Options: three consecutive choices (version, sound, display), applied as they are made.
import { CANCEL, selectMenu } from './select.js';
import { drawBackdrop, showLogo } from './backdrop.js';

const VERSIONS = [
  { label: 'EUROPE', country: 'europe' },
  { label: 'USA', country: 'USA' },
];

const SOUNDS = [
  { label: 'SOUND EFFECTS', music: false },
  { label: 'MUSIC', music: true },
];

const DISPLAYS = [
  { label: 'FULLSCREEN', fullscreen: true },
  { label: 'WINDOWS MODE', fullscreen: false },
];

// Index of the entry matching the current value of the setting.
const current = (entries, key, value) => Math.max(0, entries.findIndex((e) => e[key] === value));

export function* runOptions({ rt, settings, theme }) {
  const choose = (title, entries, key) => selectMenu(rt, {
    title, items: entries, selected: current(entries, key, settings[key]), cancelable: true,
  });

  let index = yield* choose('VERSION', VERSIONS, 'country');
  if (index === CANCEL) return;
  settings.country = VERSIONS[index].country;
  drawBackdrop(rt, settings); // the artwork depends on the version

  index = yield* choose('SOUND', SOUNDS, 'music');
  if (index === CANCEL) return;
  const { music } = SOUNDS[index];
  if (music && !settings.music) rt.sndloop(theme);
  if (!music && settings.music) rt.sndstop(theme);
  settings.music = music;

  index = yield* choose('DISPLAY', DISPLAYS, 'fullscreen');
  if (index === CANCEL) return;
  const { fullscreen } = DISPLAYS[index];
  const changed = fullscreen !== settings.fullscreen;
  if (changed) rt.fullscreen(fullscreen ? undefined : rt.OFF);
  settings.fullscreen = fullscreen;
  // back to the logo, unless fullscreen was chosen again while already on
  if (changed || !fullscreen) yield* showLogo(rt, settings);
}
