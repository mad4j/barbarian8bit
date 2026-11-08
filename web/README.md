# Barbarian C64 – HTML5 port

Browser version of the QB64 remake of *Barbarian: The Ultimate Warrior* (Palace Software, C64, 1987)
by FL (2012). It is **translated from the original QB64 source**
([`_resources/barbarianC64/source/barbarianC64.bas`](../_resources/barbarianC64/source/barbarianC64.bas)),
not rewritten by hand, so the game logic, timings (40 loops/s), AI and animations are the original ones.

## Run

```
npm run serve        # python -m http.server 8080 --directory web
```

then open <http://localhost:8080/> and press **Start** (browsers need a click to enable audio).
Any static web server works; there is nothing to install to *play*.

## How it works

```
barbarianC64.bas ──tools/qb2js.mjs──▶ web/js/game.js   (generated, committed)
C64/ resources   ──tools/build-assets.py──▶ web/assets/ (images.bin + manifest.json, sounds, font)
                                        web/js/runtime.js  hand-written QB64 runtime
```

* **`tools/qb2js.mjs`** – a small QB64→JavaScript translator for the subset used by the game.
  The program is one large `GOTO` state machine (6000 lines, 45 labels, many jumps into the middle of
  `IF` blocks), so every label becomes a `case` of a `switch` in a labelled loop and `GOTO` is
  `pc = N; continue`. Block `IF`s are compiled to conditional jumps; `SLEEP` / `_LIMIT` become
  `yield`s of a generator that the runtime scheduler resumes.
* **`web/js/runtime.js`** – emulates what the program needs from QB64:
  * 320×200 **indexed-colour** screen (`SCREEN 7`/`13`) with palette (`_COPYPALETTE`, `_PALETTECOLOR`,
    `PALETTE`); the player-B colour tricks of the original rely on raw palette indices, so this is
    emulated faithfully;
  * `_LOADIMAGE` in 8-bit (`256`) and 32-bit mode, `_PUTIMAGE` with scaling/flipping, palette matching
    and transparency, `_CLEARCOLOR`;
  * 8×8 bitmap text (`LOCATE`/`PRINT`/`COLOR`) and TrueType text (`_LOADFONT`/`_FONT`) for the HUD;
  * `_KEYDOWN`, `INKEY$`, `STICK`/`STRIG` (Gamepad API), `_SNDPLAYFILE`/`_SNDOPEN`/`_SNDLOOP`/`_SNDSTOP`
    (Web Audio), fullscreen, and the 40 fps `_LIMIT` scheduler.
* **`web/js/font8x8.js`** – public-domain IBM 8×8 font ([dhepper/font8x8](https://github.com/dhepper/font8x8)).
* On-screen buttons are shown on touch devices (player A only).

## Rebuilding

```
npm run build        # assets (needs Python + Pillow) and game.js (needs Node 18+)
npm test             # checks that web/js/game.js is in sync with the .bas source
```

Resource file names are lower-cased in `web/assets` because the QB64 source refers to them with a
different letter case than on disk and web servers are case sensitive.

## Controls

| | Player A | Player B (2 players) |
|---|---|---|
| Move / jump / crouch | arrow keys | `J` `L` / `I` / `K` |
| Attack | `Shift` | `Space` |

Menu: `0`–`7`, `Enter`/`Esc` to leave sub-screens, `Esc` aborts a game. Gamepads 1 and 2 are mapped to
players A and B. Note: the in-game CONTROLS screen of the original lists the player B keys in the wrong
order; the keys above are the ones the code actually reads.

## Credits and legal

Game design and original game: Steve Brown, Stan Schembri, Richard Joseph, Gary Carr, Daniel Malone
(Palace Software, 1987). QB64 remake: FL, <http://barbarian.1987.free.fr>. Graphics, sounds and the
*Zepto* font (© Domenico Mazza, "do not redistribute or modify") come from that remake's resources and
remain the property of their respective owners; check redistribution rights before publishing.
