// The two fighters: sprite, position on the screen and the blood spurting from a cut off head.
import { selectSprite, SPRITES_A, SPRITES_B } from './sprites.js';
import { isBeheaded, isDead } from '../fighter.js';

// How the picture of a fighter is put on the screen, by the `imageDirection` of its sprite:
// as it is, mirrored, or mirrored with a wider frame ([left edge, right edge] offsets from the sprite position).
const AS_IS = 'asIs';
const MIRRORED = [39, 0];
const PLACEMENT_A = { normal: AS_IS, reverse: MIRRORED, large3Rev: [40, -23], large4Rev: [41, -31], large1Rev: [39, -8] };
const PLACEMENT_B = { normal: MIRRORED, reverse: AS_IS, large4: [41, -31], large3: [40, -23], large1: [39, -8] };
// the second drawing of player A (see below) has no wide frame number 4
const PLACEMENT_A_AGAIN = { normal: AS_IS, reverse: MIRRORED, large3Rev: [40, -23], large1Rev: [39, -8] };

// The sprite is put one cell left of the fighter and three cells above his forehead.
function locateSprite(f) {
  f.cellX = f.x - 1;
  f.cellY = f.foreheadY - 3;
  f.pixelX = f.cellX * 8;
  f.pixelY = f.cellY * 8;
}

function putFighter(rt, f, placement) {
  const how = placement[f.imageDirection];
  if (how === AS_IS) rt.putimage(f.image, f.pixelX, f.pixelY);
  else if (how) rt.putimage(f.image, f.pixelX + how[0], f.pixelY, f.pixelX + how[1], f.pixelY + 79);
}

// Blood spurting from the neck (phases 1-3) and then from the body (4-6) of a beheaded fighter.
function drawSpurt(g, f) {
  const { rt } = g;
  const phase = f.bloodBeheading;
  if (!isBeheaded(f) || phase < 1 || phase > 6) return;
  const image = rt.loadimage(`C64/sprites/spurt${((phase - 1) % 3) + 1}.gif`);
  if (phase <= 3) rt.putimage(image, f.x * 8 + 1, (f.foreheadY - 2) * 8);
  else rt.putimage(image, f.x * 8, (f.bodyY - 3) * 8 - 2);
}

export function fighters(g) {
  const { rt, a, b } = g;
  selectSprite(rt, a, SPRITES_A);
  locateSprite(a);
  if (a.pixelX > 0) putFighter(rt, a, PLACEMENT_A);
  selectSprite(rt, b, SPRITES_B);
  locateSprite(b);
  if (b.pixelX < 290) putFighter(rt, b, PLACEMENT_B);
  // when A is dying or kneeing he is drawn again, over B
  if ((isDead(a) || a.state === 'knee' || a.state === 'kneeRev') && a.pixelX > 0) putFighter(rt, a, PLACEMENT_A_AGAIN);
  drawSpurt(g, a);
  drawSpurt(g, b);
  return 'bloodA';
}
