// Poses: protecting head and body.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX, startPose, attackPressed } from '../fighter.js';
import { sfx } from '../sound.js';

export const defenseA = {
  protectHead1(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.kneeY = 20;
    if (attackPressed(g, a)) { startPose(g, a, 'spider'); return 'poseA'; }
    if (g.time > a.refTime + 5) { a.protectHead = 'yes'; a.sprite = 'protectHead'; a.busy = 'no'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x -= 1; a.sprite = 'walk1'; return 'damageB'; }
  },
  protectHead(g, a, b) {
    setHurtX(a, a.x + 4);
    a.attackX = a.x;
    a.kneeY = 20;
    a.sprite = 'protectHead';
    if (attackPressed(g, a)) { startPose(g, a, 'spider'); return 'poseA'; }
  },
  protectHeadRev1(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    a.kneeY = 20;
    if (attackPressed(g, a)) { startPose(g, a, 'spiderRev'); return 'poseA'; }
    if (g.time > a.refTime + 5) { a.protectHead = 'yes'; a.state = 'protectHeadRev'; a.busy = 'no'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x += 1; a.sprite = 'walk1Rev'; return 'damageB'; }
  },
  protectHeadRev(g, a, b) {
    setHurtX(a, a.x);
    a.attackX = a.x + 4;
    a.kneeY = 20;
    a.sprite = 'protectHeadRev';
    if (attackPressed(g, a)) { startPose(g, a, 'spiderRev'); return 'poseA'; }
  },
  protectBody1(g, a, b) {
    a.attackX = a.x;
    a.kneeY = 20;
    setHurtX(a, a.x + 4);
    a.beheadable = 'no';
    a.sprite = 'protectHead';
    if (attackPressed(g, a)) { startPose(g, a, 'headButt'); return 'poseA'; }
    if (g.time > a.refTime + 5) { a.state = 'protectBody'; a.protectBody = 'yes'; a.busy = 'no'; }
  },
  protectBody(g, a, b) {
    a.attackX = a.x;
    a.kneeY = 20;
    setHurtX(a, a.x + 4);
    a.beheadable = 'no';
    a.sprite = 'protectBody';
    if (attackPressed(g, a)) { startPose(g, a, 'headButt'); }
  },
  protectBodyRev1(g, a, b) {
    a.attackX = a.x + 4;
    a.kneeY = 20;
    setHurtX(a, a.x);
    a.beheadable = 'no';
    a.sprite = 'protectHeadRev';
    if (attackPressed(g, a)) { startPose(g, a, 'headButtRev'); return 'poseA'; }
    if (g.time > a.refTime + 5) { a.sprite = 'protectBodyRev'; a.protectBody = 'yes'; a.busy = 'no'; }
  },
  protectBodyRev(g, a, b) {
    a.attackX = a.x + 4;
    a.kneeY = 20;
    setHurtX(a, a.x);
    a.beheadable = 'no';
    a.sprite = 'protectBodyRev';
    if (attackPressed(g, a)) { startPose(g, a, 'headButtRev'); return 'poseA'; }
  },
  clingBody(g, a, b) {
    if (g.direction === 'normal') {
      if (b.state === 'behead' && a.beheadable === 'no') { startPose(g, a, 'hit'); return 'poseA'; }
      if (b.state === 'knee') { startPose(g, a, 'hit'); return 'poseA'; }
      if (g.distance < 12) { sfx(g, 'cling.ogg'); }
      a.state = 'protectBody'; return 'damageB';
    }
    if (g.direction === 'reverse') {
      if (b.state === 'beheadRev' && a.beheadable === 'no') { startPose(g, a, 'hitRev'); return 'poseA'; }
      if (b.state === 'kneeRev') { startPose(g, a, 'hitRev'); return 'poseA'; }
      if (g.distance < 12) { sfx(g, 'cling.ogg'); }
      a.state = 'protectBodyRev'; return 'damageB';
    }
  },
  clingHead(g, a, b) {
    if (g.direction === 'normal') { a.state = 'protectHead'; return 'damageB'; }
    if (g.direction === 'reverse') { a.state = 'protectHeadRev'; return 'damageB'; }
  },
};

