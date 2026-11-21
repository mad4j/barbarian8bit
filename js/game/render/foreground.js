// What is drawn last, in front of the fighters: the trees at the edges, and the wizard's fire.
import { putView, isOriginal } from './view.js';

// The fire ball of the wizard changes its picture every few cells on its way to player A.
function fireFrame(x, wizard) {
  if (x === 26 || x === 17 || x === 9) return 1;
  if (x === 23 || (x === 14 && x < wizard.x - 15)) return 2;
  if (x === 20 || x === 11) return 3;
  return 0;
}

function drawFire(g) {
  const { rt, b } = g;
  if (g.game !== 'inProgress' || g.wizard !== 'yes' || b.attackX >= b.x - 1) return;
  const frame = fireFrame(b.attackX, b);
  if (!frame) return;
  const image = rt.loadimage(`C64/sprites/fire${frame}.gif`);
  rt.clearcolor(rt.rgb(255, 0, 0), image);
  putView(g, image, (b.attackX - 1) * 8, (b.attackY - 1) * 8);
}

function drawTree(g, tree) {
  g.rt.putimage(tree.image, tree.x, tree.y);
}

export function foreground(g) {
  const { a, b } = g;
  // bigger fighters (see view.js) stick out over the sides further than the walking in and out of the original,
  // so there the trees always stay in front
  const always = !isOriginal(g.view);
  if (always || a.x < 5 || b.x < 5 || (g.gnome === 'yes' && g.gnomeX < 88)) drawTree(g, g.treeLeft);
  if (always || b.x > 31 || a.x > 31 || g.gnomeX > 256 || g.severedX > 263) drawTree(g, g.treeRight);
  drawFire(g);
  return 'endFrame';
}
