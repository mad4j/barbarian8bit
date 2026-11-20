// The steps of the game. A step takes the game state and returns the name of the step to run next.
//
// One frame (1/40 s) runs these steps in turn; most of them can skip ahead (e.g. a fighter busy with an
// animation skips its controls) and `endFrame` ends the frame by waiting for the next one:
//
//   frame                      abort key, clock, win / lose conditions, flow between rounds
//   damageA controlsA actionA  player A: is hit, reads the controls / the computer, starts a pose
//   poseA endRollA ...         player A: animates the current pose (poses/)
//   damageB controlsB actionB  player B: the same
//   poseB endRollB ...
//   collision keepInside       fighters push each other and stay inside the arena
//   flyingHeads gnome          severed heads and the gnome
//   scene hud fighters ...     drawing: arena, HUD, fighters, blood, snakes, heads, foreground
//   endFrame                   shows the picture and waits for the next frame
//
// Between rounds and games the flow goes through `menu`, `newRound` and `stage` instead.
import { menu } from './session.js';
import { newRound, stage } from './stage.js';
import { frame, endFrame } from './round.js';
import { damageA, damageB } from './combat.js';
import { controlsA, controlsB } from './controls.js';
import { actionA, actionB } from './actions.js';
import {
  poseA, endRollA, endRollRevA, deadA,
  poseB, endRollB, endRollRevB, deadB,
} from './poses/index.js';
import { collision, keepInside, collisionRev, keepInsideRev } from './collision.js';
import {
  flyingHeads, flyingHeadsLeft, headRoll, gnomeKick, drawSevered, severedFlight,
} from './heads.js';
import { gnome, gnomeEffects } from './gnome.js';
import { scene } from './render/scene.js';
import { hud } from './render/hud.js';
import { fighters } from './render/fighters.js';
import { bloodA, bloodB } from './render/blood.js';
import { snakeA, snakeB } from './render/snakes.js';
import { foreground } from './render/foreground.js';

export const STEPS = {
  menu, newRound, stage, frame, endFrame,
  damageA, controlsA, actionA, poseA, endRollA, endRollRevA, deadA,
  damageB, controlsB, actionB, poseB, endRollB, endRollRevB, deadB,
  collision, keepInside, collisionRev, keepInsideRev,
  flyingHeads, flyingHeadsLeft, gnome, headRoll, gnomeKick, drawSevered, severedFlight, gnomeEffects,
  scene, hud, fighters, bloodA, bloodB, snakeA, snakeB, foreground,
};