export const defenseB = {
  protectHead1(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.kneeY = 20;
    if (b.attackKey === 'yes') { startPose(g, b, 'spider'); return 'poseB'; }
    if (g.time > b.refTime + 5) { b.protectHead = 'yes'; b.state = 'protectHead'; b.busy = 'no'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x += 1; b.sprite = 'walk1'; return 'collision'; }
  },
  protectHead(g, a, b) {
    setHurtX(b, b.x);
    b.attackX = b.x + 4;
    b.kneeY = 20;
    b.sprite = 'protectHead';
    if (b.attackKey === 'yes') { startPose(g, b, 'spider'); return 'poseB'; }
  },
  protectHeadRev1(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    b.kneeY = 20;
    if (b.attackKey === 'yes') { startPose(g, b, 'spiderRev'); return 'poseB'; }
    if (g.time > b.refTime + 5) { b.protectHead = 'yes'; b.state = 'protectHeadRev'; b.busy = 'no'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x -= 1; b.sprite = 'walk1Rev'; return 'collision'; }
  },
  protectHeadRev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.attackX = b.x;
    b.kneeY = 20;
    b.sprite = 'protectHeadRev';
    if (b.attackKey === 'yes') { startPose(g, b, 'spiderRev'); return 'poseB'; }
  },
  protectBody1(g, a, b) {
    b.attackX = b.x + 4;
    b.kneeY = 20;
    setHurtX(b, b.x);
    b.beheadable = 'no';
    b.sprite = 'protectHead';
    if (b.attackKey === 'yes') { startPose(g, b, 'headButt'); return 'poseB'; }
    if (g.time > b.refTime + 5) { b.state = 'protectBody'; b.protectBody = 'yes'; b.busy = 'no'; }
  },
  protectBody(g, a, b) {
    b.attackX = b.x + 4;
    b.kneeY = 20;
    setHurtX(b, b.x);
    b.beheadable = 'no';
    b.sprite = 'protectBody';
    if (b.attackKey === 'yes') { startPose(g, b, 'headButt'); return 'poseB'; }
  },
  protectBodyRev1(g, a, b) {
    b.attackX = b.x;
    b.kneeY = 20;
    setHurtX(b, b.x + 4);
    b.beheadable = 'no';
    b.sprite = 'protectHeadRev';
    if (b.attackKey === 'yes') { startPose(g, b, 'headButtRev'); return 'poseB'; }
    if (g.time > b.refTime + 5) { b.state = 'protectBodyRev'; b.protectBody = 'yes'; b.busy = 'no'; }
  },
  protectBodyRev(g, a, b) {
    b.attackX = b.x;
    b.kneeY = 20;
    setHurtX(b, b.x + 4);
    b.beheadable = 'no';
    b.sprite = 'protectBodyRev';
    if (b.attackKey === 'yes') { startPose(g, b, 'headButtRev'); return 'poseB'; }
  },
  clingBody(g, a, b) {
    if (g.direction === 'normal') {
      if (a.state === 'behead' && b.beheadable === 'no') { startPose(g, b, 'hit'); return 'poseB'; }
      if (a.state === 'knee') { startPose(g, b, 'hit'); return 'poseB'; }
      if (g.distance < 12) { sfx(g, 'cling.ogg'); }
      b.state = 'protectBody'; return 'collision';
    }
    if (g.direction === 'reverse') {
      if (a.state === 'beheadRev' && b.beheadable === 'no') { startPose(g, b, 'hitRev'); return 'poseB'; }
      if (a.state === 'kneeRev') { startPose(g, b, 'hitRev'); return 'poseB'; }
      if (g.distance < 12) { sfx(g, 'cling.ogg'); }
      b.state = 'protectBodyRev'; return 'collision';
    }
  },
  clingHead(g, a, b) {
    if (g.direction === 'normal') { b.state = 'protectHead'; return 'collision'; }
    if (g.direction === 'reverse') { b.state = 'protectHeadRev'; return 'collision'; }
  },
};
