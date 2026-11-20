// Poses: being hit and falling.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX, resetHurtY, startPose } from '../fighter.js';
import { sfx } from '../sound.js';

export const hitsA = {
  hit(g, a, b) {
    a.waiting = 0;
    a.attackX = a.x;
    setHurtX(a, a.x);
    resetHurtY(a);
    if (b.state === 'kick') { a.state = 'fall'; return 'poseA'; }
    a.bleeding = 'yes';
    a.snake = 'yes';
    if (b.state === 'behead' && a.beheadable === 'yes') {
      startPose(g, a, 'deadBeheading');
      sfx(g, 'behead.ogg');
      g.severedX = a.x + 3; b.score += 250;
      a.bleeding = 'no'; return 'deadA';
    }
    a.life -= 1;
    if (a.life <= 0) { startPose(g, a, 'dead'); a.bleeding = 'yes'; return 'deadA'; }
    sfx(g, 'hit.ogg');
    startPose(g, a, 'hit1'); a.beheadable = 'yes';
    return 'damageB';
  },
  hit1(g, a, b) {
    a.waiting = 0;
    a.attackX = a.x;
    setHurtX(a, a.x);
    if (g.time > a.refTime + 20) {
      a.sprite = 'standing'; a.busy = 'no';
      a.state = 'standing'; return 'damageB';
    }
    if (g.time > a.refTime + 15) { a.sprite = 'hit4'; return 'damageB'; }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) { a.x -= 1; a.bleeding = 'no'; a.sprite = 'hit3'; return 'damageB'; }
    if (g.time > a.refTime + 6) { return 'damageB'; }
    if (g.time > a.refTime + 5) { a.x -= 2; a.sprite = 'hit2'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x -= 1; a.sprite = 'hit1'; return 'damageB'; }
    a.sprite = 'hit1';
  },
  hitRev(g, a, b) {
    a.waiting = 0;
    a.attackX = a.x + 4;
    setHurtX(a, a.x + 4);
    resetHurtY(a);
    if (b.state === 'kickRev') { a.state = 'fallRev'; return 'poseA'; }
    a.bleeding = 'yes';
    a.snake = 'yes';
    if (b.state === 'beheadRev' && a.beheadable === 'yes') {
      startPose(g, a, 'deadBeheadingRev');
      sfx(g, 'behead.ogg');
      g.severedX = a.x + 3; b.score += 250;
      a.bleeding = 'no'; return 'deadA';
    }
    a.life -= 1;
    if (a.life <= 0) { startPose(g, a, 'deadRev'); a.bleeding = 'yes'; return 'deadA'; }
    sfx(g, 'hit.ogg');
    startPose(g, a, 'hit1Rev'); a.beheadable = 'yes';
    return 'damageB';
  },
  hit1Rev(g, a, b) {
    a.waiting = 0;
    a.attackX = a.x + 4;
    setHurtX(a, a.x + 4);
    if (g.time > a.refTime + 20) {
      a.sprite = 'standingRev'; a.busy = 'no';
      a.state = 'standingRev'; return 'damageB';
    }
    if (g.time > a.refTime + 15) { a.sprite = 'hit4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) { a.x += 1; a.bleeding = 'no'; a.sprite = 'hit3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 6) { return 'damageB'; }
    if (g.time > a.refTime + 5) { a.x += 2; a.sprite = 'hit2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x += 1; a.sprite = 'hit1Rev'; return 'damageB'; }
    a.sprite = 'hit1Rev';
  },
  fall(g, a, b) {
    a.attackX = a.x;
    a.waiting = 0;
    setHurtX(a, a.x);
    resetHurtY(a);
    a.bleeding = 'yes';
    a.snake = 'yes';
    a.life -= 1; b.score += 100;
    if (b.state === 'rollForward') { a.life += 1; a.bleeding = 'no'; a.snake = 'no'; b.score -= 100; }
    if (a.life <= 0) {
      startPose(g, a, 'dead'); a.bleeding = 'yes';
      if (b.state === 'headButt' || b.state === 'kick') { a.bleeding = 'no'; }
      return 'deadA';
    }
    sfx(g, 'fall.ogg');
    if (b.state === 'kick') { sfx(g, 'nothing.wav'); }
    if (b.state === 'headButt' || b.state === 'kick') {
      b.score += 150; a.bleeding = 'no';
      if (b.state === 'headButt') { sfx(g, 'ball.wav'); }
    }
    startPose(g, a, 'fall1');
    return 'damageB';
  },
  fall1(g, a, b) {
    a.attackX = a.x;
    a.waiting = 0;
    setHurtX(a, a.x);
    if (g.time > a.refTime + 25) {
      a.sprite = 'standing'; a.x -= 1; a.state = 'standing'; a.busy = 'no'; return 'damageB';
    }
    if (g.time > a.refTime + 20) { a.sprite = 'fall4'; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'fall3'; return 'damageB'; }
    if (g.time > a.refTime + 10) { return 'damageB'; }
    if (g.time > a.refTime + 9) { a.bleeding = 'no'; a.x -= 2; a.sprite = 'fall2'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x -= 2; return 'damageB'; }
    a.sprite = 'fall1';
  },
  fallRev(g, a, b) {
    a.attackX = a.x + 4;
    a.waiting = 0;
    setHurtX(a, a.x + 4);
    resetHurtY(a);
    a.bleeding = 'yes';
    a.snake = 'yes';
    a.life -= 1; b.score += 100;
    if (b.state === 'rollForwardRev') { a.life += 1; a.bleeding = 'no'; a.snake = 'no'; b.score -= 100; }
    if (a.life <= 0) {
      startPose(g, a, 'deadRev'); a.bleeding = 'yes';
      if (b.state === 'headButtRev' || b.state === 'kickRev') { a.bleeding = 'no'; }
      return 'deadA';
    }
    sfx(g, 'fall.ogg');
    if (b.state === 'kickRev') { sfx(g, 'nothing.wav'); }
    if (b.state === 'headButtRev' || b.state === 'kickRev') {
      if (b.state === 'headButtRev') { sfx(g, 'ball.wav'); }
      b.score += 150; a.bleeding = 'no';
    }
    startPose(g, a, 'fall1Rev');
    return 'damageB';
  },
  fall1Rev(g, a, b) {
    a.attackX = a.x + 4;
    a.waiting = 0;
    setHurtX(a, a.x + 4);
    if (g.time > a.refTime + 25) {
      a.sprite = 'standingRev'; a.x += 1; a.state = 'standingRev'; a.busy = 'no'; return 'damageB';
    }
    if (g.time > a.refTime + 20) { a.sprite = 'fall4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'fall3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 10) { return 'damageB'; }
    if (g.time > a.refTime + 9) { a.bleeding = 'no'; a.x += 2; a.sprite = 'fall2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 2) { return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x += 2; return 'damageB'; }
    a.sprite = 'fall1Rev';
  },
};

export const hitsB = {
  hit(g, a, b) {
    b.waiting = 0;
    b.attackX = b.x + 4;
    setHurtX(b, b.x + 4);
    resetHurtY(b);
    if (a.state === 'kick') { b.state = 'fall'; return 'poseB'; }
    b.bleeding = 'yes';
    b.snake = 'yes';
    if (a.state === 'behead' && b.beheadable === 'yes') {
      startPose(g, b, 'deadBeheading');
      sfx(g, 'behead.ogg');
      g.severedX = b.x + 3; a.score += 250;
      b.bleeding = 'no'; return 'deadB';
    }
    b.life -= 1;
    if (b.life <= 0) { startPose(g, b, 'dead'); b.bleeding = 'yes'; return 'deadB'; }
    sfx(g, 'hit.ogg');
    startPose(g, b, 'hit1'); b.beheadable = 'yes';
    return 'collision';
  },
  hit1(g, a, b) {
    if (g.time > b.refTime + 20) {
      b.sprite = 'standing'; b.busy = 'no';
      b.state = 'standing'; return 'collision';
    }
    if (g.time > b.refTime + 15) { b.sprite = 'hit4'; return 'collision'; }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) { b.x += 1; b.bleeding = 'no'; b.sprite = 'hit3'; return 'collision'; }
    if (g.time > b.refTime + 6) { return 'collision'; }
    if (g.time > b.refTime + 5) { b.x += 2; b.sprite = 'hit2'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x += 1; b.sprite = 'hit1'; return 'collision'; }
    b.sprite = 'hit1';
  },
  hitRev(g, a, b) {
    b.waiting = 0;
    b.attackX = b.x;
    setHurtX(b, b.x);
    resetHurtY(b);
    if (a.state === 'kickRev') { b.state = 'fallRev'; return 'poseB'; }
    b.bleeding = 'yes';
    b.snake = 'yes';
    if (a.state === 'beheadRev' && b.beheadable === 'yes') {
      startPose(g, b, 'deadBeheadingRev');
      sfx(g, 'behead.ogg');
      g.severedX = b.x + 3; a.score += 250;
      b.bleeding = 'no'; return 'deadB';
    }
    b.life -= 1;
    if (b.life <= 0) { startPose(g, b, 'deadRev'); b.bleeding = 'yes'; return 'deadB'; }
    sfx(g, 'hit.ogg');
    startPose(g, b, 'hit1Rev'); b.beheadable = 'yes';
    return 'collision';
  },
  hit1Rev(g, a, b) {
    if (g.time > b.refTime + 20) {
      b.sprite = 'standingRev'; b.busy = 'no';
      b.state = 'standingRev'; return 'collision';
    }
    if (g.time > b.refTime + 15) { b.sprite = 'hit4Rev'; return 'collision'; }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) { b.x -= 1; b.bleeding = 'no'; b.sprite = 'hit3Rev'; return 'collision'; }
    if (g.time > b.refTime + 6) { return 'collision'; }
    if (g.time > b.refTime + 5) { b.x -= 2; b.sprite = 'hit2Rev'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x -= 1; b.sprite = 'hit1Rev'; return 'collision'; }
    b.sprite = 'hit1Rev';
  },
  fall(g, a, b) {
    b.waiting = 0;
    b.attackX = b.x + 4;
    setHurtX(b, b.x + 4);
    resetHurtY(b);
    b.bleeding = 'yes';
    b.snake = 'yes';
    b.life -= 1; a.score += 100;
    if (a.state === 'rollForward') { b.life += 1; b.bleeding = 'no'; b.snake = 'no'; a.score -= 100; }
    if (b.life <= 0) {
      startPose(g, b, 'dead'); b.bleeding = 'yes';
      if (a.state === 'headButt' || a.state === 'kick') { b.bleeding = 'no'; }
      return 'deadB';
    }
    sfx(g, 'fall.ogg');
    if (a.state === 'kick') { sfx(g, 'nothing.ogg'); }
    if (a.state === 'headButt' || a.state === 'kick') {
      a.score += 150; b.bleeding = 'no';
      if (a.state === 'headButt') { sfx(g, 'ball.wav'); }
    }
    startPose(g, b, 'fall1');
    return 'collision';
  },
  fall1(g, a, b) {
    b.waiting = 0;
    b.attackX = b.x + 4;
    setHurtX(b, b.x + 4);
    if (g.time > b.refTime + 25) {
      b.sprite = 'standing'; b.x += 1; b.state = 'standing'; b.busy = 'no'; return 'collision';
    }
    if (g.time > b.refTime + 20) { b.sprite = 'fall4'; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'fall3'; return 'collision'; }
    if (g.time > b.refTime + 10) { return 'collision'; }
    if (g.time > b.refTime + 9) { b.bleeding = 'no'; b.x += 2; b.sprite = 'fall2'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x += 2; return 'collision'; }
    b.sprite = 'fall1';
  },
  fallRev(g, a, b) {
    b.attackX = b.x;
    b.waiting = 0;
    setHurtX(b, b.x);
    resetHurtY(b);
    b.bleeding = 'yes';
    b.snake = 'yes';
    b.life -= 1; a.score += 100;
    if (a.state === 'rollForwardRev') { b.life += 1; b.bleeding = 'no'; b.snake = 'no'; a.score -= 100; }
    if (b.life <= 0) {
      startPose(g, b, 'deadRev'); b.bleeding = 'yes';
      if (a.state === 'headButtRev' || a.state === 'kickRev') { b.bleeding = 'no'; }
      return 'deadB';
    }
    sfx(g, 'head.ogg');
    if (a.state === 'kickRev') { sfx(g, 'nothing.ogg'); }
    if (a.state === 'headButtRev' || a.state === 'kickRev') {
      a.score += 150; b.bleeding = 'no';
      if (a.state === 'headButtRev') { sfx(g, 'ball.wav'); }
    }
    startPose(g, b, 'fall1Rev');
    return 'collision';
  },
  fall1Rev(g, a, b) {
    b.attackX = b.x;
    b.waiting = 0;
    setHurtX(b, b.x);
    if (g.time > b.refTime + 25) {
      b.sprite = 'standingRev'; b.x -= 1; b.state = 'standingRev'; b.busy = 'no'; return 'collision';
    }
    if (g.time > b.refTime + 20) { b.sprite = 'fall4Rev'; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'fall3Rev'; return 'collision'; }
    if (g.time > b.refTime + 10) { return 'collision'; }
    if (g.time > b.refTime + 9) { b.bleeding = 'no'; b.x -= 2; b.sprite = 'fall2Rev'; return 'collision'; }
    if (g.time > b.refTime + 2) { return 'collision'; }
    if (g.time > b.refTime + 1) { b.x -= 2; return 'collision'; }
    b.sprite = 'fall1Rev';
  },
};
