// The gnome: he walks in after a fighter has been killed, laughs, and drags the loser away.
import { sfx } from './sound.js';
import { isDead } from './fighter.js';

// Walking: a new picture every 6 frames and a step of 7 pixels at the 7th and the 19th frame of each 25.
function walk(g) {
  const { a } = g;
  const age = g.time - a.refTime;
  g.gnomeFrame = 4;
  if (age > 6) g.gnomeFrame = 1;
  if (age > 12) g.gnomeFrame = 2;
  if (age > 18) g.gnomeFrame = 3;
  if (age > 24) a.refTime = g.time;
  else if (age === 7 || age === 19) g.gnomeX += 7;
}

// Laughing: the two laughing pictures alternate, [age after which, picture].
const LAUGH = [[95, 5], [75, 6], [60, 5], [45, 6], [30, 5], [15, 6]];

function laugh(g) {
  const { a } = g;
  const age = g.time - a.refTime;
  if (age > 100) {
    g.finishedLaughing = 'yes';
    a.refTime = g.time;
    return;
  }
  const stage = LAUGH.find(([after]) => age > after);
  g.gnomeFrame = stage ? stage[1] : 5;
}

export function gnome(g) {
  if (g.gnome === 'yes') {
    if (g.gnomeLaughs === 'no' || g.finishedLaughing === 'yes') walk(g);
    else laugh(g);
  }
  return 'scene';
}

const GNOME_PICTURES = { 1: 'gnome1', 2: 'gnome2', 3: 'gnome3', 4: 'gnome4', 5: 'gnomeLaugh1', 6: 'gnomeLaugh2' };

// The gnome has taken the loser off the screen: the winner gets the round
// (2 players: the time bonus starts counting, 1 player: the winner walks off the screen too).
function winnerLeaves(g, winner, loser) {
  if (g.mode === 'vs') winner.bonus = 'yes';
  if (g.mode === 'solo' && loser.x >= 37) {
    winner.exiting = 'yes';
    winner.busy = 'no';
  }
}

// How far (in pixels) the gnome must have walked past a dead fighter before he laughs, and before he drags the body.
// It depends on the side the fighter fell to: his state is 'dead...' or 'dead...Rev'.
const REACH = {
  a: { normal: { laugh: 20, drag: 56 }, reverse: { laugh: 0, drag: 35 } },
  b: { normal: { laugh: 0, drag: 35 }, reverse: { laugh: 20, drag: 56 } },
};

function fallenSide(f) {
  if (f.state === 'deadBeheading' || f.state === 'dead') return 'normal';
  if (f.state === 'deadBeheadingRev' || f.state === 'deadRev') return 'reverse';
  return null;
}

export function gnomeEffects(g) {
  const { rt, a, b } = g;
  if (g.gnome === 'yes') {
    if (g.gnomeX > 350) {
      g.gnomeX = 350;
      if (isDead(b)) winnerLeaves(g, a, b);
      if (isDead(a)) winnerLeaves(g, b, a);
    }
    const picture = GNOME_PICTURES[g.gnomeFrame];
    if (picture && g.gnomeX < 312) rt.putimage(rt.loadimage(`C64/sprites/${picture}.gif`), g.gnomeX, 144);
  }
  const fighters = [[a, REACH.a], [b, REACH.b]];
  for (const [f, reach] of fighters) {
    const side = fallenSide(f);
    if (side && g.gnomeX > f.pixelX + reach[side].laugh) {
      if (g.soundLaughs === 'no') sfx(g, 'gnome.wav');
      g.soundLaughs = 'yes';
      g.gnomeLaughs = 'yes';
    }
  }
  for (const [f, reach] of fighters) {
    const side = fallenSide(f);
    if (side && g.gnomeX > f.pixelX + reach[side].drag) {
      if (g.gnomePulls === 'yes') sfx(g, 'gameover.ogg');
      g.gnomePulls = 'no';
      f.x += 1;
    }
  }
  return 'foreground';
}
