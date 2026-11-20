// Sound effects are only played when the theme music is off.
const SOUND_DIR = 'C64/sound/';

export function sfx(g, file) {
  if (g.repeatMusic === 'no') g.rt.sndplayfile(SOUND_DIR + file);
}
