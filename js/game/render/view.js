// How the fight area is seen. The game works in the coordinates of the original: a fighter is a slot of 80 rows
// whose bottom is the floor (row 176). A stage whose picture is drawn at another size says so in its `view`
// (see STAGES in stage.js): everything that stands on the floor - the fighters, their blood, severed heads,
// the gnome, the wizard's fire - is then drawn `scale` times as big and with its feet on the row `floorY`,
// while positions, hit zones and everything else keep the original coordinates.
// A stage without a view is drawn exactly as it is.

export const FIGHTER_ROWS = 80;
// half the width of a fighter's slot: the column the fighter is drawn bigger around
export const SLOT_CENTER = 20;

const GROUND = 176;

export const ORIGINAL_VIEW = { scale: 1, floorY: GROUND };

export const isOriginal = (view) => view === ORIGINAL_VIEW;

// The first row that anything drawn through the view can reach.
export const viewTop = (view) => Math.floor(view.floorY - FIGHTER_ROWS * view.scale);

// A point of the original picture: horizontally around `pivot`, vertically around the floor.
const viewX = (view, x, pivot) => pivot + (x - pivot) * view.scale;
const viewY = (view, y) => view.floorY + (y - GROUND) * view.scale;

/**
 * `_PUTIMAGE` of `image` into the rectangle (x1, y1)-(x2, y2) of the original picture (corners included, as in
 * graphics.js; x1 > x2 mirrors the image), drawn bigger around the column `pivot`.
 */
export function putViewRect(g, image, x1, y1, x2, y2, pivot) {
  const { rt, view } = g;
  if (isOriginal(view)) {
    rt.putimage(image, x1, y1, x2, y2);
    return;
  }
  const left = Math.min(x1, x2);
  const width = Math.round((Math.abs(x2 - x1) + 1) * view.scale);
  const x = Math.round(viewX(view, left, pivot));
  const y = Math.round(viewY(view, y1));
  const height = Math.round((y2 - y1 + 1) * view.scale);
  if (x1 <= x2) rt.putimage(image, x, y, x + width - 1, y + height - 1);
  else rt.putimage(image, x + width - 1, y, x, y + height - 1);
}

// `_PUTIMAGE` of `image` at its own size, its top left corner at (x, y) of the original picture; drawn bigger
// around `pivot` (by default its own middle, so it only grows).
export function putView(g, image, x, y, pivot) {
  const { rt } = g;
  if (isOriginal(g.view)) {
    rt.putimage(image, x, y);
    return;
  }
  const w = rt.imagewidth(image);
  putViewRect(g, image, x, y, x + w - 1, y + rt.imageheight(image) - 1, pivot ?? x + w / 2);
}
