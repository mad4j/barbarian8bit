// New round and stage set-up.
import { resetHurtY, setHurtX } from './fighter.js';
import { drawStartHud } from './render/hud.js';
import { ORIGINAL_VIEW, viewTop } from './render/view.js';

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
// A stage with a `view` draws its fighters bigger and lower (see render/view.js). They then cover more than the
// strip of the original arena, so such a stage has no background and tree files: the background is copied from the
// picture, across the whole screen, and the `columns` (files `<name>A` and `<name>B`, with transparency, as high as the
// view reaches) are what the fighters walk behind.
// `snakes` is the name of the pictures of the snakes in the corners (default 'snake').
const STAGES = {
  plain: { picture: 'plain', background: 'plainBackground', trees: 'forest' },
  forest: { picture: 'forest', background: 'forestBackground', trees: 'forest' },
  // the fighters of the painted throne room are as big as the sorcerer and the princess on the throne
  throne: { picture: 'throne', view: { scale: 1.5, floorY: 190 }, snakes: 'throneSnake', columns: 'throneColumn' },
  arena: { picture: 'arena', background: 'arenaBackground', trees: 'arena' },
  torture: { picture: 'torture', background: 'tortureBackground', trees: 'arena' },
};

// Colour of the opponent (palette entry 6) for each level; the last opponent is black.
const OPPONENT_COLOURS = [
  [138, 70, 174], [104, 169, 65], [144, 95, 37], [62, 49, 162], [122, 191, 199], [137, 64, 54], [92, 71, 0],
];

// The arena is the picture between the pillars at the sides (x 32 to 288), from row 96 down to the floor.
// It is drawn again on every frame under the fighters; the trees at the sides are drawn over them.
const ARENA_LEFT = 32;
const ARENA_RIGHT = 288;
const ARENA_TOP = 96;

function loadArenaFiles(g, stage) {
  const { rt } = g;
  const load = (file, x) => ({ image: rt.loadimage(`C64/stage/${file}.gif`, 256), x, y: ARENA_TOP });
  g.backdrop = load(stage.background, ARENA_LEFT);
  g.treeLeft = load(`${stage.trees}TreeLeft`, 0);
  g.treeRight = load(`${stage.trees}TreeRight`, ARENA_RIGHT);
  for (const tree of [g.treeLeft, g.treeRight]) rt.clearcolor(rt.rgb(247, 0, 0), tree.image);
}

// The same for a stage with a view: the background is cut out of the picture that is on the screen, across the whole
// screen and as far up and down as the view reaches; the columns are files that start at the same row.
function copyArena(g, stage) {
  const { rt } = g;
  const { view } = stage;
  if (!g.arenaCopies[g.stage]) {
    g.arenaCopies[g.stage] = { image: rt.getimage(0, viewTop(view), 319, view.floorY - 1), x: 0, y: viewTop(view) };
  }
  g.backdrop = g.arenaCopies[g.stage];
  const column = (side) => rt.loadimage(`C64/stage/${stage.columns}${side}.gif`);
  const y = viewTop(view);
  g.treeLeft = { image: column('A'), x: 0, y };
  g.treeRight = { image: column('B'), x: 320 - rt.imagewidth(column('B')), y };
}

function loadStage(g) {
  const { rt } = g;
  const stage = STAGES[g.stage];
  if (!stage) return;
  g.view = stage.view ?? ORIGINAL_VIEW;
  g.snakes = stage.snakes ?? 'snake';
  const picture = rt.loadimage(`C64/stage/${stage.picture}.gif`, 256);
  rt.copypalette(picture);
  rt.putimage(picture);
  if (stage.view) copyArena(g, stage);
  else loadArenaFiles(g, stage);
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
