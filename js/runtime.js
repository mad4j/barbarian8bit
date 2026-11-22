/**
 * Minimal QB64 runtime for the translated Barbarian C64 program.
 *
 * Emulates just what the original uses. The graphics (a true-colour screen with a palette for colour
 * numbers, images of any resolution, 8x8 and TrueType text) live in gfx/; this adds keyboard / gamepad
 * input, sound, and the cooperative scheduling of SLEEP / _LIMIT.
 */
import { Graphics } from './gfx/graphics.js';

const norm = (p) => String(p).replace(/\\/g, '/').replace(/^\.\//, '');

export class Runtime extends Graphics {
  constructor({ canvas, manifest, images, assetBase = 'assets/', scale }) {
    super({ canvas, manifest, images, scale });
    this.canvas = canvas;
    this.manifest = manifest;
    this.assetBase = assetBase;

    this.OFF = 0;
    this.MIDDLE = 1;

    this.sounds = new Map();
    this.audioHandles = [null];
    this.blockedLoops = new Set();
    this.ac = null;

    this.down = new Set();
    this.tapped = new Set();
    this.keySeq = 0;
    this.pads = [];
    this.wait = null;
    this.nextFrame = 0;
    this.stopped = false;
    this.onExit = () => {};
    this.onFullscreen = () => {};
  }

  // ------------------------------------------------------------ input
  static keyCodes(e) {
    const codes = [];
    const code = e.code || '';
    if (/^Key[A-Z]$/.test(code)) codes.push(97 + code.charCodeAt(3) - 65);
    else {
      const map = {
        ArrowUp: 18432, ArrowDown: 20480, ArrowLeft: 19200, ArrowRight: 19712,
        Enter: 13, NumpadEnter: 13, Escape: 27, Space: 32,
      };
      if (map[code]) codes.push(map[code]);
      if (code === 'ShiftLeft' || code === 'ShiftRight') codes.push(100303, 100304);
    }
    return codes;
  }

  attachInput(target) {
    const handled = (e) => !(e.ctrlKey || e.metaKey || e.altKey) && Runtime.keyCodes(e).length > 0;
    target.addEventListener('keydown', (e) => {
      if (!handled(e)) return;
      e.preventDefault();
      if (e.repeat) return;
      this.press(Runtime.keyCodes(e));
    });
    target.addEventListener('keyup', (e) => this.release(Runtime.keyCodes(e)));
    window.addEventListener('blur', () => this.down.clear());
  }

  // Shared by the keyboard handlers and the on-screen touch buttons.
  press(codes) {
    for (const k of codes) { this.down.add(k); this.tapped.add(k); }
    this.keySeq++;
  }

  release(codes) {
    for (const k of codes) this.down.delete(k);
  }

  keydown(k) { return this.down.has(k) || this.tapped.has(k) ? -1 : 0; }
  // Only a new press since the last SLEEP / _LIMIT counts, a key that is merely held does not.
  keypressed(k) { return this.tapped.has(k) ? -1 : 0; }

  pollPads() {
    this.pads = [...(navigator.getGamepads ? navigator.getGamepads() : [])].filter(Boolean);
  }

  padAxis(pad, axis) {
    if (!pad) return 128;
    let v = pad.axes[axis] || 0;
    if (axis === 0) v += (pad.buttons[15]?.pressed ? 1 : 0) - (pad.buttons[14]?.pressed ? 1 : 0);
    if (axis === 1) v += (pad.buttons[13]?.pressed ? 1 : 0) - (pad.buttons[12]?.pressed ? 1 : 0);
    v = Math.max(-1, Math.min(1, v));
    return Math.round(128 + v * 127);
  }

  stick(n) { return this.padAxis(this.pads[n >> 1], n & 1); }

  strig(n) {
    const pad = this.pads[(n - 1) >> 1];
    return pad && pad.buttons.slice(0, 4).some((b) => b.pressed) ? -1 : 0;
  }

  // ------------------------------------------------------------ sound
  async initAudio() {
    if (!this.ac) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      this.ac = new AC();
    }
    // without a user gesture the browser keeps the context suspended and resume() stays pending: don't wait for it
    if (this.ac.state === 'suspended') this.ac.resume().catch(() => {});
  }

  // Autoplay was refused (no gesture yet): start the blocked music again once the player interacts.
  unlockAudio() {
    this.initAudio();
    for (const a of this.blockedLoops) a.play().catch(() => {});
    this.blockedLoops.clear();
  }

  async loadSounds() {
    const effects = this.manifest.files.filter((f) => /\.(ogg|wav)$/.test(f) && !f.endsWith('theme.ogg'));
    await Promise.all(effects.map(async (f) => {
      try {
        const res = await fetch(this.assetBase + f);
        const data = await res.arrayBuffer();
        if (this.ac) this.sounds.set(f, await this.ac.decodeAudioData(data));
      } catch (e) {
        console.warn('sound not loaded', f, e);
      }
    }));
  }

  sndplayfile(path) {
    const buf = this.sounds.get(norm(path));
    if (!buf || !this.ac) return;
    const src = this.ac.createBufferSource();
    src.buffer = buf;
    src.connect(this.ac.destination);
    src.start();
  }

  sndopen(path) {
    const a = new Audio(this.assetBase + norm(path));
    a.preload = 'auto';
    this.audioHandles.push(a);
    return this.audioHandles.length - 1;
  }

  sndloop(h) {
    const a = this.audioHandles[h];
    if (!a) return;
    a.loop = true;
    a.currentTime = 0;
    a.play().catch(() => this.blockedLoops.add(a));
  }

  sndstop(h) {
    const a = this.audioHandles[h];
    if (!a) return;
    this.blockedLoops.delete(a);
    a.pause();
    a.currentTime = 0;
  }

  // ------------------------------------------------------------ system
  title(text) { document.title = text; }
  fullscreen(arg) {
    try { this.onFullscreen(arg !== this.OFF); } catch (e) { /* needs a user gesture */ }
  }

  async preloadFonts() {
    for (const f of this.manifest.files.filter((n) => n.endsWith('.ttf'))) {
      const family = `qb-${f.replace(/\W+/g, '-')}`;
      const face = new FontFace(family, `url(${this.assetBase}${f})`);
      await face.load();
      document.fonts.add(face);
      this.fontFamilies.set(f, family);
    }
  }

  // ------------------------------------------------------------ scheduling
  limit(fps) {
    this.tapped.clear();
    const now = performance.now();
    this.nextFrame += 1000 / fps;
    if (this.nextFrame < now - 50) this.nextFrame = now;
    this.pollPads();
    return { type: 'limit', until: this.nextFrame };
  }

  sleep(seconds) {
    this.tapped.clear();
    this.display();
    return {
      type: 'sleep',
      until: seconds ? performance.now() + seconds * 1000 : Infinity,
      seq: this.keySeq,
    };
  }

  system() { return { type: 'system' }; }

  async start(program) {
    this.gen = program(this);
    this.nextFrame = performance.now();
    this.wait = null;
    const tick = () => {
      if (this.stopped) return;
      requestAnimationFrame(tick);
      const now = performance.now();
      const w = this.wait;
      if (w) {
        const ready = w.type === 'limit'
          ? now >= w.until
          : this.keySeq > w.seq || now >= w.until;
        if (!ready) return;
        this.wait = null;
      }
      for (let guard = 0; guard < 1000 && !this.wait; guard++) {
        const r = this.gen.next();
        if (r.done) { this.exit(); return; }
        const y = r.value;
        if (y && y.type === 'system') { this.exit(); return; }
        this.wait = y;
      }
    };
    requestAnimationFrame(tick);
  }

  exit() {
    this.stopped = true;
    this.onExit();
  }
}
