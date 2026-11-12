// Information pages reachable from the start menu: credits, controls, story.
// Enter or Esc leaves a page.

const ENTER = 13, ESC = 27;
const WHITE = 15, RED = 4;

const ARROW_UP = '\x18', ARROW_DOWN = '\x19', ARROW_RIGHT = '\x1a', ARROW_LEFT = '\x1b'; // CP437 glyphs

const CREDITS = [
  [3, 21, '   Palace Software  '],
  [4, 21, '     C64 version    '],
  [5, 21, '        1987        '],
  [6, 21, '                    '],
  [7, 21, 'created and designed'],
  [8, 21, '  by STEVE BROWN    '],
  [9, 21, '                    '],
  [10, 21, '   C64 programmer  '],
  [11, 21, '   STAN SCHEMBRI   '],
  [12, 21, '                    '],
  [13, 21, '   CPC programmer   '],
  [14, 21, '   ANDREW FITTER    '],
  [15, 21, '                    '],
  [16, 21, '        music       '],
  [17, 21, '   RICHARD JOSEPH   '],
  [18, 21, '                    '],
  [19, 21, '  assistant artist  '],
  [20, 21, '      GARY CARR     '],
  [21, 21, '                    '],
  [22, 21, '    DANIEL MALONE   '],
  [23, 21, '                    '],
  [24, 1, 'FL clone http://barbarian.1987.free.fr'],
];

const CONTROLS_KEYS = [
  [2, 13, 'CONTROLS KEYS'],
  [10, 1, 'PLAYER A'],
  [12, 1, `UP............${ARROW_UP}`],
  [13, 1, `DOWN..........${ARROW_DOWN}`],
  [14, 1, `LEFT..........${ARROW_LEFT}`],
  [15, 1, `RIGHT.........${ARROW_RIGHT}`],
  [17, 1, 'ATTACK...SHIFT'],
  [18, 1, ' or GAMEPAD 1', RED],
  [10, 25, '        PLAYER B'],
  [12, 25, 'UP.............I'],
  [13, 25, 'DOWN...........J'],
  [14, 25, 'LEFT...........K'],
  [15, 25, 'RIGHT..........L'],
  [17, 25, 'ATTACK.....SPACE'],
  [18, 27, ' or GAMEPAD 2', RED],
  [20, 10, 'ABORT GAME...........ESC'],
  [22, 10, 'GOTO MENU..........ENTER'],
];

const CONTROLS_MOVING = [
  [2, 13, 'MOVING CONTROLS'],
  [5, 19, 'jump'],
  [7, 8, 'protect'],
  [8, 11, 'head'],
  [7, 27, 'protect'],
  [8, 27, 'body'],
  [12, 9, 'move'],
  [13, 9, 'back'],
  [12, 29, 'move'],
  [13, 29, 'forward'],
  [18, 11, 'roll'],
  [19, 11, 'back'],
  [18, 27, 'roll'],
  [19, 27, 'front'],
  [21, 18, 'crouch'],
];

const CONTROLS_FIGHTING = [
  [2, 13, 'FIGHTING CONTROLS'],
  [3, 13, '(with attack key)'],
  [5, 16, 'neck chop'],
  [7, 9, 'web of'],
  [8, 9, 'death'],
  [7, 27, 'head'],
  [8, 27, 'butt'],
  [12, 7, 'flying'],
  [13, 9, 'neck'],
  [14, 9, 'chop'],
  [12, 29, 'body'],
  [13, 29, 'chop'],
  [18, 7, 'overhead'],
  [19, 11, 'chop'],
  [19, 27, 'kick '],
  [21, 17, 'leg chop'],
];

const STORY = [
  [2, 1, 'The evil sorcerer Drax desires '],
  [3, 1, 'Princess Marianna and has sworn '],
  [4, 1, 'to wreak an unspeakable doom on the'],
  [5, 1, 'people of the Jewelled City, unless'],
  [6, 1, 'she is delivred to him.'],
  [7, 1, 'However, he has agreed that if a'],
  [8, 1, 'champion can be found who is able to '],
  [9, 1, 'defeat his 8 demonic guardians, the'],
  [10, 1, 'princess will be allowed to go free.'],
  [12, 1, 'All seems lost as champion after '],
  [13, 1, 'champion is defeated.'],
  [15, 1, 'Then, from the forgotten wastelands of'],
  [16, 1, 'the North, comes an unknown barbarian,'],
  [17, 1, 'a mighty warrior, wielding broadsword'],
  [18, 1, 'with deadly skill.'],
  [20, 1, 'Can he vanquish the forces of Darkness '],
  [21, 1, 'and free the princess ?'],
  [23, 1, 'Only you can say ...'],
];

// lines: [row, column, text, colour = white]
function drawLines(rt, lines) {
  for (const [row, col, text, color = WHITE] of lines) {
    rt.color(color, undefined);
    rt.locate(row, col);
    rt.print([text], false);
  }
  rt.color(WHITE, undefined);
}

function* waitForLeave(rt) {
  do {
    yield rt.sleep();
  } while (!(rt.keypressed(ENTER) || rt.keypressed(ESC)));
}

export function* showCredits({ rt, settings, theme }) {
  rt.screen(13);
  rt.putimage(rt.loadimage('C64/menu/team.png'), 0, 0);
  if (!settings.music) rt.sndloop(theme); // with the music already on, the theme just keeps playing
  const name = settings.country === 'USA' ? '     DEATH SWORD    ' : '      BARBARIAN     ';
  drawLines(rt, [[2, 21, name], ...CREDITS]);
  yield* waitForLeave(rt);
  if (!settings.music) rt.sndstop(theme);
}

export function* showControls(rt) {
  rt.screen(13);
  rt.putimage(rt.loadimage('C64/spritesA/standing.gif'), 0, 0);
  rt.putimage(rt.loadimage('C64/menu/playerB.bmp'), 280, 0);
  drawLines(rt, CONTROLS_KEYS);
  yield* waitForLeave(rt);

  rt.cls();
  rt.putimage(rt.loadimage('C64/menu/controls1.gif'), 100, 40);
  drawLines(rt, CONTROLS_MOVING);
  yield* waitForLeave(rt);

  rt.cls();
  rt.putimage(rt.loadimage('C64/menu/controls2.gif'), 100, 40);
  drawLines(rt, CONTROLS_FIGHTING);
  yield* waitForLeave(rt);
}

export function* showStory(rt) {
  rt.cls();
  drawLines(rt, STORY);
  yield* waitForLeave(rt);
}
