// Hit resolution: where an attack of one fighter lands on the other.
import { startPose } from './fighter.js';

// The wizard's fire ball hits a spot when it is in the same row and at most 2 columns before it.
const fireBallHits = (wizard, x, y) => wizard.attackX <= x && wizard.attackX >= x - 2 && wizard.attackY === y;

// Game over: the wizard burns player A.
function burnPlayerA(g) {
  const { a, b } = g;
  g.gnome = 'no';
  if (g.game === 'lost') return;
  startPose(g, a, 'deadWizard');
  a.bleeding = 'no';
  startPose(g, b, 'wizardFinished');
  b.bleeding = 'no';
  g.game = 'lost';
}

export function damageA(g) {
  const { a, b } = g;
  if (g.wizard === 'yes') {
    if (a.x > 6 && (fireBallHits(b, a.headX, a.headY) || fireBallHits(b, a.kneeX, a.kneeY))) {
      burnPlayerA(g);
      return 'poseA';
    }
    if (a.busy === 'yes') { return 'poseA'; }
    a.bleeding = 'no';
    return 'controlsA';
  }
  if (g.direction === 'normal') {
    if (a.x < b.x) {
      if (b.attackX <= a.foreheadX && b.attackY === a.foreheadY) {
        if (a.state === 'protectHead') { a.state = 'clingHead'; return 'poseA'; }
        a.state = 'fall'; a.damageForehead += 1; return 'poseA';
      }
      if (b.attackX <= a.headX && b.attackY === a.headY) {
        if (b.state === 'headButt') { a.state = 'fall'; return 'poseA'; }
        a.state = 'hit'; b.score += 250; a.damageHead += 1; return 'poseA';
      }
      if (b.attackX <= a.bodyX && b.attackY === a.bodyY) {
        if (a.state === 'protectBody') { a.state = 'clingBody'; return 'poseA'; }
        a.state = 'hit'; b.score += 250; return 'poseA';
      }
      if (b.attackX <= a.kneeX && b.attackY === a.kneeY) {
        if (b.state === 'spider') { a.state = 'fall'; return 'poseA'; }
        if (b.state === 'rollForward') { a.state = 'fall'; return 'poseA'; }
        if (a.state === 'protectBody') { a.state = 'clingBody'; return 'poseA'; }
        if (b.state === 'kick') { a.state = 'fall'; a.damageKnee += 1; return 'poseA'; }
        a.state = 'hit'; b.score += 100; a.damageKnee += 1; return 'poseA';
      }
    }
  }
  if (g.direction === 'reverse') {
    if (a.x > b.x) {
      if (b.attackX >= a.foreheadX && b.attackY === a.foreheadY) {
        if (a.state === 'protectHeadRev') { a.state = 'clingHead'; return 'poseA'; }
        a.state = 'fallRev'; return 'poseA';
      }
      if (b.attackX >= a.headX && b.attackY === a.headY) {
        if (b.state === 'headButtRev') { a.state = 'fallRev'; return 'poseA'; }
        a.state = 'hitRev'; b.score += 250; a.damageHead += 1; return 'poseA';
      }
      if (b.attackX >= a.bodyX && b.attackY === a.bodyY) {
        if (a.state === 'protectBodyRev') { a.state = 'clingBody'; return 'poseA'; }
        a.state = 'hitRev'; b.score += 250; return 'poseA';
      }
      if (b.attackX >= a.kneeX && b.attackY === a.kneeY) {
        if (b.state === 'spiderRev') { a.state = 'fallRev'; return 'poseA'; }
        if (b.state === 'rollForwardRev') { a.state = 'fallRev'; return 'poseA'; }
        if (a.state === 'protectBodyRev') { a.state = 'clingBody'; return 'poseA'; }
        if (b.state === 'kickRev') { a.state = 'fallRev'; return 'poseA'; }
        a.state = 'hitRev'; b.score += 100; a.damageKnee += 1; return 'poseA';
      }
    }
  }
  if (a.busy === 'yes') { return 'poseA'; }
  a.bleeding = 'no';
  return 'controlsA';
}

export function damageB(g) {
  const { a, b } = g;
  if (g.wizard === 'yes' || g.marianna === 'yes') { b.bleeding = 'no'; return 'poseB'; }
  if (g.direction === 'normal') {
    if (b.x > a.x) {
      if (a.attackX >= b.foreheadX && a.attackY === b.foreheadY) {
        if (b.state === 'protectHead') { b.state = 'clingHead'; return 'poseB'; }
        b.state = 'fall'; b.damageForehead += 1; return 'poseB';
      }
      if (a.attackX >= b.headX && a.attackY === b.headY) {
        if (a.state === 'headButt') { b.state = 'fall'; return 'poseB'; }
        b.state = 'hit'; a.score += 250; b.damageHead += 1; return 'poseB';
      }
      if (a.attackX >= b.bodyX && a.attackY === b.bodyY) {
        if (b.state === 'protectBody') { b.state = 'clingBody'; return 'poseB'; }
        b.state = 'hit'; a.score += 250; return 'poseB';
      }
      if (a.attackX >= b.kneeX && a.attackY === b.kneeY) {
        if (a.state === 'spider') { b.state = 'fall'; return 'poseB'; }
        if (a.state === 'rollForward') { b.state = 'fall'; return 'poseB'; }
        if (b.state === 'protectBody') { b.state = 'clingBody'; return 'poseB'; }
        if (a.state === 'kick') { b.state = 'fall'; b.damageKnee += 1; return 'poseB'; }
        b.state = 'hit'; a.score += 100; b.damageKnee += 1; return 'poseB';
      }
    }
  }
  if (g.direction === 'reverse') {
    if (b.x < a.x) {
      if (a.attackX <= b.foreheadX && a.attackY === b.foreheadY) {
        if (b.state === 'protectHeadRev') { b.state = 'clingHead'; return 'poseB'; }
        b.state = 'fallRev'; b.damageForehead += 1; return 'poseB';
      }
      if (a.attackX <= b.headX && a.attackY === b.headY) {
        if (a.state === 'headButtRev') { b.state = 'fallRev'; return 'poseB'; }
        b.state = 'hitRev'; a.score += 250; b.damageHead += 1; return 'poseB';
      }
      if (a.attackX <= b.bodyX && a.attackY === b.bodyY) {
        if (b.state === 'protectBodyRev') { b.state = 'clingBody'; return 'poseB'; }
        b.state = 'hitRev'; a.score += 250; return 'poseB';
      }
      if (a.attackX <= b.kneeX && a.attackY === b.kneeY) {
        if (a.state === 'spiderRev') { b.state = 'fallRev'; return 'poseB'; }
        if (a.state === 'rollForwardRev') { b.state = 'fallRev'; return 'poseB'; }
        if (b.state === 'protectBodyRev') { b.state = 'clingBody'; return 'poseB'; }
        if (a.state === 'kickRev') { b.state = 'fallRev'; b.damageKnee += 1; return 'poseB'; }
        b.state = 'hitRev'; a.score += 100; b.damageKnee += 1; return 'poseB';
      }
    }
  }
  if (b.busy === 'yes') { return 'poseB'; }
  b.bleeding = 'no';
  return 'controlsB';
}
