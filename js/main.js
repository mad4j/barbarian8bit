import { Runtime } from './runtime.js';
import { decodeImage } from './png.js';
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

async function boot() {
  const manifest = await fetch('assets/manifest.json').then((r) => r.json());
  const images = {};
  await Promise.all(Object.entries(manifest.images).map(async ([key, file]) => {
    const res = await fetch(`assets/${file}`);
    if (!res.ok) throw new Error(`cannot load ${file}`);
    images[key] = await decodeImage(await res.arrayBuffer());
  }));
  // ?scale=N forces the screen resolution (N real pixels per game pixel); by default it follows the asset pack
  const scale = Number(new URLSearchParams(location.search).get('scale')) || undefined;
  const rt = new Runtime({ canvas, manifest, images, scale });
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

  status.textContent = 'Ready';
  startButton.hidden = false;
  startButton.onclick = async () => {
    startButton.hidden = true;
    status.textContent = 'Loading sounds…';
    await rt.initAudio();
    await rt.loadSounds();
    overlay.hidden = true;
    rt.attachInput(window);
    attachGestures(rt, canvas);
    if (matchMedia('(pointer: coarse)').matches) buildTouchControls(rt, $('touch'));
    canvas.focus();
    rt.start(program);
  };
  startButton.focus();
}

$('fs').addEventListener('click', () => toggleFullscreen(!document.fullscreenElement));
boot().catch((e) => {
  status.textContent = `Error: ${e.message}`;
  console.error(e);
});
