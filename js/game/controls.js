// Reads the keys / gamepad of both players (or lets the computer decide) and turns them into a stick direction.
// A step here returns 'actionX' when the fighter has to act on the stick, 'poseX' when it has nothing to do.
import { demoFightA, fightB } from './ai.js';
import { startPose } from './fighter.js';

// Key codes (arrows and Shift of QB64's _KEYDOWN, ASCII for the letters) and gamepad axes / button.
const KEYS_A = { up: 18432, down: 20480, right: 19712, left: 19200, attack: 100303, padX: 0, padY: 1, button: 1 };
const KEYS_B = { up: 105, down: 107, right: 108, left: 106, attack: 32, padX: 2, padY: 3, button: 3 };
const KEY_VERSION = 118;

// stickX / stickY are 5..9 with 7 for the centre; a gamepad axis (0..255, 128 = centre) counts as a key below 65 or above 190.
function readStick(rt, f, keys) {
  if (rt.keydown(keys.up) || rt.stick(keys.padY) < 65) f.stickY -= 1;
  if (rt.keydown(keys.down) || rt.stick(keys.padY) > 190) f.stickY += 1;
  if (rt.keydown(keys.right) || rt.stick(keys.padX) > 190) f.stickX += 1;
  if (rt.keydown(keys.left) || rt.stick(keys.padX) < 65) f.stickX -= 1;
  f.attackKey = rt.keydown(keys.attack) || rt.strig(keys.button) === -1 ? 'yes' : 'no';
  f.stickY = Math.min(Math.max(f.stickY, 5), 9);
  f.stickX = Math.min(Math.max(f.stickX, 5), 9);
}

const DIRECTIONS = [
  ['upLeft', 'up', 'upRight'],
  ['left', 'neutral', 'right'],
  ['downLeft', 'down', 'downRight'],
];
const MIRRORED_DIAGONAL = { upLeft: 'upRight', upRight: 'upLeft', downLeft: 'downRight', downRight: 'downLeft' };

function stickDirection(f) {
  const column = f.stickX <= 6 ? 0 : f.stickX >= 8 ? 2 : 1;
  const row = f.stickY <= 6 ? 0 : f.stickY >= 8 ? 2 : 1;
  return DIRECTIONS[row][column];
}

function readKeysA(g) {
  const { rt, a } = g;
  a.stickX = 7;
  a.stickY = 7;
  a.stick = 'neutral';
  if (g.demo !== 'no') return;
  readStick(rt, a, KEYS_A);
  g.showVersion = rt.keydown(KEY_VERSION) ? 'yes' : 'no';
  a.stick = stickDirection(a);
  // once the fighters have changed sides the diagonals are mirrored
  if (g.direction === 'reverse') a.stick = MIRRORED_DIAGONAL[a.stick] ?? a.stick;
}

function readKeysB(g) {
  const { rt, b } = g;
  b.stickX = 7;
  b.stickY = 7;
  b.stick = 'neutral';
  if (g.mode !== 'vs') return;
  readStick(rt, b, KEYS_B);
  b.stick = stickDirection(b);
}

// Walking in, walking out: the fighters are not controlled.
function forcedMovesA(g) {
  const { rt, a } = g;
  if (g.entry === 'yes') {
    if (g.repeatMusic === 'no' && g.launchMusic === 'yes') {
      rt.sndplayfile('C64/sound/intro.wav');
      g.launchMusic = 'no';
    }
    a.stick = 'right';
    return 'actionA';
  }
  if (a.exiting === 'yes') {
    if (g.timeFinished === 'yes' && g.direction === 'reverse') {
      a.stick = 'right';
      return 'actionA';
    }
    g.direction = 'normal';
    a.stick = 'left';
    return 'actionA';
  }
  if (g.entryWizard === 'yes') {
    if (a.x >= 4) {
      g.entryWizard = 'no';
      return 'poseA';
    }
    a.stick = 'right';
    return 'actionA';
  }
  return undefined;
}

function forcedMovesB(g) {
  const { a, b } = g;
  if (g.entry === 'yes') {
    b.stick = 'left';
    return 'actionB';
  }
  if (b.exiting === 'yes') {
    if (g.timeFinished === 'yes' && g.direction === 'reverse') {
      b.stick = 'left';
      return 'actionB';
    }
    g.direction = 'normal';
    b.stick = 'right';
    return 'actionB';
  }
  // nothing to decide while someone is rolling past the other
  if (a.state === 'endRoll' || a.state === 'endRollRev' || b.state === 'endRoll' || b.state === 'endRollRev') {
    return 'poseB';
  }
  return undefined;
}

// '' / 'Rev' suffix of the pose names in a direction (the fighters face each other, or have changed sides)
const FACING_SUFFIX = { normal: '', reverse: 'Rev' };

// Nothing pressed: stand up from a sit, get impatient after a while, or just stand.
function idle(g, f, poseStep) {
  f.advanceStep = 0;
  f.retreatStep = 0;
  f.protectBody = 'no';
  f.protectHead = 'no';
  f.waiting += 1;
  f.stick = 'neutral';
  f.sitting = 'no';
  if (f.state === 'sit2') { startPose(g, f, 'standUp'); return poseStep; }
  if (f.state === 'sit2Rev') { startPose(g, f, 'standUpRev'); return poseStep; }
  const suffix = FACING_SUFFIX[g.direction];
  if (suffix !== undefined) {
    if (f.waiting > 250) {
      startPose(g, f, `waiting${suffix}`);
      return poseStep;
    }
    f.state = `standing${suffix}`;
  }
  return poseStep;
}

function actOrIdle(g, f, actionStep, poseStep) {
  return f.stick !== 'neutral' ? actionStep : idle(g, f, poseStep);
}

export function controlsA(g) {
  readKeysA(g);
  return forcedMovesA(g) ?? demoFightA(g) ?? actOrIdle(g, g.a, 'actionA', 'poseA');
}

export function controlsB(g) {
  readKeysB(g);
  return forcedMovesB(g) ?? fightB(g) ?? actOrIdle(g, g.b, 'actionB', 'poseB');
}
