// Entering and leaving the game: the start menu step.
export const EXIT = 'exit';

// Shows the start menu and applies its choice; ends the program when the player quits.
export function* menu(g) {
  const { rt } = g;
  const choice = yield* g.menu.run();
  if (choice.action === 'exit') {
    yield rt.system();
    return EXIT;
  }
  g.demo = choice.demo ? 'yes' : 'no';
  g.stage = choice.stage;
  g.ai = choice.ai;
  g.mode = choice.mode;
  g.wizard = 'no';
  if (g.mode === 'vs') g.countdown = 60;
  // the game reads these two options as flags, the menu owns them
  g.country = g.menu.settings.country;
  g.repeatMusic = g.menu.settings.music ? 'yes' : 'no';
  return 'newRound';
}
