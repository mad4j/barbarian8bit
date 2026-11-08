import { Runtime } from './runtime.js';
import { decodePng } from './png.js';
import { program } from './game.js';

const $ = (id) => document.getElementById(id);
const stage = $('stage');
const canvas = $('screen');
const overlay = $('overlay');
const status = $('status');
const startButton = $('start');

function toggleFullscreen(want) {
  const on = Boolean(document.fullscreenElement);
  if (want === on) return;
  if (want) stage.requestFullscreen?.().catch(() => {});
  else document.exitFullscreen?.().catch(() => {});
}

// On-screen buttons for touch devices: [label, QB64 key codes, char for INKEY$]
const TOUCH_ROWS = [
  [...'01234567'].map((d) => [d, [48 + Number(d)], d]),
  [['Esc', [27], '\x1b'], ['Enter', [13], '\r'],
    ['◀', [19200]], ['▲', [18432]], ['▼', [20480]], ['▶', [19712]], ['Attack', [100303, 100304]]],
];

function buildTouchControls(rt) {
  const root = $('touch');
  for (const row of TOUCH_ROWS) {
    const div = document.createElement('div');
    for (const [label, codes, char] of row) {
      const b = document.createElement('button');
      b.textContent = label;
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        b.setPointerCapture(e.pointerId);
        b.classList.add('on');
        rt.press(codes, char);
      });
      const up = () => { b.classList.remove('on'); rt.release(codes); };
      b.addEventListener('pointerup', up);
      b.addEventListener('pointercancel', up);
      div.append(b);
    }
    root.append(div);
  }
  root.hidden = false;
  document.body.classList.add('touch');
}

async function boot() {
  const manifest = await fetch('assets/manifest.json').then((r) => r.json());
  const images = {};
  await Promise.all(Object.entries(manifest.images).map(async ([key, file]) => {
    const res = await fetch(`assets/${file}`);
    if (!res.ok) throw new Error(`cannot load ${file}`);
    images[key] = await decodePng(await res.arrayBuffer());
  }));
  const rt = new Runtime({ canvas, manifest, images });
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
    if (matchMedia('(pointer: coarse)').matches) buildTouchControls(rt);
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
