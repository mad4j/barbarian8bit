import { Runtime } from './runtime.js';
import { decodeImage } from './png.js';
import { chooseScale, pickImages } from './gfx/resolution.js';
import { attachGestures } from './gestures.js';
import { buildTouchControls } from './touchpad.js';
import { program } from './game.js';

const $ = (id) => document.getElementById(id);
const canvas = $('screen');
const overlay = $('overlay');
const status = $('status');
const startButton = $('start');

function toggleFullscreen(want) {
  const on = Boolean(document.fullscreenElement);
  if (want === on) return;
  if (want) document.documentElement.requestFullscreen?.().catch(() => {});
  else document.exitFullscreen?.().catch(() => {});
}

// The widest the game can be shown on this device, in real pixels: fullscreen, in either orientation. The
// resolution is chosen once, so it has to cover that, or going fullscreen (or turning the phone) would blur it.
function displayWidth() {
  const long = Math.max(screen.width, screen.height);
  const short = Math.min(screen.width, screen.height);
  return Math.min(long, short * 1.6) * (window.devicePixelRatio || 1);
}

async function boot() {
  const manifest = await fetch('assets/manifest.json').then((r) => r.json());
  // ?scale=N forces the screen resolution (N real pixels per game pixel); by default it follows the display
  const forced = Number(new URLSearchParams(location.search).get('scale')) || undefined;
  const scale = chooseScale(manifest, forced, displayWidth());
  // every image in the resolution that fits the screen
  const { files, scales } = pickImages(manifest, scale);
  const images = {};
  await Promise.all(Object.entries(files).map(async ([key, file]) => {
    const res = await fetch(`assets/${file}`);
    if (!res.ok) throw new Error(`cannot load ${file}`);
    images[key] = await decodeImage(await res.arrayBuffer());
  }));
  const rt = new Runtime({ canvas, manifest: { ...manifest, imageScales: scales }, images, scale });
  await rt.preloadFonts();
  rt.onFullscreen = toggleFullscreen;
  globalThis.barbarian = rt; // handy for debugging in the console
  rt.onExit = () => {
    status.textContent = 'Thanks for playing!';
    startButton.textContent = 'Play again';
    startButton.hidden = false;
    startButton.onclick = () => location.reload();
    overlay.hidden = false;
  };

  status.textContent = 'Loading sounds…';
  await rt.initAudio();
  await rt.loadSounds();
  overlay.hidden = true;
  rt.attachInput(window);
  attachGestures(rt, canvas);
  if (matchMedia('(pointer: coarse)').matches) buildTouchControls(rt, $('touch'));
  // browsers only allow sound after a gesture, so unlock it on the first key / touch / click
  const unlock = () => {
    rt.unlockAudio();
    for (const ev of ['keydown', 'pointerdown']) window.removeEventListener(ev, unlock, true);
  };
  for (const ev of ['keydown', 'pointerdown']) window.addEventListener(ev, unlock, true);
  canvas.focus();
  rt.start(program);
}

$('fs').addEventListener('click', () => toggleFullscreen(!document.fullscreenElement));
boot().catch((e) => {
  status.textContent = `Error: ${e.message}`;
  console.error(e);
});
