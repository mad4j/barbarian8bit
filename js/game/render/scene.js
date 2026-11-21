// The scene behind the fighters: arena background, torches / braziers, the wipe between rounds,
// and the countdown clock.
import { isDead } from '../fighter.js';

// A row of `width` solid block characters (CP437 219) at text position (row, col).
export function block(rt, row, col, width) {
  rt.locate(row, col);
  rt.print([rt.string_(width, 219)], true);
}

const FLAME_SEQUENCE = [0, 2, 1, 3, 2, 0, 3, 1];
const TORCH_X = [72, 128, 192, 248];

// Torture room: four torches, the flames change every 4 frames.
function drawTorches(g) {
  const { rt } = g;
  for (let i = 0; i < 4; i++) {
    const flame = FLAME_SEQUENCE[((g.time >> 2) + i * 3) & 7] + 1;
    rt.putimage(rt.loadimage(`C64/stage/torch${flame}.gif`, 256), TORCH_X[i] - 16, 96);
  }
}

// Arena: two braziers drawn pixel by pixel ('o' = outer flame, 'y' = inner flame).
const BRAZIER_FRAMES = [
  ['..o..', '..y..', '.oyo.', '.oyo.', 'oyyyo', 'oyyyo', '.oyo.'],
  ['.o...', '.y...', '.yo..', 'oyyo.', 'oyyyo', 'oyyyo', '.oyo.'],
  ['...o.', '...y.', '..oy.', '.oyyo', 'oyyyo', 'oyyyo', '.oyo.'],
  ['.....', '..o..', '..y..', '.oyo.', 'oyyyo', 'oyyyo', '.oyo.'],
];
const BRAZIER_ORDER = [0, 1, 0, 3, 2, 3, 1, 2];
const BRAZIERS = [{ x: 56, phase: 0 }, { x: 262, phase: 3 }];

function drawBraziers(g) {
  const { rt } = g;
  for (const { x: cx, phase } of BRAZIERS) {
    const frame = BRAZIER_FRAMES[BRAZIER_ORDER[((g.time >> 2) + phase) & 7]];
    rt.line(cx - 4, 81, cx + 5, 87, 11, 'BF');
    for (let row = 0; row < 7; row++) {
      for (let col = 0; col < 5; col++) {
        const flame = frame[row][col];
        if (flame === '.') continue;
        const x = cx + (col - 2) * 2;
        rt.line(x, 81 + row, x + 1, 81 + row, flame === 'y' ? 7 : 8, 'BF');
      }
    }
  }
}

// Between two rounds the screen is wiped with solid rows, one more every 5 frames.
function wipeScreen(g) {
  const { rt, a, b } = g;
  rt.color(0);
  if (g.time > a.refTime + 55) {
    if (isDead(b)) a.x = 1;
    if (isDead(a)) b.x = 39;
  }
  // down to the floor, which a view (see view.js) can put below the original one
  const lastRow = Math.max(22, Math.floor((g.view.floorY - 1) / 8));
  for (let row = 8; row <= lastRow; row++) {
    if (g.time > a.refTime + 60 + (row - 8) * 5) block(rt, row, 5, 32);
  }
  if (g.time > a.refTime + 200) {
    g.transition = 'no';
    g.transitionFinished = 'yes';
  }
}

// The wizard fight and the end of the game have no fighter portraits: cover them (and the princess).
function coverPortraits(g) {
  const { rt, a } = g;
  rt.color(14);
  block(rt, 10, 15, 3);
  block(rt, 11, 15, 3);
  block(rt, 12, 14, 4);
  block(rt, 13, 14, 4);
  if (g.marianna === 'yes' && a.exiting === 'no') {
    for (let row = 10; row <= 13; row++) block(rt, row, 24, 3);
  }
  for (const col of [1, 35]) {
    for (const row of [1, 2]) {
      rt.locate(row, col);
      rt.print(['      '], true);
    }
  }
}

// One second (40 frames) off the countdown; in the 2 player game the round ends when it runs out.
function tickCountdown(g) {
  const { a, b } = g;
  if (g.time > g.tick + 40) {
    g.countdown -= 1;
    g.tick = g.time;
  }
  if (g.countdown < 0) {
    g.countdown = 0;
    if (g.mode === 'vs') {
      a.exiting = 'yes';
      b.exiting = 'yes';
      g.timeFinished = 'yes';
      a.busy = 'no';
      b.busy = 'no';
    }
  }
}

export function scene(g) {
  const { rt, a, b } = g;
  rt.putimage(g.backdrop.image, g.backdrop.x, g.backdrop.y);
  if (g.stage === 'torture') drawTorches(g);
  if (g.stage === 'arena') drawBraziers(g);
  if (g.transition === 'yes') wipeScreen(g);
  rt.line(92, 39, 226, 51, 14, 'BF'); // clears the countdown area
  if (g.wizard === 'yes' || g.wizard === 'dead' || g.game === 'lost') coverPortraits(g);
  if (!isDead(a) && !isDead(b)) tickCountdown(g);
  return 'hud';
}
