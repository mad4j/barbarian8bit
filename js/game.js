// The program entry: builds the game state and runs the steps of the frame loop.
// Every step is a function of the game state that returns the name of the step to run next
// (see game/steps.js); steps that wait for the player or the next frame are generators.
import { StartMenu } from './menu/startMenu.js';
import { createGame } from './game/state.js';
import { STEPS } from './game/steps.js';
import { EXIT } from './game/session.js';

export function* program(rt) {
  const g = createGame(rt, new StartMenu(rt));
  rt.title('BARBARIAN  C64');
  g.a.score = 0;
  g.b.score = 0;
  g.palaceFont = rt.loadfont('C64/menu/zepto.ttf', 18);
  yield* g.menu.logo();
  let step = 'menu';
  while (step !== EXIT) {
    const run = STEPS[step](g);
    step = typeof run === 'string' ? run : yield* run;
  }
}
