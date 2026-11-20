// A fighter: player A fights on the left, player B on the right. Positions are in text cells (40 columns),
// the hit zones (forehead, head, body, knee) are the cells where an attack of the opponent lands.

export function createFighter() {
  return {
    // position and animation
    x: 0,                  // column of the fighter
    state: '',             // current pose: 'standing', 'advance1', 'kickRev', ... (see poses/)
    refTime: 0,            // game time when the pose started: animations step with `g.time - refTime`
    busy: '',              // 'yes' while the pose cannot be interrupted by the controls
    sprite: '',            // sprite to show (key of the sprite table)
    image: 0,              // loaded image of the sprite
    imageDirection: '',    // how the image is placed: 'normal', 'reverse' (mirrored) or wider mirrored variants
    cellX: 0,              // screen position of the sprite, in cells and in pixels
    cellY: 0,
    pixelX: 0,
    pixelY: 0,

    // controls
    stick: '',             // joystick direction: 'neutral', 'left', 'upRight', ...
    stickX: 0,             // raw stick position (5..9, 7 = centre)
    stickY: 0,
    attackKey: '',         // 'yes' while the attack key is down
    waiting: 0,            // frames spent without any input (the fighter gets impatient)
    advanceStep: 0,        // walking cycle position (0 = not walking)
    retreatStep: 0,

    // what an attack of this fighter touches, and where the opponent can be hit
    attackX: 0,
    attackY: 0,
    foreheadX: 0,
    foreheadY: 0,
    headX: 0,
    headY: 0,
    bodyX: 0,
    bodyY: 0,
    kneeX: 0,
    kneeY: 0,

    // state of the fight
    life: 0,
    score: 0,
    bonus: '',             // 'yes' while the time bonus is counted for this fighter
    exiting: '',           // 'yes' while the fighter walks out of the screen after the round
    beheadable: '',        // 'no' while the head cannot be cut off (jumping)
    protectBody: '',
    protectHead: '',
    sitting: '',
    bleeding: '',
    bloodBeheading: 0,     // phase of the blood spurting from a cut off head
    snake: '',             // the snake on this side of the arena shows the fighter's pain
    damageForehead: 0,     // hits taken so far: the computer opponent adapts its tactics
    damageHead: 0,
    damageKnee: 0,
    strike: 0,             // position in the computer's sequence of attacks
  };
}

// The four hit zones of a fighter stand in the same column ...
export function setHurtX(f, x) {
  f.foreheadX = x;
  f.headX = x;
  f.bodyX = x;
  f.kneeX = x;
}

// ... and at the heights of a standing fighter.
export function resetHurtY(f) {
  f.foreheadY = 15;
  f.headY = 16;
  f.bodyY = 18;
  f.kneeY = 20;
}

// Starts a pose that the controls cannot interrupt.
export function startPose(g, f, state) {
  f.state = state;
  f.busy = 'yes';
  f.refTime = g.time;
}

// Starts a pose that the controls can still change.
export function setPose(g, f, state) {
  f.state = state;
  f.refTime = g.time;
}

// The attack key of a human player (the demo does not read the keys).
export function attackPressed(g, f) {
  return f.attackKey === 'yes' && g.demo === 'no';
}

// Dying: killed by a blow, or beheaded (a severed head rolls away).
export const isBeheaded = (f) => f.state === 'deadBeheading' || f.state === 'deadBeheadingRev';
export const isKilled = (f) => f.state === 'dead' || f.state === 'deadRev';
export const isDead = (f) => isKilled(f) || isBeheaded(f);
