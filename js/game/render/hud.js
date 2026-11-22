// The panel at the top of the screen: opponent level / countdown, the two scores and the life bars.
// Text positions are (row, column) in pixels for the Zepto font and in text cells for the 8x8 font.

function printAt(rt, row, col, text) {
  rt.locate(row, col);
  rt.print([text], true);
}

// A score fills a field of 5 digits, the leading zeros are printed separately.
function drawScore(rt, score, col) {
  if (score > 99 && score < 999) {
    printAt(rt, 3, col, '00');
    printAt(rt, 3, col + 12, score);
  }
  if (score > 999 && score < 9999) {
    printAt(rt, 3, col, '0');
    printAt(rt, 3, col + 4, score);
  }
  if (score > 9999 && score < 99999) printAt(rt, 3, col - 4, score);
}

const SCORE_COL_A = 97;
const SCORE_COL_B = 185;

// Life is shown as 12 cells in two rows of 6 that are erased one by one: the top row first, right to left.
// A stage with a `lifeCell` (see stage.js) has cells of that size instead of the 8x8 text cells.
function eraseLife(g, row, col, count) {
  const { rt, lifeCell } = g;
  if (!lifeCell) {
    for (let i = 0; i < count; i++) printAt(rt, row, col + i, ' ');
    return;
  }
  const x = (col - 1) * lifeCell.w;
  const y = (row - 1) * lifeCell.h;
  rt.line(x, y, x + count * lifeCell.w - 1, y + lifeCell.h - 1, rt.bg, 'BF');
}

function drawLife(g, life, firstCol) {
  if (life === 0) {
    eraseLife(g, 1, firstCol, 6);
    eraseLife(g, 2, firstCol, 6);
  } else if (life >= 1 && life <= 11) {
    const row = life > 5 ? 2 : 1;
    const col = life > 5 ? life - 5 : life + 1;
    eraseLife(g, row, firstCol + col - 1, 1);
  }
}

// Initial HUD of a round: only zero scores are printed here, the rest follows with the first frame.
export function drawStartHud(g) {
  const { rt, a, b } = g;
  rt.font(g.palaceFont);
  rt.printmode(rt.KEEPBACKGROUND);
  rt.color(3);
  if (a.score === 0) printAt(rt, 3, SCORE_COL_A, '00000');
  if (b.score === 0) printAt(rt, 3, SCORE_COL_B, '00000');
  if (g.mode === 'solo') {
    printAt(rt, 3, 153, '0');
    printAt(rt, 3, 157, g.ai);
  }
  if (g.mode === 'vs') printAt(rt, 3, 149, g.countdown);
  rt.printmode(rt.FILLBACKGROUND);
  rt.font(8);
}

// Opponent level in the 1 player game, seconds left in the 2 player game (always two digits).
function drawLevelOrCountdown(g) {
  const { rt } = g;
  if (g.mode === 'solo') {
    printAt(rt, 3, 153, '0');
    printAt(rt, 3, 157, g.ai);
  }
  if (g.mode === 'vs') {
    if (g.countdown >= 10) printAt(rt, 3, 149, g.countdown);
    else {
      printAt(rt, 3, 153, '0');
      printAt(rt, 3, 157, g.countdown);
    }
  }
}

export function hud(g) {
  const { rt, a, b } = g;
  rt.printmode(rt.KEEPBACKGROUND);
  rt.font(g.palaceFont);
  rt.color(3);
  drawLevelOrCountdown(g);
  rt.color(3);
  if (a.score > 99999) {
    a.score = 0;
    if (b.score > 99999) b.score = 0;
  }
  if (a.score === 0) printAt(rt, 3, SCORE_COL_A, '00000');
  if (b.score === 0) printAt(rt, 3, SCORE_COL_B, '00000');
  drawScore(rt, a.score, SCORE_COL_A);
  drawScore(rt, b.score, SCORE_COL_B);
  rt.printmode(rt.FILLBACKGROUND);
  rt.font(8);
  drawLife(g, a.life, 1);
  drawLife(g, b.life, 35);
  if (g.showVersion === 'yes') {
    printAt(rt, 18, 16, 'FL VERSION');
    printAt(rt, 19, 19, '2012');
  }
  return 'fighters';
}
