// Cursor-driven selection list: Up / Down move the highlight, Enter picks the entry.
// Generic widget, it knows nothing about what the entries mean.

const UP = 18432, DOWN = 20480, ENTER = 13, ESC = 27;

export const CANCEL = -1;

// Text panel over the title screen: 8 rows of 25 characters, centred on the 40 columns.
const PANEL_COL = 9;
const PANEL_ROW = 15;
const PANEL_ROWS = 8;
const PANEL_WIDTH = 25;

const WHITE = 15, BLACK = 0;

const centered = (text) => {
  const left = (PANEL_WIDTH - text.length) >> 1;
  return ' '.repeat(left) + text + ' '.repeat(PANEL_WIDTH - text.length - left);
};

function draw(rt, title, items, cursor) {
  const lines = Array(PANEL_ROWS).fill('');
  // a title takes the first row and is separated from the entries by a blank one
  const first = title ? 2 : 0;
  if (title) lines[0] = title;
  items.forEach((item, i) => { lines[first + i] = item.label; });
  lines.forEach((text, i) => {
    const highlighted = i === first + cursor;
    rt.color(highlighted ? BLACK : WHITE, highlighted ? WHITE : BLACK);
    rt.locate(PANEL_ROW + i, PANEL_COL);
    rt.print([centered(text)], false);
  });
  rt.color(WHITE, BLACK);
}

/**
 * Show `items` ({ label }) and let the player choose one.
 * Returns the index of the chosen entry, or CANCEL when `cancelable` and Esc is pressed.
 */
export function* selectMenu(rt, { title, items, selected = 0, cancelable = false }) {
  let cursor = selected;
  for (;;) {
    draw(rt, title, items, cursor);
    yield rt.sleep();
    if (rt.keypressed(ENTER)) return cursor;
    if (cancelable && rt.keypressed(ESC)) return CANCEL;
    if (rt.keypressed(UP)) cursor = (cursor + items.length - 1) % items.length;
    if (rt.keypressed(DOWN)) cursor = (cursor + 1) % items.length;
  }
}
