// Title artwork shown behind the menu panels.

const TITLE_IMAGE = {
  europe: 'C64/menu/title.png',
  USA: 'C64/menu/titleDS.png',
};

function drawTitle(rt, country) {
  rt.screen(13);
  rt.putimage(rt.loadimage(TITLE_IMAGE[country]));
}

// The copyright line of the US artwork lies at the bottom edge of the menu panel: wipe it.
export function drawBackdrop(rt, settings) {
  drawTitle(rt, settings.country);
  if (settings.country === 'USA') rt.line(55, 162, 267, 185, 0, 'BF');
}

// Logo alone for a few seconds (a key skips the wait), longer in fullscreen.
export function* showLogo(rt, settings) {
  drawTitle(rt, settings.country);
  yield rt.sleep(settings.fullscreen ? 4 : 2);
}
