// New round and stage set-up.
import { resetHurtY, setHurtX } from './fighter.js';
import { drawStartHud } from './render/hud.js';

// What a fighter looks like at the start of a round (position and attack column are set by the caller).
function resetFighter(f) {
  f.attackY = 17;
  resetHurtY(f);
  f.state = 'standing';
  f.beheadable = 'yes';
  f.life = 12;
  f.waiting = 1;
  f.imageDirection = 'normal';
  f.busy = 'no';
  f.advanceStep = 0;
  f.retreatStep = 0;
  f.bleeding = 'no';
  f.snake = 'yes';
  f.bloodBeheading = 0;
  f.exiting = 'no';
  f.protectBody = 'no';
  f.protectHead = 'no';
  f.bonus = 'no';
  f.strike = 0;
  f.damageForehead = 0;
  f.damageHead = 0;
  f.damageKnee = 0;
  f.attackKey = 'no';
}

export function newRound(g) {
  const { a, b } = g;
  resetFighter(a);
  resetFighter(b);
  a.attackX = 15;
  b.attackX = 27;
  // the hit zones keep the columns of the previous round until the first pose update
  setHurtX(a, a.x + 4);
  setHurtX(b, b.x);
  a.x = 1;
  b.x = 36;
  a.refTime = 1;

  g.direction = 'normal';
  g.time = 1;
  g.tick = 1;
  g.entry = 'yes';
  g.entryWizard = 'no';
  g.launchMusic = 'yes';
  g.game = 'inProgress';
  g.timeFinished = 'no';
  g.transition = 'no';
  g.transitionFinished = 'no';
  g.cheatWin = 'no';

  g.severedX = a.x + 3;
  g.severedY = 111;
  g.severedFrame = 1;
  g.gnome = 'no';
  g.gnomeX = 23;
  g.gnomeFrame = 1;
  g.gnomePulls = 'yes';
  g.gnomeLaughs = 'no';
  g.soundLaughs = 'no';
  g.finishedLaughing = 'no';
  g.football = 'no';
  return 'stage';
}

// Picture, background and the trees in front for each stage (file names in assets/C64/stage).
const STAGES = {
  plain: { picture: 'plain', background: 'plainBackground', trees: 'forest' },
  forest: { picture: 'forest', background: 'forestBackground', trees: 'forest' },
  throne: { picture: 'throne', background: 'throneBackground', trees: 'arena' },
  arena: { picture: 'arena', background: 'arenaBackground', trees: 'arena' },
  torture: { picture: 'torture', background: 'tortureBackground', trees: 'arena' },
};

// Colour of the opponent (palette entry 6) for each level; the last opponent is black.
const OPPONENT_COLOURS = [
  [138, 70, 174], [104, 169, 65], [144, 95, 37], [62, 49, 162], [122, 191, 199], [137, 64, 54], [92, 71, 0],
];

function loadStage(g) {
  const { rt } = g;
  const stage = STAGES[g.stage];
  if (!stage) return;
  const picture = rt.loadimage(`C64/stage/${stage.picture}.gif`, 256);
  rt.copypalette(picture);
  rt.putimage(picture);
  g.backgroundImage = rt.loadimage(`C64/stage/${stage.background}.gif`, 256);
  g.treeLeftImage = rt.loadimage(`C64/stage/${stage.trees}TreeLeft.gif`, 256);
  g.treeRightImage = rt.loadimage(`C64/stage/${stage.trees}TreeRight.gif`, 256);
}

function putPicture(rt, file, x, y) {
  rt.putimage(rt.loadimage(`C64/stage/${file}`), x, y);
}

function setOpponentColours(g) {
  const { rt } = g;
  if (g.ai < 0 || g.ai > 7) return;
  rt.palettecolor(13, rt.rgb(187, 119, 109));
  const colour = OPPONENT_COLOURS[g.ai];
  if (colour) rt.palettecolor(6, rt.rgb(...colour));
  else rt.palette(6, 0);
  rt.palette(15, 4);
}

export function stage(g) {
  const { rt } = g;
  rt.screen(7);
  rt.cls(undefined, 0);
  loadStage(g);
  if (g.country === 'USA') putPicture(rt, 'logoDS.gif', 48, 0);
  drawStartHud(g);
  setOpponentColours(g);
  rt.display();
  return 'frame';
}
