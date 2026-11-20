// Fighters pushing each other and staying inside the arena.
// The pairs `collision` / `collisionRev` and `keepInside` / `keepInsideRev` are the same rules for fighters
// facing each other (player A on the left) and for fighters who have changed sides.

function clamp(f, min, max) {
  if (f.x < min) f.x = min;
  if (f.x > max) f.x = max;
}

// Fighters closer than 4 cells are pushed apart when one of them walks into the other, rolls or beheads.
export function collision(g) {
  const { a, b } = g;
  if (g.direction === 'reverse') return 'collisionRev';
  if (a.state === 'jump' && b.state === 'rollForward') return 'keepInside';
  if (b.state === 'jump' && a.state === 'rollForward') return 'keepInside';
  if (a.stick === 'right' || a.state === 'rollForward' || a.state === 'behead') {
    g.distance = b.x - a.x;
    if (g.distance < 4) a.x -= 1;
  }
  if (b.stick === 'left' || b.state === 'rollForward' || b.state === 'behead') {
    g.distance = b.x - a.x;
    if (g.distance < 4) b.x += 1;
  }
  if (b.state === 'standing' && a.state === 'standing') {
    g.distance = b.x - a.x;
    if (g.distance < 4) {
      a.x -= 1;
      b.x += 1;
    }
  }
  return 'keepInside';
}

export function collisionRev(g) {
  const { a, b } = g;
  if (a.state === 'jumpRev' && b.state === 'rollForwardRev') return 'keepInsideRev';
  if (b.state === 'jumpRev' && a.state === 'rollForwardRev') return 'keepInsideRev';
  if (a.stick === 'left' || a.state === 'rollForwardRev' || a.state === 'beheadRev') {
    g.distance = a.x - b.x;
    if (g.distance < 4) a.x += 1;
  }
  if (b.stick === 'right' || b.state === 'rollForwardRev' || b.state === 'beheadRev') {
    g.distance = a.x - b.x;
    if (g.distance < 4) b.x -= 1;
  }
  if (b.state === 'standingRev' && a.state === 'standingRev') {
    g.distance = a.x - b.x;
    if (g.distance < 4) {
      a.x += 1;
      b.x -= 1;
    }
  }
  return 'keepInsideRev';
}

// The fighters may leave the screen while walking in or out, otherwise they stay between columns 4 and 33.
export function keepInside(g) {
  const { a, b } = g;
  if (g.entry === 'yes' || a.exiting === 'yes' || b.exiting === 'yes' || g.entryWizard === 'yes') {
    clamp(a, 0, 40);
    clamp(b, 0, 40);
    return 'flyingHeads';
  }
  if (g.entry === 'no') {
    clamp(a, 4, 33);
    if (b.x < 4) b.x = 4;
  }
  if (b.x > 33) b.x = 33;
  return 'flyingHeads';
}

export function keepInsideRev(g) {
  const { a, b } = g;
  if (a.exiting === 'yes' || b.exiting === 'yes') {
    clamp(a, 0, 40);
    clamp(b, 0, 40);
    return 'flyingHeads';
  }
  clamp(a, 4, 33);
  clamp(b, 4, 33);
  return 'flyingHeads';
}
