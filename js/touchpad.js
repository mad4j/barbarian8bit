// On-screen buttons for touch devices (player A only), laid out like a gamepad:
//   D-pad (left)    8 directions; slide the thumb across it to change direction
//   Esc (centre)    abort the game / go back
//   Attack (right)  attack; also Enter, so it picks menu entries and leaves menu screens

const LEFT = 19200, UP = 18432, RIGHT = 19712, DOWN = 20480;
const ATTACK = [100303, 100304];
const ENTER = 13, ESC = 27;

// [label, accessible name, QB64 key codes] in row-major order; a diagonal holds two arrows
const DPAD = [
  ['↖', 'Up-left', [LEFT, UP]], ['▲', 'Up', [UP]], ['↗', 'Up-right', [RIGHT, UP]],
  ['◀', 'Left', [LEFT]], ['', '', []], ['▶', 'Right', [RIGHT]],
  ['↙', 'Down-left', [LEFT, DOWN]], ['▼', 'Down', [DOWN]], ['↘', 'Down-right', [RIGHT, DOWN]],
];

export function buildTouchControls(rt, root) {
  const held = new Map(); // key code -> number of buttons holding it

  function hold(codes) {
    const fresh = codes.filter((k) => !held.has(k));
    for (const k of codes) held.set(k, (held.get(k) || 0) + 1);
    if (fresh.length) rt.press(fresh);
  }

  function drop(codes) {
    const gone = [];
    for (const k of codes) {
      const n = (held.get(k) || 0) - 1;
      if (n > 0) held.set(k, n);
      else if (held.delete(k)) gone.push(k);
    }
    if (gone.length) rt.release(gone);
  }

  function button(id, label, codes) {
    const b = document.createElement('button');
    b.id = id;
    b.textContent = label;
    b.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      b.classList.add('on');
      hold(codes);
    });
    const up = () => { b.classList.remove('on'); drop(codes); };
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
    return b;
  }

  function dpad() {
    const pad = document.createElement('div');
    pad.id = 'dpad';
    const cells = DPAD.map(([label, name, codes]) => {
      if (!codes.length) return pad.appendChild(document.createElement('span'));
      const b = pad.appendChild(document.createElement('button'));
      b.textContent = label;
      b.setAttribute('aria-label', name);
      return b;
    });
    const at = new Map(); // pointer id -> index of the cell under that finger

    const cellOf = (e) => {
      const r = pad.getBoundingClientRect();
      const third = (v, size) => Math.min(2, Math.max(0, Math.floor((v / size) * 3)));
      return third(e.clientY - r.top, r.height) * 3 + third(e.clientX - r.left, r.width);
    };

    // the new cell is held before the old one is dropped, so shared arrows are not re-pressed
    function aim(id, next) {
      const prev = at.get(id);
      if (prev === next) return;
      if (next === undefined) at.delete(id);
      else at.set(id, next);
      if (next !== undefined) hold(DPAD[next][2]);
      if (prev !== undefined) drop(DPAD[prev][2]);
      const lit = new Set(at.values());
      cells.forEach((c, i) => c.classList.toggle('on', lit.has(i)));
    }

    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      pad.setPointerCapture(e.pointerId);
      aim(e.pointerId, cellOf(e));
    });
    pad.addEventListener('pointermove', (e) => {
      if (at.has(e.pointerId)) aim(e.pointerId, cellOf(e));
    });
    const up = (e) => aim(e.pointerId, undefined);
    pad.addEventListener('pointerup', up);
    pad.addEventListener('pointercancel', up);
    return pad;
  }

  root.append(
    dpad(),
    button('esc', 'Esc', [ESC]),
    button('attack', 'Attack', [...ATTACK, ENTER]),
  );
  root.hidden = false;
  document.body.classList.add('touch');
}
