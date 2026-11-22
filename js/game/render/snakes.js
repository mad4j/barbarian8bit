// The two snakes at the top corners of the arena: they curl up while the fighter next to them is in pain.
// A's picture is at the left edge of the screen and B's at the right edge, whatever their width.


// frame of the snake -> position of the fighter walking in
const WALK_IN_A = { 3: 2, 4: 3, 5: 2, 6: 1 };
const WALK_IN_B = { 34: 2, 33: 3, 32: 2, 31: 1 };
// the wizard fight starts with both snakes following player A
const WIZARD_ENTRY = { 2: 3, 3: 2, 4: 1 };
// snake frame while the fighter is hit or falls (the same for the mirrored sprites)
const PAIN_FRAME = { hit1: 2, hit2: 3, hit3: 2, hit4: 1, fall1: 2, fall2: 3, fall3: 2, fall4: 1 };

function drawSnake(g, side, frame) {
  const { rt } = g;
  const image = rt.loadimage(`C64/stage/${g.snakes}${side}${frame}.gif`);
  rt.putimage(image, side === 'A' ? 0 : 320 - rt.imagewidth(image), g.snakeY);
}

function drawPain(g, f, side) {
  const frame = PAIN_FRAME[f.sprite.replace(/Rev$/, '')];
  if (frame) drawSnake(g, side, frame);
}

export function snakeA(g) {
  const { a, b } = g;
  if (g.entry === 'yes') {
    drawSnake(g, 'A', WALK_IN_A[a.x] ?? 1);
    drawSnake(g, 'B', WALK_IN_B[b.x] ?? 1);
    return 'foreground';
  }
  if (g.entryWizard === 'yes') {
    drawSnake(g, 'A', WIZARD_ENTRY[a.x] ?? 1);
    drawSnake(g, 'B', WIZARD_ENTRY[a.x] ?? 1);
    return 'foreground';
  }
  if (a.snake !== 'no') drawPain(g, a, 'A');
  return 'snakeB';
}

export function snakeB(g) {
  const { b } = g;
  if (b.snake !== 'no') drawPain(g, b, 'B');
  return 'headRoll';
}
