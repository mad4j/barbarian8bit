// On-screen buttons for touch devices (player A only), laid out like a compact gamepad:
//   D-pad (left)    round, 8 directions picked by angle; slide the thumb around it to change direction
//   Esc (centre)    abort the game / go back
//   Attack (right)  attack; also Enter, so it picks menu entries and leaves menu screens
// Every press and every direction change gives a short vibration where the browser supports it.

const LEFT = 19200, UP = 18432, RIGHT = 19712, DOWN = 20480;
const ATTACK = [100303, 100304];
const ENTER = 13, ESC = 27;

// QB64 key codes per 45° sector, clockwise from the right (screen y points down); a diagonal holds two arrows
const SECTORS = [
  [RIGHT], [RIGHT, DOWN], [DOWN], [LEFT, DOWN], [LEFT], [LEFT, UP], [UP], [RIGHT, UP],
];
const ARROWS = [[UP, 'up'], [RIGHT, 'right'], [DOWN, 'down'], [LEFT, 'left']];

const DEAD_ZONE = 0.13; // radius (fraction of the pad width) in which no direction is registered
const STICKY = 0.12;    // a sector is kept this much (in sectors) past its border, so the edges do not flicker
const TRAVEL = 0.22;    // how far the thumb cap may leave the centre (fraction of the pad width)

// vibration lengths in ms (the Vibration API is missing on iOS Safari, where this is a no-op)
const TICK = 10, HIT = 20, BACK = [15, 40, 15];
const buzz = (pattern) => navigator.vibrate?.(pattern);

const make = (tag, className) => Object.assign(document.createElement(tag), { className });

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

  function button(id, label, codes, pulse) {
    const b = make('button', '');
    b.id = id;
    b.textContent = label;
    b.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      b.setPointerCapture(e.pointerId);
      b.classList.add('on');
      hold(codes);
      buzz(pulse);
    });
    const up = () => { b.classList.remove('on'); drop(codes); };
    b.addEventListener('pointerup', up);
    b.addEventListener('pointercancel', up);
    return b;
  }

  function dpad() {
    const pad = make('div', '');
    pad.id = 'dpad';
    pad.setAttribute('role', 'group');
    pad.setAttribute('aria-label', 'Directional pad');
    const wedges = SECTORS.map((_, i) => {
      const w = pad.appendChild(make('i', 'wedge'));
      w.style.setProperty('--a', `${i * 45}deg`);
      return w;
    });
    pad.append(make('i', 'well'));
    const nub = pad.appendChild(make('i', 'nub'));
    const arrows = ARROWS.map(([code, name]) => [code, pad.appendChild(make('i', `arrow ${name}`))]);
    const at = new Map(); // pointer id -> sector under that finger (null = in the dead zone)

    // sector under the finger (null in the dead zone) and where the thumb cap should be drawn
    function probe(e, prev) {
      const r = pad.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);
      const k = Math.min(1, (r.width * TRAVEL) / dist);
      let sector = null;
      if (dist >= r.width * DEAD_ZONE) {
        const turns = (Math.atan2(dy, dx) / (Math.PI / 4) + 8) % 8;
        const away = prev == null ? 1 : Math.abs(((turns - prev + 12) % 8) - 4);
        sector = away < 0.5 + STICKY ? prev : Math.round(turns) % 8;
      }
      return { sector, x: dx * k, y: dy * k };
    }

    // the new sector is held before the old one is dropped, so shared arrows are not re-pressed
    function aim(id, next) {
      const prev = at.get(id);
      if (next === undefined) at.delete(id);
      else at.set(id, next);
      if (next !== prev) {
        if (next != null) { hold(SECTORS[next]); buzz(TICK); }
        if (prev != null) drop(SECTORS[prev]);
      }
      const lit = new Set(at.values());
      const keys = new Set([...lit].flatMap((s) => SECTORS[s] || []));
      wedges.forEach((w, i) => w.classList.toggle('on', lit.has(i)));
      arrows.forEach(([code, a]) => a.classList.toggle('on', keys.has(code)));
      pad.classList.toggle('on', at.size > 0);
    }

    function steer(e) {
      const { sector, x, y } = probe(e, at.get(e.pointerId));
      aim(e.pointerId, sector);
      nub.style.transform = `translate(${x}px, ${y}px)`;
    }

    pad.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      pad.setPointerCapture(e.pointerId);
      steer(e);
    });
    pad.addEventListener('pointermove', (e) => {
      if (at.has(e.pointerId)) steer(e);
    });
    const up = (e) => {
      aim(e.pointerId, undefined);
      if (!at.size) nub.style.transform = '';
    };
    pad.addEventListener('pointerup', up);
    pad.addEventListener('pointercancel', up);
    return pad;
  }

  root.append(
    dpad(),
    button('esc', 'Esc', [ESC], BACK),
    button('attack', 'Attack', [...ATTACK, ENTER], HIT),
  );
  root.hidden = false;
  document.body.classList.add('touch');
}
