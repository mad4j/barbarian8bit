// Blood where a blow has landed: it stays at the cell of the last hit while the fighter keeps bleeding.
import { putView } from './view.js';

function drawBlood(g, f, opponent, columnOffset) {
  const { rt } = g;
  if (f.bleeding === 'no') return;
  if (['hit1', 'hit1Rev', 'dead', 'fall1', 'fall1Rev', 'deadRev'].includes(f.state)) {
    g.bloodCellX = f.x + columnOffset;
    g.bloodCellY = opponent.attackY - 1;
  }
  putView(g, rt.loadimage('C64/sprites/blood.gif'), g.bloodCellX * 8, g.bloodCellY * 8);
}

export function bloodA(g) {
  drawBlood(g, g.a, g.b, 0);
  return 'bloodB';
}

export function bloodB(g) {
  drawBlood(g, g.b, g.a, 1);
  return 'snakeA';
}
