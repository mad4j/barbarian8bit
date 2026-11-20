// Poses: jumping and sitting.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX, startPose, attackPressed } from '../fighter.js';

export const postureA = {
  jump(g, a, b) {
    a.attackX = a.x; setHurtX(a, a.x + 4);
    a.beheadable = 'no';
    a.kneeY = a.bodyY; a.attackY = 14;
    if (attackPressed(g, a)) { startPose(g, a, 'neck'); return 'damageB'; }
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'standing'; a.bodyX = a.x + 4; a.kneeX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 30) {
      a.sprite = 'jump1'; a.bodyX = a.x + 4; a.kneeX = a.x + 1; a.beheadable = 'yes'; return 'damageB';
    }
    if (g.time > a.refTime + 13) { a.sprite = 'jump2'; a.bodyX = a.x + 1; a.kneeX = a.x + 1; return 'damageB'; }
    if (g.time > a.refTime + 2) { a.sprite = 'jump1'; a.bodyX = a.x + 4; a.kneeX = a.x + 1; }
    a.sprite = 'jump1';
  },
  jumpRev(g, a, b) {
    a.attackX = a.x + 4; setHurtX(a, a.x);
    a.beheadable = 'no';
    a.kneeY = a.bodyY; a.attackY = 14;
    if (attackPressed(g, a)) { startPose(g, a, 'neckRev'); return 'damageB'; }
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'standingRev'; a.bodyX = a.x; a.kneeX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 30) {
      a.sprite = 'jump1Rev'; a.bodyX = a.x; a.kneeX = a.x + 1; a.beheadable = 'yes'; return 'damageB';
    }
    if (g.time > a.refTime + 13) { a.sprite = 'jump2Rev'; a.bodyX = a.x + 3; a.kneeX = a.x + 3; return 'damageB'; }
    if (g.time > a.refTime + 2) { a.sprite = 'jump1Rev'; a.bodyX = a.x; a.kneeX = a.x + 3; }
    a.sprite = 'jump1Rev';
  },
  sit(g, a, b) {
    a.attackX = a.x;
    a.foreheadX = a.x; a.headX = a.x; a.bodyX = a.x; a.kneeX = a.x + 4;
    a.sprite = 'sit1';
    if (g.time > a.refTime + 10) { a.state = 'sit2'; return 'damageB'; }
    if (attackPressed(g, a)) { startPose(g, a, 'knee'); }
  },
  sit2(g, a, b) {
    a.busy = 'no';
    a.sitting = 'yes';
    a.attackX = a.x;
    a.foreheadX = a.x; a.headX = a.x; a.bodyX = a.x + 4; a.kneeX = a.x + 4;
    a.sprite = 'sit2';
    if (attackPressed(g, a)) { startPose(g, a, 'knee'); }
    if (g.demo === 'yes') {
      if (g.time > a.refTime + 20) { a.busy = 'no'; }
      return 'damageB';
    }
  },
  standUp(g, a, b) {
    a.attackX = a.x; a.attackY = 14;
    a.foreheadX = a.x; a.headX = a.x; a.bodyX = a.x + 4; a.kneeX = a.x + 4;
    a.sprite = 'sit1';
    if (g.time > a.refTime + 10) { a.state = 'standing'; a.busy = 'no'; return 'damageB'; }
    if (attackPressed(g, a)) { startPose(g, a, 'knee'); }
  },
  sitRev(g, a, b) {
    a.attackX = a.x + 4;
    a.foreheadX = a.x + 4; a.headX = a.x + 4; a.bodyX = a.x + 4; a.kneeX = a.x;
    a.sprite = 'sit1Rev';
    if (g.time > a.refTime + 10) { a.state = 'sit2Rev'; return 'damageB'; }
    if (attackPressed(g, a)) { startPose(g, a, 'kneeRev'); }
  },
  sit2Rev(g, a, b) {
    a.busy = 'no';
    a.sitting = 'yes';
    a.attackX = a.x + 4;
    a.foreheadX = a.x + 4; a.headX = a.x + 4; a.bodyX = a.x; a.kneeX = a.x;
    a.sprite = 'sit2Rev';
    if (attackPressed(g, a)) { startPose(g, a, 'kneeRev'); }
  },
  standUpRev(g, a, b) {
    a.attackX = a.x + 4; a.attackY = 14;
    a.foreheadX = a.x + 4; a.headX = a.x + 4; a.bodyX = a.x; a.kneeX = a.x;
    a.sprite = 'sit1Rev';
    if (g.time > a.refTime + 10) { a.state = 'standingRev'; a.busy = 'no'; return 'damageB'; }
    if (attackPressed(g, a)) { startPose(g, a, 'kneeRev'); }
  },
};

