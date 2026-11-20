// Severed heads: how they fly away when a fighter is beheaded, how the gnome kicks them around,
// and how they are drawn. (The gnome himself is in gnome.js.)
import { sfx } from './sound.js';
import { isBeheaded, isKilled } from './fighter.js';

// The flight of a head, from the moment of the beheading (positions in cells from the fighter, heights in pixels).
// A stage applies once the head is older than `after` frames: [after, columns, height, picture, bounce sound].
const FLIGHT = [
  [56, 16, 164, 3], [52, 15, 157, 2], [48, 14, 159, 1], [45, 13, 157, 6], [44, 13, 157, 6, true],
  [40, 12, 159, 5], [36, 11, 159, 4], [32, 10, 159, 3], [29, 9, 159, 2], [28, 9, 159, 2, true],
  [24, 8, 139, 1], [20, 7, 125, 6], [16, 6, 125, 5], [12, 5, 118, 4], [8, 4, 111, 3], [4, 3, 111, 2],
  [-1, 2, 111, 1],
];

// After 125 frames the gnome comes for the head.
const GNOME_COMES_AFTER = 125;

// One frame of the flight of the head of fighter `f`, flying away to the right or (`left`) to the left.
// Returns the next step, or nothing if the head has no stage yet.
function flyHead(g, f, left) {
  const { a } = g;
  const age = g.time - a.refTime;
  if (age > GNOME_COMES_AFTER) {
    g.gnome = 'yes';
    a.refTime = g.time;
    g.gnomeX = 3;
    return 'scene';
  }
  // flying to the left the head starts 4 cells right of player A, and at the fighter himself for player B
  const origin = left ? (f === a ? 4 : 0) : 0;
  for (const [after, columns, height, picture, bounce] of FLIGHT) {
    if (age <= after) continue;
    if (bounce) sfx(g, 'head.ogg');
    g.severedY = height;
    g.severedX = f.x + (left ? origin - columns : columns);
    g.severedFrame = picture;
    return 'scene';
  }
  return undefined;
}

// The heads fly to the right while player A stands in the left half, otherwise to the left.
export function flyingHeads(g) {
  const { a, b } = g;
  if (a.exiting === 'yes' || b.exiting === 'yes') return 'scene';
  if (!isBeheaded(a) && !isBeheaded(b)) return 'gnome';
  if (a.x > 19 && b.x > 20) return 'flyingHeadsLeft';
  if (isBeheaded(a)) {
    const next = flyHead(g, a, false);
    if (next) return next;
  }
  if (isBeheaded(b)) return flyHead(g, b, false) ?? 'scene';
  return 'flyingHeadsLeft';
}

export function flyingHeadsLeft(g) {
  const { a, b } = g;
  if (isBeheaded(a)) {
    const next = flyHead(g, a, true);
    if (next) return next;
  }
  if (isBeheaded(b)) {
    const next = flyHead(g, b, true);
    if (next) return next;
  }
  return 'gnome';
}

// When the gnome reaches the head he kicks it: it moves 16 pixels on at every stage.
// [after, height, picture, bounce sound]; stages without a height only wait.
const KICK = [
  [113], [112, 151, 5], [106], [105, 151, 6], [98], [97, 151, 1], [91], [90, 159, 2], [83], [82, 159, 3, true],
  [76], [75, 157, 4], [68], [67, 151, 5], [61], [60, 151, 6], [53], [52, 151, 1], [46], [45, 159, 2], [38],
  [37, 159, 3, true], [31], [30, 151, 4], [23], [22, 151, 5], [16], [15, 151, 6], [8], [7, 151, 1], [5],
  [4, 153, 2], [2], [1, undefined, undefined, true],
];

export function headRoll(g) {
  const { a, b } = g;
  if (g.gnome !== 'yes') return 'severedFlight';
  if (isKilled(a) || isKilled(b)) return 'gnomeEffects';
  if (g.football === 'yes') return 'gnomeKick';
  if (g.gnomeX < 273 && g.gnomeX > g.severedX - 24) {
    g.football = 'yes';
    b.refTime = g.time;
  }
  return 'drawSevered';
}

export function gnomeKick(g) {
  const { b } = g;
  if (g.football !== 'yes') return 'drawSevered';
  const age = g.time - b.refTime;
  for (const [after, height, picture, bounce] of KICK) {
    if (age <= after) continue;
    if (bounce && g.gnomeX < 273 && g.severedX < 273 && g.gnomeX < b.x * 8) sfx(g, 'head.ogg');
    if (height !== undefined) {
      g.severedY = height;
      g.severedX += 16;
      g.severedFrame = picture;
    }
    break;
  }
  return 'drawSevered';
}

function drawHead(g) {
  const { rt } = g;
  const { severedFrame: frame, severedX: x } = g;
  if (x >= 320) return;
  rt.putimage(rt.loadimage('C64/spritesA/headShadow.gif'), x, 168);
  rt.putimage(rt.loadimage(`C64/spritesA/severedHead${frame}.gif`), x, g.severedY);
}

export function drawSevered(g) {
  drawHead(g);
  return 'gnomeEffects';
}

// A head in flight (while nobody is kicking it): its position is still in cells.
export function severedFlight(g) {
  const { a, b } = g;
  if (isBeheaded(a) || isBeheaded(b)) {
    g.severedX = (g.severedX - 1) * 8;
    drawHead(g);
  }
  return 'gnomeEffects';
}
