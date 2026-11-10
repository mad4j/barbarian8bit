# Barbarian C64 – HTML5 port

Browser version of the QB64 remake of *Barbarian: The Ultimate Warrior* (Palace Software, C64, 1987)
by FL (2012). The game code was **originally translated from the QB64 source**, so the game logic,
timings (40 loops/s), AI and animations are the original ones; the port is now **self-contained**:
[`js/game.js`](js/game.js) and the assets in [`assets/`](assets) are maintained directly and
no longer depend on the original source or resources (kept under `_resources/` for reference only).

## Run

```
npm run serve        # python -m http.server 8080
```

then open <http://localhost:8080/> and press **Start** (browsers need a click to enable audio).
Any static web server works; there is nothing to install to *play*.

## How it works

```
js/game.js     game logic (originally translated from barbarianC64.bas, now hand-maintained)
js/runtime.js  hand-written QB64 runtime
assets/        images (indexed/RGBA PNGs + manifest.json), sounds and font (committed)
```

* **`js/game.js`** – the game program. The original is one large `GOTO` state machine
  (6000 lines, 45 labels, many jumps into the middle of `IF` blocks), so every label is a `case` of a
  `switch` in a labelled loop and `GOTO` is `pc = N; continue`. Block `IF`s are expressed as conditional
  jumps; `SLEEP` / `_LIMIT` are `yield`s of a generator that the runtime scheduler resumes.
* **`js/runtime.js`** – emulates what the program needs from QB64:
  * 320×200 **indexed-colour** screen (`SCREEN 7`/`13`) with palette (`_COPYPALETTE`, `_PALETTECOLOR`,
    `PALETTE`); the player-B colour tricks of the original rely on raw palette indices, so this is
    emulated faithfully;
  * `_LOADIMAGE` in 8-bit (`256`) and 32-bit mode, `_PUTIMAGE` with scaling/flipping, palette matching
    and transparency, `_CLEARCOLOR`;
  * 8×8 bitmap text (`LOCATE`/`PRINT`/`COLOR`) and TrueType text (`_LOADFONT`/`_FONT`) for the HUD;
  * `_KEYDOWN`, `INKEY$`, `STICK`/`STRIG` (Gamepad API), `_SNDPLAYFILE`/`_SNDOPEN`/`_SNDLOOP`/`_SNDSTOP`
    (Web Audio), fullscreen, and the 40 fps `_LIMIT` scheduler.
* **`js/png.js`** – minimal PNG decoder (8-bit indexed and RGBA): the sprites are stored as
  indexed-colour PNGs and the browser's own decoder would expand them to RGBA, losing the palette
  indices the original's colour tricks rely on. All images are fetched and decoded up front so
  `_LOADIMAGE` can stay synchronous.
* **`js/font8x8.js`** – public-domain IBM 8×8 font ([dhepper/font8x8](https://github.com/dhepper/font8x8)).
* On-screen buttons are shown on touch devices (player A only).

## English naming

The original source and resources were French (`debout`, `joueurA$`, `tombe1.gif`, …). During the port
everything was renamed to English from a single French→English vocabulary (variables → `s_playerA`,
`v_refTime`, …; state strings → `"standing"`, `"walk1Rev"`, `"deadBeheading"`, …, with the `R` suffix =
mirrored and `Rev` = reverse; asset files → `sprites/…/standing.gif`, `sound/behead.ogg`, …), so the
names in `game.js` and the files in `assets/` agree. The renaming tooling has since been removed;
the English names are now simply part of the maintained code and assets. Text shown to the player was
never translated.

## Controls

| | Player A | Player B (2 players) |
|---|---|---|
| Move / jump / crouch | arrow keys | `J` `L` / `I` / `K` |
| Attack | `Shift` | `Space` |

Menu: `0`–`7`, `Enter`/`Esc` to leave sub-screens, `Esc` aborts a game. Gamepads 1 and 2 are mapped to
players A and B. Note: the in-game CONTROLS screen of the original lists the player B keys in the wrong
order; the keys above are the ones the code actually reads.

Debug cheat: hold `W` + `N` during a fight to win the current level at once (in the final wizard fight
it makes player A walk to Marianna). In 1-player mode the stages rotate throne → arena → torture room.

## Credits and legal

Game design and original game: Steve Brown, Stan Schembri, Richard Joseph, Gary Carr, Daniel Malone
(Palace Software, 1987). QB64 remake: FL, <http://barbarian.1987.free.fr>. Graphics, sounds and the
*Zepto* font (© Domenico Mazza, "do not redistribute or modify") come from that remake's resources and
remain the property of their respective owners; check redistribution rights before publishing.
