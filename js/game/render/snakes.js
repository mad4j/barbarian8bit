// The two snakes at the top corners of the arena: they curl up while the fighter next to them is in pain.

const SNAKE_Y = 16;
const SNAKE_X_A = 0;
const SNAKE_X_B = 288;

// frame of the snake -> position of the fighter walking in
const WALK_IN_A = { 3: 2, 4: 3, 5: 2, 6: 1 };
const WALK_IN_B = { 34: 2, 33: 3, 32: 2, 31: 1 };
// the wizard fight starts with both snakes following player A
const WIZARD_ENTRY = { 2: 3, 3: 2, 4: 1 };
// snake frame while the fighter is hit or falls (the same for the mirrored sprites)
const PAIN_FRAME = { hit1: 2, hit2: 3, hit3: 2, hit4: 1, fall1: 2, fall2: 3, fall3: 2, fall4: 1 };

function drawSnake(rt, side, x, frame) {
  rt.putimage(rt.loadimage(`C64/stage/snake${side}${frame}.gif`), x, SNAKE_Y);
}

function drawPain(rt, f, side, x) {
  const frame = PAIN_FRAME[f.sprite.replace(/Rev$/, '')];
  if (frame) drawSnake(rt, side, x, frame);
}

export function snakeA(g) {
  const { rt, a, b } = g;
  if (g.entry === 'yes') {
    drawSnake(rt, 'A', SNAKE_X_A, WALK_IN_A[a.x] ?? 1);
    drawSnake(rt, 'B', SNAKE_X_B, WALK_IN_B[b.x] ?? 1);
    return 'foreground';
  }
  if (g.entryWizard === 'yes') {
    drawSnake(rt, 'A', SNAKE_X_A, WIZARD_ENTRY[a.x] ?? 1);
    drawSnake(rt, 'B', SNAKE_X_B, WIZARD_ENTRY[a.x] ?? 1);
    return 'foreground';
  }
  if (a.snake !== 'no') drawPain(rt, a, 'A', SNAKE_X_A);
  return 'snakeB';
}

export function snakeB(g) {
  const { rt, b } = g;
  if (b.snake !== 'no') drawPain(rt, b, 'B', SNAKE_X_B);
  return 'headRoll';
}
