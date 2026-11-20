// Poses: waiting, standing, walking forward and back.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX, resetHurtY, startPose, setPose, attackPressed } from '../fighter.js';

export const walkA = {
  waiting(g, a, b) {
    setHurtX(a, a.x + 4);
    if (g.time > a.refTime + 50) { a.busy = 'no'; a.waiting = 1; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 37) { a.sprite = 'waiting1'; return 'damageB'; }
    if (g.time > a.refTime + 30) { a.sprite = 'waiting2'; return 'damageB'; }
    if (g.time > a.refTime + 23) { a.sprite = 'waiting3'; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'waiting2'; return 'damageB'; }
    if (g.time > a.refTime + 7) { a.sprite = 'waiting1'; return 'damageB'; }
  },
  waitingRev(g, a, b) {
    setHurtX(a, a.x);
    if (g.time > a.refTime + 50) { a.busy = 'no'; a.waiting = 1; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 37) { a.sprite = 'waiting1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 30) { a.sprite = 'waiting2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 23) { a.sprite = 'waiting3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'waiting2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 7) { a.sprite = 'waiting1Rev'; return 'damageB'; }
  },
  standing(g, a, b) {
    a.sprite = 'standing';
    a.beheadable = 'yes';
    a.bleeding = 'no';
    a.attackX = a.x; a.attackY = 14;
    resetHurtY(a);
    setHurtX(a, a.x + 4);
    if (g.demo === 'yes') {
      if (g.time > a.refTime + 20) { a.busy = 'no'; }
    }
  },
  standingRev(g, a, b) {
    a.sprite = 'standingRev';
    a.beheadable = 'yes';
    a.bleeding = 'no';
    a.attackX = a.foreheadX + 4; a.attackY = 14;
    resetHurtY(a);
    setHurtX(a, a.x);
  },
  advance(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    if (attackPressed(g, a) && g.entry === 'no') { startPose(g, a, 'bodyChop'); return 'poseA'; }
    a.sprite = 'walk1'; a.advanceStep = 1; a.x += 1;
  },
  advance1(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    if (attackPressed(g, a) && g.entry === 'no') { startPose(g, a, 'bodyChop'); return 'poseA'; }
    if (g.time > a.refTime + 9) { a.x += 1; a.sprite = 'walk2'; a.advanceStep = 2; }
  },
  advance2(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.sprite = 'walk2';
    if (attackPressed(g, a) && g.entry === 'no') { startPose(g, a, 'bodyChop'); return 'poseA'; }
    if (g.time > a.refTime + 18) { a.x += 1; a.sprite = 'walk3'; a.advanceStep = 3; }
  },
  advance3(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.sprite = 'walk3';
    if (attackPressed(g, a) && g.entry === 'no') { startPose(g, a, 'bodyChop'); return 'poseA'; }
    if (g.time > a.refTime + 27) { a.x += 1; a.sprite = 'standing'; a.advanceStep = 4; }
  },
  advance4(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.sprite = 'standing';
    if (attackPressed(g, a) && g.entry === 'no') { startPose(g, a, 'bodyChop'); return 'poseA'; }
    if (g.time > a.refTime + 36) { setPose(g, a, 'standing'); a.advanceStep = 0; }
  },
  advanceRev(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    if (attackPressed(g, a)) { startPose(g, a, 'bodyChopRev'); return 'poseA'; }
    a.sprite = 'walk1Rev'; a.advanceStep = 1; a.x -= 1;
  },
  advance1Rev(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    if (attackPressed(g, a)) { startPose(g, a, 'bodyChopRev'); return 'poseA'; }
    if (g.time > a.refTime + 9) { a.x -= 1; a.sprite = 'walk2Rev'; a.advanceStep = 2; }
  },
  advance2Rev(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    a.sprite = 'walk2Rev';
    if (attackPressed(g, a)) { startPose(g, a, 'bodyChopRev'); return 'poseA'; }
    if (g.time > a.refTime + 18) { a.x -= 1; a.sprite = 'walk3Rev'; a.advanceStep = 3; }
  },
  advance3Rev(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    a.sprite = 'walk3Rev';
    if (attackPressed(g, a)) { startPose(g, a, 'bodyChopRev'); return 'poseA'; }
    if (g.time > a.refTime + 27) { a.x -= 1; a.sprite = 'standingRev'; a.advanceStep = 4; }
  },
  advance4Rev(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    a.sprite = 'standingRev';
    if (attackPressed(g, a)) { startPose(g, a, 'bodyChopRev'); return 'poseA'; }
    if (g.time > a.refTime + 36) { setPose(g, a, 'standingRev'); a.advanceStep = 0; }
  },
  retreat(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    if (attackPressed(g, a) && a.exiting === 'no') { startPose(g, a, 'behead'); return 'poseA'; }
    a.sprite = 'walk3'; a.retreatStep = 1; a.x -= 1;
  },
  retreat1(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    if (attackPressed(g, a) && a.exiting === 'no') { startPose(g, a, 'behead'); return 'poseA'; }
    if (g.time > a.refTime + 9) { a.x -= 1; a.sprite = 'walk2'; a.retreatStep = 2; }
  },
  retreat2(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.sprite = 'walk2';
    if (attackPressed(g, a) && a.exiting === 'no') { startPose(g, a, 'behead'); return 'poseA'; }
    if (g.time > a.refTime + 18) { a.x -= 1; a.sprite = 'walk1'; a.retreatStep = 3; }
  },
  retreat3(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.sprite = 'walk1';
    if (attackPressed(g, a) && a.exiting === 'no') { startPose(g, a, 'behead'); return 'poseA'; }
    if (g.time > a.refTime + 27) { a.x -= 1; a.sprite = 'standing'; a.retreatStep = 4; }
  },
  retreat4(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.sprite = 'standing';
    if (attackPressed(g, a) && a.exiting === 'no') { startPose(g, a, 'behead'); return 'poseA'; }
    if (g.time > a.refTime + 36) { setPose(g, a, 'standing'); a.retreatStep = 0; }
  },
  retreatRev(g, a, b) {
    a.attackX = a.x + 4;
    setHurtX(a, a.x);
    if (attackPressed(g, a)) { startPose(g, a, 'beheadRev'); return 'poseA'; }
    a.sprite = 'walk3Rev'; a.retreatStep = 1; a.x += 1;
  },
  retreat1Rev(g, a, b) {
    a.attackX = a.x + 4;
    setHurtX(a, a.x);
    if (attackPressed(g, a)) { startPose(g, a, 'beheadRev'); return 'poseA'; }
    if (g.time > a.refTime + 9) { a.x += 1; a.sprite = 'walk2Rev'; a.retreatStep = 2; }
  },
  retreat2Rev(g, a, b) {
    a.attackX = a.x + 4;
    setHurtX(a, a.x);
    a.sprite = 'walk2Rev';
    if (attackPressed(g, a)) { startPose(g, a, 'beheadRev'); return 'poseA'; }
    if (g.time > a.refTime + 18) { a.x += 1; a.sprite = 'walk1Rev'; a.retreatStep = 3; }
  },
  retreat3Rev(g, a, b) {
    a.attackX = a.x + 4;
    setHurtX(a, a.x);
    a.sprite = 'walk1Rev';
    if (attackPressed(g, a)) { startPose(g, a, 'beheadRev'); return 'poseA'; }
    if (g.time > a.refTime + 27) { a.x += 1; a.sprite = 'standingRev'; a.retreatStep = 4; }
  },
  retreat4Rev(g, a, b) {
    a.attackX = a.x + 4;
    setHurtX(a, a.x);
    a.sprite = 'standingRev';
    if (attackPressed(g, a)) { startPose(g, a, 'beheadRev'); return 'poseA'; }
    if (g.time > a.refTime + 36) { setPose(g, a, 'standingRev'); a.retreatStep = 0; }
  },
};

