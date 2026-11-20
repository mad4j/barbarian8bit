// Poses: turning round, winning and dying.
// A pose function returns the next step, or nothing to carry on with the next pose of the chain (see index.js).
import { setHurtX, startPose } from '../fighter.js';
import { sfx } from '../sound.js';

export const finishA = {
  turn(g, a, b) {
    a.attackX = a.x; setHurtX(a, a.x + 4);
    a.attackY = 14;
    a.sprite = 'turn1';
    if (g.time > a.refTime + 5) { a.sprite = 'turn2'; }
    if (g.time > a.refTime + 10) { a.sprite = 'turn3'; }
    if (g.time > a.refTime + 15) { a.state = 'standingRev'; a.busy = 'no'; g.direction = 'reverse'; }
  },
  turnRev(g, a, b) {
    a.attackX = a.x + 4; setHurtX(a, a.x);
    a.attackY = 14;
    a.sprite = 'turn1';
    if (g.time > a.refTime + 5) { a.sprite = 'turn2'; }
    if (g.time > a.refTime + 10) { a.sprite = 'turn3'; }
    if (g.time > a.refTime + 15) { a.state = 'standing'; a.busy = 'no'; g.direction = 'normal'; }
  },
  winner(g, a, b) {
    a.sprite = 'winner1';
    a.beheadable = 'yes';
    a.bleeding = 'no';
    a.attackX = a.x; a.kneeY = 20; a.attackY = 14;
    setHurtX(a, a.x + 4);
    if (g.time > a.refTime + 18) { a.sprite = 'winner2'; }
    if (g.time > a.refTime + 35) { a.sprite = 'winner3'; }
    if (g.time > a.refTime + 85) { a.sprite = 'winner2'; }
    if (g.time > a.refTime + 100) { a.sprite = 'winner1'; }
  },
  winnerRev(g, a, b) {
    a.sprite = 'winner1Rev';
    a.beheadable = 'yes';
    a.bleeding = 'no';
    a.attackX = a.foreheadX + 4; a.kneeY = 20; a.attackY = 14;
    setHurtX(a, a.x);
    if (g.time > a.refTime + 18) { a.sprite = 'winner2Rev'; }
    if (g.time > a.refTime + 35) { a.sprite = 'winner3Rev'; }
    if (g.time > a.refTime + 85) { a.sprite = 'winner2Rev'; }
    if (g.time > a.refTime + 100) { a.sprite = 'winner1Rev'; }
  },
  winnerKO(g, a, b) {
    a.beheadable = 'yes';
    a.bleeding = 'no';
    a.attackX = a.x; a.kneeY = 20;
    setHurtX(a, a.x + 4);
    if (g.time > a.refTime + 230) {
      g.gnome = 'yes'; a.refTime = g.time;
      g.gnomeX = 3;
      g.severedX = 270;
      return 'scene';
    }
    if (g.time > a.refTime + 205) { a.sprite = 'winner1'; return 'damageB'; }
    if (g.time > a.refTime + 195) { a.sprite = 'winner2'; return 'damageB'; }
    if (g.time > a.refTime + 140) { a.sprite = 'winner3'; return 'damageB'; }
    if (g.time > a.refTime + 123) { a.sprite = 'winner2'; return 'damageB'; }
    if (g.time > a.refTime + 105) { a.sprite = 'winner1'; return 'damageB'; }
    if (g.time > a.refTime + 100) { a.sprite = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 75) { a.sprite = 'foot1'; b.sprite = 'dead4'; return 'damageB'; }
    if (g.time > a.refTime + 71) { return 'damageB'; }
    if (g.time > a.refTime + 70) { a.sprite = 'foot2'; b.sprite = 'dead3'; b.x += 2; return 'damageB'; }
    if (g.time > a.refTime + 55) { a.sprite = 'foot1'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 36) { return 'damageB'; }
    if (g.time > a.refTime + 35) {
      g.distance = b.x - a.x;
      if (g.distance < 5) { a.sprite = 'walk3'; a.x -= 1; }
      if (g.distance > 5) { a.sprite = 'walk3'; a.x += 1; }
      return 'collision';
    }
    if (g.time > a.refTime + 30) { a.sprite = 'standing'; return 'damageB'; }
    if (g.time > a.refTime + 23) { a.sprite = 'turn3'; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'turn2'; return 'damageB'; }
    if (g.time > a.refTime + 8) { a.sprite = 'turn1'; }
  },
  winnerKORev(g, a, b) {
    a.beheadable = 'yes';
    a.bleeding = 'no';
    a.attackX = a.foreheadX + 4; a.kneeY = 20;
    setHurtX(a, a.x);
    if (g.time > a.refTime + 230) {
      g.gnome = 'yes'; a.refTime = g.time;
      g.gnomeX = 3;
      g.severedX = 270;
      return 'scene';
    }
    if (g.time > a.refTime + 205) { a.sprite = 'winner1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 190) { a.sprite = 'winner2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 140) { a.sprite = 'winner3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 123) { a.sprite = 'winner2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 105) { a.sprite = 'winner1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 100) { a.sprite = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 75) { a.sprite = 'foot1Rev'; b.sprite = 'dead4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 71) { return 'damageB'; }
    if (g.time > a.refTime + 70) { a.sprite = 'foot2Rev'; b.sprite = 'dead3Rev'; b.x -= 2; return 'damageB'; }
    if (g.time > a.refTime + 55) { a.sprite = 'foot1Rev'; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.sprite = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 36) { return 'damageB'; }
    if (g.time > a.refTime + 35) {
      g.distance = a.x - b.x;
      if (g.distance < 5) { a.sprite = 'walk3Rev'; a.x += 1; }
      if (g.distance > 5) { a.sprite = 'walk3Rev'; a.x -= 1; }
      return 'collision';
    }
    if (g.time > a.refTime + 30) { a.sprite = 'standingRev'; return 'damageB'; }
    if (g.time > a.refTime + 23) { a.sprite = 'turn3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.sprite = 'turn2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 8) { a.sprite = 'turn1Rev'; }
  },
  dead(g, a, b) {
    if (g.time > a.refTime + 16) { return 'damageB'; }
    if (g.time > a.refTime + 15) { a.bleeding = 'no'; a.sprite = 'dead2'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.sprite = 'dead1'; return 'damageB'; }
    a.sprite = 'dead1'; startPose(g, b, 'winnerKO');
    if (g.gnome === 'no') { sfx(g, 'dead.wav'); }
  },
  deadRev(g, a, b) {
    if (g.time > a.refTime + 16) { return 'damageB'; }
    if (g.time > a.refTime + 15) { a.bleeding = 'no'; a.sprite = 'dead2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.sprite = 'dead1Rev'; return 'damageB'; }
    a.sprite = 'dead1Rev';
    startPose(g, b, 'winnerKORev');
    if (g.gnome === 'no') { sfx(g, 'dead.wav'); }
  },
  deadBeheading(g, a, b) {
    if (g.time > a.refTime + 80) { a.sprite = 'beheading4'; return 'damageB'; }
    if (g.time > a.refTime + 70) { a.sprite = 'beheading3'; return 'damageB'; }
    if (g.time > a.refTime + 55) { a.bloodBeheading = 0; return 'damageB'; }
    if (g.time > a.refTime + 50) { a.bloodBeheading = 6; return 'damageB'; }
    if (g.time > a.refTime + 45) { a.bloodBeheading = 5; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.bloodBeheading = 4; return 'damageB'; }
    if (g.time > a.refTime + 35) { a.sprite = 'beheading2'; return 'damageB'; }
    if (g.time > a.refTime + 20) { a.bloodBeheading = 0; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.bloodBeheading = 3; return 'damageB'; }
    if (g.time > a.refTime + 10) { a.bloodBeheading = 2; return 'damageB'; }
    if (g.time > a.refTime + 5) { a.bloodBeheading = 1; return 'damageB'; }
    a.sprite = 'beheading1'; startPose(g, b, 'winner');
  },
  deadBeheadingRev(g, a, b) {
    if (g.time > a.refTime + 80) { a.sprite = 'beheading4Rev'; return 'damageB'; }
    if (g.time > a.refTime + 70) { a.sprite = 'beheading3Rev'; return 'damageB'; }
    if (g.time > a.refTime + 55) { a.bloodBeheading = 0; return 'damageB'; }
    if (g.time > a.refTime + 50) { a.bloodBeheading = 6; return 'damageB'; }
    if (g.time > a.refTime + 45) { a.bloodBeheading = 5; return 'damageB'; }
    if (g.time > a.refTime + 40) { a.bloodBeheading = 4; return 'damageB'; }
    if (g.time > a.refTime + 35) { a.sprite = 'beheading2Rev'; return 'damageB'; }
    if (g.time > a.refTime + 20) { a.bloodBeheading = 0; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.bloodBeheading = 3; return 'damageB'; }
    if (g.time > a.refTime + 10) { a.bloodBeheading = 2; return 'damageB'; }
    if (g.time > a.refTime + 5) { a.bloodBeheading = 1; return 'damageB'; }
    a.sprite = 'beheading1Rev'; startPose(g, b, 'winnerRev');
  },
  deadWizard(g, a, b) {
    if (g.time > a.refTime + 86) { a.state = 'wizardFinished'; return 'damageB'; }
    if (g.time > a.refTime + 85) { a.bleeding = 'no'; a.sprite = 'dead4'; return 'damageB'; }
    if (g.time > a.refTime + 71) { return 'damageB'; }
    if (g.time > a.refTime + 70) { a.bleeding = 'no'; a.sprite = 'dead3'; a.x += 2; return 'damageB'; }
    if (g.time > a.refTime + 15) { a.bleeding = 'no'; a.sprite = 'dead2'; return 'damageB'; }
    if (g.time > a.refTime + 1) { a.sprite = 'dead1'; return 'damageB'; }
    a.sprite = 'dead1';
    if (g.gnome === 'no') { sfx(g, 'dead.wav'); }
  },
  victory(g, a, b) {
    a.sprite = 'protectHead';
    if (g.time > a.refTime + 10) { a.sprite = 'winner1'; }
    if (g.time > a.refTime + 20) { a.sprite = 'winner2'; }
    if (g.time > a.refTime + 30) { a.sprite = 'winner3'; }
    if (g.time > a.refTime + 80) { a.sprite = 'winner2'; }
    if (g.time > a.refTime + 90) {
      a.sprite = 'winner1'; a.state = 'finished';
      g.game = 'won';
    }
    return 'scene';
  },
};

export const finishB = {
  turn(g, a, b) {
    b.attackX = b.x + 4; setHurtX(b, b.x);
    b.attackY = 14;
    b.sprite = 'turn1';
    if (g.time > b.refTime + 5) { b.sprite = 'turn2'; }
    if (g.time > b.refTime + 10) { b.sprite = 'turn3'; }
    if (g.time > b.refTime + 15) { b.state = 'standingRev'; b.busy = 'no'; g.direction = 'reverse'; }
  },
  turnRev(g, a, b) {
    b.attackX = b.x; setHurtX(b, b.x + 4);
    b.attackY = 14;
    b.sprite = 'turn1Rev';
    if (g.time > b.refTime + 5) { b.sprite = 'turn2Rev'; }
    if (g.time > b.refTime + 10) { b.sprite = 'turn3Rev'; }
    if (g.time > b.refTime + 15) { b.state = 'standing'; b.busy = 'no'; g.direction = 'normal'; }
  },
  winner(g, a, b) {
    b.sprite = 'winner1';
    b.beheadable = 'yes';
    b.bleeding = 'no';
    b.attackX = b.x + 4; b.attackY = 14; b.kneeY = 20;
    setHurtX(b, b.x);
    if (g.time > b.refTime + 18) { b.sprite = 'winner2'; }
    if (g.time > b.refTime + 35) { b.sprite = 'winner3'; }
    if (g.time > b.refTime + 85) { b.sprite = 'winner2'; }
    if (g.time > b.refTime + 100) { b.sprite = 'winner1'; }
  },
  winnerRev(g, a, b) {
    b.sprite = 'winner1Rev';
    b.beheadable = 'yes';
    b.bleeding = 'no';
    b.attackX = b.x; b.attackY = 14; b.kneeY = 20;
    setHurtX(b, b.x + 4);
    if (g.time > b.refTime + 18) { b.sprite = 'winner2Rev'; }
    if (g.time > b.refTime + 35) { b.sprite = 'winner3Rev'; }
    if (g.time > b.refTime + 85) { b.sprite = 'winner2Rev'; }
    if (g.time > b.refTime + 100) { b.sprite = 'winner1Rev'; }
  },
  winnerKO(g, a, b) {
    b.beheadable = 'yes';
    b.bleeding = 'no';
    b.attackX = b.x + 4; b.kneeY = 20;
    setHurtX(b, b.x);
    if (g.time > a.refTime + 230) {
      g.gnome = 'yes'; a.refTime = g.time;
      g.gnomeX = 3;
      g.severedX = 270;
      return 'scene';
    }
    if (g.time > b.refTime + 205) { b.sprite = 'winner1'; return 'collision'; }
    if (g.time > b.refTime + 195) { b.sprite = 'winner2'; return 'collision'; }
    if (g.time > b.refTime + 140) { b.sprite = 'winner3'; return 'collision'; }
    if (g.time > b.refTime + 123) { b.sprite = 'winner2'; return 'collision'; }
    if (g.time > b.refTime + 105) { b.sprite = 'winner1'; return 'collision'; }
    if (g.time > b.refTime + 100) { b.sprite = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 75) { b.sprite = 'foot1'; a.sprite = 'dead4'; return 'collision'; }
    if (g.time > b.refTime + 71) { return 'collision'; }
    if (g.time > b.refTime + 70) { b.sprite = 'foot2'; a.sprite = 'dead3'; a.x -= 2; return 'collision'; }
    if (g.time > b.refTime + 55) { b.sprite = 'foot1'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 36) { return 'collision'; }
    if (g.time > b.refTime + 35) {
      g.distance = b.x - a.x;
      if (g.distance < 5) { b.sprite = 'walk3'; b.x += 1; }
      if (g.distance > 5) { b.sprite = 'walk3'; b.x -= 1; }
      return 'collision';
    }
    if (g.time > b.refTime + 30) { b.sprite = 'standing'; return 'collision'; }
    if (g.time > b.refTime + 23) { b.sprite = 'turn3'; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'turn2'; return 'collision'; }
    if (g.time > b.refTime + 8) { b.sprite = 'turn1'; }
  },
  winnerKORev(g, a, b) {
    b.beheadable = 'yes';
    b.bleeding = 'no';
    b.attackX = b.x; b.kneeY = 20;
    setHurtX(b, b.x + 4);
    if (g.time > a.refTime + 230) {
      g.gnome = 'yes'; a.refTime = g.time;
      g.gnomeX = 3;
      g.severedX = 270;
      return 'scene';
    }
    if (g.time > b.refTime + 205) { b.sprite = 'winner1Rev'; return 'collision'; }
    if (g.time > b.refTime + 190) { b.sprite = 'winner2Rev'; return 'collision'; }
    if (g.time > b.refTime + 140) { b.sprite = 'winner3Rev'; return 'collision'; }
    if (g.time > b.refTime + 123) { b.sprite = 'winner2Rev'; return 'collision'; }
    if (g.time > b.refTime + 105) { b.sprite = 'winner1Rev'; return 'collision'; }
    if (g.time > b.refTime + 100) { b.sprite = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 75) { b.sprite = 'foot1Rev'; a.sprite = 'dead4Rev'; return 'collision'; }
    if (g.time > b.refTime + 71) { return 'collision'; }
    if (g.time > b.refTime + 70) { b.sprite = 'foot2Rev'; a.sprite = 'dead3Rev'; a.x += 2; return 'collision'; }
    if (g.time > b.refTime + 55) { b.sprite = 'foot1Rev'; return 'collision'; }
    if (g.time > b.refTime + 40) { b.sprite = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 36) { return 'collision'; }
    if (g.time > b.refTime + 35) {
      g.distance = a.x - b.x;
      if (g.distance < 5) { b.sprite = 'walk3Rev'; b.x -= 1; }
      if (g.distance > 5) { b.sprite = 'walk3Rev'; b.x += 1; }
      return 'collision';
    }
    if (g.time > b.refTime + 30) { b.sprite = 'standingRev'; return 'collision'; }
    if (g.time > b.refTime + 23) { b.sprite = 'turn3Rev'; return 'collision'; }
    if (g.time > b.refTime + 15) { b.sprite = 'turn2Rev'; return 'collision'; }
    if (g.time > b.refTime + 8) { b.sprite = 'turn1Rev'; }
  },
  dead(g, a, b) {
    setHurtX(b, b.x);
    if (g.time > b.refTime + 16) { return 'collision'; }
    if (g.time > b.refTime + 15) { b.bleeding = 'no'; b.sprite = 'dead2'; return 'collision'; }
    if (g.time > b.refTime + 1) { b.sprite = 'dead1'; return 'collision'; }
    b.sprite = 'dead1'; startPose(g, a, 'winnerKO');
    if (g.gnome === 'no') { sfx(g, 'dead.wav'); }
  },
  deadRev(g, a, b) {
    if (g.time > b.refTime + 16) { return 'collision'; }
    if (g.time > b.refTime + 15) { b.bleeding = 'no'; b.sprite = 'dead2Rev'; return 'collision'; }
    if (g.time > b.refTime + 1) { b.sprite = 'dead1Rev'; return 'collision'; }
    b.sprite = 'dead1Rev'; startPose(g, a, 'winnerKORev');
    if (g.gnome === 'no') { sfx(g, 'dead.wav'); }
  },
  deadBeheading(g, a, b) {
    if (g.time > b.refTime + 80) { b.sprite = 'beheading4'; return 'collision'; }
    if (g.time > b.refTime + 70) { b.sprite = 'beheading3'; return 'collision'; }
    if (g.time > b.refTime + 55) { b.bloodBeheading = 0; return 'collision'; }
    if (g.time > b.refTime + 50) { b.bloodBeheading = 6; return 'collision'; }
    if (g.time > b.refTime + 45) { b.bloodBeheading = 5; return 'collision'; }
    if (g.time > b.refTime + 40) { b.bloodBeheading = 4; return 'collision'; }
    if (g.time > b.refTime + 35) { b.sprite = 'beheading2'; return 'collision'; }
    if (g.time > b.refTime + 20) { b.bloodBeheading = 0; return 'collision'; }
    if (g.time > b.refTime + 15) { b.bloodBeheading = 3; return 'collision'; }
    if (g.time > b.refTime + 10) { b.bloodBeheading = 2; return 'collision'; }
    if (g.time > b.refTime + 5) { b.bloodBeheading = 1; return 'collision'; }
    b.sprite = 'beheading1'; startPose(g, a, 'winner');
  },
  deadBeheadingRev(g, a, b) {
    if (g.time > b.refTime + 80) { b.sprite = 'beheading4Rev'; return 'collision'; }
    if (g.time > b.refTime + 70) { b.sprite = 'beheading3Rev'; return 'collision'; }
    if (g.time > b.refTime + 55) { b.bloodBeheading = 0; return 'collision'; }
    if (g.time > b.refTime + 50) { b.bloodBeheading = 6; return 'collision'; }
    if (g.time > b.refTime + 45) { b.bloodBeheading = 5; return 'collision'; }
    if (g.time > b.refTime + 40) { b.bloodBeheading = 4; return 'collision'; }
    if (g.time > b.refTime + 35) { b.sprite = 'beheading2Rev'; return 'collision'; }
    if (g.time > b.refTime + 20) { b.bloodBeheading = 0; return 'collision'; }
    if (g.time > b.refTime + 15) { b.bloodBeheading = 3; return 'collision'; }
    if (g.time > b.refTime + 10) { b.bloodBeheading = 2; return 'collision'; }
    if (g.time > b.refTime + 5) { b.bloodBeheading = 1; return 'collision'; }
    b.sprite = 'beheading1Rev'; startPose(g, a, 'winnerRev');
  },
  wizard(g, a, b) {
    g.gnome = 'no';
    setHurtX(b, b.x);
    if (g.time > b.refTime + 171) { b.sprite = 'wizard1'; b.refTime = g.time; return 'collision'; }
    if (g.time > b.refTime + 170) { b.attackX = 34; return 'collision'; }
    if (g.time > b.refTime + 165) { b.attackX = 9; return 'collision'; }
    if (g.time > b.refTime + 160) { b.attackX = 11; return 'collision'; }
    if (g.time > b.refTime + 155) { b.attackX = 14; return 'collision'; }
    if (g.time > b.refTime + 150) { b.attackX = 17; return 'collision'; }
    if (g.time > b.refTime + 145) { b.attackX = 20; return 'collision'; }
    if (g.time > b.refTime + 140) { b.attackX = 23; b.sprite = 'wizard1'; b.x = 33; return 'collision'; }
    if (g.time > b.refTime + 135) { b.attackX = 26; return 'collision'; }
    if (g.time > b.refTime + 131) { return 'collision'; }
    if (g.time > b.refTime + 130) {
      b.sprite = 'wizard2'; b.x = 31; b.attackY = 16;
      sfx(g, 'sword.ogg');
      return 'collision';
    }
    if (g.time > b.refTime + 90) { b.attackX = 34; return 'collision'; }
    if (g.time > b.refTime + 85) { b.attackX = 9; return 'collision'; }
    if (g.time > b.refTime + 80) { b.attackX = 11; return 'collision'; }
    if (g.time > b.refTime + 75) { b.attackX = 14; return 'collision'; }
    if (g.time > b.refTime + 70) { b.attackX = 17; return 'collision'; }
    if (g.time > b.refTime + 65) { b.attackX = 20; b.attackY = 20; return 'collision'; }
    if (g.time > b.refTime + 60) { b.attackX = 23; b.sprite = 'wizard1'; b.x = 33; b.attackY = 18; return 'collision'; }
    if (g.time > b.refTime + 55) { b.attackX = 26; return 'collision'; }
    if (g.time > b.refTime + 51) { return 'collision'; }
    if (g.time > b.refTime + 50) {
      b.sprite = 'wizard2'; b.x = 31;
      sfx(g, 'sword.ogg');
      return 'collision';
    }
    b.sprite = 'wizard1'; b.x = 33;
    b.attackX = b.x + 4; b.attackY = 16; b.kneeY = 20;
    b.bleeding = 'no';
  },
};
