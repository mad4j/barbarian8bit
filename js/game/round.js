// The flow of the game around the fight: what happens at the start and at the end of every frame,
// when a round is won or lost, and how the rounds follow one another.
import { startPose } from './fighter.js';
import { sfx } from './sound.js';

// Next stage in the 2 player game; the torture room is repeated.
const VS_NEXT_STAGE = { throne: 'arena', arena: 'throne', plain: 'forest', forest: 'plain', torture: 'torture' };
// Next stage in the 1 player game (the first three levels are on the throne stage).
const SOLO_NEXT_STAGE = { throne: 'arena', arena: 'torture', torture: 'throne' };

// Back to the first level with empty scores.
function restartGame(g) {
  g.ai = 0;
  g.a.score = 0;
  g.b.score = 0;
  g.wizard = 'no';
  g.marianna = 'no';
  g.game = 'inProgress';
  g.stage = 'throne';
}

// Debug cheat: hold W + N to win the current level at once (in the wizard fight: to reach Marianna).
function applyCheat(g) {
  const { rt, a, b } = g;
  if (rt.keydown(119) && rt.keydown(110) && g.game === 'inProgress') {
    if (g.wizard === 'yes') a.x = 28;
    else g.cheatWin = 'yes';
  }
  if (g.cheatWin === 'yes' && g.wizard === 'no') {
    a.exiting = 'yes';
    a.x = 1;
    b.x = 39;
  }
}

// After the wizard has been killed player A walks to Marianna.
function walkToMarianna(g) {
  const { a, b } = g;
  if (a.x <= 1) {
    a.exiting = 'no';
    b.x = 30;
    g.entry = 'yes';
  }
  if (a.exiting === 'no' && a.x >= 25) {
    startPose(g, a, 'victory');
    a.x = 25;
    return 'poseA';
  }
  return 'damageA';
}

function wizardFight(g) {
  const { a, b } = g;
  if (a.x < 28) return 'damageA';
  // player A has reached the end of the wizard's room: the wizard is dead
  a.exiting = 'yes';
  a.state = 'standing';
  a.busy = 'no';
  b.state = 'standing';
  b.x = 39;
  g.marianna = 'yes';
  g.wizard = 'dead';
  b.busy = 'yes';
  return 'poseB';
}

// 2 player game: the time bonus of the winner counts down the clock, adding to his score.
function countBonus(g, f, opponent) {
  if (f.bonus !== 'yes') return;
  f.score += 10;
  g.countdown -= 1;
  if (g.countdown <= 0) {
    g.countdown = 0;
    f.score -= 10;
    if (opponent.x >= 37) {
      f.exiting = 'yes';
      f.busy = 'no';
    }
  }
}

function startTransition(g) {
  g.transition = 'yes';
  g.a.refTime = g.time;
}

// The demo ends after one fight and goes back to the start menu.
function endDemo(g) {
  if (g.repeatMusic === 'no') g.rt.sndplayfile('CPC/sound/nothing.ogg');
  g.a.score = 0;
  g.b.score = 0;
  return 'menu';
}

// 2 player game: the stage changes after the wipe between two rounds (and the clock starts again).
function nextVsRound(g) {
  if (g.transition === 'yes') return 'poseA';
  if (g.transitionFinished === 'yes') {
    g.countdown = 60;
    const next = VS_NEXT_STAGE[g.stage];
    if (next) {
      g.stage = next;
      return 'newRound';
    }
  }
  startTransition(g);
  return 'poseA';
}

function startWizardFight(g) {
  const { a, b } = g;
  g.ai = 7;
  g.wizard = 'yes';
  g.cheatWin = 'no';
  g.direction = 'normal';
  b.state = 'wizard';
  a.state = 'standing';
  a.x = 1;
  b.x = 33;
  g.entry = 'no';
  a.exiting = 'no';
  g.entryWizard = 'yes';
  b.busy = 'yes';
  a.busy = 'no';
  b.refTime = g.time;
}

