// Touch gestures on the game screen, mapped to player A's keys:
//   drag            floating 8-way joystick (walk / jump / crouch)
//   tap             attack (+ Enter, to confirm / leave menu screens)
//   extra finger    attack, held while it stays down (e.g. while the other thumb steers)
//   two-finger tap  Esc (abort the game / go back)

const LEFT = 19200, UP = 18432, RIGHT = 19712, DOWN = 20480;
const ATTACK = [100303, 100304];
const ENTER = 13, ESC = 27;

const TAP_MS = 300;    // max duration of a tap
const PAIR_MS = 120;   // max delay between the two fingers of a two-finger tap
const PULSE_MS = 100;  // how long a tap keeps its keys down (a few 40 fps frames)
const AXIS_RATIO = 0.383; // sin(22.5°): splits the circle in 8 sectors

export function attachGestures(rt, el) {
  const held = new Map(); // key code -> number of gestures holding it
  const pointers = new Map();
  let stick = null;
  let pair = null;

  function hold(codes, char) {
    const fresh = codes.filter((k) => !held.has(k));
    for (const k of codes) held.set(k, (held.get(k) || 0) + 1);
    if (fresh.length) rt.press(fresh, char);
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

  function pulse(codes, char) {
    hold(codes, char);
    setTimeout(() => drop(codes), PULSE_MS);
  }

  function steer(p) {
    const deadZone = Math.max(16, el.clientWidth * 0.04);
    let dx = p.x - p.ox;
    let dy = p.y - p.oy;
    const dist = Math.hypot(dx, dy);
    if (!p.moved && Math.hypot(p.x - p.x0, p.y - p.y0) > deadZone) p.moved = true;
    // the origin trails the finger so that reversing direction needs a short swipe only
    const reach = deadZone * 2;
    if (dist > reach) {
      p.ox += (dx / dist) * (dist - reach);
      p.oy += (dy / dist) * (dist - reach);
      dx = p.x - p.ox;
      dy = p.y - p.oy;
    }
    const d = Math.hypot(dx, dy);
    const dirs = new Set();
    if (d > deadZone) {
      if (Math.abs(dx) > d * AXIS_RATIO) dirs.add(dx > 0 ? RIGHT : LEFT);
      if (Math.abs(dy) > d * AXIS_RATIO) dirs.add(dy > 0 ? DOWN : UP);
    }
    const release = [...p.dirs].filter((k) => !dirs.has(k));
    const press = [...dirs].filter((k) => !p.dirs.has(k));
    p.dirs = dirs;
    if (release.length) drop(release);
    if (press.length) hold(press);
  }

  function finish(p, cancelled) {
    pointers.delete(p.id);
    if (p.role === 'stick') {
      stick = null;
      drop([...p.dirs]);
      p.dirs.clear();
      if (!cancelled && !p.moved && performance.now() - p.t0 < TAP_MS) {
        pulse([...ATTACK, ENTER], '\r');
      }
    } else if (p.role === 'attack') {
      drop(ATTACK);
    } else if (p.role === 'pair') {
      if (cancelled || performance.now() - pair.t0 >= TAP_MS) pair.cancelled = true;
      if (--pair.open === 0) {
        if (!pair.cancelled) pulse([ESC], '\x1b');
        pair = null;
      }
    }
  }

  el.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    e.preventDefault();
    el.setPointerCapture(e.pointerId);
    const now = performance.now();
    const p = {
      id: e.pointerId, x: e.clientX, y: e.clientY, x0: e.clientX, y0: e.clientY,
      ox: e.clientX, oy: e.clientY, t0: now, moved: false, dirs: new Set(), role: 'none',
    };
    pointers.set(p.id, p);
    if (!stick) {
      p.role = 'stick';
      stick = p;
    } else if (!pair && pointers.size === 2 && !stick.moved && now - stick.t0 < PAIR_MS) {
      pair = { t0: stick.t0, open: 2, cancelled: false };
      stick.role = 'pair';
      stick = null;
      p.role = 'pair';
    } else if (!pair) {
      p.role = 'attack';
      hold(ATTACK);
    }
  });

  el.addEventListener('pointermove', (e) => {
    const p = pointers.get(e.pointerId);
    if (!p) return;
    p.x = e.clientX;
    p.y = e.clientY;
    if (p.role === 'stick') steer(p);
    else if (p.role === 'pair' && Math.hypot(p.x - p.x0, p.y - p.y0) > 16) pair.cancelled = true;
  });

  const end = (cancelled) => (e) => {
    const p = pointers.get(e.pointerId);
    if (p) finish(p, cancelled);
  };
  el.addEventListener('pointerup', end(false));
  el.addEventListener('pointercancel', end(true));
  el.addEventListener('contextmenu', (e) => e.preventDefault());
}
