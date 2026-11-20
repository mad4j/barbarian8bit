// Poses: rolls.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX, resetHurtY, startPose, attackPressed } from '../fighter.js';

export const rollA = {
  rollForward(g, a, b) {
    setHurtX(a, a.x);
    a.kneeY = 20; a.attackY = a.kneeY; a.attackX = a.x; a.headY = a.kneeY;
    if (attackPressed(g, a)) { a.headY = 16; startPose(g, a, 'kick'); return 'poseA'; }
    if (g.time > a.refTime + 38) {
      a.sprite = 'standing'; a.headX = a.x + 4; a.bodyX = a.x + 4; a.headY = 16;
      a.busy = 'no'; a.x += 1; a.state = 'endRoll'; return 'endRollA';
    }
    if (g.time > a.refTime + 33) { a.sprite = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 31) { return 'damageB'; }
    if (g.time > a.refTime + 30) { a.x += 1; a.sprite = 'roll6'; return 'damageB'; }
    if (g.time > a.refTime + 29) { return 'damageB'; }
    if (g.time > a.refTime + 28) { a.x += 1; a.sprite = 'roll5'; return 'damageB'; }
    if (g.time > a.refTime + 26) { return 'damageB'; }
    if (g.time > a.refTime + 25) { a.x += 1; a.sprite = 'roll5'; return 'damageB'; }
    if (g.time > a.refTime + 23) { return 'damageB'; }
    if (g.time > a.refTime + 22) { a.x += 1; a.sprite = 'roll4'; return 'damageB'; }
    if (g.time > a.refTime + 20) { return 'damageB'; }
    if (g.time > a.refTime + 19) { a.x += 1; a.sprite = 'roll4'; return 'damageB'; }
    if (g.time > a.refTime + 17) { return 'damageB'; }
    if (g.time > a.refTime + 16) { a.x += 1; a.attackX = a.x + 5; a.sprite = 'roll3'; return 'damageB'; }
    if (g.time > a.refTime + 14) { return 'damageB'; }
    if (g.time > a.refTime + 13) { a.x += 1; a.attackX = a.x + 5; a.sprite = 'roll3'; return 'damageB'; }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) { a.x += 1; a.sprite = 'roll2'; return 'damageB'; }
    if (g.time > a.refTime + 8) { return 'damageB'; }
    if (g.time > a.refTime + 7) { a.x += 1; a.sprite = 'roll2'; return 'damageB'; }
    if (g.time > a.refTime + 5) { return 'damageB'; }
    if (g.time > a.refTime + 4) { a.x += 1; a.sprite = 'roll1'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x += 1; a.sprite = 'roll1'; return 'damageB'; }
  },
  endRoll(g, a, b) {
    if (a.x < b.x) {
      a.state = 'standing';
      a.sprite = 'standing';
      a.attackX = a.x; a.attackY = 17;
      resetHurtY(a);
      setHurtX(a, a.x + 4);
      return 'damageB';
    }
    if (a.x > b.x - 1) {
      a.state = 'turn'; a.attackY = 14; a.busy = 'yes'; a.refTime = g.time;
      b.state = 'turn'; b.attackY = 14; b.busy = 'yes'; b.refTime = g.time;
      return 'scene';
    }
  },
  rollForwardRev(g, a, b) {
    setHurtX(a, a.x + 4);
    a.kneeY = 20; a.attackY = a.kneeY; a.attackX = a.x + 4; a.headY = a.kneeY;
    if (attackPressed(g, a)) { startPose(g, a, 'kickRev'); return 'poseA'; }
    if (g.time > a.refTime + 38) {
      a.sprite = 'standingRev'; a.headX = a.x; a.bodyX = a.x;
      a.busy = 'no'; a.x -= 1; a.state = 'endRollRev'; return 'endRollRevA';
    }
    if (g.time > a.refTime + 33) { a.headY = 16; a.sprite = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 31) { return 'damageB'; }
    if (g.time > a.refTime + 30) { a.x -= 1; a.sprite = 'roll6Rev'; return 'damageB'; }
    if (g.time > a.refTime + 29) { return 'damageB'; }
    if (g.time > a.refTime + 28) { a.x -= 1; a.sprite = 'roll5Rev'; return 'damageB'; }
    if (g.time > a.refTime + 26) { return 'damageB'; }
    if (g.time > a.refTime + 25) { a.x -= 1; a.sprite = 'roll5Rev'; return 'damageB'; }
    if (g.time > a.refTime + 23) { return 'damageB'; }
    if (g.time > a.refTime + 22) { a.x -= 1; a.sprite = 'roll4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 20) { return 'damageB'; }
    if (g.time > a.refTime + 19) { a.x -= 1; a.sprite = 'roll4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 17) { return 'damageB'; }
    if (g.time > a.refTime + 16) { a.x -= 1; a.attackX = a.x - 1; a.sprite = 'roll3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 14) { return 'damageB'; }
    if (g.time > a.refTime + 13) { a.x -= 1; a.attackX = a.x - 1; a.sprite = 'roll3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) { a.x -= 1; a.sprite = 'roll2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 8) { return 'damageB'; }
    if (g.time > a.refTime + 7) { a.x -= 1; a.sprite = 'roll2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 5) { return 'damageB'; }
    if (g.time > a.refTime + 4) { a.x -= 1; a.sprite = 'roll1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x -= 1; a.sprite = 'roll1Rev'; return 'damageB'; }
  },
  endRollRev(g, a, b) {
    if (a.x > b.x) {
      a.state = 'standingRev';
      a.sprite = 'standingRev';
      a.attackX = a.x + 4; a.attackY = 17;
      resetHurtY(a);
      setHurtX(a, a.x);
      return 'damageB';
    }
    if (a.x < b.x + 1) {
      a.state = 'turnRev'; a.attackY = 14; a.busy = 'yes'; a.refTime = g.time;
      b.state = 'turnRev'; b.attackY = 14; b.busy = 'yes'; b.refTime = g.time;
      return 'scene';
    }
  },
  rollBack(g, a, b) {
    setHurtX(a, a.x);
    a.kneeY = 20; a.attackY = a.kneeY; a.attackX = a.x;
    if (attackPressed(g, a)) { startPose(g, a, 'forehead'); return 'poseA'; }
    if (g.time > a.refTime + 38) {
      a.sprite = 'standing'; a.headX = a.x + 4; a.bodyX = a.x + 4;
      a.busy = 'no'; a.state = 'standing'; return 'collision';
    }
    if (g.time > a.refTime + 33) { a.sprite = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 30) { return 'damageB'; }
    if (g.time > a.refTime + 29) { a.x -= 1; a.sprite = 'roll1'; return 'damageB'; }
    if (g.time > a.refTime + 27) { return 'damageB'; }
    if (g.time > a.refTime + 26) { a.x -= 1; a.sprite = 'roll1'; return 'damageB'; }
    if (g.time > a.refTime + 24) { return 'damageB'; }
    if (g.time > a.refTime + 23) { a.x -= 1; a.sprite = 'roll2'; return 'damageB'; }
    if (g.time > a.refTime + 21) { return 'damageB'; }
    if (g.time > a.refTime + 20) { a.x -= 1; a.sprite = 'roll2'; return 'damageB'; }
    if (g.time > a.refTime + 18) { return 'damageB'; }
    if (g.time > a.refTime + 17) { a.x -= 1; a.sprite = 'roll3'; return 'damageB'; }
    if (g.time > a.refTime + 15) { return 'damageB'; }
    if (g.time > a.refTime + 14) { a.x -= 1; a.sprite = 'roll3'; return 'damageB'; }
    if (g.time > a.refTime + 12) { return 'damageB'; }
    if (g.time > a.refTime + 11) { a.x -= 1; a.sprite = 'roll4'; return 'damageB'; }
    if (g.time > a.refTime + 9) { return 'damageB'; }
    if (g.time > a.refTime + 8) { a.x -= 1; a.sprite = 'roll4'; return 'damageB'; }
    if (g.time > a.refTime + 6) { return 'damageB'; }
    if (g.time > a.refTime + 5) { a.x -= 1; a.sprite = 'roll5'; return 'damageB'; }
    if (g.time > a.refTime + 3) { return 'damageB'; }
    if (g.time > a.refTime + 2) { a.x -= 1; a.sprite = 'roll6'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.sprite = 'roll6'; return 'damageB'; }
  },
  rollBackRev(g, a, b) {
    setHurtX(a, a.x + 4);
    a.kneeY = 20; a.attackY = a.kneeY; a.attackX = a.x + 4;
    if (attackPressed(g, a)) { startPose(g, a, 'foreheadRev'); return 'poseA'; }
    if (g.time > a.refTime + 38) {
      a.sprite = 'standingRev'; a.headX = a.x; a.bodyX = a.x;
      a.busy = 'no'; a.state = 'standingRev'; return 'damageB';
    }
    if (g.time > a.refTime + 33) { a.sprite = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 30) { return 'damageB'; }
    if (g.time > a.refTime + 29) { a.x += 1; a.sprite = 'roll1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 27) { return 'damageB'; }
    if (g.time > a.refTime + 26) { a.x += 1; a.sprite = 'roll2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 24) { return 'damageB'; }
    if (g.time > a.refTime + 23) { a.x += 1; a.sprite = 'roll2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 21) { return 'damageB'; }
    if (g.time > a.refTime + 20) { a.x += 1; a.sprite = 'roll3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 18) { return 'damageB'; }
    if (g.time > a.refTime + 17) { a.x += 1; a.sprite = 'roll3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 15) { return 'damageB'; }
    if (g.time > a.refTime + 14) { a.x += 1; a.sprite = 'roll4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 12) { return 'damageB'; }
    if (g.time > a.refTime + 11) { a.x += 1; a.sprite = 'roll4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 9) { return 'damageB'; }
    if (g.time > a.refTime + 8) { a.x += 1; a.sprite = 'roll5Rev'; return 'damageB'; }
    if (g.time > a.refTime + 6) { return 'damageB'; }
    if (g.time > a.refTime + 5) { a.x += 1; a.sprite = 'roll5Rev'; return 'damageB'; }
    if (g.time > a.refTime + 3) { return 'damageB'; }
    if (g.time > a.refTime + 2) { a.x += 1; a.sprite = 'roll6Rev'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.sprite = 'roll6Rev'; return 'damageB'; }
  },
};

export const rollB = {
  rollForward(g, a, b) {
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x + 4; b.kneeX = b.x;
    b.kneeY = 20; b.attackY = b.kneeY; b.attackX = b.x + 4;
    if (b.attackKey === 'yes') { startPose(g, b, 'kick'); return 'poseB'; }
    if (g.time > b.refTime + 38) {
      b.sprite = 'standing'; b.headX = b.x; b.bodyX = b.x;
      b.busy = 'no'; b.x -= 1; b.state = 'endRoll'; return 'endRollB';
    }
    if (g.time > b.refTime + 33) { b.sprite = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 31) { return 'collision'; }
    if (g.time > b.refTime + 30) { b.x -= 1; b.sprite = 'roll6'; return 'collision'; }
    if (g.time > b.refTime + 29) { return 'collision'; }
    if (g.time > b.refTime + 28) { b.x -= 1; b.sprite = 'roll5'; return 'collision'; }
    if (g.time > b.refTime + 26) { return 'collision'; }
    if (g.time > b.refTime + 25) { b.x -= 1; b.sprite = 'roll5'; return 'collision'; }
    if (g.time > b.refTime + 23) { return 'collision'; }
    if (g.time > b.refTime + 22) { b.x -= 1; b.sprite = 'roll4'; return 'collision'; }
    if (g.time > b.refTime + 20) { return 'collision'; }
    if (g.time > b.refTime + 19) { b.x -= 1; b.sprite = 'roll4'; return 'collision'; }
    if (g.time > b.refTime + 17) { return 'collision'; }
    if (g.time > b.refTime + 16) { b.x -= 1; b.attackX = b.x - 1; b.sprite = 'roll3'; return 'collision'; }
    if (g.time > b.refTime + 14) { return 'collision'; }
    if (g.time > b.refTime + 13) { b.x -= 1; b.attackX = b.x - 1; b.sprite = 'roll3'; return 'collision'; }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) { b.x -= 1; b.sprite = 'roll2'; return 'collision'; }
    if (g.time > b.refTime + 8) { return 'collision'; }
    if (g.time > b.refTime + 7) { b.x -= 1; b.sprite = 'roll2'; return 'collision'; }
    if (g.time > b.refTime + 5) { return 'collision'; }
    if (g.time > b.refTime + 4) { b.x -= 1; b.sprite = 'roll1'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x -= 1; b.sprite = 'roll1'; return 'collision'; }
  },
  endRoll(g, a, b) {
    if (b.x > a.x) {
      b.state = 'standing';
      b.sprite = 'standing';
      b.attackX = b.x + 4; b.attackY = 17;
      resetHurtY(b);
      setHurtX(b, b.x);
      return 'collision';
    }
    if (b.x < a.x + 1) {
      a.state = 'turn'; a.attackY = 14; a.busy = 'yes'; a.refTime = g.time;
      b.state = 'turn'; b.attackY = 14; b.busy = 'yes'; b.refTime = g.time;
      return 'scene';
    }
  },
  rollForwardRev(g, a, b) {
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x; b.kneeX = b.x + 4;
    b.kneeY = 20; b.attackY = b.kneeY; b.attackX = b.x;
    if (b.attackKey === 'yes') { startPose(g, b, 'kickRev'); return 'poseB'; }
    if (g.time > b.refTime + 38) {
      b.sprite = 'standingRev'; b.headX = b.x + 4; b.bodyX = b.x + 4;
      b.busy = 'no'; b.x += 1; b.state = 'endRollRev'; return 'endRollRevB';
    }
    if (g.time > b.refTime + 33) { b.sprite = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 31) { return 'collision'; }
    if (g.time > b.refTime + 30) { b.x += 1; b.sprite = 'roll6Rev'; return 'collision'; }
    if (g.time > b.refTime + 29) { return 'collision'; }
    if (g.time > b.refTime + 28) { b.x += 1; b.sprite = 'roll5Rev'; return 'collision'; }
    if (g.time > b.refTime + 26) { return 'collision'; }
    if (g.time > b.refTime + 25) { b.x += 1; b.sprite = 'roll5Rev'; return 'collision'; }
    if (g.time > b.refTime + 23) { return 'collision'; }
    if (g.time > b.refTime + 22) { b.x += 1; b.sprite = 'roll4Rev'; return 'collision'; }
    if (g.time > b.refTime + 20) { return 'collision'; }
    if (g.time > b.refTime + 19) { b.x += 1; b.sprite = 'roll4Rev'; return 'collision'; }
    if (g.time > b.refTime + 17) { return 'collision'; }
    if (g.time > b.refTime + 16) { b.x += 1; b.attackX = b.x + 5; b.sprite = 'roll3Rev'; return 'collision'; }
    if (g.time > b.refTime + 14) { return 'collision'; }
    if (g.time > b.refTime + 13) { b.x += 1; b.attackX = b.x + 5; b.sprite = 'roll3Rev'; return 'collision'; }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) { b.x += 1; b.sprite = 'roll2Rev'; return 'collision'; }
    if (g.time > b.refTime + 8) { return 'collision'; }
    if (g.time > b.refTime + 7) { b.x += 1; b.sprite = 'roll2Rev'; return 'collision'; }
    if (g.time > b.refTime + 5) { return 'collision'; }
    if (g.time > b.refTime + 4) { b.x += 1; b.sprite = 'roll1Rev'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x += 1; b.sprite = 'roll1Rev'; return 'collision'; }
  },
  endRollRev(g, a, b) {
    if (b.x < a.x) {
      b.state = 'standingRev';
      b.sprite = 'standingRev';
      b.attackX = b.x; b.attackY = 17;
      resetHurtY(b);
      setHurtX(b, b.x + 4);
      return 'collision';
    }
    if (b.x > a.x - 1) {
      startPose(g, a, 'turnRev');
      startPose(g, b, 'turnRev');
      return 'scene';
    }
  },
  rollBack(g, a, b) {
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x + 4; b.kneeX = b.x;
    b.kneeY = 20; b.attackY = b.kneeY; b.attackX = b.x + 4;
    if (b.attackKey === 'yes') { startPose(g, b, 'forehead'); return 'poseB'; }
    if (g.time > b.refTime + 38) {
      b.sprite = 'standing'; b.headX = b.x; b.bodyX = b.x;
      b.busy = 'no'; b.state = 'standing'; return 'collision';
    }
    if (g.time > b.refTime + 33) { b.sprite = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 30) { return 'collision'; }
    if (g.time > b.refTime + 29) { b.x += 1; b.sprite = 'roll1'; return 'collision'; }
    if (g.time > b.refTime + 27) { return 'collision'; }
    if (g.time > b.refTime + 26) { b.x += 1; b.sprite = 'roll1'; return 'collision'; }
    if (g.time > b.refTime + 24) { return 'collision'; }
    if (g.time > b.refTime + 23) { b.x += 1; b.sprite = 'roll2'; return 'collision'; }
    if (g.time > b.refTime + 21) { return 'collision'; }
    if (g.time > b.refTime + 20) { b.x += 1; b.sprite = 'roll2'; return 'collision'; }
    if (g.time > b.refTime + 18) { return 'collision'; }
    if (g.time > b.refTime + 17) { b.x += 1; b.sprite = 'roll3'; return 'collision'; }
    if (g.time > b.refTime + 15) { return 'collision'; }
    if (g.time > b.refTime + 14) { b.x += 1; b.sprite = 'roll3'; return 'collision'; }
    if (g.time > b.refTime + 12) { return 'collision'; }
    if (g.time > b.refTime + 11) { b.x += 1; b.sprite = 'roll4'; return 'collision'; }
    if (g.time > b.refTime + 9) { return 'collision'; }
    if (g.time > b.refTime + 8) { b.x += 1; b.sprite = 'roll4'; return 'collision'; }
    if (g.time > b.refTime + 6) { return 'collision'; }
    if (g.time > b.refTime + 5) { b.x += 1; b.sprite = 'roll5'; return 'collision'; }
    if (g.time > b.refTime + 3) { return 'collision'; }
    if (g.time > b.refTime + 2) { b.x += 1; b.sprite = 'roll6'; return 'collision'; }
    if (g.time > b.refTime + 1) { b.sprite = 'roll6'; return 'collision'; }
  },
  rollBackRev(g, a, b) {
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x; b.kneeX = b.x + 4;
    b.kneeY = 20; b.attackY = b.kneeY; b.attackX = b.x;
    if (b.attackKey === 'yes') { startPose(g, b, 'foreheadRev'); return 'poseB'; }
    if (g.time > b.refTime + 38) {
      b.sprite = 'standingRev'; b.headX = b.x + 4; b.bodyX = b.x + 4;
      b.busy = 'no'; b.state = 'standingRev'; return 'collision';
    }
    if (g.time > b.refTime + 33) { b.sprite = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 30) { return 'collision'; }
    if (g.time > b.refTime + 29) { b.x -= 1; b.sprite = 'roll1Rev'; return 'collision'; }
    if (g.time > b.refTime + 27) { return 'collision'; }
    if (g.time > b.refTime + 26) { b.x -= 1; b.sprite = 'roll1Rev'; return 'collision'; }
    if (g.time > b.refTime + 24) { return 'collision'; }
    if (g.time > b.refTime + 23) { b.x -= 1; b.sprite = 'roll2Rev'; return 'collision'; }
    if (g.time > b.refTime + 21) { return 'collision'; }
    if (g.time > b.refTime + 20) { b.x -= 1; b.sprite = 'roll2Rev'; return 'collision'; }
    if (g.time > b.refTime + 18) { return 'collision'; }
    if (g.time > b.refTime + 17) { b.x -= 1; b.sprite = 'roll3Rev'; return 'collision'; }
    if (g.time > b.refTime + 15) { return 'collision'; }
    if (g.time > b.refTime + 14) { b.x -= 1; b.sprite = 'roll3Rev'; return 'collision'; }
    if (g.time > b.refTime + 12) { return 'collision'; }
    if (g.time > b.refTime + 11) { b.x -= 1; b.sprite = 'roll4Rev'; return 'collision'; }
    if (g.time > b.refTime + 9) { return 'collision'; }
    if (g.time > b.refTime + 8) { b.x -= 1; b.sprite = 'roll4Rev'; return 'collision'; }
    if (g.time > b.refTime + 6) { return 'collision'; }
    if (g.time > b.refTime + 5) { b.x -= 1; b.sprite = 'roll5Rev'; return 'collision'; }
    if (g.time > b.refTime + 3) { return 'collision'; }
    if (g.time > b.refTime + 2) { b.x -= 1; b.sprite = 'roll6Rev'; return 'collision'; }
    if (g.time > b.refTime + 1) { b.sprite = 'roll6Rev'; return 'collision'; }
  },
};
