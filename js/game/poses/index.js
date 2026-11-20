// The poses of both fighters, evaluated as an ordered chain: each pose whose name matches the fighter's
// state runs in turn, and a pose that returns nothing lets the chain carry on with the next one
// (the order is part of the behaviour).
import { walkA, walkB } from './walk.js';
import { postureA, postureB } from './posture.js';
import { rollA, rollB } from './roll.js';
import { defenseA, defenseB } from './defense.js';
import { attacksA, attacksB } from './attacks.js';
import { hitsA, hitsB } from './hits.js';
import { finishA, finishB } from './finish.js';

const POSES_A = { ...walkA, ...postureA, ...rollA, ...defenseA, ...attacksA, ...hitsA, ...finishA };
const ORDER_A = [
  'waiting', 'waitingRev', 'standing', 'standingRev', 'advance', 'advance1',
  'advance2', 'advance3', 'advance4', 'advanceRev', 'advance1Rev', 'advance2Rev',
  'advance3Rev', 'advance4Rev', 'retreat', 'retreat1', 'retreat2', 'retreat3',
  'retreat4', 'retreatRev', 'retreat1Rev', 'retreat2Rev', 'retreat3Rev', 'retreat4Rev',
  'jump', 'jumpRev', 'sit', 'sit2', 'standUp', 'sitRev',
  'sit2Rev', 'standUpRev', 'rollForward', 'endRoll', 'rollForwardRev', 'endRollRev',
  'rollBack', 'rollBackRev', 'protectHead1', 'protectHead', 'protectHeadRev1', 'protectHeadRev',
  'protectBody1', 'protectBody', 'protectBodyRev1', 'protectBodyRev', 'neck', 'neckRev',
  'bodyChop', 'bodyChopRev', 'knee', 'kneeRev', 'spider', 'spiderRev',
  'kick', 'kickRev', 'headButt', 'headButtRev', 'behead', 'beheadRev',
  'forehead', 'foreheadRev', 'turn', 'turnRev', 'winner', 'winnerRev',
  'winnerKO', 'winnerKORev', 'hit', 'hit1', 'hitRev', 'hit1Rev',
  'fall', 'fall1', 'fallRev', 'fall1Rev', 'clingBody', 'clingHead',
  'dead', 'deadRev', 'deadBeheading', 'deadBeheadingRev', 'deadWizard', 'victory',
];
const CHAIN_A = ORDER_A.map((name) => [name, POSES_A[name]]);

const POSES_B = { ...walkB, ...postureB, ...rollB, ...defenseB, ...attacksB, ...hitsB, ...finishB };
const ORDER_B = [
  'standing', 'standingRev', 'waiting', 'waitingRev', 'jump', 'jumpRev',
  'advance', 'advance1', 'advance2', 'advance3', 'advance4', 'advanceRev',
  'advance1Rev', 'advance2Rev', 'advance3Rev', 'advance4Rev', 'retreat', 'retreat1',
  'retreat2', 'retreat3', 'retreat4', 'retreatRev', 'retreat1Rev', 'retreat2Rev',
  'retreat3Rev', 'retreat4Rev', 'sit', 'sit2', 'standUp', 'sitRev',
  'sit2Rev', 'standUpRev', 'rollForward', 'endRoll', 'rollForwardRev', 'endRollRev',
  'rollBack', 'rollBackRev', 'protectHead1', 'protectHead', 'protectHeadRev1', 'protectHeadRev',
  'protectBody1', 'protectBody', 'protectBodyRev1', 'protectBodyRev', 'neck', 'neckRev',
  'bodyChop', 'bodyChopRev', 'knee', 'kneeRev', 'spider', 'spiderRev',
  'kick', 'kickRev', 'headButt', 'headButtRev', 'behead', 'beheadRev',
  'forehead', 'foreheadRev', 'turn', 'turnRev', 'winner', 'winnerRev',
  'winnerKO', 'winnerKORev', 'hit', 'hit1', 'hitRev', 'hit1Rev',
  'fall', 'fall1', 'fallRev', 'fall1Rev', 'clingBody', 'clingHead',
  'dead', 'deadRev', 'deadBeheading', 'deadBeheadingRev', 'wizard',
];
const CHAIN_B = ORDER_B.map((name) => [name, POSES_B[name]]);

// Runs the chain from entry `from`; the fighter is `a` (player A) or `b` (player B).
function runChain(g, fighter, chain, from, after) {
  for (let i = from; i < chain.length; i++) {
    const [name, run] = chain[i];
    if (fighter.state !== name) continue;
    const next = run(g, g.a, g.b);
    if (next) return next;
  }
  return after;
}

// A pose can also hand over to the chain further down: a roll ends in 'endRoll(Rev)' and a fighter
// who has been killed continues at 'dead'. `after` is the step that follows the chain.
export const poseA = (g) => runChain(g, g.a, CHAIN_A, 0, 'damageB');
export const endRollA = (g) => runChain(g, g.a, CHAIN_A, ORDER_A.indexOf('endRoll'), 'damageB');
export const endRollRevA = (g) => runChain(g, g.a, CHAIN_A, ORDER_A.indexOf('endRollRev'), 'damageB');
export const deadA = (g) => runChain(g, g.a, CHAIN_A, ORDER_A.indexOf('dead'), 'damageB');

export const poseB = (g) => runChain(g, g.b, CHAIN_B, 0, 'collision');
export const endRollB = (g) => runChain(g, g.b, CHAIN_B, ORDER_B.indexOf('endRoll'), 'collision');
export const endRollRevB = (g) => runChain(g, g.b, CHAIN_B, ORDER_B.indexOf('endRollRev'), 'collision');
export const deadB = (g) => runChain(g, g.b, CHAIN_B, ORDER_B.indexOf('dead'), 'collision');