export const walkB = {
  standing(g, a, b) {
    b.sprite = 'standing'; b.beheadable = 'yes';
    if (g.wizard === 'yes') { b.sprite = 'drax1'; b.beheadable = 'no'; }
    if (g.marianna === 'yes') { b.sprite = 'marianna'; b.beheadable = 'no'; }
    b.bleeding = 'no';
    b.attackX = b.x + 4; b.attackY = 14;
    resetHurtY(b);
    setHurtX(b, b.x);
    if (g.mode === 'solo') {
      if (g.time > b.refTime + 20) { b.busy = 'no'; }
    }
  },
  standingRev(g, a, b) {
    b.sprite = 'standingRev';
    b.beheadable = 'yes';
    b.bleeding = 'no';
    b.attackX = b.x; b.attackY = 14;
    resetHurtY(b);
    setHurtX(b, b.x + 4);
    if (g.mode === 'solo') {
      if (g.time > b.refTime + 20) { b.busy = 'no'; }
    }
  },
  waiting(g, a, b) {
    setHurtX(b, b.x);
    if (g.time > b.refTime + 50) { b.busy = 'no'; b.waiting = 1; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 37) { b.sprite = 'waiting1'; return 'collision'; }
    if (g.time > b.refTime + 30) { b.sprite = 'waiting2'; return 'collision'; }
    if (g.time > b.refTime + 23) { b.sprite = 'waiting3'; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'waiting2'; return 'collision'; }
    if (g.time > b.refTime + 7) { b.sprite = 'waiting1'; return 'collision'; }
  },
  waitingRev(g, a, b) {
    setHurtX(b, b.x + 4);
    if (g.time > b.refTime + 50) { b.busy = 'no'; b.waiting = 1; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 37) { b.sprite = 'waiting1Rev'; return 'collision'; }
    if (g.time > b.refTime + 30) { b.sprite = 'waiting2Rev'; return 'collision'; }
    if (g.time > b.refTime + 23) { b.sprite = 'waiting3Rev'; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'waiting2Rev'; return 'collision'; }
    if (g.time > b.refTime + 7) { b.sprite = 'waiting1Rev'; return 'collision'; }
  },
  advance(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    if (b.attackKey === 'yes' && g.entry === 'no') { startPose(g, b, 'bodyChop'); return 'poseB'; }
    b.sprite = 'walk1'; b.advanceStep = 1; b.x -= 1;
  },
  advance1(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    if (b.attackKey === 'yes' && g.entry === 'no') { startPose(g, b, 'bodyChop'); return 'poseB'; }
    if (g.time > b.refTime + 9) { b.x -= 1; b.sprite = 'walk2'; b.advanceStep = 2; }
  },
  advance2(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.sprite = 'walk2';
    if (b.attackKey === 'yes' && g.entry === 'no') { startPose(g, b, 'bodyChop'); return 'poseB'; }
    if (g.time > b.refTime + 18) { b.x -= 1; b.sprite = 'walk3'; b.advanceStep = 3; }
  },
  advance3(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.sprite = 'walk3';
    if (b.attackKey === 'yes' && g.entry === 'no') { startPose(g, b, 'bodyChop'); return 'poseB'; }
    if (g.time > b.refTime + 27) { b.x -= 1; b.sprite = 'standing'; b.advanceStep = 4; }
  },
  advance4(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.sprite = 'standing';
    if (b.attackKey === 'yes' && g.entry === 'no') { startPose(g, b, 'bodyChop'); return 'poseB'; }
    if (g.time > b.refTime + 36) { setPose(g, b, 'standing'); b.advanceStep = 0; }
  },
  advanceRev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    if (b.attackKey === 'yes') { startPose(g, b, 'bodyChopRev'); return 'poseB'; }
    b.sprite = 'walk1Rev'; b.advanceStep = 1; b.x += 1;
  },
  advance1Rev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    if (b.attackKey === 'yes') { startPose(g, b, 'bodyChopRev'); return 'poseB'; }
    if (g.time > b.refTime + 9) { b.x += 1; b.sprite = 'walk2Rev'; b.advanceStep = 2; }
  },
  advance2Rev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    b.sprite = 'walk2Rev';
    if (b.attackKey === 'yes') { startPose(g, b, 'bodyChopRev'); return 'poseB'; }
    if (g.time > b.refTime + 18) { b.x += 1; b.sprite = 'walk3Rev'; b.advanceStep = 3; }
  },
  advance3Rev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    b.sprite = 'walk3Rev';
    if (b.attackKey === 'yes') { startPose(g, b, 'bodyChopRev'); return 'poseB'; }
    if (g.time > b.refTime + 27) { b.x += 1; b.sprite = 'standingRev'; b.advanceStep = 4; }
  },
  advance4Rev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    b.sprite = 'standingRev';
    if (b.attackKey === 'yes') { startPose(g, b, 'bodyChopRev'); return 'poseB'; }
    if (g.time > b.refTime + 36) { setPose(g, b, 'standingRev'); b.advanceStep = 0; }
  },
  retreat(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    if (b.attackKey === 'yes' && b.exiting === 'no') { startPose(g, b, 'behead'); return 'poseB'; }
    b.sprite = 'walk3'; b.retreatStep = 1; b.x += 1;
  },
  retreat1(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    if (b.attackKey === 'yes' && b.exiting === 'no') { startPose(g, b, 'behead'); return 'poseB'; }
    if (g.time > b.refTime + 9) { b.x += 1; b.sprite = 'walk2'; b.retreatStep = 2; }
  },
  retreat2(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.sprite = 'walk2';
    if (b.attackKey === 'yes' && b.exiting === 'no') { startPose(g, b, 'behead'); return 'poseB'; }
    if (g.time > b.refTime + 18) { b.x += 1; b.sprite = 'walk1'; b.retreatStep = 3; }
  },
  retreat3(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.sprite = 'walk1';
    if (b.attackKey === 'yes' && b.exiting === 'no') { startPose(g, b, 'behead'); return 'poseB'; }
    if (g.time > b.refTime + 27) { b.x += 1; b.sprite = 'standing'; b.retreatStep = 4; }
  },
  retreat4(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.sprite = 'standing';
    if (b.attackKey === 'yes' && b.exiting === 'no') { startPose(g, b, 'behead'); return 'poseB'; }
    if (g.time > b.refTime + 36) { setPose(g, b, 'standing'); b.retreatStep = 0; }
  },
  retreatRev(g, a, b) {
    b.attackX = b.x;
    setHurtX(b, b.x + 4);
    if (b.attackKey === 'yes') { startPose(g, b, 'beheadRev'); return 'poseB'; }
    b.sprite = 'walk3Rev'; b.retreatStep = 1; b.x -= 1;
  },
  retreat1Rev(g, a, b) {
    b.attackX = b.x;
    setHurtX(b, b.x + 4);
    if (b.attackKey === 'yes') { startPose(g, b, 'beheadRev'); return 'poseB'; }
    if (g.time > b.refTime + 9) { b.x -= 1; b.sprite = 'walk2Rev'; b.retreatStep = 2; }
  },
  retreat2Rev(g, a, b) {
    b.attackX = b.x;
    setHurtX(b, b.x + 4);
    b.sprite = 'walk2Rev';
    if (b.attackKey === 'yes') { startPose(g, b, 'beheadRev'); return 'poseB'; }
    if (g.time > b.refTime + 18) { b.x -= 1; b.sprite = 'walk1Rev'; b.retreatStep = 3; }
  },
  retreat3Rev(g, a, b) {
    b.attackX = b.x;
    setHurtX(b, b.x + 4);
    b.sprite = 'walk1Rev';
    if (b.attackKey === 'yes') { startPose(g, b, 'beheadRev'); return 'poseB'; }
    if (g.time > b.refTime + 27) { b.x -= 1; b.sprite = 'standingRev'; b.retreatStep = 4; }
  },
  retreat4Rev(g, a, b) {
    b.attackX = b.x;
    setHurtX(b, b.x + 4);
    b.sprite = 'standingRev';
    if (b.attackKey === 'yes') { startPose(g, b, 'beheadRev'); return 'poseB'; }
    if (g.time > b.refTime + 36) { setPose(g, b, 'standingRev'); b.retreatStep = 0; }
  },
};