// 1 player game: player A has beaten the opponent; on to the next level, or to the wizard after the last one.
function nextSoloLevel(g) {
  if (g.transition === 'yes') return 'poseA';
  if (g.ai === 7) g.transitionFinished = 'yes';
  if (g.transitionFinished === 'yes') g.ai += 1;
  if (g.ai > 7) {
    startWizardFight(g);
    return 'poseA';
  }
  if (g.transitionFinished === 'yes') {
    const next = SOLO_NEXT_STAGE[g.stage];
    if (next) {
      g.stage = next;
      return 'newRound';
    }
  }
  if (g.wizard === 'no') {
    startTransition(g);
    return 'poseA';
  }
  if (g.wizard === 'yes') return 'newRound';
  return undefined;
}

// 1 player game: player A has lost; the game starts again from the first level.
function soloGameLost(g) {
  const { a, b } = g;
  if (g.stage === 'throne') {
    g.ai = 0;
    a.score = 0;
    b.score = 0;
    return 'newRound';
  }
  if (g.stage === 'arena' || g.stage === 'torture') {
    if (g.transition === 'yes') return 'poseA';
    if (g.transitionFinished === 'yes') {
      g.ai = 0;
      a.score = 0;
      b.score = 0;
      g.stage = 'throne';
      return 'newRound';
    }
    if (g.wizard === 'no') {
      startTransition(g);
      return 'poseA';
    }
    if (g.wizard === 'yes') return 'newRound';
  }
  return undefined;
}

// Player A has walked off the screen: the round is over.
function* roundOverA(g) {
  const { rt, a, b } = g;
  if (g.timeFinished === 'no' && a.x < 2 && b.x >= 37) {
    if (g.transition === 'no') yield rt.sleep(1);
    if (g.mode === 'solo') {
      if (g.demo === 'yes') return endDemo(g);
      const next = nextSoloLevel(g);
      if (next) return next;
    }
    if (g.mode === 'vs') return nextVsRound(g);
  }
  if (g.timeFinished === 'yes') {
    // out of time in the 2 player game: both fighters leave
    const left = g.direction === 'normal' ? a.x < 2 && b.x >= 37 : g.direction === 'reverse' && b.x < 2 && a.x >= 37;
    if (left) {
      yield rt.sleep(1);
      g.countdown = 60;
      return 'newRound';
    }
  }
  return 'controlsA';
}

// Player B has walked off the screen.
function* roundOverB(g) {
  const { rt, a, b } = g;
  if (g.timeFinished === 'no' && a.x >= 37 && b.x >= 37) {
    if (g.transition === 'no') yield rt.sleep(1);
    if (g.mode === 'solo') {
      if (g.demo === 'yes') return endDemo(g);
      const next = soloGameLost(g);
      if (next) return next;
    }
    if (g.mode === 'vs') return nextVsRound(g);
  }
  return 'controlsB';
}

// First step of every frame.
export function* frame(g) {
  const { rt, a, b } = g;
  g.abort = rt.keydown(27) ? 'yes' : 'no';
  g.time += 1;
  applyCheat(g);
  if (g.game === 'won') return 'damageA';
  if (a.state === 'victory') return 'poseA';
  if (g.marianna === 'yes') return walkToMarianna(g);
  if (g.wizard === 'yes') return wizardFight(g);
  countBonus(g, a, b);
  countBonus(g, b, a);
  if (g.entry === 'yes' && (a.x >= 13 || b.x <= 22)) g.entry = 'no';
  if (a.exiting === 'yes') return yield* roundOverA(g);
  if (b.exiting === 'yes') return yield* roundOverB(g);
  if (g.gnome === 'yes') return 'gnome';
  return 'damageA';
}

// Last step of every frame: shows the picture, waits for the next frame and handles the end of the game.
export function* endFrame(g) {
  const { rt, a } = g;
  if (g.game === 'won') {
    rt.putimage(rt.loadimage('C64/stage/thanks.png'), 72, 136);
    rt.display();
    yield rt.sleep();
    restartGame(g);
    return 'menu';
  }
  if (g.game === 'lost' && a.state === 'wizardFinished') {
    rt.putimage(rt.loadimage('C64/stage/gameover.png'), 88, 136);
  }
  rt.display();
  yield rt.limit(40);
  if (g.abort === 'yes') {
    if (g.game === 'inProgress') {
      sfx(g, 'nothing.ogg');
      a.score = 0;
      g.b.score = 0;
      return 'menu';
    }
    if (g.game === 'won' || g.game === 'lost') {
      restartGame(g);
      return 'menu';
    }
  }
  return 'frame';
}