export const postureB = {
  jump(g, a, b) {
    b.attackX = b.x + 4; setHurtX(b, b.x);
    b.kneeY = b.bodyY; b.attackY = 14;
    b.beheadable = 'no';
    if (b.attackKey === 'yes') { startPose(g, b, 'neck'); return 'collision'; }
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.sprite = 'standing'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'standing'; b.bodyX = b.x; b.kneeX = b.x; return 'collision'; }
    if (g.time > b.refTime + 30) {
      b.sprite = 'jump1'; b.bodyX = b.x; b.kneeX = b.x + 1; b.beheadable = 'yes'; return 'collision';
    }
    if (g.time > b.refTime + 13) { b.sprite = 'jump2'; b.bodyX = b.x + 3; b.kneeX = b.x + 3; return 'collision'; }
    if (g.time > b.refTime + 2) { b.sprite = 'jump1'; b.bodyX = b.x; b.kneeX = b.x + 3; }
    b.sprite = 'jump1';
  },
  jumpRev(g, a, b) {
    b.attackX = b.x; setHurtX(b, b.x + 4);
    b.kneeY = b.bodyY; b.attackY = 14;
    b.beheadable = 'no';
    if (b.attackKey === 'yes') { startPose(g, b, 'neckRev'); return 'collision'; }
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.sprite = 'standingRev'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'standingRev'; b.bodyX = b.x + 4; b.kneeX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 30) {
      b.sprite = 'jump1Rev'; b.bodyX = b.x + 4; b.kneeX = b.x + 1; b.beheadable = 'yes'; return 'collision';
    }
    if (g.time > b.refTime + 13) { b.sprite = 'jump2Rev'; b.bodyX = b.x + 1; b.kneeX = b.x + 1; return 'collision'; }
    if (g.time > b.refTime + 2) { b.sprite = 'jump1Rev'; b.bodyX = b.x + 4; b.kneeX = b.x + 1; }
    b.sprite = 'jump1Rev';
  },
  sit(g, a, b) {
    b.attackX = b.x + 4;
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x + 4; b.kneeX = b.x;
    b.sprite = 'sit1';
    if (g.time > b.refTime + 10) { b.state = 'sit2'; return 'collision'; }
    if (b.attackKey === 'yes') { startPose(g, b, 'knee'); }
  },
  sit2(g, a, b) {
    b.sitting = 'yes';
    b.attackX = b.x + 4;
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x; b.kneeX = b.x;
    b.sprite = 'sit2';
    if (b.attackKey === 'yes') { startPose(g, b, 'knee'); }
    if (g.mode === 'solo') {
      if (g.time > b.refTime + 20) { b.busy = 'no'; }
      return 'collision';
    }
    b.busy = 'no';
  },
  standUp(g, a, b) {
    b.attackX = b.x + 4; a.attackY = 14;
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x; b.kneeX = b.x;
    b.sprite = 'sit1';
    if (g.time > b.refTime + 10) { b.state = 'standing'; b.busy = 'no'; return 'collision'; }
    if (b.attackKey === 'yes') { startPose(g, b, 'knee'); }
  },
  sitRev(g, a, b) {
    b.attackX = b.x;
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x; b.kneeX = b.x + 4;
    b.sprite = 'sit1Rev';
    if (g.time > a.refTime + 10) { b.state = 'sit2Rev'; return 'collision'; }
    if (b.attackKey === 'yes') { startPose(g, b, 'kneeRev'); }
  },
  sit2Rev(g, a, b) {
    b.sitting = 'yes';
    b.attackX = b.x;
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x + 4; b.kneeX = b.x + 4;
    b.sprite = 'sit2Rev';
    if (b.attackKey === 'yes') { startPose(g, b, 'kneeRev'); }
    if (g.mode === 'solo') {
      if (g.time > b.refTime + 20) { b.busy = 'no'; }
      return 'collision';
    }
    b.busy = 'no';
  },
  standUpRev(g, a, b) {
    b.attackX = b.x; a.attackY = 14;
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x + 4; b.kneeX = b.x + 4;
    b.sprite = 'sit1Rev';
    if (g.time > b.refTime + 10) { b.state = 'standingRev'; b.busy = 'no'; return 'collision'; }
    if (b.attackKey === 'yes') { startPose(g, b, 'kneeRev'); }
  },
};
