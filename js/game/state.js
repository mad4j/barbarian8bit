// The whole state of a game, shared by all steps of the frame loop (see steps.js).
import { createFighter } from './fighter.js';
import { ORIGINAL_VIEW } from './render/view.js';

export function createGame(rt, menu) {
  return {
    rt,
    menu,
    a: createFighter(),
    b: createFighter(),

    // what is being played
    mode: '',              // 'solo' (against the computer) or 'vs' (two players)
    demo: '',              // 'yes' when the computer plays both sides
    ai: 0,                 // level of the computer opponent, 0..7
    stage: '',             // 'plain', 'forest', 'throne', 'arena' or 'torture'
    country: '',           // 'europe' (Barbarian) or 'USA' (Death Sword)
    repeatMusic: '',       // 'yes' = theme music instead of sound effects
    game: '',              // 'inProgress', 'won' or 'lost' (the final fight against the wizard)
    wizard: '',            // 'yes' during the wizard fight, 'dead' once he is beaten
    marianna: '',          // 'yes' once the princess is reached
    cheatWin: 'no',        // debug cheat: win the level at once

    // time
    time: 0,               // frame counter (40 per second)
    tick: 0,               // game time of the last countdown step
    countdown: 0,          // seconds left in the 2 player game
    timeFinished: '',
    abort: '',             // 'yes' while Esc is held

    // fight flow
    direction: '',         // 'normal' (A on the left) or 'reverse' (the fighters changed sides)
    entry: '',             // 'yes' while the fighters walk in
    entryWizard: '',
    transition: '',        // 'yes' while the screen is wiped between two rounds
    transitionFinished: '',
    distance: 0,           // distance between the fighters, shared scratch value
    launchMusic: '',

    // severed heads, gnome, blood
    severedX: 0,           // position of the severed head: in cells in flight, in pixels once it is drawn
    severedY: 0,
    severedFrame: 0,       // picture of the head (1..6)
    gnome: '',             // 'yes' once the gnome has come
    gnomeX: 0,
    gnomeFrame: 0,         // picture of the gnome (1..6)
    gnomeLaughs: '',
    gnomePulls: '',
    finishedLaughing: '',
    soundLaughs: '',
    football: '',          // the gnome kicks the head around
    bloodCellX: 0,         // cell of the last blow that drew blood
    bloodCellY: 0,

    // pictures and fonts
    view: ORIGINAL_VIEW,   // how big and how low the fighters are drawn (see render/view.js)
    snakes: 'snake',       // the pictures of the snakes in the corners: C64/stage/<this>A1.gif ... (see game/stage.js)
    snakeY: 16,            // the row they are drawn at
    lifeCell: null,        // the size { w, h } of a cell of the life indicator, null for the 8x8 text cells
    arenaCopies: {},       // the arena pictures copied from the picture of a stage, by stage (see game/stage.js)
    backdrop: null,        // { image, x, y }: the arena between the trees, drawn again on every frame
    treeLeft: null,        // the trees in front of the fighters at the sides (the columns of a stage with a view)
    treeRight: null,
    palaceFont: 0,
    showVersion: '',       // 'yes' while V is held
  };
}
