# Barbarian C64 – HTML5 port

Browser version of the QB64 remake of *Barbarian: The Ultimate Warrior* (Palace Software, C64, 1987)
by FL (2012). The game code was **originally translated from the QB64 source**, so the game logic,
timings (40 loops/s), AI and animations are the original ones; the port is now **self-contained**:
the game in [`js/game.js`](js/game.js) and [`js/game/`](js/game) and the assets in [`assets/`](assets) are maintained
directly and no longer depend on the original source or resources (kept under `_resources/` for reference only).

## Run

```
npm run serve        # python -m http.server 8080
```

then open <http://localhost:8080/> and press **Start** (browsers need a click to enable audio).
Any static web server works; there is nothing to install to *play*.

## How it works

```
js/game.js          program entry: builds the game state and runs the steps of the frame loop
js/game/            the game itself (see below)
js/menu/            start menu (see below)
js/runtime.js       hand-written QB64 runtime
assets/             images (indexed/RGBA PNGs + manifest.json), sounds and font (committed)
```

* **`js/game.js`** and **`js/game/`** – the game. The original is one large `GOTO` state machine
  (6000 lines, 45 labels, many jumps into the middle of `IF` blocks); it has been restructured into **steps**:
  functions of the shared game state that return the name of the step to run next (`'poseA'`, `'damageB'`,
  `'scene'`, …). `SLEEP` / `_LIMIT` are `yield`s of a generator that the runtime scheduler resumes, so the few
  steps that wait are generators. [`game/steps.js`](js/game/steps.js) lists all steps and the order of a frame.
  * `state.js`, `fighter.js` – the game state (`g`) and the two fighters (`g.a` on the left, `g.b` on the right):
    position, pose, hit zones, life, score. `fighter.js` also has the small helpers used all over the game:
    `startPose` / `setPose`, `setHurtX` / `resetHurtY` (hit zones), `attackPressed`, `isDead` / `isBeheaded`;
    `sound.js` plays the sound effects (only when the theme music is off).
  * `session.js`, `stage.js`, `round.js` – the flow around the fight: the start menu step, new round and stage
    set-up (a table of stages and opponent colours), the start and end of every frame, win / lose conditions and
    how the rounds follow each other (1 player levels up to the wizard and Marianna, 2 player rounds).
  * `controls.js`, `ai.js`, `actions.js` – what a fighter wants to do: read keys and gamepads (the stick is a
    table of 8 directions), let the computer play (the demo player A and the opponent B, with the strike
    sequences as data), and turn the stick direction into a pose.
  * `combat.js`, `collision.js` – where blows land (hit zones) and how fighters push each other / stay in the arena.
  * `poses/` – the animation of every pose (`standing`, `advance2Rev`, `kick`, `deadBeheading`, …), one function
    per pose, in files by kind (`walk`, `posture`, `roll`, `defense`, `attacks`, `hits`, `finish`). The poses of a
    fighter form an ordered *chain* (`poses/index.js`): the pose that matches the fighter's state runs, and a pose
    that returns nothing lets the chain carry on with the next one – the order is part of the original behaviour.
  * `heads.js`, `gnome.js` – severed heads flying away (a table of flight stages) and the gnome who drags the
    loser off.
  * `render/` – drawing: `scene` (background, torches, braziers, wipe between rounds), `hud` (level / countdown,
    scores, life bars), `fighters` (sprites from the tables in `sprites.js`, blood spurting from a cut off head),
    `blood`, `snakes`, `foreground` (trees, wizard's fire).
* **`js/runtime.js`** – emulates what the program needs from QB64:
  * 320×200 **indexed-colour** screen (`SCREEN 7`/`13`) with palette (`_COPYPALETTE`, `_PALETTECOLOR`,
    `PALETTE`); the player-B colour tricks of the original rely on raw palette indices, so this is
    emulated faithfully;
  * `_LOADIMAGE` in 8-bit (`256`) and 32-bit mode, `_PUTIMAGE` with scaling/flipping, palette matching
    and transparency, `_CLEARCOLOR`;
  * 8×8 bitmap text (`LOCATE`/`PRINT`/`COLOR`) and TrueType text (`_LOADFONT`/`_FONT`) for the HUD;
  * `_KEYDOWN`, `STICK`/`STRIG` (Gamepad API), `_SNDPLAYFILE`/`_SNDOPEN`/`_SNDLOOP`/`_SNDSTOP`
    (Web Audio), fullscreen, and the 40 fps `_LIMIT` scheduler.
* **`js/png.js`** – minimal PNG decoder (8-bit indexed and RGBA): the sprites are stored as
  indexed-colour PNGs and the browser's own decoder would expand them to RGBA, losing the palette
  indices the original's colour tricks rely on. All images are fetched and decoded up front so
  `_LOADIMAGE` can stay synchronous.
* **`js/font8x8.js`** – public-domain IBM 8×8 font ([dhepper/font8x8](https://github.com/dhepper/font8x8)).
* **`js/menu/`** – the start menu, kept out of the game steps. `game.js` only calls
  `StartMenu.logo()` and (through the `menu` step in `game/session.js`) `StartMenu.run()`, which returns what to
  play (or exit) and owns the options:
  * `select.js` – generic cursor-driven list (↑/↓ highlight, `Enter` picks, optional `Esc` = cancel);
  * `startMenu.js` – the flow: main menu, stage choice, and the screens it leads to;
  * `options.js` – version, sound and display choices;
  * `screens.js` – credits, controls and story pages (plain text tables);
  * `backdrop.js` – the title artwork behind the menu panel.
* **`js/gestures.js`** – touch gestures on the game screen, mapped onto player A's keys (see Controls).
* **`js/touchpad.js`** – on-screen buttons shown on touch devices (player A only): a round 8-way D-pad, `Esc` and
  `Attack`, with haptic feedback where the browser supports it (see Controls).

## English naming

The original source and resources were French (`debout`, `joueurA$`, `tombe1.gif`, …). During the port
everything was renamed to English from a single French→English vocabulary (variables, state strings →
`"standing"`, `"walk1Rev"`, `"deadBeheading"`, …, with the `R` suffix = mirrored and `Rev` = reverse; asset files →
`sprites/…/standing.gif`, `sound/behead.ogg`, …), so the pose names in `game/` and the files in `assets/` agree.
The original's flat variables (`s_playerA`, `v_refTime`, …) now live on the game state (`g.time`, `g.stage`, …) and on
the two fighters (`g.a.state`, `g.b.refTime`, …). The renaming tooling has since been removed; the English names are
now simply part of the maintained code and assets. Text shown to the player was never translated.

## Controls

| | Player A | Player B (2 players) |
|---|---|---|
| Move / jump / crouch | arrow keys | `J` `L` / `I` / `K` |
| Attack | `Shift` | `Space` |

Menu: `↑`/`↓` move the highlight, `Enter` selects, `Esc` goes back (and leaves the info screens); `Esc`
aborts a game. Gamepads 1 and 2 are mapped to players A and B.

On touch devices a compact gamepad-style set of buttons is shown next to the screen (below it in portrait, on both
sides in short landscape): a round D-pad with eight directions picked by angle (slide the thumb around it to change
direction; the thumb cap follows the finger and the active sector lights up), `Esc` in the middle and `Attack` on the
right. `Attack` also acts as `Enter`: it selects the highlighted menu entry and leaves the info screens. Each press
and each direction change gives a short vibration (Vibration API: Android browsers; iOS Safari does not offer it).

Touch gestures on the game screen (player A; also available next to the on-screen buttons):

| Gesture | Action |
|---|---|
| Drag | floating 8-way joystick: walk / jump / crouch, diagonals included; moves the menu highlight |
| Tap | attack (`Shift`), also `Enter` (select a menu entry, leave sub-screens) |
| Extra finger down while another one is dragging | attack, held while the finger stays down |
| Two-finger tap | `Esc` (abort the game / go back) |

Note: the in-game CONTROLS screen of the original lists the player B keys in the wrong
order; the keys above are the ones the code actually reads.

Debug cheat: hold `W` + `N` during a fight to win the current level at once (in the final wizard fight
it makes player A walk to Marianna). In 1-player mode the stages rotate throne → arena → torture room.

## Credits and legal

Game design and original game: Steve Brown, Stan Schembri, Richard Joseph, Gary Carr, Daniel Malone
(Palace Software, 1987). QB64 remake: FL, <http://barbarian.1987.free.fr>. Graphics, sounds and the
*Zepto* font (© Domenico Mazza, "do not redistribute or modify") come from that remake's resources and
remain the property of their respective owners; check redistribution rights before publishing.
