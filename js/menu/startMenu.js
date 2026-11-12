// Start menu: logo, main menu and the screens it leads to.
// The game only sees the outcome returned by run(); the options live in `settings`.
import { CANCEL, selectMenu } from './select.js';
import { drawBackdrop, showLogo } from './backdrop.js';
import { runOptions } from './options.js';
import { showControls, showCredits, showStory } from './screens.js';

const MAIN_ITEMS = [
  { id: 'demo', label: 'DEMO' },
  { id: 'solo', label: '1 PLAYER' },
  { id: 'vs', label: '2 PLAYERS' },
  { id: 'options', label: 'OPTIONS' },
  { id: 'controls', label: 'CONTROLS' },
  { id: 'story', label: 'STORY' },
  { id: 'credits', label: 'CREDITS' },
  { id: 'exit', label: 'EXIT' },
];

const STAGES = [
  { label: 'WASTELAND-FOREST', stage: 'plain' },
  { label: 'THRONE-ARENA', stage: 'throne' },
  { label: 'TORTURE ROOM', stage: 'torture' },
  { label: 'BACK' },
];

export class StartMenu {
  constructor(rt) {
    this.rt = rt;
    this.settings = {
      country: 'europe', // 'europe' (Barbarian) or 'USA' (Death Sword)
      music: false,      // theme music instead of sound effects
      fullscreen: false,
    };
    this.theme = rt.sndopen('C64/sound/theme.ogg', 'sync');
    this.cursor = 1; // highlighted entry, kept between visits
  }

  logo() {
    return showLogo(this.rt, this.settings);
  }

  /**
   * Run the menu until the player starts a game or exits.
   * Returns { action: 'exit' } or { action: 'play', demo, mode: 'solo' | 'vs', stage, ai }.
   */
  *run() {
    const { rt } = this;
    for (;;) {
      drawBackdrop(rt, this.settings);
      this.cursor = yield* selectMenu(rt, { items: MAIN_ITEMS, selected: this.cursor });
      switch (MAIN_ITEMS[this.cursor].id) {
        case 'demo':
          return { action: 'play', demo: true, mode: 'solo', stage: 'plain', ai: 4 };
        case 'solo':
          return { action: 'play', demo: false, mode: 'solo', stage: 'throne', ai: 0 };
        case 'vs': {
          const stage = yield* this.chooseStage();
          if (stage) return { action: 'play', demo: false, mode: 'vs', stage, ai: 0 };
          break;
        }
        case 'options':
          yield* runOptions(this);
          break;
        case 'controls':
          yield* showControls(rt);
          break;
        case 'story':
          yield* showStory(rt);
          break;
        case 'credits':
          yield* showCredits(this);
          break;
        case 'exit':
          return { action: 'exit' };
      }
    }
  }

  // Name of the stage to fight on, or undefined when the player goes back.
  *chooseStage() {
    const index = yield* selectMenu(this.rt, {
      title: 'SELECT STAGE', items: STAGES, selected: 0, cancelable: true,
    });
    return index === CANCEL ? undefined : STAGES[index].stage;
  }
}
