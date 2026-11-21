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
js/runtime.js       hand-written QB64 runtime (input, sound, scheduler)
js/gfx/             its graphics: true-colour screen, palette, images, text
assets/             images (PNG + manifest.json), sounds and font (committed)
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
    `blood`, `snakes`, `foreground` (trees, wizard's fire), and `view` (everything that stands on the floor can be
    drawn bigger and lower than in the original, per stage: see "Painted throne room" below).
* **`js/runtime.js`** – emulates what the program needs from QB64: the graphics (below, `js/gfx/`) plus
  `_KEYDOWN`, `STICK`/`STRIG` (Gamepad API), `_SNDPLAYFILE`/`_SNDOPEN`/`_SNDLOOP`/`_SNDSTOP`
  (Web Audio), fullscreen, and the 40 fps `_LIMIT` scheduler.
* **`js/gfx/`** – the graphics of the runtime: a **true-colour** screen at any resolution.
  * `graphics.js` – the QB64 statements (`SCREEN`, `COLOR`, `LOCATE`/`PRINT`, `LINE`, `PALETTE`,
    `_COPYPALETTE`, `_PALETTECOLOR`, `_LOADIMAGE`, `_WIDTH`/`_HEIGHT` of an image, `_PUTIMAGE`, `GET` (a copy of part
    of the screen), `_CLEARCOLOR`, `_LOADFONT`/`_FONT`). The game keeps
    drawing in the 320×200 coordinates of the original ("game pixels"), whatever the resolution behind them;
  * `surface.js` – the RGBA frame buffer: `scale` real pixels per game pixel in each direction (default: chosen from
    the display, `?scale=N` in the URL forces it, 1 to 8), and the image blit (stretch, mirror, alpha, colour key);
  * `palette.js` – the palette that gives meaning to colour *numbers* (`COLOR`, `LINE`, `PRINT`, indexed images);
  * `images.js` – decoded assets → images, with their resolution (below);
  * `resolution.js` – picks the screen resolution when the game starts and the file of every image that suits it
    (the pack can ship an image in several resolutions, see "Several resolutions" below);
  * `text.js` – the 8×8 bitmap font and TrueType text, drawn at the screen resolution (anti-aliased above 1×).
* **`js/png.js`** – image decoder. PNGs are decoded here, losslessly, because the browser's own decoder always
  expands to RGBA and would lose the palette indices the original's colour tricks rely on (indexed 1–8 bit, 8-bit
  grey / RGB / RGBA); anything else (16-bit, interlaced, JPEG, WebP) is decoded by the browser into RGBA.
  All images are fetched and decoded up front so `_LOADIMAGE` can stay synchronous.
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

## Artwork: resolution and colour

The game logic and every coordinate stay in the 320×200 grid of the original; what changes is how much detail
is behind each game pixel. [`assets/manifest.json`](assets/manifest.json) describes the asset pack:

* `"scale"` – pixels per game pixel of the images (1 for the C64 artwork). A pack drawn at 4× has 1280×800 backdrops
  and 160×320 fighters, and the image still covers the same area of the game. `"imageScales"` (optional, by image key)
  overrides it for single images, so old and new artwork can be mixed. Lower-resolution images are enlarged by pixel
  replication (which keeps pixel art sharp at whole multiples).
* **Several resolutions** – `"variants"` (by image key, `{ "scale": "file" }`) adds files of the same image drawn at
  other scales. When the game starts it picks the screen resolution from the display (`js/gfx/resolution.js`: the
  smallest resolution of the pack that is hardly coarser than the widest the game can be shown, fullscreen included,
  in real pixels; `?scale=N` forces another) and loads each image in the best variant that the screen can show whole.
  So a painted picture is reduced once, offline, with a proper filter, and never shrunk or stretched in the browser;
  a small screen downloads only the small files.
* **Palette art vs true colour** – what the PNG stores decides how it is drawn:
  * *paletted* PNGs (the C64 artwork) are drawn in the colours of the screen palette: loaded in 8-bit mode they keep
    their indices (so palette tricks such as the opponent's colour per level keep working), in 32-bit mode each
    colour is matched to the closest palette colour, as QB64 does;
  * *RGB / RGBA* PNGs (also JPEG / WebP) are drawn exactly as they are, with alpha blending and colour keys.
* `"palette"` – the named colours (`[[r, g, b], …]`, 16 for the C64 set) the game uses for things it draws itself
  (clearing the countdown, braziers, text colours). A paletted stage picture provides them through its own palette;
  a true-colour picture has none, so the pack's `"palette"` is used. Keep the opponent sprites paletted (at any
  scale) if the opponent's colour should change with the level.
* **Artwork at 2×** – all the images (sprites, stages, menus) are shipped in `assets/HD/` at twice the C64 resolution
  (`"scale": 2`, so the screen is at least 640×400). `assets/HD/` is generated from `assets/C64/` by
  `python tools/double_artwork.py` (needs Pillow): every pixel is repeated, so the blocky look, the palette indices
  and the transparency are kept, and the script points the manifest at the new files. To draw better artwork, edit
  the files in `assets/HD/` (keep them paletted where the original is, and twice the size of the C64 original) and
  stop running the script, which overwrites them.
* **Painted throne room** – `throne.png` is true colour (not paletted) and comes in three
  resolutions, `assets/HD/stage/` (2×), `assets/HD4/stage/` (4×) and `assets/HD6/stage/` (6×), listed in `"variants"`.
  The room is a heroic-fantasy oil painting (`tools/throne_painting.jpg`, made with an image model from a layout
  reference), mapped onto the game grid by `python tools/draw_throne.py` (needs Pillow and NumPy), which writes all of
  them. It keeps the C64 logo/HUD area, the pillars with their snakes and the snake tails in the corners.
  The other images stay at 2× and are enlarged by replication on bigger screens. Don't run `double_artwork.py`
  afterwards: it would overwrite the 2× throne with the pixel-doubled C64 picture.
* **Fighters in proportion** – the sorcerer and the princess of the painted throne room are bigger than the C64
  fighters, so the throne stage has a `view` in `STAGES` (`js/game/stage.js`: `scale` and `floorY`, the row of the
  feet; now 1.5× and row 190 instead of 176). Everything that stands on the floor – the fighters, blood, severed
  heads, the gnome, the wizard's fire – is drawn through `js/game/render/view.js`, bigger and lower, around the middle
  of the fighter's slot; positions, hit zones and the rest of the game keep the original coordinates. The fighters
  then cover more than the original strip of the arena, so for a stage with a `view` the background that is drawn
  again on every frame under them and the trees in front are copied from the stage picture when it is first shown
  (there are no files for them), and the trees are always drawn. Stages without a `view` are drawn as before; to
  resize another stage, give it a `view` too (its picture must show the floor below row 176).
* **No player labels** – the stage pictures carry no `1PLR` / `2PLR` / `DEMO` text: the game no longer draws those
  labels, and the `2PLR` that the C64 pictures had at game pixels 142,192 (32×8) has been painted out of the stage
  pictures in `assets/C64/` and `assets/HD/`.

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
