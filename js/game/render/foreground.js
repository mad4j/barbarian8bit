// What is drawn last, in front of the fighters: the trees at the edges, and the wizard's fire.

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
  rt.putimage(image, (b.attackX - 1) * 8, (b.attackY - 1) * 8);
}

export function foreground(g) {
  const { rt, a, b } = g;
  if (a.x < 5 || b.x < 5 || (g.gnome === 'yes' && g.gnomeX < 88)) {
    rt.clearcolor(rt.rgb(247, 0, 0), g.treeLeftImage);
    rt.putimage(g.treeLeftImage, 0, 96);
  }
  if (b.x > 31 || a.x > 31 || g.gnomeX > 256 || g.severedX > 263) {
    rt.clearcolor(rt.rgb(247, 0, 0), g.treeRightImage);
    rt.putimage(g.treeRightImage, 288, 96);
  }
  drawFire(g);
  return 'endFrame';
}
