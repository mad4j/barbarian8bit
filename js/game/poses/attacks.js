// Poses: attacks.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX } from '../fighter.js';
import { sfx } from '../sound.js';

export const attacksA = {
  neck(g, a, b) {
    setHurtX(a, a.x + 4);
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'neck2'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 31) { a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 30) {
      a.sprite = 'neck3';
      if (b.state === 'neck') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.headX = a.x; a.attackX = a.x + 7; return 'damageB';
    }
    if (g.time > a.refTime + 16) { return 'damageB'; }
    if (g.time > a.refTime + 15) {
      sfx(g, 'sword.ogg');
      a.sprite = 'neck2'; a.attackY = a.headY; return 'damageB';
    }
    if (g.time > a.refTime + 3) { a.sprite = 'neck1'; return 'damageB'; }
  },
  neckRev(g, a, b) {
    setHurtX(a, a.x);
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'neck2Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 31) { a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 30) {
      a.sprite = 'neck3Rev';
      if (b.state === 'neckRev') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.headX = a.x + 4; a.attackX = a.x - 3; return 'damageB';
    }
    if (g.time > a.refTime + 16) { return 'damageB'; }
    if (g.time > a.refTime + 15) {
      sfx(g, 'sword.ogg');
      a.sprite = 'neck2Rev'; a.attackY = a.headY; return 'damageB';
    }
    if (g.time > a.refTime + 3) { a.sprite = 'neck1Rev'; return 'damageB'; }
  },
  bodyChop(g, a, b) {
    setHurtX(a, a.x + 4);
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'bodyChop2'; return 'damageB'; }
    if (g.time > a.refTime + 21) { a.sprite = 'bodyChop3'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 20) {
      a.sprite = 'bodyChop3';
      if (b.state === 'bodyChop') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.bodyX = a.x; a.attackX = a.x + 6; return 'damageB';
    }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) {
      sfx(g, 'sword.ogg');
      a.sprite = 'bodyChop2'; a.attackY = a.bodyY; return 'damageB';
    }
    a.sprite = 'bodyChop1';
  },
  bodyChopRev(g, a, b) {
    setHurtX(a, a.x);
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'bodyChop2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 21) { a.sprite = 'bodyChop3Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 20) {
      a.sprite = 'bodyChop3Rev';
      if (b.state === 'bodyChopRev') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.bodyX = a.x + 4; a.attackX = a.x - 2; return 'damageB';
    }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) {
      sfx(g, 'sword.ogg');
      a.sprite = 'bodyChop2Rev'; a.attackY = a.bodyY; return 'damageB';
    }
    a.sprite = 'bodyChop1Rev';
  },
  knee(g, a, b) {
    a.foreheadX = a.x; a.headX = a.x; a.bodyX = a.x; a.kneeX = a.x + 4;
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'sit2'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'knee2'; return 'damageB'; }
    if (g.time > a.refTime + 21) { a.sprite = 'knee3'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 20) {
      a.sprite = 'knee3';
      if (b.state === 'knee') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.kneeX = a.x; a.attackX = a.x + 7; return 'damageB';
    }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) {
      sfx(g, 'sword.ogg');
      a.sprite = 'knee2'; a.attackY = a.kneeY; return 'damageB';
    }
    a.sprite = 'knee1';
  },
  kneeRev(g, a, b) {
    a.kneeY = 20;
    a.foreheadX = a.x + 4; a.headX = a.x + 4; a.bodyX = a.x + 4; a.kneeX = a.x;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'sit2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'knee2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 21) { a.sprite = 'knee3Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 20) {
      a.sprite = 'knee3Rev';
      if (b.state === 'kneeRev') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.kneeX = a.x + 4; a.attackX = a.x - 3; return 'damageB';
    }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) {
      sfx(g, 'sword.ogg');
      a.sprite = 'knee2Rev'; a.attackY = a.kneeY; return 'damageB';
    }
    a.sprite = 'knee1Rev';
  },
  spider(g, a, b) {
    a.foreheadX = a.x + 4; a.headX = a.x + 4; a.bodyX = a.x; a.kneeX = a.x + 4;
    a.attackY = a.kneeY; a.attackX = a.x; a.kneeY = 20;
    if (g.time > a.refTime + 24) { a.busy = 'no'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 19) { a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 18) {
      sfx(g, 'sword.ogg');
      a.sprite = 'web4';
      if (b.state === 'spider') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.attackX = a.x + 5; return 'damageB';
    }
    if (g.time > a.refTime + 12) { a.sprite = 'web3'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 7) { return 'damageB'; }
    if (g.time > a.refTime + 6) {
      sfx(g, 'sword.ogg');
      a.sprite = 'web2'; a.attackX = a.x; return 'damageB';
    }
    a.sprite = 'web1';
  },
  spiderRev(g, a, b) {
    a.foreheadX = a.x; a.headX = a.x; a.bodyX = a.x + 4; a.kneeX = a.x;
    a.attackY = a.kneeY; a.attackX = a.x + 4; a.kneeY = 20;
    if (g.time > a.refTime + 24) { a.busy = 'no'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 19) { a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 18) {
      sfx(g, 'sword.ogg');
      a.sprite = 'web4Rev';
      if (b.state === 'spiderRev') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.attackX = a.x - 1; return 'damageB';
    }
    if (g.time > a.refTime + 12) { a.sprite = 'web3Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 7) { return 'damageB'; }
    if (g.time > a.refTime + 6) {
      sfx(g, 'sword.ogg');
      a.sprite = 'web2Rev'; a.attackX = a.x + 4; return 'damageB';
    }
    a.sprite = 'web1Rev';
  },
  kick(g, a, b) {
    setHurtX(a, a.x + 4);
    a.sprite = 'foot1'; a.attackY = a.kneeY; a.kneeY = 20;
    if (g.time > a.refTime + 15) { a.sprite = 'foot2'; a.attackX = a.x + 5; }
    if (g.time > a.refTime + 16) { a.sprite = 'foot2'; a.attackX = a.x; }
    if (g.time > a.refTime + 30) { a.sprite = 'foot1'; }
    if (g.time > a.refTime + 45) { a.sprite = 'standing'; }
    if (g.time > a.refTime + 50) { a.busy = 'no'; a.state = 'standing'; }
  },
  kickRev(g, a, b) {
    setHurtX(a, a.x);
    a.sprite = 'foot1Rev'; a.attackY = a.kneeY; a.kneeY = 20;
    if (g.time > a.refTime + 15) { a.sprite = 'foot2Rev'; a.attackX = a.x - 1; }
    if (g.time > a.refTime + 16) { a.sprite = 'foot2Rev'; a.attackX = a.x + 4; }
    if (g.time > a.refTime + 30) { a.sprite = 'foot1Rev'; }
    if (g.time > a.refTime + 45) { a.sprite = 'standingRev'; }
    if (g.time > a.refTime + 50) { a.busy = 'no'; a.state = 'standingRev'; }
  },
  headButt(g, a, b) {
    setHurtX(a, a.x + 4);
    a.kneeY = 20;
    if (g.time > a.refTime + 37) { a.busy = 'no'; a.sprite = 'standing'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 29) { return 'damageB'; }
    if (g.time > a.refTime + 28) { a.x -= 1; a.sprite = 'head1'; return 'damageB'; }
    if (g.time > a.refTime + 20) { a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 19) { a.sprite = 'head2'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 18) { a.x += 1; a.sprite = 'head2'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 9) { a.sprite = 'head1'; a.attackY = a.headY; return 'damageB'; }
    a.sprite = 'head1';
  },
  headButtRev(g, a, b) {
    setHurtX(a, a.x);
    a.kneeY = 20; a.headY = 16;
    if (g.time > a.refTime + 37) { a.busy = 'no'; a.sprite = 'standingRev'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 29) { return 'damageB'; }
    if (g.time > a.refTime + 28) { a.x += 1; a.sprite = 'head1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 20) { a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 19) { a.sprite = 'head2Rev'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 18) { a.x -= 1; a.sprite = 'head2Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 9) { a.sprite = 'head1Rev'; a.attackY = a.headY; return 'damageB'; }
    a.sprite = 'head1Rev';
  },
  behead(g, a, b) {
    a.beheadable = 'no';
    a.foreheadX = a.x + 3; a.headX = a.x + 2; a.bodyX = a.x + 2; a.kneeX = a.x + 4;
    if (g.time > a.refTime + 58) { a.busy = 'no'; a.sprite = 'standing'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 51) { a.sprite = 'neck2'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 50) {
      sfx(g, 'sword.ogg');
      a.sprite = 'neck3'; a.headX = a.x; a.attackX = a.x + 6; return 'damageB';
    }
    if (g.time > a.refTime + 39) { a.sprite = 'neck3'; a.attackY = a.headY; return 'damageB'; }
    if (g.time > a.refTime + 33) { a.sprite = 'neck2'; a.attackY = a.headY; return 'damageB'; }
    if (g.time > a.refTime + 29) { a.sprite = 'neck1'; a.attackY = a.headY; return 'damageB'; }
    if (g.time > a.refTime + 25) { return 'damageB'; }
    if (g.time > a.refTime + 24) { a.x += 1; return 'damageB'; }
    if (g.time > a.refTime + 20) { a.sprite = 'turn3'; return 'damageB'; }
    if (g.time > a.refTime + 19) { a.x += 1; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'turn3'; return 'damageB'; }
    if (g.time > a.refTime + 14) { a.x += 1; return 'damageB'; }
    if (g.time > a.refTime + 10) { a.sprite = 'turn2'; return 'damageB'; }
    if (g.time > a.refTime + 9) { a.x += 1; return 'damageB'; }
    if (g.time > a.refTime + 5) { a.sprite = 'turn2'; return 'damageB'; }
    if (g.time > a.refTime + 4) { a.x += 1; return 'damageB'; }
    if (g.time > a.refTime + 2) { a.sprite = 'turn1'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x += 1; a.sprite = 'turn1'; return 'damageB'; }
  },
  beheadRev(g, a, b) {
    a.beheadable = 'no';
    a.foreheadX = a.x + 1; a.headX = a.x + 2; a.bodyX = a.x + 2; a.kneeX = a.x;
    if (g.time > a.refTime + 58) { a.busy = 'no'; a.sprite = 'standingRev'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 51) { a.sprite = 'neck2Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 50) {
      sfx(g, 'sword.ogg');
      a.sprite = 'neck3Rev'; a.headX = a.x + 4; a.attackX = a.x - 2; return 'damageB';
    }
    if (g.time > a.refTime + 39) { a.sprite = 'neck3Rev'; a.attackY = a.headY; return 'damageB'; }
    if (g.time > a.refTime + 33) { a.sprite = 'neck2Rev'; a.attackY = a.headY; return 'damageB'; }
    if (g.time > a.refTime + 29) { a.sprite = 'neck1Rev'; a.attackY = a.headY; return 'damageB'; }
    if (g.time > a.refTime + 25) { return 'damageB'; }
    if (g.time > a.refTime + 24) { a.x -= 1; return 'damageB'; }
    if (g.time > a.refTime + 20) { a.sprite = 'turn3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 19) { a.x -= 1; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'turn3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 14) { a.x -= 1; return 'damageB'; }
    if (g.time > a.refTime + 10) { a.sprite = 'turn2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 9) { a.x -= 1; return 'damageB'; }
    if (g.time > a.refTime + 5) { a.sprite = 'turn2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 4) { a.x -= 1; return 'damageB'; }
    if (g.time > a.refTime + 2) { a.sprite = 'turn1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.x -= 1; a.sprite = 'turn1Rev'; return 'damageB'; }
  },
  forehead(g, a, b) {
    setHurtX(a, a.x + 4);
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 30) { a.sprite = 'forehead2'; return 'damageB'; }
    if (g.time > a.refTime + 24) { a.sprite = 'forehead3'; a.attackX = a.x; return 'damageB'; }
    if (g.time > a.refTime + 23) {
      a.sprite = 'forehead3';
      if (b.state === 'forehead') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.foreheadX = a.x; a.attackX = a.x + 7; return 'damageB';
    }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) {
      sfx(g, 'sword.ogg');
      a.sprite = 'forehead2'; a.attackY = a.foreheadY; return 'damageB';
    }
    if (g.time > a.refTime + 3) { a.sprite = 'forehead1'; return 'damageB'; }
  },
  foreheadRev(g, a, b) {
    setHurtX(a, a.x);
    a.kneeY = 20;
    if (g.time > a.refTime + 45) { a.busy = 'no'; a.state = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 30) { a.sprite = 'forehead2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 24) { a.sprite = 'forehead3Rev'; a.attackX = a.x + 4; return 'damageB'; }
    if (g.time > a.refTime + 23) {
      a.sprite = 'forehead3Rev';
      if (b.state === 'foreheadRev') {
        if (g.distance < 12) { sfx(g, 'cling.ogg'); }
        return 'damageB';
      }
      a.foreheadX = a.x + 4; a.attackX = a.x - 3; return 'damageB';
    }
    if (g.time > a.refTime + 11) { return 'damageB'; }
    if (g.time > a.refTime + 10) {
      sfx(g, 'sword.ogg');
      a.sprite = 'forehead2Rev'; a.attackY = a.foreheadY; return 'damageB';
    }
    if (g.time > a.refTime + 3) { a.sprite = 'forehead1Rev'; return 'damageB'; }
  },
};

export const attacksB = {
  neck(g, a, b) {
    setHurtX(b, b.x);
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'neck2'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 31) { b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 30) {
      b.sprite = 'neck3';
      if (a.state === 'neck') { return 'collision'; }
      b.headX = b.x + 4; b.attackX = b.x - 3; return 'collision';
    }
    if (g.time > b.refTime + 16) { return 'collision'; }
    if (g.time > b.refTime + 15) {
      sfx(g, 'sword.ogg');
      b.sprite = 'neck2'; b.attackY = b.headY; return 'collision';
    }
    if (g.time > b.refTime + 3) { b.sprite = 'neck1'; return 'collision'; }
  },
  neckRev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'neck2Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 31) { b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 30) {
      b.sprite = 'neck3Rev';
      if (a.state === 'neckRev') { return 'collision'; }
      b.headX = b.x; b.attackX = b.x + 7; return 'collision';
    }
    if (g.time > b.refTime + 16) { return 'collision'; }
    if (g.time > b.refTime + 15) {
      sfx(g, 'sword.ogg');
      b.sprite = 'neck2Rev'; b.attackY = b.headY; return 'collision';
    }
    if (g.time > b.refTime + 3) { b.sprite = 'neck1Rev'; return 'collision'; }
  },
  bodyChop(g, a, b) {
    setHurtX(b, b.x);
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'bodyChop2'; return 'collision'; }
    if (g.time > b.refTime + 21) { b.sprite = 'bodyChop3'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 20) {
      b.sprite = 'bodyChop3';
      if (a.state === 'bodyChop') { return 'collision'; }
      b.bodyX = b.x + 4; b.attackX = b.x - 2; return 'collision';
    }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) {
      sfx(g, 'sword.ogg');
      b.sprite = 'bodyChop2'; b.attackY = b.bodyY;
    }
    b.sprite = 'bodyChop1';
  },
  bodyChopRev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'bodyChop2Rev'; return 'collision'; }
    if (g.time > b.refTime + 21) { b.sprite = 'bodyChop3Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 20) {
      b.sprite = 'bodyChop3Rev';
      if (a.state === 'bodyChopRev') { return 'collision'; }
      b.bodyX = b.x; b.attackX = b.x + 6; return 'collision';
    }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) {
      sfx(g, 'sword.ogg');
      b.sprite = 'bodyChop2Rev'; b.attackY = b.bodyY; return 'collision';
    }
    b.sprite = 'bodyChop1Rev';
  },
  knee(g, a, b) {
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x + 4; b.kneeX = b.x;
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'sit2'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'knee2'; return 'collision'; }
    if (g.time > b.refTime + 21) { b.sprite = 'knee3'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 20) {
      b.sprite = 'knee3';
      if (a.state === 'knee') { return 'collision'; }
      b.kneeX = b.x + 4; b.attackX = b.x - 3; return 'collision';
    }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) {
      sfx(g, 'sword.ogg');
      b.sprite = 'knee2'; b.attackY = b.kneeY; return 'collision';
    }
    b.sprite = 'knee1';
  },
  kneeRev(g, a, b) {
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x; b.kneeX = b.x + 4;
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'sit2Rev'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'knee2Rev'; return 'collision'; }
    if (g.time > b.refTime + 21) { b.sprite = 'knee3Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 20) {
      b.sprite = 'knee3Rev';
      if (a.state === 'kneeRev') { return 'collision'; }
      b.kneeX = b.x; b.attackX = b.x + 7; return 'collision';
    }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) {
      sfx(g, 'sword.ogg');
      b.sprite = 'knee2Rev'; b.attackY = b.kneeY; return 'collision';
    }
    b.sprite = 'knee1Rev';
  },
  spider(g, a, b) {
    b.foreheadX = b.x; b.headX = b.x; b.bodyX = b.x + 4; b.kneeX = b.x;
    b.attackY = b.kneeY; b.attackX = b.x + 4; b.kneeY = 20;
    if (g.time > b.refTime + 24) { b.busy = 'no'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 19) { b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 18) {
      sfx(g, 'sword.ogg');
      b.sprite = 'web4';
      if (a.state === 'spider') { return 'collision'; }
      b.attackX = b.x - 1; return 'collision';
    }
    if (g.time > b.refTime + 13) { return 'collision'; }
    if (g.time > b.refTime + 12) { b.sprite = 'web3'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 7) { return 'collision'; }
    if (g.time > b.refTime + 6) {
      sfx(g, 'sword.ogg');
      b.sprite = 'web2'; b.attackX = b.x + 4; return 'collision';
    }
    b.sprite = 'web1';
  },
  spiderRev(g, a, b) {
    b.foreheadX = b.x + 4; b.headX = b.x + 4; b.bodyX = b.x; b.kneeX = b.x + 4;
    b.attackY = b.kneeY; b.attackX = b.x; b.kneeY = 20;
    if (g.time > b.refTime + 24) { b.busy = 'no'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 19) { b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 18) {
      sfx(g, 'sword.ogg');
      b.sprite = 'web4Rev';
      if (a.state === 'spiderRev') { return 'collision'; }
      b.attackX = b.x + 5; return 'collision';
    }
    if (g.time > b.refTime + 13) { return 'collision'; }
    if (g.time > b.refTime + 12) { b.sprite = 'web3Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 7) { return 'collision'; }
    if (g.time > b.refTime + 6) {
      sfx(g, 'sword.ogg');
      b.sprite = 'web2Rev'; b.attackX = b.x; return 'collision';
    }
    b.sprite = 'web1Rev';
  },
  kick(g, a, b) {
    setHurtX(b, b.x);
    b.sprite = 'foot1'; b.attackY = b.kneeY; b.kneeY = 20;
    if (g.time > b.refTime + 15) { b.sprite = 'foot2'; b.attackX = b.x - 1; }
    if (g.time > b.refTime + 16) { b.sprite = 'foot2'; b.attackX = b.x + 4; }
    if (g.time > b.refTime + 30) { b.sprite = 'foot1'; }
    if (g.time > b.refTime + 45) { b.sprite = 'standing'; }
    if (g.time > b.refTime + 50) { b.busy = 'no'; b.state = 'standing'; }
  },
  kickRev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.sprite = 'foot1Rev'; b.attackY = b.kneeY; b.kneeY = 20;
    if (g.time > b.refTime + 15) { b.sprite = 'foot2Rev'; b.attackX = b.x + 5; }
    if (g.time > b.refTime + 16) { b.sprite = 'foot2Rev'; b.attackX = b.x; }
    if (g.time > b.refTime + 30) { b.sprite = 'foot1Rev'; }
    if (g.time > b.refTime + 45) { b.sprite = 'standingRev'; }
    if (g.time > b.refTime + 50) { b.busy = 'no'; b.state = 'standingRev'; }
  },
  headButt(g, a, b) {
    setHurtX(b, b.x);
    b.kneeY = 20;
    if (g.time > b.refTime + 37) { b.busy = 'no'; b.sprite = 'standing'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 29) { return 'collision'; }
    if (g.time > b.refTime + 28) { b.x += 1; b.sprite = 'head1'; return 'collision'; }
    if (g.time > b.refTime + 20) { b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 19) { b.sprite = 'head2'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 18) { b.x -= 1; b.sprite = 'head2'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 9) { b.sprite = 'head1'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 1) { b.sprite = 'head1'; }
  },
  headButtRev(g, a, b) {
    setHurtX(b, b.x + 4);
    b.kneeY = 20;
    if (g.time > b.refTime + 37) { b.busy = 'no'; b.sprite = 'standingRev'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 29) { return 'collision'; }
    if (g.time > b.refTime + 28) { b.x -= 1; b.sprite = 'head1Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 20) { b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 19) { b.sprite = 'head2Rev'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 18) { b.x += 1; b.sprite = 'head2Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 9) { b.sprite = 'head1Rev'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 1) { b.sprite = 'head1Rev'; }
  },
  behead(g, a, b) {
    b.beheadable = 'no';
    b.foreheadX = b.x + 1; b.headX = b.x + 2; b.bodyX = b.x + 2; b.kneeX = b.x;
    if (g.time > b.refTime + 58) { b.busy = 'no'; b.sprite = 'standing'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 51) { b.sprite = 'neck2'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 50) {
      sfx(g, 'sword.ogg');
      b.sprite = 'neck3'; b.headX = b.x + 4; b.attackX = b.x - 2; return 'collision';
    }
    if (g.time > b.refTime + 40) { b.sprite = 'neck3'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 35) { b.sprite = 'neck2'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 30) { b.sprite = 'neck1'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 25) { return 'collision'; }
    if (g.time > b.refTime + 24) { b.x -= 1; return 'collision'; }
    if (g.time > b.refTime + 20) { b.sprite = 'turn3'; return 'collision'; }
    if (g.time > b.refTime + 19) { b.x -= 1; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'turn3'; return 'collision'; }
    if (g.time > b.refTime + 14) { b.x -= 1; return 'collision'; }
    if (g.time > b.refTime + 10) { b.sprite = 'turn2'; return 'collision'; }
    if (g.time > b.refTime + 9) { b.x -= 1; return 'collision'; }
    if (g.time > b.refTime + 5) { b.sprite = 'turn2'; return 'collision'; }
    if (g.time > b.refTime + 4) { b.x -= 1; return 'collision'; }
    if (g.time > b.refTime + 2) { b.sprite = 'turn1'; return 'collision'; }
    if (g.time > b.refTime + 1) { b.x -= 1; b.sprite = 'turn1'; return 'collision'; }
  },
  beheadRev(g, a, b) {
    b.beheadable = 'no';
    b.foreheadX = b.x + 3; b.headX = b.x + 2; b.bodyX = b.x + 2; b.kneeX = b.x + 4;
    if (g.time > b.refTime + 58) { b.busy = 'no'; b.sprite = 'standingRev'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 51) { b.sprite = 'neck2Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 50) {
      sfx(g, 'sword.ogg');
      b.sprite = 'neck3Rev'; b.headX = b.x; b.attackX = b.x + 6; return 'collision';
    }
    if (g.time > b.refTime + 40) { b.sprite = 'neck3Rev'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 35) { b.sprite = 'neck2Rev'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 30) { b.sprite = 'neck1Rev'; b.attackY = b.headY; return 'collision'; }
    if (g.time > b.refTime + 25) { return 'collision'; }
    if (g.time > b.refTime + 24) { b.x += 1; return 'collision'; }
    if (g.time > b.refTime + 20) { b.sprite = 'turn3Rev'; return 'collision'; }
    if (g.time > b.refTime + 19) { b.x += 1; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'turn3Rev'; return 'collision'; }
    if (g.time > b.refTime + 14) { b.x += 1; return 'collision'; }
    if (g.time > b.refTime + 10) { b.sprite = 'turn2Rev'; return 'collision'; }
    if (g.time > b.refTime + 9) { b.x += 1; return 'collision'; }
    if (g.time > b.refTime + 5) { b.sprite = 'turn2Rev'; return 'collision'; }
    if (g.time > b.refTime + 4) { b.x += 1; return 'collision'; }
    if (g.time > b.refTime + 2) { b.sprite = 'turn1Rev'; return 'collision'; }
    if (g.time > b.refTime + 1) { b.x += 1; b.sprite = 'turn1Rev'; return 'collision'; }
  },
  forehead(g, a, b) {
    setHurtX(b, b.x);
    b.kneeY = 20;
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 35) { b.sprite = 'forehead2'; return 'collision'; }
    if (g.time > b.refTime + 24) { b.sprite = 'forehead3'; b.attackX = b.x + 4; return 'collision'; }
    if (g.time > b.refTime + 23) {
      b.sprite = 'forehead3';
      if (a.state === 'forehead') { return 'collision'; }
      b.foreheadX = b.x + 4; b.attackX = b.x - 3; return 'collision';
    }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) {
      sfx(g, 'sword.ogg');
      b.sprite = 'forehead2'; b.attackY = b.foreheadY; return 'collision';
    }
    if (g.time > b.refTime + 5) { b.sprite = 'forehead1'; return 'collision'; }
  },
  foreheadRev(g, a, b) {
    b.kneeY = 20;
    setHurtX(b, b.x + 4);
    if (g.time > b.refTime + 45) { b.busy = 'no'; b.state = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 35) { b.sprite = 'forehead2Rev'; return 'collision'; }
    if (g.time > b.refTime + 24) { b.sprite = 'forehead3Rev'; b.attackX = b.x; return 'collision'; }
    if (g.time > b.refTime + 23) {
      b.sprite = 'forehead3Rev';
      if (a.state === 'foreheadRev') { return 'collision'; }
      b.foreheadX = b.x; b.attackX = b.x + 7; return 'collision';
    }
    if (g.time > b.refTime + 11) { return 'collision'; }
    if (g.time > b.refTime + 10) {
      sfx(g, 'sword.ogg');
      b.sprite = 'forehead2Rev'; b.attackY = b.foreheadY; return 'collision';
    }
    if (g.time > b.refTime + 5) { b.sprite = 'forehead1Rev'; return 'collision'; }
  },
};
