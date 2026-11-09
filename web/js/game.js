// Originally translated from barbarianC64.bas (QB64); now maintained by hand.
/* eslint-disable */
export function* program(rt) {
  let s_aBusy = "", s_attackA = "", s_attackB = "", s_bBusy = "", s_beheadA = "", s_beheadB = "", s_bloodA = "", s_bloodB = "", s_bonusA = "", s_bonusB = "", s_country = "", s_credits = "", s_demo = "", s_direction = "", s_directionImageA = "", s_directionImageB = "", s_entry = "", s_entryWizard = "", s_exitA = "", s_exitB = "", s_finishedLaughing = "", s_football = "", s_fullscreen = "", s_game = "", s_gnome = "", s_gnomeLaughs = "", s_gnomePulls = "", s_launchMusic = "", s_marianna = "", s_memory = "", s_mode = "", s_playerA = "", s_playerB = "", s_protectBodyA = "", s_protectBodyB = "", s_protectHeadA = "", s_protectHeadB = "", s_repeatMusic = "", s_sitA = "", s_sitB = "", s_snakeA = "", s_snakeB = "", s_soundLaughs = "", s_spriteA = "", s_spriteB = "", s_stage = "", s_stick1 = "", s_stick2 = "", s_stop = "", s_timeFinished = "", s_transition = "", s_transitionFinished = "", s_version = "", s_wizard = "", v_a1 = 0, v_a2 = 0, v_a3 = 0, v_a4 = 0, v_ai = 0, v_b1 = 0, v_b2 = 0, v_b3 = 0, v_b4 = 0, v_background = 0, v_bloodBeheadingA = 0, v_bloodBeheadingB = 0, v_countdown = 0, v_distance = 0, v_gnomeNumber = 0, v_headNumber = 0, v_imageA = 0, v_imageB = 0, v_infoADamageForehead = 0, v_infoADamageHead = 0, v_infoADamageKnee = 0, v_infoAStrike = 0, v_infoBDamageForehead = 0, v_infoBDamageHead = 0, v_infoBDamageKnee = 0, v_infoBStrike = 0, v_lifeA = 0, v_lifeB = 0, v_object = 0, v_palaceFont = 0, v_refTime = 0, v_refTimeB = 0, v_scoreA = 0, v_scoreB = 0, v_snake = 0, v_spriteAdvanceA = 0, v_spriteAdvanceB = 0, v_spriteGnome = 0, v_spriteHead = 0, v_spriteRetreatA = 0, v_spriteRetreatB = 0, v_spriteShadow = 0, v_stage = 0, v_theme = 0, v_tick = 0, v_time = 0, v_treeLeft = 0, v_treeRight = 0, v_waitingA = 0, v_waitingB = 0, v_x1 = 0, v_x2 = 0, v_xA = 0, v_xAttackA = 0, v_xAttackB = 0, v_xB = 0, v_xBlood1 = 0, v_xBlood2 = 0, v_xBodyA = 0, v_xBodyB = 0, v_xFire = 0, v_xForeheadA = 0, v_xForeheadB = 0, v_xGnome = 0, v_xHeadA = 0, v_xHeadB = 0, v_xHeadSprite = 0, v_xKneeA = 0, v_xKneeB = 0, v_xSpurt = 0, v_y1 = 0, v_y2 = 0, v_yAttackA = 0, v_yAttackB = 0, v_yBlood1 = 0, v_yBlood2 = 0, v_yBodyA = 0, v_yBodyB = 0, v_yFire = 0, v_yForeheadA = 0, v_yForeheadB = 0, v_yHeadA = 0, v_yHeadB = 0, v_yHeadSprite = 0, v_yKneeA = 0, v_yKneeB = 0, v_ySpurt = 0;
  let pc = 0;
  main: for (;;) {
    switch (pc) {
      case 0:
      rt.screen(13);
      rt.title("BARBARIAN  C64");
      s_fullscreen = "no";
      s_repeatMusic = "no";
      s_credits = "no";
      v_scoreA = 0;
      v_scoreB = 0;
      s_memory = "no";
      s_country = "europe";
      case 1: // logo
      rt.screen(13);
      if ((s_country === "europe")) { v_stage = rt.loadimage("C64/menu/title.png"); }
      if ((s_country === "USA")) { v_stage = rt.loadimage("C64/menu/titleDS.png"); }
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      rt.display();
      if (!((s_memory === "no"))) { pc = 47; continue main; }
      s_memory = "yes";
      v_theme = rt.sndopen("C64/sound/theme.ogg", "sync");
      v_palaceFont = rt.loadfont("C64/menu/zepto.ttf", 18);
      case 47:
      case 46:
      if ((s_fullscreen === "no")) { yield rt.sleep(2); }
      if ((s_fullscreen === "yes")) { yield rt.sleep(4); }
      case 2: // menu
      s_demo = "no";
      case 48: // DO
       if (!((rt.inkey() === ""))) { pc = 48; continue main; }
      rt.screen(13); rt.cls();
      if ((s_country === "europe")) { v_stage = rt.loadimage("C64/menu/title.png"); }
      if ((s_country === "USA")) { v_stage = rt.loadimage("C64/menu/titleDS.png"); }
      rt.copypalette(undefined, v_stage);
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      if ((s_country === "USA")) { rt.line(55, 162, 267, 185, 0, "BF"); }
      case 49: // DO
      
      rt.color(15, undefined);
      rt.locate(15, 13); rt.print(["   0- DEMO           "], true);
      rt.locate(16, 9); rt.print(["       1- 1 PLAYER       "], true);
      rt.locate(17, 9); rt.print(["       2- 2 PLAYERS      "], true);
      rt.locate(18, 9); rt.print(["       3- OPTIONS        "], true);
      rt.locate(19, 9); rt.print(["       4- CONTROLS       "], true);
      rt.locate(20, 9); rt.print(["       5- STORY          "], true);
      rt.locate(21, 9); rt.print(["       6- CREDITS        "], true);
      rt.locate(22, 9); rt.print(["       7- EXIT           "], true);
      rt.display();
      yield rt.sleep();
      if (rt.keydown(48)) { s_demo = "yes"; s_stage = "plain"; v_ai = 4; s_mode = "solo"; s_wizard = "no"; { pc = 12; continue main; } }
      if (rt.keydown(49)) { s_stage = "throne"; v_ai = 0; s_mode = "solo"; s_wizard = "no"; { pc = 12; continue main; } }
      if (rt.keydown(50)) { v_ai = 0; s_mode = "vs"; v_countdown = 60; s_wizard = "no"; { pc = 3; continue main; } }
      if (rt.keydown(51)) { { pc = 4; continue main; } }
      if (rt.keydown(52)) { { pc = 8; continue main; } }
      if (rt.keydown(53)) { { pc = 11; continue main; } }
      if (rt.keydown(54)) { { pc = 7; continue main; } }
      if (rt.keydown(55)) { yield rt.system(); return; }
      { pc = 49; continue main; }
      case 3: // selectStage
      rt.color(15, undefined);
      rt.locate(15, 13); rt.print(["    SELECT STAGE "], true);
      rt.locate(16, 9); rt.print(["                         "], true);
      rt.locate(17, 9); rt.print(["     1- WASTELAND-FOREST "], true);
      rt.locate(18, 9); rt.print(["     2- THRONE-ARENA     "], true);
      rt.locate(19, 9); rt.print(["     3- TORTURE ROOM     "], true);
      rt.locate(20, 9); rt.print(["                         "], true);
      rt.locate(21, 9); rt.print(["        6- BACK          "], true);
      rt.locate(22, 9); rt.print(["                         "], true);
      rt.display();
      yield rt.sleep();
      if (rt.keydown(49)) { s_stage = "plain"; { pc = 12; continue main; } }
      if (rt.keydown(50)) { s_stage = "throne"; { pc = 12; continue main; } }
      if (rt.keydown(51)) { s_stage = "torture"; { pc = 12; continue main; } }
      if (rt.keydown(54)) { { pc = 2; continue main; } } else { { pc = 3; continue main; } }
      case 4: // options
      rt.color(15, undefined);
      rt.color(15, undefined);
      rt.locate(15, 13); rt.print(["                    "], true);
      rt.locate(16, 9); rt.print(["         VERSION        "], true);
      rt.locate(17, 9); rt.print(["                        "], true);
      rt.locate(18, 9); rt.print(["                        "], true);
      rt.locate(19, 9); rt.print(["      1- EUROPE         "], true);
      rt.locate(20, 9); rt.print(["      2- USA            "], true);
      rt.locate(21, 9); rt.print(["                        "], true);
      rt.locate(22, 9); rt.print(["                        "], true);
      rt.display();
      yield rt.sleep();
      if (rt.keydown(49)) { s_country = "europe"; { pc = 5; continue main; } }
      if (!(rt.keydown(50))) { pc = 51; continue main; }
      s_country = "USA"; { pc = 5; continue main; }
      { pc = 50; continue main; }
      case 51:
      { pc = 4; continue main; }
      case 50:
      case 5: // optionsSounds
      rt.screen(13); rt.cls();
      if ((s_country === "europe")) { v_stage = rt.loadimage("C64/menu/title.png"); }
      if ((s_country === "USA")) { v_stage = rt.loadimage("C64/menu/titleDS.png"); }
      rt.copypalette(undefined, v_stage);
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      if ((s_country === "USA")) { rt.line(55, 162, 267, 185, 0, "BF"); }
      rt.locate(15, 13); rt.print(["                    "], true);
      rt.locate(16, 9); rt.print(["         SOUND          "], true);
      rt.locate(17, 9); rt.print(["                        "], true);
      rt.locate(18, 9); rt.print(["                        "], true);
      rt.locate(19, 9); rt.print(["    1- SOUND EFFECTS    "], true);
      rt.locate(20, 9); rt.print(["    2- MUSIC            "], true);
      rt.locate(21, 9); rt.print(["                        "], true);
      rt.locate(22, 9); rt.print(["                        "], true);
      rt.display();
      yield rt.sleep();
      if (!(rt.keydown(50))) { pc = 53; continue main; }
      if ((s_repeatMusic === "yes")) { { pc = 6; continue main; } }
      s_repeatMusic = "yes";
      rt.sndloop(v_theme);
      { pc = 6; continue main; }
      case 53:
      case 52:
      if (!(rt.keydown(49))) { pc = 55; continue main; }
      if ((s_repeatMusic === "yes")) { rt.sndstop(v_theme); }
      s_repeatMusic = "no"; s_credits = "no";
      { pc = 54; continue main; }
      case 55:
      { pc = 5; continue main; }
      case 54:
      case 6: // optionsScreen
      rt.color(15, undefined);
      rt.locate(15, 13); rt.print(["                    "], true);
      rt.locate(16, 9); rt.print(["         DISPLAY        "], true);
      rt.locate(17, 9); rt.print(["                        "], true);
      rt.locate(18, 9); rt.print(["                        "], true);
      rt.locate(19, 9); rt.print(["    1- FULLSCREEN       "], true);
      rt.locate(20, 9); rt.print(["    2- WINDOWS MODE     "], true);
      rt.locate(21, 9); rt.print(["                        "], true);
      rt.locate(22, 9); rt.print(["                        "], true);
      rt.display();
      yield rt.sleep();
      if (!(rt.keydown(49))) { pc = 57; continue main; }
      if ((s_fullscreen === "yes")) { { pc = 2; continue main; } }
      s_fullscreen = "yes";
      rt.fullscreen();
      { pc = 1; continue main; }
      case 57:
      case 56:
      if (!(rt.keydown(50))) { pc = 59; continue main; }
      if (!((s_fullscreen === "yes"))) { pc = 61; continue main; }
      rt.fullscreen(rt.OFF);
      s_fullscreen = "no";
      case 61:
      case 60:
      { pc = 1; continue main; }
      { pc = 58; continue main; }
      case 59:
      { pc = 6; continue main; }
      case 58:
      case 7: // credits
      rt.screen(13);
      rt.cls();
      v_stage = rt.loadimage("C64/menu/team.png");
      rt.putimage(v_stage, 0, 0, undefined, undefined);
      if (!(((s_repeatMusic === "no") && (s_credits === "no")))) { pc = 63; continue main; }
      rt.sndloop(v_theme);
      case 63:
      case 62:
      rt.color(15, undefined);
      if ((s_country === "europe")) { rt.locate(2, 21); rt.print(["      BARBARIAN     "], true); }
      if ((s_country === "USA")) { rt.locate(2, 21); rt.print(["     DEATH SWORD    "], true); }
      rt.locate(3, 21); rt.print(["   Palace Software  "], true);
      rt.locate(4, 21); rt.print(["     C64 version    "], true);
      rt.locate(5, 21); rt.print(["        1987        "], true);
      rt.locate(6, 21); rt.print(["                    "], true);
      rt.locate(7, 21); rt.print(["created and designed"], true);
      rt.locate(8, 21); rt.print(["  by STEVE BROWN    "], true);
      rt.locate(9, 21); rt.print(["                    "], true);
      rt.locate(10, 21); rt.print(["   C64 programmer  "], true);
      rt.locate(11, 21); rt.print(["   STAN SCHEMBRI   "], true);
      rt.locate(12, 21); rt.print(["                    "], true);
      rt.locate(13, 21); rt.print(["   CPC programmer   "], true);
      rt.locate(14, 21); rt.print(["   ANDREW FITTER    "], true);
      rt.locate(15, 21); rt.print(["                    "], true);
      rt.locate(16, 21); rt.print(["        music       "], true);
      rt.locate(17, 21); rt.print(["   RICHARD JOSEPH   "], true);
      rt.locate(18, 21); rt.print(["                    "], true);
      rt.locate(19, 21); rt.print(["  assistant artist  "], true);
      rt.locate(20, 21); rt.print(["      GARY CARR     "], true);
      rt.locate(21, 21); rt.print(["                    "], true);
      rt.locate(22, 21); rt.print(["    DANIEL MALONE   "], true);
      rt.locate(23, 21); rt.print(["                    "], true);
      rt.locate(24, 1); rt.print(["FL clone http://barbarian.1987.free.fr"], false);
      rt.display();
      yield rt.sleep();
      if (!((rt.keydown(13) || rt.keydown(27)))) { pc = 65; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndstop(v_theme); }
      { pc = 2; continue main; }
      { pc = 64; continue main; }
      case 65:
      s_credits = "yes"; { pc = 7; continue main; }
      case 64:
      case 8: // controls
      rt.screen(13);
      rt.cls();
      v_stage = rt.loadimage("C64/spritesA/standing.gif");
      rt.putimage(v_stage, 0, 0, undefined, undefined);
      v_stage = rt.loadimage("C64/menu/playerB.bmp");
      rt.putimage(v_stage, 280, 0, undefined, undefined);
      rt.color(15, undefined); rt.locate(2, 13); rt.print(["CONTROLS KEYS"], true);
      rt.locate(10, 1); rt.print(["PLAYER A"], true);
      rt.locate(12, 1); rt.print(["UP............", rt.chr_(24)], true);
      rt.locate(13, 1); rt.print(["DOWN..........", rt.chr_(25)], true);
      rt.locate(14, 1); rt.print(["LEFT..........", rt.chr_(27)], true);
      rt.locate(15, 1); rt.print(["RIGHT.........", rt.chr_(26)], true);
      rt.locate(17, 1); rt.print(["ATTACK...SHIFT"], true);
      rt.color(4, undefined); rt.locate(18, 1); rt.print([" or GAMEPAD 1"], true);
      rt.color(15, undefined);
      rt.locate(10, 25); rt.print(["        PLAYER B"], true);
      rt.locate(12, 25); rt.print(["UP.............I"], true);
      rt.locate(13, 25); rt.print(["DOWN...........J"], true);
      rt.locate(14, 25); rt.print(["LEFT...........K"], true);
      rt.locate(15, 25); rt.print(["RIGHT..........L"], true);
      rt.locate(17, 25); rt.print(["ATTACK.....SPACE"], true);
      rt.color(4, undefined); rt.locate(18, 27); rt.print([" or GAMEPAD 2"], true);
      rt.color(15, undefined);
      rt.locate(20, 10); rt.print(["ABORT GAME...........ESC"], true);
      rt.locate(22, 10); rt.print(["GOTO MENU..........ENTER"], true);
      rt.display();
      yield rt.sleep();
      if ((rt.keydown(13) || rt.keydown(27))) { { pc = 9; continue main; } } else { { pc = 8; continue main; } }
      case 9: // controls2
      rt.cls();
      rt.color(15, undefined); rt.locate(2, 13); rt.print(["MOVING CONTROLS"], true);
      v_stage = rt.loadimage("C64/menu/controls1.gif");
      rt.putimage(v_stage, 100, 40, undefined, undefined);
      rt.locate(5, 19); rt.print(["jump"], false);
      rt.locate(7, 8); rt.print(["protect"], false);
      rt.locate(8, 11); rt.print(["head"], false);
      rt.locate(7, 27); rt.print(["protect"], false);
      rt.locate(8, 27); rt.print(["body"], false);
      rt.locate(12, 9); rt.print(["move"], false);
      rt.locate(13, 9); rt.print(["back"], true);
      rt.locate(12, 29); rt.print(["move"], false);
      rt.locate(13, 29); rt.print(["forward"], true);
      rt.locate(18, 11); rt.print(["roll"], false);
      rt.locate(19, 11); rt.print(["back"], false);
      rt.locate(18, 27); rt.print(["roll"], false);
      rt.locate(19, 27); rt.print(["front"], false);
      rt.locate(21, 18); rt.print(["crouch"], true);
      rt.display();
      yield rt.sleep();
      if ((rt.keydown(13) || rt.keydown(27))) { { pc = 10; continue main; } } else { { pc = 9; continue main; } }
      case 10: // controls3
      rt.cls();
      rt.color(15, undefined); rt.locate(2, 13); rt.print(["FIGHTING CONTROLS"], true);
      rt.color(15, undefined); rt.locate(3, 13); rt.print(["(with attack key)"], true);
      v_stage = rt.loadimage("C64/menu/controls2.gif");
      rt.putimage(v_stage, 100, 40, undefined, undefined);
      rt.locate(5, 16); rt.print(["neck chop"], false);
      rt.locate(7, 9); rt.print(["web of"], false);
      rt.locate(8, 9); rt.print(["death"], false);
      rt.locate(7, 27); rt.print(["head"], false);
      rt.locate(8, 27); rt.print(["butt"], false);
      rt.locate(12, 7); rt.print(["flying"], false);
      rt.locate(13, 9); rt.print(["neck"], false);
      rt.locate(14, 9); rt.print(["chop"], false);
      rt.locate(12, 29); rt.print(["body"], false);
      rt.locate(13, 29); rt.print(["chop"], false);
      rt.locate(18, 7); rt.print(["overhead"], false);
      rt.locate(19, 11); rt.print(["chop"], false);
      rt.locate(19, 27); rt.print(["kick "], false);
      rt.locate(21, 17); rt.print(["leg chop"], false);
      rt.display();
      yield rt.sleep();
      if ((rt.keydown(13) || rt.keydown(27))) { { pc = 2; continue main; } } else { { pc = 10; continue main; } }
      case 11: // story
      rt.cls();
      rt.locate(2, 1); rt.print(["The evil sorcerer Drax desires "], true);
      rt.locate(3, 1); rt.print(["Princess Marianna and has sworn "], true);
      rt.locate(4, 1); rt.print(["to wreak an unspeakable doom on the"], true);
      rt.locate(5, 1); rt.print(["people of the Jewelled City, unless"], true);
      rt.locate(6, 1); rt.print(["she is delivred to him."], true);
      rt.locate(7, 1); rt.print(["However, he has agreed that if a"], true);
      rt.locate(8, 1); rt.print(["champion can be found who is able to "], true);
      rt.locate(9, 1); rt.print(["defeat his 8 demonic guardians, the"], true);
      rt.locate(10, 1); rt.print(["princess will be allowed to go free."], true);
      rt.locate(12, 1); rt.print(["All seems lost as champion after "], true);
      rt.locate(13, 1); rt.print(["champion is defeated."], true);
      rt.locate(15, 1); rt.print(["Then, from the forgotten wastelands of"], true);
      rt.locate(16, 1); rt.print(["the North, comes an unknown barbarian,"], true);
      rt.locate(17, 1); rt.print(["a mighty warrior, wielding broadsword"], true);
      rt.locate(18, 1); rt.print(["with deadly skill."], true);
      rt.locate(20, 1); rt.print(["Can he vanquish the forces of Darkness "], true);
      rt.locate(21, 1); rt.print(["and free the princess ?"], true);
      rt.locate(23, 1); rt.print(["Only you can say ..."], false);
      rt.display();
      yield rt.sleep();
      if ((rt.keydown(13) || rt.keydown(27))) { { pc = 2; continue main; } } else { { pc = 11; continue main; } }
      case 12: // variables
      v_yAttackA = 17; v_xAttackA = 15;
      v_yAttackB = 17; v_xAttackB = 27;
      v_yForeheadA = 15; v_yForeheadB = 15;
      v_yHeadA = 16; v_yHeadB = 16;
      v_yBodyA = 18; v_yBodyB = 18;
      v_yKneeA = 20; v_yKneeB = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      s_direction = "normal";
      s_playerA = "standing";
      s_playerB = "standing";
      s_beheadA = "yes";
      s_beheadB = "yes";
      v_lifeA = 12;
      v_lifeB = 12;
      v_time = 1;
      v_refTime = 1;
      v_waitingA = 1;
      v_waitingB = 1;
      s_entry = "yes";
      v_xA = 1; v_xB = 36;
      s_directionImageA = "normal";
      s_directionImageB = "normal";
      s_aBusy = "no";
      s_bBusy = "no";
      v_spriteAdvanceA = 0;
      v_spriteRetreatA = 0;
      v_spriteAdvanceB = 0;
      v_spriteRetreatB = 0;
      s_bloodA = "no";
      s_bloodB = "no";
      s_snakeA = "yes";
      s_snakeB = "yes";
      v_bloodBeheadingA = 0;
      v_bloodBeheadingB = 0;
      s_launchMusic = "yes";
      v_tick = 1;
      v_yHeadSprite = 111;
      v_xHeadSprite = (v_xA + 3);
      s_gnome = "no";
      v_xGnome = 23;
      v_headNumber = 1;
      v_gnomeNumber = 1;
      s_football = "no";
      s_exitA = "no";
      s_exitB = "no";
      s_protectBodyA = "no";
      s_protectBodyB = "no";
      s_protectHeadA = "no";
      s_protectHeadB = "no";
      s_timeFinished = "no";
      s_gnomePulls = "yes";
      s_bonusA = "no";
      s_bonusB = "no";
      v_infoBStrike = 0;
      v_infoBDamageForehead = 0;
      v_infoBDamageHead = 0;
      v_infoBDamageKnee = 0;
      v_infoAStrike = 0;
      v_infoADamageForehead = 0;
      v_infoADamageHead = 0;
      v_infoADamageKnee = 0;
      s_game = "inProgress";
      s_entryWizard = "no";
      s_soundLaughs = "no";
      s_gnomeLaughs = "no";
      s_finishedLaughing = "no";
      s_transition = "no";
      s_transitionFinished = "no";
      s_attackA = "no";
      s_attackB = "no";
      case 13: // stage
      rt.screen(7);
      rt.cls(undefined, 0);
      if (!((s_stage === "plain"))) { pc = 67; continue main; }
      v_stage = rt.loadimage("C64/stage/plain.gif", 256);
      rt.copypalette(v_stage, undefined);
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      v_background = rt.loadimage("C64/stage/plainBackground.gif", 256);
      v_treeLeft = rt.loadimage("C64/stage/forestTreeLeft.gif", 256);
      v_treeRight = rt.loadimage("C64/stage/forestTreeRight.gif", 256);
      case 67:
      case 66:
      if (!((s_stage === "forest"))) { pc = 69; continue main; }
      v_stage = rt.loadimage("C64/stage/forest.gif", 256);
      rt.copypalette(v_stage, undefined);
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      v_background = rt.loadimage("C64/stage/forestBackground.gif", 256);
      v_treeLeft = rt.loadimage("C64/stage/forestTreeLeft.gif", 256);
      v_treeRight = rt.loadimage("C64/stage/forestTreeRight.gif", 256);
      case 69:
      case 68:
      if (!((s_stage === "throne"))) { pc = 71; continue main; }
      v_stage = rt.loadimage("C64/stage/throne.gif", 256);
      rt.copypalette(v_stage, undefined);
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      v_background = rt.loadimage("C64/stage/throneBackground.gif", 256);
      v_treeLeft = rt.loadimage("C64/stage/arenaTreeLeft.gif", 256);
      v_treeRight = rt.loadimage("C64/stage/arenaTreeRight.gif", 256);
      case 71:
      case 70:
      if (!((s_stage === "arena"))) { pc = 73; continue main; }
      v_stage = rt.loadimage("C64/stage/arena.gif", 256);
      rt.copypalette(v_stage, undefined);
      rt.putimage(v_stage, undefined, undefined, undefined, undefined);
      v_background = rt.loadimage("C64/stage/arenaBackground.gif", 256);
      v_treeLeft = rt.loadimage("C64/stage/arenaTreeLeft.gif", 256);
      v_treeRight = rt.loadimage("C64/stage/arenaTreeRight.gif", 256);
      case 73:
      case 72:
      if ((s_stage === "torture")) {
        v_stage = rt.loadimage("C64/stage/torture.gif", 256);
        rt.copypalette(v_stage, undefined);
        rt.putimage(v_stage, undefined, undefined, undefined, undefined);
        v_background = rt.loadimage("C64/stage/tortureBackground.gif", 256);
        v_treeLeft = rt.loadimage("C64/stage/arenaTreeLeft.gif", 256);
        v_treeRight = rt.loadimage("C64/stage/arenaTreeRight.gif", 256);
      }
      if (!(((s_mode === "solo") && (s_demo === "no")))) { pc = 75; continue main; }
      v_stage = rt.loadimage("C64/stage/1PLR.gif");
      rt.putimage(v_stage, 142, 192, undefined, undefined);
      case 75:
      case 74:
      if (!((s_demo === "yes"))) { pc = 77; continue main; }
      v_stage = rt.loadimage("C64/stage/demo.gif");
      rt.putimage(v_stage, 142, 192, undefined, undefined);
      case 77:
      case 76:
      if (!((s_country === "USA"))) { pc = 79; continue main; }
      v_stage = rt.loadimage("C64/stage/logoDS.gif");
      rt.putimage(v_stage, 48, 0, undefined, undefined);
      case 79:
      case 78:
      rt.font(v_palaceFont);
      rt.printmode(rt.KEEPBACKGROUND);
      rt.color(3, undefined);
      if ((v_scoreA === 0)) { rt.locate(3, 97); rt.print(["00000"], true); }
      if ((v_scoreB === 0)) { rt.locate(3, 185); rt.print(["00000"], true); }
      if ((s_mode === "solo")) { rt.locate(3, 153); rt.print(["0"], true); rt.locate(3, 157); rt.print([v_ai], true); }
      if ((s_mode === "vs")) { rt.locate(3, 149); rt.print([v_countdown], true); }
      rt.printmode(rt.FILLBACKGROUND);
      rt.font(8);
      if (!((v_ai === 0))) { pc = 81; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(138, 70, 174));
      rt.palette(15, 4);
      case 81:
      case 80:
      if (!((v_ai === 1))) { pc = 83; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(104, 169, 65));
      rt.palette(15, 4);
      case 83:
      case 82:
      if (!((v_ai === 2))) { pc = 85; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(144, 95, 37));
      rt.palette(15, 4);
      case 85:
      case 84:
      if (!((v_ai === 3))) { pc = 87; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(62, 49, 162));
      rt.palette(15, 4);
      case 87:
      case 86:
      if (!((v_ai === 4))) { pc = 89; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(122, 191, 199));
      rt.palette(15, 4);
      case 89:
      case 88:
      if (!((v_ai === 5))) { pc = 91; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(137, 64, 54));
      rt.palette(15, 4);
      case 91:
      case 90:
      if (!((v_ai === 6))) { pc = 93; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palettecolor(6, rt.rgb(92, 71, 0));
      rt.palette(15, 4);
      case 93:
      case 92:
      if (!((v_ai === 7))) { pc = 95; continue main; }
      rt.palettecolor(13, rt.rgb(187, 119, 109));
      rt.palette(6, 0);
      rt.palette(15, 4);
      case 95:
      case 94:
      rt.display();
      case 96: // DO
      
      case 14: // start
      if (rt.keydown(27)) { s_stop = "yes"; } else { s_stop = "no"; }
      v_time = (v_time + 1);
      if ((s_game === "won")) { { pc = 15; continue main; } }
      if ((s_playerA === "victory")) { { pc = 18; continue main; } }
      if (!((s_marianna === "yes"))) { pc = 98; continue main; }
      if ((v_xA <= 1)) { s_exitA = "no"; v_xB = 30; s_entry = "yes"; }
      if (!((s_exitA === "no"))) { pc = 100; continue main; }
      if (!((v_xA >= 25))) { pc = 102; continue main; }
      s_playerA = "victory"; v_xA = 25;
      s_aBusy = "yes"; v_refTime = v_time;
      { pc = 18; continue main; }
      case 102:
      case 101:
      case 100:
      case 99:
      { pc = 15; continue main; }
      case 98:
      case 97:
      if (!((s_wizard === "yes"))) { pc = 104; continue main; }
      if (!((v_xA >= 28))) { pc = 106; continue main; }
      s_exitA = "yes"; s_playerA = "standing"; s_aBusy = "no";
      s_playerB = "standing"; v_xB = 39; s_marianna = "yes"; s_wizard = "dead";
      s_bBusy = "yes";
      { pc = 25; continue main; }
      case 106:
      case 105:
      { pc = 15; continue main; }
      case 104:
      case 103:
      if (!((s_bonusA === "yes"))) { pc = 108; continue main; }
      v_scoreA = (v_scoreA + 10); v_countdown = (v_countdown - 1);
      if (!((v_countdown <= 0))) { pc = 110; continue main; }
      v_countdown = 0; v_scoreA = (v_scoreA - 10);
      if ((v_xB >= 37)) { s_exitA = "yes"; s_aBusy = "no"; }
      case 110:
      case 109:
      case 108:
      case 107:
      if (!((s_bonusB === "yes"))) { pc = 112; continue main; }
      v_scoreB = (v_scoreB + 10); v_countdown = (v_countdown - 1);
      if (!((v_countdown <= 0))) { pc = 114; continue main; }
      v_countdown = 0; v_scoreB = (v_scoreB - 10);
      if ((v_xA >= 37)) { s_exitB = "yes"; s_bBusy = "no"; }
      case 114:
      case 113:
      case 112:
      case 111:
      if (!((s_entry === "yes"))) { pc = 116; continue main; }
      if (((v_xA >= 13) || (v_xB <= 22))) { s_entry = "no"; }
      case 116:
      case 115:
      if (!((s_exitA === "yes"))) { pc = 118; continue main; }
      if (!((s_timeFinished === "no"))) { pc = 120; continue main; }
      if (!(((v_xA < 2) && (v_xB >= 37)))) { pc = 122; continue main; }
      if ((s_transition === "no")) { yield rt.sleep(1); }
      if (!((s_mode === "solo"))) { pc = 124; continue main; }
      if (!((s_demo === "yes"))) { pc = 126; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("CPC/sound/nothing.ogg"); }
      v_scoreA = 0; v_scoreB = 0; { pc = 2; continue main; }
      case 126:
      case 125:
      if ((s_transition === "yes")) { { pc = 18; continue main; } }
      if ((v_ai === 7)) { s_transitionFinished = "yes"; }
      if ((s_transitionFinished === "yes")) { v_ai = (v_ai + 1); }
      if (!((v_ai > 7))) { pc = 128; continue main; }
      v_ai = 7; s_wizard = "yes";
      s_direction = "normal";
      s_playerB = "wizard"; s_playerA = "standing";
      v_xA = 1; v_xB = 33;
      s_entry = "no"; s_exitA = "no";
      s_entryWizard = "yes";
      s_bBusy = "yes"; s_aBusy = "no";
      v_refTimeB = v_time;
      { pc = 18; continue main; }
      case 128:
      case 127:
      if (!((s_transitionFinished === "yes"))) { pc = 130; continue main; }
      if ((s_stage === "throne")) { s_stage = "arena"; { pc = 12; continue main; } }
      if ((s_stage === "arena")) { s_stage = "throne"; { pc = 12; continue main; } }
      case 130:
      case 129:
      if ((s_wizard === "no")) { s_transition = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((s_wizard === "yes")) { { pc = 12; continue main; } }
      case 124:
      case 123:
      if (!((s_mode === "vs"))) { pc = 132; continue main; }
      if ((s_transition === "yes")) { { pc = 18; continue main; } }
      if (!((s_transitionFinished === "yes"))) { pc = 134; continue main; }
      v_countdown = 60;
      if ((s_stage === "throne")) { s_stage = "arena"; { pc = 12; continue main; } }
      if ((s_stage === "arena")) { s_stage = "throne"; { pc = 12; continue main; } }
      if ((s_stage === "plain")) { s_stage = "forest"; { pc = 12; continue main; } }
      if ((s_stage === "forest")) { s_stage = "plain"; { pc = 12; continue main; } }
      if ((s_stage === "torture")) { { pc = 12; continue main; } }
      case 134:
      case 133:
      s_transition = "yes"; v_refTime = v_time; { pc = 18; continue main; }
      case 132:
      case 131:
      case 122:
      case 121:
      case 120:
      case 119:
      if (!((s_timeFinished === "yes"))) { pc = 136; continue main; }
      if (!((s_direction === "normal"))) { pc = 138; continue main; }
      if (!(((v_xA < 2) && (v_xB >= 37)))) { pc = 140; continue main; }
      yield rt.sleep(1);
      v_countdown = 60;
      { pc = 12; continue main; }
      case 140:
      case 139:
      case 138:
      case 137:
      if (!((s_direction === "reverse"))) { pc = 142; continue main; }
      if (!(((v_xB < 2) && (v_xA >= 37)))) { pc = 144; continue main; }
      yield rt.sleep(1);
      v_countdown = 60;
      { pc = 12; continue main; }
      case 144:
      case 143:
      case 142:
      case 141:
      case 136:
      case 135:
      { pc = 16; continue main; }
      case 118:
      case 117:
      if (!((s_exitB === "yes"))) { pc = 146; continue main; }
      if (!((s_timeFinished === "no"))) { pc = 148; continue main; }
      if (!(((v_xA >= 37) && (v_xB >= 37)))) { pc = 150; continue main; }
      if ((s_transition === "no")) { yield rt.sleep(1); }
      if (!((s_mode === "solo"))) { pc = 152; continue main; }
      if (!((s_demo === "yes"))) { pc = 154; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("CPC/sound/nothing.ogg"); }
      v_scoreA = 0; v_scoreB = 0; { pc = 2; continue main; }
      case 154:
      case 153:
      if (!((s_stage === "throne"))) { pc = 156; continue main; }
      v_ai = 0; v_scoreA = 0; v_scoreB = 0;
      { pc = 12; continue main; }
      case 156:
      case 155:
      if (!((s_stage === "arena"))) { pc = 158; continue main; }
      if ((s_transition === "yes")) { { pc = 18; continue main; } }
      if (!((s_transitionFinished === "yes"))) { pc = 160; continue main; }
      v_ai = 0; v_scoreA = 0; v_scoreB = 0;
      s_stage = "throne"; { pc = 12; continue main; }
      case 160:
      case 159:
      if ((s_wizard === "no")) { s_transition = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((s_wizard === "yes")) { { pc = 12; continue main; } }
      case 158:
      case 157:
      case 152:
      case 151:
      if (!((s_mode === "vs"))) { pc = 162; continue main; }
      if ((s_transition === "yes")) { { pc = 18; continue main; } }
      if (!((s_transitionFinished === "yes"))) { pc = 164; continue main; }
      v_countdown = 60;
      if ((s_stage === "throne")) { s_stage = "arena"; { pc = 12; continue main; } }
      if ((s_stage === "arena")) { s_stage = "throne"; { pc = 12; continue main; } }
      if ((s_stage === "plain")) { s_stage = "forest"; { pc = 12; continue main; } }
      if ((s_stage === "forest")) { s_stage = "plain"; { pc = 12; continue main; } }
      if ((s_stage === "torture")) { { pc = 12; continue main; } }
      case 164:
      case 163:
      s_transition = "yes"; v_refTime = v_time; { pc = 18; continue main; }
      case 162:
      case 161:
      case 150:
      case 149:
      case 148:
      case 147:
      { pc = 23; continue main; }
      case 146:
      case 145:
      if ((s_gnome === "yes")) { { pc = 35; continue main; } }
      case 15: // damage
      if (!((s_wizard === "yes"))) { pc = 166; continue main; }
      if (!((v_xA > 6))) { pc = 168; continue main; }
      if (!(((v_xAttackB <= v_xHeadA) && (v_xAttackB >= (v_xHeadA - 2))))) { pc = 170; continue main; }
      if (!((v_yAttackB === v_yHeadA))) { pc = 172; continue main; }
      s_gnome = "no";
      if ((s_game === "lost")) { { pc = 18; continue main; } }
      s_playerA = "deadWizard"; s_aBusy = "yes"; v_refTime = v_time; s_bloodA = "no";
      s_playerB = "wizardFinished"; s_bBusy = "yes"; v_refTimeB = v_time; s_bloodB = "no";
      s_game = "lost";
      { pc = 18; continue main; }
      case 172:
      case 171:
      case 170:
      case 169:
      if (!(((v_xAttackB <= v_xKneeA) && (v_xAttackB >= (v_xKneeA - 2))))) { pc = 174; continue main; }
      if (!((v_yAttackB === v_yKneeA))) { pc = 176; continue main; }
      s_gnome = "no";
      if ((s_game === "lost")) { { pc = 18; continue main; } }
      s_playerA = "deadWizard"; s_aBusy = "yes"; v_refTime = v_time; s_bloodA = "no";
      s_playerB = "wizardFinished"; s_bBusy = "yes"; v_refTimeB = v_time; s_bloodB = "no";
      s_game = "lost";
      { pc = 18; continue main; }
      case 176:
      case 175:
      case 174:
      case 173:
      case 168:
      case 167:
      if ((s_aBusy === "yes")) { { pc = 18; continue main; } }
      s_bloodA = "no";
      { pc = 16; continue main; }
      case 166:
      case 165:
      if (!((s_direction === "normal"))) { pc = 178; continue main; }
      if (!((v_xA < v_xB))) { pc = 180; continue main; }
      if (!(((v_xAttackB <= v_xForeheadA) && (v_yAttackB === v_yForeheadA)))) { pc = 182; continue main; }
      if ((s_playerA === "protectHead")) { s_playerA = "clingHead"; { pc = 18; continue main; } }
      s_playerA = "fall"; v_infoADamageForehead = (v_infoADamageForehead + 1); { pc = 18; continue main; }
      case 182:
      case 181:
      if (!(((v_xAttackB <= v_xHeadA) && (v_yAttackB === v_yHeadA)))) { pc = 184; continue main; }
      if ((s_playerB === "headButt")) { s_playerA = "fall"; { pc = 18; continue main; } }
      s_playerA = "hit"; v_scoreB = (v_scoreB + 250); v_infoADamageHead = (v_infoADamageHead + 1); { pc = 18; continue main; }
      case 184:
      case 183:
      if (!(((v_xAttackB <= v_xBodyA) && (v_yAttackB === v_yBodyA)))) { pc = 186; continue main; }
      if ((s_playerA === "protectBody")) { s_playerA = "clingBody"; { pc = 18; continue main; } }
      s_playerA = "hit"; v_scoreB = (v_scoreB + 250); { pc = 18; continue main; }
      case 186:
      case 185:
      if (!(((v_xAttackB <= v_xKneeA) && (v_yAttackB === v_yKneeA)))) { pc = 188; continue main; }
      if ((s_playerB === "spider")) { s_playerA = "fall"; { pc = 18; continue main; } }
      if ((s_playerB === "rollForward")) { s_playerA = "fall"; { pc = 18; continue main; } }
      if ((s_playerA === "protectBody")) { s_playerA = "clingBody"; { pc = 18; continue main; } }
      if ((s_playerB === "kick")) { s_playerA = "fall"; v_infoADamageKnee = (v_infoADamageKnee + 1); { pc = 18; continue main; } }
      s_playerA = "hit"; v_scoreB = (v_scoreB + 100); v_infoADamageKnee = (v_infoADamageKnee + 1); { pc = 18; continue main; }
      case 188:
      case 187:
      case 180:
      case 179:
      case 178:
      case 177:
      if (!((s_direction === "reverse"))) { pc = 190; continue main; }
      if (!((v_xA > v_xB))) { pc = 192; continue main; }
      if (!(((v_xAttackB >= v_xForeheadA) && (v_yAttackB === v_yForeheadA)))) { pc = 194; continue main; }
      if ((s_playerA === "protectHeadRev")) { s_playerA = "clingHead"; { pc = 18; continue main; } }
      s_playerA = "fallRev"; { pc = 18; continue main; }
      case 194:
      case 193:
      if (!(((v_xAttackB >= v_xHeadA) && (v_yAttackB === v_yHeadA)))) { pc = 196; continue main; }
      if ((s_playerB === "headButtRev")) { s_playerA = "fallRev"; { pc = 18; continue main; } }
      s_playerA = "hitRev"; v_scoreB = (v_scoreB + 250); v_infoADamageHead = (v_infoADamageHead + 1); { pc = 18; continue main; }
      case 196:
      case 195:
      if (!(((v_xAttackB >= v_xBodyA) && (v_yAttackB === v_yBodyA)))) { pc = 198; continue main; }
      if ((s_playerA === "protectBodyRev")) { s_playerA = "clingBody"; { pc = 18; continue main; } }
      s_playerA = "hitRev"; v_scoreB = (v_scoreB + 250); { pc = 18; continue main; }
      case 198:
      case 197:
      if (!(((v_xAttackB >= v_xKneeA) && (v_yAttackB === v_yKneeA)))) { pc = 200; continue main; }
      if ((s_playerB === "spiderRev")) { s_playerA = "fallRev"; { pc = 18; continue main; } }
      if ((s_playerB === "rollForwardRev")) { s_playerA = "fallRev"; { pc = 18; continue main; } }
      if ((s_playerA === "protectBodyRev")) { s_playerA = "clingBody"; { pc = 18; continue main; } }
      if ((s_playerB === "kickRev")) { s_playerA = "fallRev"; { pc = 18; continue main; } }
      s_playerA = "hitRev"; v_scoreB = (v_scoreB + 100); v_infoADamageKnee = (v_infoADamageKnee + 1); { pc = 18; continue main; }
      case 200:
      case 199:
      case 192:
      case 191:
      case 190:
      case 189:
      if ((s_aBusy === "yes")) { { pc = 18; continue main; } }
      s_bloodA = "no";
      case 16: // keyboard
      v_x1 = 7; v_y1 = 7;
      s_stick1 = "neutral";
      if (!((s_demo === "no"))) { pc = 202; continue main; }
      if ((rt.keydown(18432) || (rt.stick(1) < 65))) { v_y1 = (v_y1 - 1); }
      if ((rt.keydown(20480) || (rt.stick(1) > 190))) { v_y1 = (v_y1 + 1); }
      if ((rt.keydown(19712) || (rt.stick(0) > 190))) { v_x1 = (v_x1 + 1); }
      if ((rt.keydown(19200) || (rt.stick(0) < 65))) { v_x1 = (v_x1 - 1); }
      if ((rt.keydown(100303) || (rt.strig(1) === (-1)))) { s_attackA = "yes"; } else { s_attackA = "no"; }
      if (rt.keydown(118)) { s_version = "yes"; } else { s_version = "no"; }
      if ((v_y1 > 9)) { v_y1 = 9; }
      if ((v_y1 < 5)) { v_y1 = 5; }
      if ((v_x1 > 9)) { v_x1 = 9; }
      if ((v_x1 < 5)) { v_x1 = 5; }
      if (!((s_direction === "normal"))) { pc = 204; continue main; }
      if ((((v_x1 <= 6) && (v_y1 <= 6)))) { s_stick1 = "upLeft"; }
      if ((((v_x1 >= 8) && (v_y1 <= 6)))) { s_stick1 = "upRight"; }
      if ((((v_x1 <= 6) && (v_y1 >= 8)))) { s_stick1 = "downLeft"; }
      if ((((v_x1 >= 8) && (v_y1 >= 8)))) { s_stick1 = "downRight"; }
      if ((((v_x1 <= 6) && (v_y1 === 7)))) { s_stick1 = "left"; }
      if ((((v_x1 >= 8) && (v_y1 === 7)))) { s_stick1 = "right"; }
      if ((((v_x1 === 7) && (v_y1 >= 8)))) { s_stick1 = "down"; }
      if ((((v_x1 === 7) && (v_y1 <= 6)))) { s_stick1 = "up"; }
      case 204:
      case 203:
      if (!((s_direction === "reverse"))) { pc = 206; continue main; }
      if ((((v_x1 <= 6) && (v_y1 <= 6)))) { s_stick1 = "upRight"; }
      if ((((v_x1 >= 8) && (v_y1 <= 6)))) { s_stick1 = "upLeft"; }
      if ((((v_x1 <= 6) && (v_y1 >= 8)))) { s_stick1 = "downRight"; }
      if ((((v_x1 >= 8) && (v_y1 >= 8)))) { s_stick1 = "downLeft"; }
      if ((((v_x1 <= 6) && (v_y1 === 7)))) { s_stick1 = "left"; }
      if ((((v_x1 >= 8) && (v_y1 === 7)))) { s_stick1 = "right"; }
      if ((((v_x1 === 7) && (v_y1 >= 8)))) { s_stick1 = "down"; }
      if ((((v_x1 === 7) && (v_y1 <= 6)))) { s_stick1 = "up"; }
      case 206:
      case 205:
      case 202:
      case 201:
      if (!((s_entry === "yes"))) { pc = 208; continue main; }
      if (!((s_repeatMusic === "no"))) { pc = 210; continue main; }
      if ((s_launchMusic === "yes")) { rt.sndplayfile("C64/sound/intro.wav"); s_launchMusic = "no"; }
      case 210:
      case 209:
      s_stick1 = "right"; { pc = 17; continue main; }
      case 208:
      case 207:
      if (!((s_exitA === "yes"))) { pc = 212; continue main; }
      if (!((s_timeFinished === "yes"))) { pc = 214; continue main; }
      if ((s_direction === "reverse")) { s_stick1 = "right"; { pc = 17; continue main; } }
      case 214:
      case 213:
      s_direction = "normal"; s_stick1 = "left"; { pc = 17; continue main; }
      case 212:
      case 211:
      if (!((s_entryWizard === "yes"))) { pc = 216; continue main; }
      if ((v_xA >= 4)) { s_entryWizard = "no"; { pc = 18; continue main; } }
      s_stick1 = "right"; { pc = 17; continue main; }
      case 216:
      case 215:
      if (!((s_demo === "yes"))) { pc = 218; continue main; }
      if (!((s_direction === "normal"))) { pc = 220; continue main; }
      v_distance = (v_xB - v_xA);
      if (!((v_distance >= 15))) { pc = 222; continue main; }
      s_playerA = "rollForward"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; }
      case 222:
      case 221:
      if (((v_distance === 12) && (s_playerB === "standing"))) { s_playerA = "behead"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if (!((v_distance === 9))) { pc = 224; continue main; }
      if ((v_waitingB > 50)) { s_playerA = "behead"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((s_playerB === "rollBack")) { s_playerA = "knee"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((s_bBusy === "yes")) { s_playerA = "rollForward"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 224:
      case 223:
      if (!(((v_distance < 9) && (v_distance > 6)))) { pc = 226; continue main; }
      if ((s_playerB === "rollBack")) { s_playerA = "knee"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((s_stick2 === "left")) { s_playerA = "spider"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((s_playerB === "forehead")) { s_playerA = "protectHead"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((v_infoADamageKnee > 4))) { pc = 228; continue main; }
      if (((s_playerB === "sit2") || (s_playerB === "knee"))) { s_playerA = "knee"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 228:
      case 227:
      if (!((v_infoADamageKnee > 2))) { pc = 230; continue main; }
      if (((s_playerB === "sit2") || (s_playerB === "knee"))) { s_playerA = "rollForward"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 230:
      case 229:
      if (!((v_infoADamageHead > 2))) { pc = 232; continue main; }
      if ((s_playerB === "neck")) { s_playerA = "knee"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 232:
      case 231:
      if (!((v_infoADamageForehead > 2))) { pc = 234; continue main; }
      if ((s_playerB === "forehead")) { s_playerA = "rollForward"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 234:
      case 233:
      if ((v_infoAStrike === 0)) { s_playerA = "bodyChop"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 1)) { s_playerA = "forehead"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 2)) { s_playerA = "spider"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 3)) { s_playerA = "spider"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 4)) { s_playerA = "neck"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 5)) { s_stick1 = "left"; v_infoAStrike = 0; { pc = 17; continue main; } }
      case 226:
      case 225:
      if (!((v_distance <= 6))) { pc = 236; continue main; }
      if ((s_playerB === "bodyChop")) { s_playerA = "protectBody"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((v_infoADamageKnee > 4))) { pc = 238; continue main; }
      if (((s_playerB === "sit2") || (s_playerB === "knee"))) { s_playerA = "knee"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 238:
      case 237:
      if (!((v_infoADamageKnee > 2))) { pc = 240; continue main; }
      if ((s_playerB === "kick")) { s_playerA = "rollForward"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if (((s_playerB === "sit2") || (s_playerB === "knee"))) { s_playerA = "rollForward"; v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      case 240:
      case 239:
      if ((v_infoAStrike === 0)) { s_playerA = "kick"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 1)) { s_playerA = "headButt"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 2)) { s_playerA = "spider"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 3)) { s_playerA = "knee"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 4)) { s_playerA = "knee"; v_infoAStrike = (v_infoAStrike + 1); v_refTime = v_time; s_aBusy = "yes"; { pc = 18; continue main; } }
      if ((v_infoAStrike === 5)) { s_stick1 = "left"; v_infoAStrike = 0; { pc = 17; continue main; } }
      case 236:
      case 235:
      case 220:
      case 219:
      if ((s_direction === "reverse")) { { pc = 2; continue main; } }
      case 218:
      case 217:
      if ((s_stick1 === "upLeft")) { { pc = 17; continue main; } }
      if ((s_stick1 === "upRight")) { { pc = 17; continue main; } }
      if ((s_stick1 === "downLeft")) { { pc = 17; continue main; } }
      if ((s_stick1 === "downRight")) { { pc = 17; continue main; } }
      if ((s_stick1 === "down")) { { pc = 17; continue main; } }
      if ((s_stick1 === "up")) { { pc = 17; continue main; } }
      if ((s_stick1 === "left")) { { pc = 17; continue main; } }
      if ((s_stick1 === "right")) { { pc = 17; continue main; } }
      v_spriteAdvanceA = 0;
      v_spriteRetreatA = 0;
      s_protectBodyA = "no"; s_protectHeadA = "no";
      v_waitingA = (v_waitingA + 1);
      s_stick1 = "neutral";
      s_sitA = "no";
      if ((s_playerA === "sit2")) { s_playerA = "standUp"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((s_playerA === "sit2Rev")) { s_playerA = "standUpRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((s_direction === "normal"))) { pc = 242; continue main; }
      if ((v_waitingA > 250)) { s_playerA = "waiting"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      case 242:
      case 241:
      if (!((s_direction === "reverse"))) { pc = 244; continue main; }
      if ((v_waitingA > 250)) { s_playerA = "waitingRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      case 244:
      case 243:
      if ((s_direction === "normal")) { s_playerA = "standing"; }
      if ((s_direction === "reverse")) { s_playerA = "standingRev"; }
      { pc = 18; continue main; }
      case 17: // action
      v_waitingA = 1;
      if (!((s_direction === "normal"))) { pc = 246; continue main; }
      if (!((s_stick1 === "right"))) { pc = 248; continue main; }
      s_protectBodyA = "no";
      if ((v_spriteAdvanceA === 1)) { s_playerA = "advance1"; { pc = 18; continue main; } }
      if ((v_spriteAdvanceA === 2)) { s_playerA = "advance2"; { pc = 18; continue main; } }
      if ((v_spriteAdvanceA === 3)) { s_playerA = "advance3"; { pc = 18; continue main; } }
      if ((v_spriteAdvanceA === 4)) { s_playerA = "advance4"; { pc = 18; continue main; } }
      s_playerA = "advance"; v_refTime = v_time;
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_entry === "no"))) { s_playerA = "bodyChop"; s_aBusy = "yes"; v_refTime = v_time; }
      case 248:
      case 247:
      if (!((s_stick1 === "left"))) { pc = 250; continue main; }
      s_protectHeadA = "no";
      if ((v_spriteRetreatA === 1)) { s_playerA = "retreat1"; { pc = 18; continue main; } }
      if ((v_spriteRetreatA === 2)) { s_playerA = "retreat2"; { pc = 18; continue main; } }
      if ((v_spriteRetreatA === 3)) { s_playerA = "retreat3"; { pc = 18; continue main; } }
      if ((v_spriteRetreatA === 4)) { s_playerA = "retreat4"; { pc = 18; continue main; } }
      s_playerA = "retreat"; v_refTime = v_time;
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_exitA === "no"))) { s_playerA = "behead"; s_aBusy = "yes"; v_refTime = v_time; }
      case 250:
      case 249:
      case 246:
      case 245:
      if (!((s_direction === "reverse"))) { pc = 252; continue main; }
      if (!((s_stick1 === "right"))) { pc = 254; continue main; }
      s_protectHeadA = "no";
      if ((v_spriteRetreatA === 1)) { s_playerA = "retreat1Rev"; { pc = 18; continue main; } }
      if ((v_spriteRetreatA === 2)) { s_playerA = "retreat2Rev"; { pc = 18; continue main; } }
      if ((v_spriteRetreatA === 3)) { s_playerA = "retreat3Rev"; { pc = 18; continue main; } }
      if ((v_spriteRetreatA === 4)) { s_playerA = "retreat4Rev"; { pc = 18; continue main; } }
      s_playerA = "retreatRev"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "beheadRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 254:
      case 253:
      if (!((s_stick1 === "left"))) { pc = 256; continue main; }
      s_protectBodyA = "no";
      if ((v_spriteAdvanceA === 1)) { s_playerA = "advance1Rev"; { pc = 18; continue main; } }
      if ((v_spriteAdvanceA === 2)) { s_playerA = "advance2Rev"; { pc = 18; continue main; } }
      if ((v_spriteAdvanceA === 3)) { s_playerA = "advance3Rev"; { pc = 18; continue main; } }
      if ((v_spriteAdvanceA === 4)) { s_playerA = "advance4Rev"; { pc = 18; continue main; } }
      s_playerA = "advanceRev"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "bodyChopRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 256:
      case 255:
      case 252:
      case 251:
      if (!((s_direction === "normal"))) { pc = 258; continue main; }
      if (!((s_stick1 === "up"))) { pc = 260; continue main; }
      s_protectBodyA = "no"; s_protectHeadA = "no";
      s_playerA = "jump"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; }
      case 260:
      case 259:
      case 258:
      case 257:
      if (!((s_direction === "reverse"))) { pc = 262; continue main; }
      if (!((s_stick1 === "up"))) { pc = 264; continue main; }
      s_protectBodyA = "no"; s_protectHeadA = "no";
      s_playerA = "jumpRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; }
      case 264:
      case 263:
      case 262:
      case 261:
      if (!((s_direction === "normal"))) { pc = 266; continue main; }
      if (!((s_stick1 === "down"))) { pc = 268; continue main; }
      if ((s_sitA === "yes")) { s_playerA = "sit2"; { pc = 18; continue main; } }
      s_playerA = "sit"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; }
      case 268:
      case 267:
      case 266:
      case 265:
      if (!((s_direction === "reverse"))) { pc = 270; continue main; }
      if (!((s_stick1 === "down"))) { pc = 272; continue main; }
      if ((s_sitA === "yes")) { s_playerA = "sit2Rev"; { pc = 18; continue main; } }
      s_playerA = "sitRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; }
      case 272:
      case 271:
      case 270:
      case 269:
      if (!((s_direction === "normal"))) { pc = 274; continue main; }
      if (!((s_stick1 === "downRight"))) { pc = 276; continue main; }
      s_playerA = "rollForward"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "kick"; s_aBusy = "yes"; v_refTime = v_time; }
      case 276:
      case 275:
      case 274:
      case 273:
      if (!((s_direction === "reverse"))) { pc = 278; continue main; }
      if (!((s_stick1 === "downRight"))) { pc = 280; continue main; }
      s_playerA = "rollForwardRev"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "kickRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 280:
      case 279:
      case 278:
      case 277:
      if (!((s_direction === "normal"))) { pc = 282; continue main; }
      if (!((s_stick1 === "downLeft"))) { pc = 284; continue main; }
      s_playerA = "rollBack"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "forehead"; s_aBusy = "yes"; v_refTime = v_time; }
      case 284:
      case 283:
      case 282:
      case 281:
      if (!((s_direction === "reverse"))) { pc = 286; continue main; }
      if (!((s_stick1 === "downLeft"))) { pc = 288; continue main; }
      s_playerA = "rollBackRev"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "foreheadRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 288:
      case 287:
      case 286:
      case 285:
      if (!((s_direction === "normal"))) { pc = 290; continue main; }
      if (!((s_stick1 === "upLeft"))) { pc = 292; continue main; }
      if ((s_protectHeadA === "yes")) { s_playerA = "protectHead"; { pc = 18; continue main; } }
      s_playerA = "protectHead1"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "spider"; s_aBusy = "yes"; v_refTime = v_time; }
      case 292:
      case 291:
      case 290:
      case 289:
      if (!((s_direction === "reverse"))) { pc = 294; continue main; }
      if (!((s_stick1 === "upLeft"))) { pc = 296; continue main; }
      if ((s_protectHeadA === "yes")) { s_playerA = "protectHeadRev"; { pc = 18; continue main; } }
      s_playerA = "protectHeadRev1"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "spiderRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 296:
      case 295:
      case 294:
      case 293:
      if (!((s_direction === "normal"))) { pc = 298; continue main; }
      if (!((s_stick1 === "upRight"))) { pc = 300; continue main; }
      if ((s_protectBodyA === "yes")) { s_playerA = "protectBody"; { pc = 18; continue main; } }
      s_playerA = "protectBody1"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "headButt"; s_aBusy = "yes"; v_refTime = v_time; }
      case 300:
      case 299:
      case 298:
      case 297:
      if (!((s_direction === "reverse"))) { pc = 302; continue main; }
      if (!((s_stick1 === "upRight"))) { pc = 304; continue main; }
      if ((s_protectBodyA === "yes")) { s_playerA = "protectBodyRev"; { pc = 18; continue main; } }
      s_playerA = "protectBodyRev1"; s_aBusy = "yes"; v_refTime = v_time;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "headButtRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 304:
      case 303:
      case 302:
      case 301:
      case 18: // state
      if (!((s_playerA === "waiting"))) { pc = 306; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      if ((v_time > (v_refTime + 50))) { s_aBusy = "no"; v_waitingA = 1; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 37))) { s_spriteA = "waiting1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "waiting2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { s_spriteA = "waiting3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "waiting2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 7))) { s_spriteA = "waiting1"; { pc = 22; continue main; } }
      case 306:
      case 305:
      if (!((s_playerA === "waitingRev"))) { pc = 308; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if ((v_time > (v_refTime + 50))) { s_aBusy = "no"; v_waitingA = 1; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 37))) { s_spriteA = "waiting1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "waiting2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { s_spriteA = "waiting3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "waiting2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 7))) { s_spriteA = "waiting1Rev"; { pc = 22; continue main; } }
      case 308:
      case 307:
      if (!((s_playerA === "standing"))) { pc = 310; continue main; }
      s_spriteA = "standing";
      s_beheadA = "yes";
      s_bloodA = "no";
      v_xAttackA = v_xA; v_yAttackA = 14;
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      if (!((s_demo === "yes"))) { pc = 312; continue main; }
      if ((v_time > (v_refTime + 20))) { s_aBusy = "no"; }
      case 312:
      case 311:
      case 310:
      case 309:
      if (!((s_playerA === "standingRev"))) { pc = 314; continue main; }
      s_spriteA = "standingRev";
      s_beheadA = "yes";
      s_bloodA = "no";
      v_xAttackA = (v_xForeheadA + 4); v_yAttackA = 14;
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      case 314:
      case 313:
      if (!((s_playerA === "advance"))) { pc = 316; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_entry === "no"))) { s_playerA = "bodyChop"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      s_spriteA = "walk1"; v_spriteAdvanceA = 1; v_xA = (v_xA + 1);
      case 316:
      case 315:
      if (!((s_playerA === "advance1"))) { pc = 318; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_entry === "no"))) { s_playerA = "bodyChop"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 9))) { v_xA = (v_xA + 1); s_spriteA = "walk2"; v_spriteAdvanceA = 2; }
      case 318:
      case 317:
      if (!((s_playerA === "advance2"))) { pc = 320; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      s_spriteA = "walk2";
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_entry === "no"))) { s_playerA = "bodyChop"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xA = (v_xA + 1); s_spriteA = "walk3"; v_spriteAdvanceA = 3; }
      case 320:
      case 319:
      if (!((s_playerA === "advance3"))) { pc = 322; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      s_spriteA = "walk3";
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_entry === "no"))) { s_playerA = "bodyChop"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 27))) { v_xA = (v_xA + 1); s_spriteA = "standing"; v_spriteAdvanceA = 4; }
      case 322:
      case 321:
      if (!((s_playerA === "advance4"))) { pc = 324; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      s_spriteA = "standing";
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_entry === "no"))) { s_playerA = "bodyChop"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 36))) { s_playerA = "standing"; v_refTime = v_time; v_spriteAdvanceA = 0; }
      case 324:
      case 323:
      if (!((s_playerA === "advanceRev"))) { pc = 326; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "bodyChopRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      s_spriteA = "walk1Rev"; v_spriteAdvanceA = 1; v_xA = (v_xA - 1);
      case 326:
      case 325:
      if (!((s_playerA === "advance1Rev"))) { pc = 328; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "bodyChopRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 9))) { v_xA = (v_xA - 1); s_spriteA = "walk2Rev"; v_spriteAdvanceA = 2; }
      case 328:
      case 327:
      if (!((s_playerA === "advance2Rev"))) { pc = 330; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      s_spriteA = "walk2Rev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "bodyChopRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xA = (v_xA - 1); s_spriteA = "walk3Rev"; v_spriteAdvanceA = 3; }
      case 330:
      case 329:
      if (!((s_playerA === "advance3Rev"))) { pc = 332; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      s_spriteA = "walk3Rev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "bodyChopRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 27))) { v_xA = (v_xA - 1); s_spriteA = "standingRev"; v_spriteAdvanceA = 4; }
      case 332:
      case 331:
      if (!((s_playerA === "advance4Rev"))) { pc = 334; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      s_spriteA = "standingRev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "bodyChopRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 36))) { s_playerA = "standingRev"; v_refTime = v_time; v_spriteAdvanceA = 0; }
      case 334:
      case 333:
      if (!((s_playerA === "retreat"))) { pc = 336; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_exitA === "no"))) { s_playerA = "behead"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      s_spriteA = "walk3"; v_spriteRetreatA = 1; v_xA = (v_xA - 1);
      case 336:
      case 335:
      if (!((s_playerA === "retreat1"))) { pc = 338; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_exitA === "no"))) { s_playerA = "behead"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 9))) { v_xA = (v_xA - 1); s_spriteA = "walk2"; v_spriteRetreatA = 2; }
      case 338:
      case 337:
      if (!((s_playerA === "retreat2"))) { pc = 340; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      s_spriteA = "walk2";
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_exitA === "no"))) { s_playerA = "behead"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xA = (v_xA - 1); s_spriteA = "walk1"; v_spriteRetreatA = 3; }
      case 340:
      case 339:
      if (!((s_playerA === "retreat3"))) { pc = 342; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      s_spriteA = "walk1";
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_exitA === "no"))) { s_playerA = "behead"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 27))) { v_xA = (v_xA - 1); s_spriteA = "standing"; v_spriteRetreatA = 4; }
      case 342:
      case 341:
      if (!((s_playerA === "retreat4"))) { pc = 344; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      s_spriteA = "standing";
      if ((((s_attackA === "yes") && (s_demo === "no")) && (s_exitA === "no"))) { s_playerA = "behead"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 36))) { s_playerA = "standing"; v_refTime = v_time; v_spriteRetreatA = 0; }
      case 344:
      case 343:
      if (!((s_playerA === "retreatRev"))) { pc = 346; continue main; }
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "beheadRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      s_spriteA = "walk3Rev"; v_spriteRetreatA = 1; v_xA = (v_xA + 1);
      case 346:
      case 345:
      if (!((s_playerA === "retreat1Rev"))) { pc = 348; continue main; }
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "beheadRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 9))) { v_xA = (v_xA + 1); s_spriteA = "walk2Rev"; v_spriteRetreatA = 2; }
      case 348:
      case 347:
      if (!((s_playerA === "retreat2Rev"))) { pc = 350; continue main; }
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_spriteA = "walk2Rev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "beheadRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xA = (v_xA + 1); s_spriteA = "walk1Rev"; v_spriteRetreatA = 3; }
      case 350:
      case 349:
      if (!((s_playerA === "retreat3Rev"))) { pc = 352; continue main; }
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_spriteA = "walk1Rev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "beheadRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 27))) { v_xA = (v_xA + 1); s_spriteA = "standingRev"; v_spriteRetreatA = 4; }
      case 352:
      case 351:
      if (!((s_playerA === "retreat4Rev"))) { pc = 354; continue main; }
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_spriteA = "standingRev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "beheadRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 36))) { s_playerA = "standingRev"; v_refTime = v_time; v_spriteRetreatA = 0; }
      case 354:
      case 353:
      if (!((s_playerA === "jump"))) { pc = 356; continue main; }
      v_xAttackA = v_xA; v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      s_beheadA = "no";
      v_yKneeA = v_yBodyA; v_yAttackA = 14;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "neck"; s_aBusy = "yes"; v_refTime = v_time; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "standing"; v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "jump1"; v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 1); s_beheadA = "yes"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 13))) { s_spriteA = "jump2"; v_xBodyA = (v_xA + 1); v_xKneeA = (v_xA + 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { s_spriteA = "jump1"; v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 1); }
      s_spriteA = "jump1";
      case 356:
      case 355:
      if (!((s_playerA === "jumpRev"))) { pc = 358; continue main; }
      v_xAttackA = (v_xA + 4); v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_beheadA = "no";
      v_yKneeA = v_yBodyA; v_yAttackA = 14;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "neckRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "standingRev"; v_xBodyA = v_xA; v_xKneeA = v_xA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "jump1Rev"; v_xBodyA = v_xA; v_xKneeA = (v_xA + 1); s_beheadA = "yes"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 13))) { s_spriteA = "jump2Rev"; v_xBodyA = (v_xA + 3); v_xKneeA = (v_xA + 3); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { s_spriteA = "jump1Rev"; v_xBodyA = v_xA; v_xKneeA = (v_xA + 3); }
      s_spriteA = "jump1Rev";
      case 358:
      case 357:
      if (!((s_playerA === "sit"))) { pc = 360; continue main; }
      v_xAttackA = v_xA;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = (v_xA + 4);
      s_spriteA = "sit1";
      if ((v_time > (v_refTime + 10))) { s_playerA = "sit2"; { pc = 22; continue main; } }
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "knee"; s_aBusy = "yes"; v_refTime = v_time; }
      case 360:
      case 359:
      if (!((s_playerA === "sit2"))) { pc = 362; continue main; }
      s_aBusy = "no";
      s_sitA = "yes";
      v_xAttackA = v_xA;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      s_spriteA = "sit2";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "knee"; s_aBusy = "yes"; v_refTime = v_time; }
      if (!((s_demo === "yes"))) { pc = 364; continue main; }
      if ((v_time > (v_refTime + 20))) { s_aBusy = "no"; }
      { pc = 22; continue main; }
      case 364:
      case 363:
      case 362:
      case 361:
      if (!((s_playerA === "standUp"))) { pc = 366; continue main; }
      v_xAttackA = v_xA; v_yAttackA = 14;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      s_spriteA = "sit1";
      if ((v_time > (v_refTime + 10))) { s_playerA = "standing"; s_aBusy = "no"; { pc = 22; continue main; } }
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "knee"; s_aBusy = "yes"; v_refTime = v_time; }
      case 366:
      case 365:
      if (!((s_playerA === "sitRev"))) { pc = 368; continue main; }
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = v_xA;
      s_spriteA = "sit1Rev";
      if ((v_time > (v_refTime + 10))) { s_playerA = "sit2Rev"; { pc = 22; continue main; } }
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "kneeRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 368:
      case 367:
      if (!((s_playerA === "sit2Rev"))) { pc = 370; continue main; }
      s_aBusy = "no";
      s_sitA = "yes";
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_spriteA = "sit2Rev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "kneeRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 370:
      case 369:
      if (!((s_playerA === "standUpRev"))) { pc = 372; continue main; }
      v_xAttackA = (v_xA + 4); v_yAttackA = 14;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_spriteA = "sit1Rev";
      if ((v_time > (v_refTime + 10))) { s_playerA = "standingRev"; s_aBusy = "no"; { pc = 22; continue main; } }
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "kneeRev"; s_aBusy = "yes"; v_refTime = v_time; }
      case 372:
      case 371:
      if (!((s_playerA === "rollForward"))) { pc = 374; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yKneeA = 20; v_yAttackA = v_yKneeA; v_xAttackA = v_xA; v_yHeadA = v_yKneeA;
      if (((s_attackA === "yes") && (s_demo === "no"))) { v_yHeadA = 16; s_playerA = "kick"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((v_time > (v_refTime + 38)))) { pc = 376; continue main; }
      s_spriteA = "standing"; v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_yHeadA = 16;
      s_aBusy = "no"; v_xA = (v_xA + 1); s_playerA = "endRoll"; { pc = 19; continue main; }
      case 376:
      case 375:
      if ((v_time > (v_refTime + 33))) { s_spriteA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 31))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { v_xA = (v_xA + 1); s_spriteA = "roll6"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 28))) { v_xA = (v_xA + 1); s_spriteA = "roll5"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 26))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 25))) { v_xA = (v_xA + 1); s_spriteA = "roll5"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 22))) { v_xA = (v_xA + 1); s_spriteA = "roll4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { v_xA = (v_xA + 1); s_spriteA = "roll4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 17))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 16))) { v_xA = (v_xA + 1); v_xAttackA = (v_xA + 5); s_spriteA = "roll3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 14))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 13))) { v_xA = (v_xA + 1); v_xAttackA = (v_xA + 5); s_spriteA = "roll3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { v_xA = (v_xA + 1); s_spriteA = "roll2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 8))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 7))) { v_xA = (v_xA + 1); s_spriteA = "roll2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_xA = (v_xA + 1); s_spriteA = "roll1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA + 1); s_spriteA = "roll1"; { pc = 22; continue main; } }
      case 374:
      case 373:
      case 19: // endRoll
      if (!((s_playerA === "endRoll"))) { pc = 378; continue main; }
      if (!((v_xA < v_xB))) { pc = 380; continue main; }
      s_playerA = "standing";
      s_spriteA = "standing";
      v_xAttackA = v_xA; v_yAttackA = 17;
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      { pc = 22; continue main; }
      case 380:
      case 379:
      if (!((v_xA > (v_xB - 1)))) { pc = 382; continue main; }
      s_playerA = "turn"; v_yAttackA = 14; s_aBusy = "yes"; v_refTime = v_time;
      s_playerB = "turn"; v_yAttackB = 14; s_bBusy = "yes"; v_refTimeB = v_time;
      { pc = 36; continue main; }
      case 382:
      case 381:
      case 378:
      case 377:
      if (!((s_playerA === "rollForwardRev"))) { pc = 384; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yKneeA = 20; v_yAttackA = v_yKneeA; v_xAttackA = (v_xA + 4); v_yHeadA = v_yKneeA;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "kickRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((v_time > (v_refTime + 38)))) { pc = 386; continue main; }
      s_spriteA = "standingRev"; v_xHeadA = v_xA; v_xBodyA = v_xA;
      s_aBusy = "no"; v_xA = (v_xA - 1); s_playerA = "endRollRev"; { pc = 20; continue main; }
      case 386:
      case 385:
      if ((v_time > (v_refTime + 33))) { v_yHeadA = 16; s_spriteA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 31))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { v_xA = (v_xA - 1); s_spriteA = "roll6Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 28))) { v_xA = (v_xA - 1); s_spriteA = "roll5Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 26))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 25))) { v_xA = (v_xA - 1); s_spriteA = "roll5Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 22))) { v_xA = (v_xA - 1); s_spriteA = "roll4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { v_xA = (v_xA - 1); s_spriteA = "roll4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 17))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 16))) { v_xA = (v_xA - 1); v_xAttackA = (v_xA - 1); s_spriteA = "roll3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 14))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 13))) { v_xA = (v_xA - 1); v_xAttackA = (v_xA - 1); s_spriteA = "roll3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { v_xA = (v_xA - 1); s_spriteA = "roll2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 8))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 7))) { v_xA = (v_xA - 1); s_spriteA = "roll2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_xA = (v_xA - 1); s_spriteA = "roll1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA - 1); s_spriteA = "roll1Rev"; { pc = 22; continue main; } }
      case 384:
      case 383:
      case 20: // endRollRev
      if (!((s_playerA === "endRollRev"))) { pc = 388; continue main; }
      if (!((v_xA > v_xB))) { pc = 390; continue main; }
      s_playerA = "standingRev";
      s_spriteA = "standingRev";
      v_xAttackA = (v_xA + 4); v_yAttackA = 17;
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      { pc = 22; continue main; }
      case 390:
      case 389:
      if (!((v_xA < (v_xB + 1)))) { pc = 392; continue main; }
      s_playerA = "turnRev"; v_yAttackA = 14; s_aBusy = "yes"; v_refTime = v_time;
      s_playerB = "turnRev"; v_yAttackB = 14; s_bBusy = "yes"; v_refTimeB = v_time;
      { pc = 36; continue main; }
      case 392:
      case 391:
      case 388:
      case 387:
      if (!((s_playerA === "rollBack"))) { pc = 394; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yKneeA = 20; v_yAttackA = v_yKneeA; v_xAttackA = v_xA;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "forehead"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((v_time > (v_refTime + 38)))) { pc = 396; continue main; }
      s_spriteA = "standing"; v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4);
      s_aBusy = "no"; s_playerA = "standing"; { pc = 29; continue main; }
      case 396:
      case 395:
      if ((v_time > (v_refTime + 33))) { s_spriteA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { v_xA = (v_xA - 1); s_spriteA = "roll1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 27))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 26))) { v_xA = (v_xA - 1); s_spriteA = "roll1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 24))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { v_xA = (v_xA - 1); s_spriteA = "roll2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 21))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_xA = (v_xA - 1); s_spriteA = "roll2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 18))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 17))) { v_xA = (v_xA - 1); s_spriteA = "roll3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 14))) { v_xA = (v_xA - 1); s_spriteA = "roll3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 12))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 11))) { v_xA = (v_xA - 1); s_spriteA = "roll4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 8))) { v_xA = (v_xA - 1); s_spriteA = "roll4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 6))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { v_xA = (v_xA - 1); s_spriteA = "roll5"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 3))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { v_xA = (v_xA - 1); s_spriteA = "roll6"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { s_spriteA = "roll6"; { pc = 22; continue main; } }
      case 394:
      case 393:
      if (!((s_playerA === "rollBackRev"))) { pc = 398; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yKneeA = 20; v_yAttackA = v_yKneeA; v_xAttackA = (v_xA + 4);
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "foreheadRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (!((v_time > (v_refTime + 38)))) { pc = 400; continue main; }
      s_spriteA = "standingRev"; v_xHeadA = v_xA; v_xBodyA = v_xA;
      s_aBusy = "no"; s_playerA = "standingRev"; { pc = 22; continue main; }
      case 400:
      case 399:
      if ((v_time > (v_refTime + 33))) { s_spriteA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { v_xA = (v_xA + 1); s_spriteA = "roll1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 27))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 26))) { v_xA = (v_xA + 1); s_spriteA = "roll2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 24))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { v_xA = (v_xA + 1); s_spriteA = "roll2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 21))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_xA = (v_xA + 1); s_spriteA = "roll3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 18))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 17))) { v_xA = (v_xA + 1); s_spriteA = "roll3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 14))) { v_xA = (v_xA + 1); s_spriteA = "roll4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 12))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 11))) { v_xA = (v_xA + 1); s_spriteA = "roll4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 8))) { v_xA = (v_xA + 1); s_spriteA = "roll5Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 6))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { v_xA = (v_xA + 1); s_spriteA = "roll5Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 3))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { v_xA = (v_xA + 1); s_spriteA = "roll6Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { s_spriteA = "roll6Rev"; { pc = 22; continue main; } }
      case 398:
      case 397:
      if (!((s_playerA === "protectHead1"))) { pc = 402; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      v_yKneeA = 20;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "spider"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 5))) { s_protectHeadA = "yes"; s_spriteA = "protectHead"; s_aBusy = "no"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA - 1); s_spriteA = "walk1"; { pc = 22; continue main; } }
      case 402:
      case 401:
      if (!((s_playerA === "protectHead"))) { pc = 404; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_xAttackA = v_xA;
      v_yKneeA = 20;
      s_spriteA = "protectHead";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "spider"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      case 404:
      case 403:
      if (!((s_playerA === "protectHeadRev1"))) { pc = 406; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      v_yKneeA = 20;
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "spiderRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 5))) { s_protectHeadA = "yes"; s_playerA = "protectHeadRev"; s_aBusy = "no"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA + 1); s_spriteA = "walk1Rev"; { pc = 22; continue main; } }
      case 406:
      case 405:
      if (!((s_playerA === "protectHeadRev"))) { pc = 408; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_xAttackA = (v_xA + 4);
      v_yKneeA = 20;
      s_spriteA = "protectHeadRev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "spiderRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      case 408:
      case 407:
      if (!((s_playerA === "protectBody1"))) { pc = 410; continue main; }
      v_xAttackA = v_xA;
      v_yKneeA = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      s_beheadA = "no";
      s_spriteA = "protectHead";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "headButt"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 5))) { s_playerA = "protectBody"; s_protectBodyA = "yes"; s_aBusy = "no"; }
      case 410:
      case 409:
      if (!((s_playerA === "protectBody"))) { pc = 412; continue main; }
      v_xAttackA = v_xA;
      v_yKneeA = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      s_beheadA = "no";
      s_spriteA = "protectBody";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "headButt"; s_aBusy = "yes"; v_refTime = v_time; }
      case 412:
      case 411:
      if (!((s_playerA === "protectBodyRev1"))) { pc = 414; continue main; }
      v_xAttackA = (v_xA + 4);
      v_yKneeA = 20;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_beheadA = "no";
      s_spriteA = "protectHeadRev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "headButtRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((v_time > (v_refTime + 5))) { s_spriteA = "protectBodyRev"; s_protectBodyA = "yes"; s_aBusy = "no"; }
      case 414:
      case 413:
      if (!((s_playerA === "protectBodyRev"))) { pc = 416; continue main; }
      v_xAttackA = (v_xA + 4);
      v_yKneeA = 20;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_beheadA = "no";
      s_spriteA = "protectBodyRev";
      if (((s_attackA === "yes") && (s_demo === "no"))) { s_playerA = "headButtRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      case 416:
      case 415:
      if (!((s_playerA === "neck"))) { pc = 418; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "neck2"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 31))) { v_xAttackA = v_xA; { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 30)))) { pc = 420; continue main; }
      s_spriteA = "neck3";
      if (!((s_playerB === "neck"))) { pc = 422; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 422:
      case 421:
      v_xHeadA = v_xA; v_xAttackA = (v_xA + 7); { pc = 22; continue main; }
      case 420:
      case 419:
      if ((v_time > (v_refTime + 16))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 15)))) { pc = 424; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "neck2"; v_yAttackA = v_yHeadA; { pc = 22; continue main; }
      case 424:
      case 423:
      if ((v_time > (v_refTime + 3))) { s_spriteA = "neck1"; { pc = 22; continue main; } }
      case 418:
      case 417:
      if (!((s_playerA === "neckRev"))) { pc = 426; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "neck2Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 31))) { v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 30)))) { pc = 428; continue main; }
      s_spriteA = "neck3Rev";
      if (!((s_playerB === "neckRev"))) { pc = 430; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 430:
      case 429:
      v_xHeadA = (v_xA + 4); v_xAttackA = (v_xA - 3); { pc = 22; continue main; }
      case 428:
      case 427:
      if ((v_time > (v_refTime + 16))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 15)))) { pc = 432; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "neck2Rev"; v_yAttackA = v_yHeadA; { pc = 22; continue main; }
      case 432:
      case 431:
      if ((v_time > (v_refTime + 3))) { s_spriteA = "neck1Rev"; { pc = 22; continue main; } }
      case 426:
      case 425:
      if (!((s_playerA === "bodyChop"))) { pc = 434; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "bodyChop2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 21))) { s_spriteA = "bodyChop3"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 20)))) { pc = 436; continue main; }
      s_spriteA = "bodyChop3";
      if (!((s_playerB === "bodyChop"))) { pc = 438; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 438:
      case 437:
      v_xBodyA = v_xA; v_xAttackA = (v_xA + 6); { pc = 22; continue main; }
      case 436:
      case 435:
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 10)))) { pc = 440; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "bodyChop2"; v_yAttackA = v_yBodyA; { pc = 22; continue main; }
      case 440:
      case 439:
      s_spriteA = "bodyChop1";
      case 434:
      case 433:
      if (!((s_playerA === "bodyChopRev"))) { pc = 442; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "bodyChop2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 21))) { s_spriteA = "bodyChop3Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 20)))) { pc = 444; continue main; }
      s_spriteA = "bodyChop3Rev";
      if (!((s_playerB === "bodyChopRev"))) { pc = 446; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 446:
      case 445:
      v_xBodyA = (v_xA + 4); v_xAttackA = (v_xA - 2); { pc = 22; continue main; }
      case 444:
      case 443:
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 10)))) { pc = 448; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "bodyChop2Rev"; v_yAttackA = v_yBodyA; { pc = 22; continue main; }
      case 448:
      case 447:
      s_spriteA = "bodyChop1Rev";
      case 442:
      case 441:
      if (!((s_playerA === "knee"))) { pc = 450; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = (v_xA + 4);
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "sit2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "knee2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 21))) { s_spriteA = "knee3"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 20)))) { pc = 452; continue main; }
      s_spriteA = "knee3";
      if (!((s_playerB === "knee"))) { pc = 454; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 454:
      case 453:
      v_xKneeA = v_xA; v_xAttackA = (v_xA + 7); { pc = 22; continue main; }
      case 452:
      case 451:
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 10)))) { pc = 456; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "knee2"; v_yAttackA = v_yKneeA; { pc = 22; continue main; }
      case 456:
      case 455:
      s_spriteA = "knee1";
      case 450:
      case 449:
      if (!((s_playerA === "kneeRev"))) { pc = 458; continue main; }
      v_yKneeA = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = v_xA;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "sit2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "knee2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 21))) { s_spriteA = "knee3Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 20)))) { pc = 460; continue main; }
      s_spriteA = "knee3Rev";
      if (!((s_playerB === "kneeRev"))) { pc = 462; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 462:
      case 461:
      v_xKneeA = (v_xA + 4); v_xAttackA = (v_xA - 3); { pc = 22; continue main; }
      case 460:
      case 459:
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 10)))) { pc = 464; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "knee2Rev"; v_yAttackA = v_yKneeA; { pc = 22; continue main; }
      case 464:
      case 463:
      s_spriteA = "knee1Rev";
      case 458:
      case 457:
      if (!((s_playerA === "spider"))) { pc = 466; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = v_xA; v_xKneeA = (v_xA + 4);
      v_yAttackA = v_yKneeA; v_xAttackA = v_xA; v_yKneeA = 20;
      if ((v_time > (v_refTime + 24))) { s_aBusy = "no"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { v_xAttackA = v_xA; { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 18)))) { pc = 468; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "web4";
      if (!((s_playerB === "spider"))) { pc = 470; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 470:
      case 469:
      v_xAttackA = (v_xA + 5); { pc = 22; continue main; }
      case 468:
      case 467:
      if ((v_time > (v_refTime + 12))) { s_spriteA = "web3"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 7))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 6)))) { pc = 472; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "web2"; v_xAttackA = v_xA; { pc = 22; continue main; }
      case 472:
      case 471:
      s_spriteA = "web1";
      case 466:
      case 465:
      if (!((s_playerA === "spiderRev"))) { pc = 474; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = (v_xA + 4); v_xKneeA = v_xA;
      v_yAttackA = v_yKneeA; v_xAttackA = (v_xA + 4); v_yKneeA = 20;
      if ((v_time > (v_refTime + 24))) { s_aBusy = "no"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 18)))) { pc = 476; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "web4Rev";
      if (!((s_playerB === "spiderRev"))) { pc = 478; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 478:
      case 477:
      v_xAttackA = (v_xA - 1); { pc = 22; continue main; }
      case 476:
      case 475:
      if ((v_time > (v_refTime + 12))) { s_spriteA = "web3Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 7))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 6)))) { pc = 480; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "web2Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; }
      case 480:
      case 479:
      s_spriteA = "web1Rev";
      case 474:
      case 473:
      if (!((s_playerA === "kick"))) { pc = 482; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      s_spriteA = "foot1"; v_yAttackA = v_yKneeA; v_yKneeA = 20;
      if ((v_time > (v_refTime + 15))) { s_spriteA = "foot2"; v_xAttackA = (v_xA + 5); }
      if ((v_time > (v_refTime + 16))) { s_spriteA = "foot2"; v_xAttackA = v_xA; }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "foot1"; }
      if ((v_time > (v_refTime + 45))) { s_spriteA = "standing"; }
      if ((v_time > (v_refTime + 50))) { s_aBusy = "no"; s_playerA = "standing"; }
      case 482:
      case 481:
      if (!((s_playerA === "kickRev"))) { pc = 484; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      s_spriteA = "foot1Rev"; v_yAttackA = v_yKneeA; v_yKneeA = 20;
      if ((v_time > (v_refTime + 15))) { s_spriteA = "foot2Rev"; v_xAttackA = (v_xA - 1); }
      if ((v_time > (v_refTime + 16))) { s_spriteA = "foot2Rev"; v_xAttackA = (v_xA + 4); }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "foot1Rev"; }
      if ((v_time > (v_refTime + 45))) { s_spriteA = "standingRev"; }
      if ((v_time > (v_refTime + 50))) { s_aBusy = "no"; s_playerA = "standingRev"; }
      case 484:
      case 483:
      if (!((s_playerA === "headButt"))) { pc = 486; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 37))) { s_aBusy = "no"; s_spriteA = "standing"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 28))) { v_xA = (v_xA - 1); s_spriteA = "head1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_xAttackA = v_xA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { s_spriteA = "head2"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xA = (v_xA + 1); s_spriteA = "head2"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { s_spriteA = "head1"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      s_spriteA = "head1";
      case 486:
      case 485:
      if (!((s_playerA === "headButtRev"))) { pc = 488; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yKneeA = 20; v_yHeadA = 16;
      if ((v_time > (v_refTime + 37))) { s_aBusy = "no"; s_spriteA = "standingRev"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 28))) { v_xA = (v_xA + 1); s_spriteA = "head1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { s_spriteA = "head2Rev"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xA = (v_xA - 1); s_spriteA = "head2Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { s_spriteA = "head1Rev"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      s_spriteA = "head1Rev";
      case 488:
      case 487:
      if (!((s_playerA === "behead"))) { pc = 490; continue main; }
      s_beheadA = "no";
      v_xForeheadA = (v_xA + 3); v_xHeadA = (v_xA + 2); v_xBodyA = (v_xA + 2); v_xKneeA = (v_xA + 4);
      if ((v_time > (v_refTime + 58))) { s_aBusy = "no"; s_spriteA = "standing"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 51))) { s_spriteA = "neck2"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 50)))) { pc = 492; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "neck3"; v_xHeadA = v_xA; v_xAttackA = (v_xA + 6); { pc = 22; continue main; }
      case 492:
      case 491:
      if ((v_time > (v_refTime + 39))) { s_spriteA = "neck3"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 33))) { s_spriteA = "neck2"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { s_spriteA = "neck1"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 25))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 24))) { v_xA = (v_xA + 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { s_spriteA = "turn3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { v_xA = (v_xA + 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "turn3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 14))) { v_xA = (v_xA + 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { s_spriteA = "turn2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { v_xA = (v_xA + 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { s_spriteA = "turn2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_xA = (v_xA + 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { s_spriteA = "turn1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA + 1); s_spriteA = "turn1"; { pc = 22; continue main; } }
      case 490:
      case 489:
      if (!((s_playerA === "beheadRev"))) { pc = 494; continue main; }
      s_beheadA = "no";
      v_xForeheadA = (v_xA + 1); v_xHeadA = (v_xA + 2); v_xBodyA = (v_xA + 2); v_xKneeA = v_xA;
      if ((v_time > (v_refTime + 58))) { s_aBusy = "no"; s_spriteA = "standingRev"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 51))) { s_spriteA = "neck2Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 50)))) { pc = 496; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "neck3Rev"; v_xHeadA = (v_xA + 4); v_xAttackA = (v_xA - 2); { pc = 22; continue main; }
      case 496:
      case 495:
      if ((v_time > (v_refTime + 39))) { s_spriteA = "neck3Rev"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 33))) { s_spriteA = "neck2Rev"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 29))) { s_spriteA = "neck1Rev"; v_yAttackA = v_yHeadA; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 25))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 24))) { v_xA = (v_xA - 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { s_spriteA = "turn3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 19))) { v_xA = (v_xA - 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "turn3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 14))) { v_xA = (v_xA - 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { s_spriteA = "turn2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { v_xA = (v_xA - 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { s_spriteA = "turn2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_xA = (v_xA - 1); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { s_spriteA = "turn1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA - 1); s_spriteA = "turn1Rev"; { pc = 22; continue main; } }
      case 494:
      case 493:
      if (!((s_playerA === "forehead"))) { pc = 498; continue main; }
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "forehead2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 24))) { s_spriteA = "forehead3"; v_xAttackA = v_xA; { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 23)))) { pc = 500; continue main; }
      s_spriteA = "forehead3";
      if (!((s_playerB === "forehead"))) { pc = 502; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 502:
      case 501:
      v_xForeheadA = v_xA; v_xAttackA = (v_xA + 7); { pc = 22; continue main; }
      case 500:
      case 499:
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 10)))) { pc = 504; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "forehead2"; v_yAttackA = v_yForeheadA; { pc = 22; continue main; }
      case 504:
      case 503:
      if ((v_time > (v_refTime + 3))) { s_spriteA = "forehead1"; { pc = 22; continue main; } }
      case 498:
      case 497:
      if (!((s_playerA === "foreheadRev"))) { pc = 506; continue main; }
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yKneeA = 20;
      if ((v_time > (v_refTime + 45))) { s_aBusy = "no"; s_playerA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "forehead2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 24))) { s_spriteA = "forehead3Rev"; v_xAttackA = (v_xA + 4); { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 23)))) { pc = 508; continue main; }
      s_spriteA = "forehead3Rev";
      if (!((s_playerB === "foreheadRev"))) { pc = 510; continue main; }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      { pc = 22; continue main; }
      case 510:
      case 509:
      v_xForeheadA = (v_xA + 4); v_xAttackA = (v_xA - 3); { pc = 22; continue main; }
      case 508:
      case 507:
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 10)))) { pc = 512; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteA = "forehead2Rev"; v_yAttackA = v_yForeheadA; { pc = 22; continue main; }
      case 512:
      case 511:
      if ((v_time > (v_refTime + 3))) { s_spriteA = "forehead1Rev"; { pc = 22; continue main; } }
      case 506:
      case 505:
      if (!((s_playerA === "turn"))) { pc = 514; continue main; }
      v_xAttackA = v_xA; v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yAttackA = 14;
      s_spriteA = "turn1";
      if ((v_time > (v_refTime + 5))) { s_spriteA = "turn2"; }
      if ((v_time > (v_refTime + 10))) { s_spriteA = "turn3"; }
      if ((v_time > (v_refTime + 15))) { s_playerA = "standingRev"; s_aBusy = "no"; s_direction = "reverse"; }
      case 514:
      case 513:
      if (!((s_playerA === "turnRev"))) { pc = 516; continue main; }
      v_xAttackA = (v_xA + 4); v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yAttackA = 14;
      s_spriteA = "turn1";
      if ((v_time > (v_refTime + 5))) { s_spriteA = "turn2"; }
      if ((v_time > (v_refTime + 10))) { s_spriteA = "turn3"; }
      if ((v_time > (v_refTime + 15))) { s_playerA = "standing"; s_aBusy = "no"; s_direction = "normal"; }
      case 516:
      case 515:
      if (!((s_playerA === "winner"))) { pc = 518; continue main; }
      s_spriteA = "winner1";
      s_beheadA = "yes";
      s_bloodA = "no";
      v_xAttackA = v_xA; v_yKneeA = 20; v_yAttackA = 14;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      if ((v_time > (v_refTime + 18))) { s_spriteA = "winner2"; }
      if ((v_time > (v_refTime + 35))) { s_spriteA = "winner3"; }
      if ((v_time > (v_refTime + 85))) { s_spriteA = "winner2"; }
      if ((v_time > (v_refTime + 100))) { s_spriteA = "winner1"; }
      case 518:
      case 517:
      if (!((s_playerA === "winnerRev"))) { pc = 520; continue main; }
      s_spriteA = "winner1Rev";
      s_beheadA = "yes";
      s_bloodA = "no";
      v_xAttackA = (v_xForeheadA + 4); v_yKneeA = 20; v_yAttackA = 14;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if ((v_time > (v_refTime + 18))) { s_spriteA = "winner2Rev"; }
      if ((v_time > (v_refTime + 35))) { s_spriteA = "winner3Rev"; }
      if ((v_time > (v_refTime + 85))) { s_spriteA = "winner2Rev"; }
      if ((v_time > (v_refTime + 100))) { s_spriteA = "winner1Rev"; }
      case 520:
      case 519:
      if (!((s_playerA === "winnerKO"))) { pc = 522; continue main; }
      s_beheadA = "yes";
      s_bloodA = "no";
      v_xAttackA = v_xA; v_yKneeA = 20;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      if (!((v_time > (v_refTime + 230)))) { pc = 524; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      v_xHeadSprite = 270;
      { pc = 36; continue main; }
      case 524:
      case 523:
      if ((v_time > (v_refTime + 205))) { s_spriteA = "winner1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 195))) { s_spriteA = "winner2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 140))) { s_spriteA = "winner3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 123))) { s_spriteA = "winner2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 105))) { s_spriteA = "winner1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 100))) { s_spriteA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 75))) { s_spriteA = "foot1"; s_spriteB = "dead4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 71))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 70)))) { pc = 526; continue main; }
      s_spriteA = "foot2"; s_spriteB = "dead3"; v_xB = (v_xB + 2); { pc = 22; continue main; }
      case 526:
      case 525:
      if ((v_time > (v_refTime + 55))) { s_spriteA = "foot1"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 36))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 35)))) { pc = 528; continue main; }
      v_distance = (v_xB - v_xA);
      if ((v_distance < 5)) { s_spriteA = "walk3"; v_xA = (v_xA - 1); }
      if ((v_distance > 5)) { s_spriteA = "walk3"; v_xA = (v_xA + 1); }
      { pc = 29; continue main; }
      case 528:
      case 527:
      if ((v_time > (v_refTime + 30))) { s_spriteA = "standing"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { s_spriteA = "turn3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "turn2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 8))) { s_spriteA = "turn1"; }
      case 522:
      case 521:
      if (!((s_playerA === "winnerKORev"))) { pc = 530; continue main; }
      s_beheadA = "yes";
      s_bloodA = "no";
      v_xAttackA = (v_xForeheadA + 4); v_yKneeA = 20;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if (!((v_time > (v_refTime + 230)))) { pc = 532; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      v_xHeadSprite = 270;
      { pc = 36; continue main; }
      case 532:
      case 531:
      if ((v_time > (v_refTime + 205))) { s_spriteA = "winner1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 190))) { s_spriteA = "winner2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 140))) { s_spriteA = "winner3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 123))) { s_spriteA = "winner2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 105))) { s_spriteA = "winner1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 100))) { s_spriteA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 75))) { s_spriteA = "foot1Rev"; s_spriteB = "dead4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 71))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 70)))) { pc = 534; continue main; }
      s_spriteA = "foot2Rev"; s_spriteB = "dead3Rev"; v_xB = (v_xB - 2); { pc = 22; continue main; }
      case 534:
      case 533:
      if ((v_time > (v_refTime + 55))) { s_spriteA = "foot1Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { s_spriteA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 36))) { { pc = 22; continue main; } }
      if (!((v_time > (v_refTime + 35)))) { pc = 536; continue main; }
      v_distance = (v_xA - v_xB);
      if ((v_distance < 5)) { s_spriteA = "walk3Rev"; v_xA = (v_xA + 1); }
      if ((v_distance > 5)) { s_spriteA = "walk3Rev"; v_xA = (v_xA - 1); }
      { pc = 29; continue main; }
      case 536:
      case 535:
      if ((v_time > (v_refTime + 30))) { s_spriteA = "standingRev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 23))) { s_spriteA = "turn3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "turn2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 8))) { s_spriteA = "turn1Rev"; }
      case 530:
      case 529:
      if (!((s_playerA === "hit"))) { pc = 538; continue main; }
      v_waitingA = 0;
      v_xAttackA = v_xA;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      if ((s_playerB === "kick")) { s_playerA = "fall"; { pc = 18; continue main; } }
      s_bloodA = "yes";
      s_snakeA = "yes";
      if (!(((s_playerB === "behead") && (s_beheadA === "yes")))) { pc = 540; continue main; }
      s_playerA = "deadBeheading"; s_aBusy = "yes"; v_refTime = v_time;
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/behead.ogg"); }
      v_xHeadSprite = (v_xA + 3); v_scoreB = (v_scoreB + 250);
      s_bloodA = "no"; { pc = 21; continue main; }
      case 540:
      case 539:
      v_lifeA = (v_lifeA - 1);
      if (!((v_lifeA <= 0))) { pc = 542; continue main; }
      s_playerA = "dead"; s_aBusy = "yes"; v_refTime = v_time; s_bloodA = "yes"; { pc = 21; continue main; }
      case 542:
      case 541:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/hit.ogg"); }
      s_playerA = "hit1"; s_aBusy = "yes"; v_refTime = v_time; s_beheadA = "yes";
      { pc = 22; continue main; }
      case 538:
      case 537:
      if (!((s_playerA === "hit1"))) { pc = 544; continue main; }
      v_waitingA = 0;
      v_xAttackA = v_xA;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if (!((v_time > (v_refTime + 20)))) { pc = 546; continue main; }
      s_spriteA = "standing"; s_aBusy = "no";
      s_playerA = "standing"; { pc = 22; continue main; }
      case 546:
      case 545:
      if ((v_time > (v_refTime + 15))) { s_spriteA = "hit4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { v_xA = (v_xA - 1); s_bloodA = "no"; s_spriteA = "hit3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 6))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { v_xA = (v_xA - 2); s_spriteA = "hit2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA - 1); s_spriteA = "hit1"; { pc = 22; continue main; } }
      s_spriteA = "hit1";
      case 544:
      case 543:
      if (!((s_playerA === "hitRev"))) { pc = 548; continue main; }
      v_waitingA = 0;
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      if ((s_playerB === "kickRev")) { s_playerA = "fallRev"; { pc = 18; continue main; } }
      s_bloodA = "yes";
      s_snakeA = "yes";
      if (!(((s_playerB === "beheadRev") && (s_beheadA === "yes")))) { pc = 550; continue main; }
      s_playerA = "deadBeheadingRev"; s_aBusy = "yes"; v_refTime = v_time;
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/behead.ogg"); }
      v_xHeadSprite = (v_xA + 3); v_scoreB = (v_scoreB + 250);
      s_bloodA = "no"; { pc = 21; continue main; }
      case 550:
      case 549:
      v_lifeA = (v_lifeA - 1);
      if (!((v_lifeA <= 0))) { pc = 552; continue main; }
      s_playerA = "deadRev"; s_aBusy = "yes"; v_refTime = v_time; s_bloodA = "yes"; { pc = 21; continue main; }
      case 552:
      case 551:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/hit.ogg"); }
      s_playerA = "hit1Rev"; s_aBusy = "yes"; v_refTime = v_time; s_beheadA = "yes";
      { pc = 22; continue main; }
      case 548:
      case 547:
      if (!((s_playerA === "hit1Rev"))) { pc = 554; continue main; }
      v_waitingA = 0;
      v_xAttackA = (v_xA + 4);
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      if (!((v_time > (v_refTime + 20)))) { pc = 556; continue main; }
      s_spriteA = "standingRev"; s_aBusy = "no";
      s_playerA = "standingRev"; { pc = 22; continue main; }
      case 556:
      case 555:
      if ((v_time > (v_refTime + 15))) { s_spriteA = "hit4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 11))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { v_xA = (v_xA + 1); s_bloodA = "no"; s_spriteA = "hit3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 6))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { v_xA = (v_xA + 2); s_spriteA = "hit2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA + 1); s_spriteA = "hit1Rev"; { pc = 22; continue main; } }
      s_spriteA = "hit1Rev";
      case 554:
      case 553:
      if (!((s_playerA === "fall"))) { pc = 558; continue main; }
      v_xAttackA = v_xA;
      v_waitingA = 0;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      s_bloodA = "yes";
      s_snakeA = "yes";
      v_lifeA = (v_lifeA - 1); v_scoreB = (v_scoreB + 100);
      if ((s_playerB === "rollForward")) { v_lifeA = (v_lifeA + 1); s_bloodA = "no"; s_snakeA = "no"; v_scoreB = (v_scoreB - 100); }
      if (!((v_lifeA <= 0))) { pc = 560; continue main; }
      s_playerA = "dead"; s_aBusy = "yes"; v_refTime = v_time; s_bloodA = "yes";
      if (((s_playerB === "headButt") || (s_playerB === "kick"))) { s_bloodA = "no"; }
      { pc = 21; continue main; }
      case 560:
      case 559:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/fall.ogg"); }
      if (!((s_playerB === "kick"))) { pc = 562; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/nothing.wav"); }
      case 562:
      case 561:
      if (!(((s_playerB === "headButt") || (s_playerB === "kick")))) { pc = 564; continue main; }
      v_scoreB = (v_scoreB + 150); s_bloodA = "no";
      if (!((s_playerB === "headButt"))) { pc = 566; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/ball.wav"); }
      case 566:
      case 565:
      case 564:
      case 563:
      s_playerA = "fall1"; s_aBusy = "yes"; v_refTime = v_time;
      { pc = 22; continue main; }
      case 558:
      case 557:
      if (!((s_playerA === "fall1"))) { pc = 568; continue main; }
      v_xAttackA = v_xA;
      v_waitingA = 0;
      v_xForeheadA = v_xA; v_xHeadA = v_xA; v_xBodyA = v_xA; v_xKneeA = v_xA;
      if (!((v_time > (v_refTime + 25)))) { pc = 570; continue main; }
      s_spriteA = "standing"; v_xA = (v_xA - 1); s_playerA = "standing"; s_aBusy = "no"; { pc = 22; continue main; }
      case 570:
      case 569:
      if ((v_time > (v_refTime + 20))) { s_spriteA = "fall4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "fall3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { s_bloodA = "no"; v_xA = (v_xA - 2); s_spriteA = "fall2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA - 2); { pc = 22; continue main; } }
      s_spriteA = "fall1";
      case 568:
      case 567:
      if (!((s_playerA === "fallRev"))) { pc = 572; continue main; }
      v_xAttackA = (v_xA + 4);
      v_waitingA = 0;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      v_yForeheadA = 15; v_yHeadA = 16; v_yBodyA = 18; v_yKneeA = 20;
      s_bloodA = "yes";
      s_snakeA = "yes";
      v_lifeA = (v_lifeA - 1); v_scoreB = (v_scoreB + 100);
      if ((s_playerB === "rollForwardRev")) { v_lifeA = (v_lifeA + 1); s_bloodA = "no"; s_snakeA = "no"; v_scoreB = (v_scoreB - 100); }
      if (!((v_lifeA <= 0))) { pc = 574; continue main; }
      s_playerA = "deadRev"; s_aBusy = "yes"; v_refTime = v_time; s_bloodA = "yes";
      if (((s_playerB === "headButtRev") || (s_playerB === "kickRev"))) { s_bloodA = "no"; }
      { pc = 21; continue main; }
      case 574:
      case 573:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/fall.ogg"); }
      if (!((s_playerB === "kickRev"))) { pc = 576; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/nothing.wav"); }
      case 576:
      case 575:
      if (!(((s_playerB === "headButtRev") || (s_playerB === "kickRev")))) { pc = 578; continue main; }
      if (!((s_playerB === "headButtRev"))) { pc = 580; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/ball.wav"); }
      case 580:
      case 579:
      v_scoreB = (v_scoreB + 150); s_bloodA = "no";
      case 578:
      case 577:
      s_playerA = "fall1Rev"; s_aBusy = "yes"; v_refTime = v_time;
      { pc = 22; continue main; }
      case 572:
      case 571:
      if (!((s_playerA === "fall1Rev"))) { pc = 582; continue main; }
      v_xAttackA = (v_xA + 4);
      v_waitingA = 0;
      v_xForeheadA = (v_xA + 4); v_xHeadA = (v_xA + 4); v_xBodyA = (v_xA + 4); v_xKneeA = (v_xA + 4);
      if (!((v_time > (v_refTime + 25)))) { pc = 584; continue main; }
      s_spriteA = "standingRev"; v_xA = (v_xA + 1); s_playerA = "standingRev"; s_aBusy = "no"; { pc = 22; continue main; }
      case 584:
      case 583:
      if ((v_time > (v_refTime + 20))) { s_spriteA = "fall4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_spriteA = "fall3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 9))) { s_bloodA = "no"; v_xA = (v_xA + 2); s_spriteA = "fall2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 2))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { v_xA = (v_xA + 2); { pc = 22; continue main; } }
      s_spriteA = "fall1Rev";
      case 582:
      case 581:
      if (!((s_direction === "normal"))) { pc = 586; continue main; }
      if (!((s_playerA === "clingBody"))) { pc = 588; continue main; }
      if (((s_playerB === "behead") && (s_beheadA === "no"))) { s_playerA = "hit"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((s_playerB === "knee")) { s_playerA = "hit"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      s_playerA = "protectBody"; { pc = 22; continue main; }
      case 588:
      case 587:
      if (!((s_playerA === "clingHead"))) { pc = 590; continue main; }
      s_playerA = "protectHead"; { pc = 22; continue main; }
      case 590:
      case 589:
      case 586:
      case 585:
      if (!((s_direction === "reverse"))) { pc = 592; continue main; }
      if (!((s_playerA === "clingBody"))) { pc = 594; continue main; }
      if (((s_playerB === "beheadRev") && (s_beheadA === "no"))) { s_playerA = "hitRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if ((s_playerB === "kneeRev")) { s_playerA = "hitRev"; s_aBusy = "yes"; v_refTime = v_time; { pc = 18; continue main; } }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      s_playerA = "protectBodyRev"; { pc = 22; continue main; }
      case 594:
      case 593:
      if (!((s_playerA === "clingHead"))) { pc = 596; continue main; }
      s_playerA = "protectHeadRev"; { pc = 22; continue main; }
      case 596:
      case 595:
      case 592:
      case 591:
      case 21: // dead
      if (!((s_playerA === "dead"))) { pc = 598; continue main; }
      if ((v_time > (v_refTime + 16))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_bloodA = "no"; s_spriteA = "dead2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { s_spriteA = "dead1"; { pc = 22; continue main; } }
      s_spriteA = "dead1"; s_playerB = "winnerKO"; s_bBusy = "yes"; v_refTimeB = v_time;
      if (!((s_gnome === "no"))) { pc = 600; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/dead.wav"); }
      case 600:
      case 599:
      case 598:
      case 597:
      if (!((s_playerA === "deadRev"))) { pc = 602; continue main; }
      if ((v_time > (v_refTime + 16))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_bloodA = "no"; s_spriteA = "dead2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { s_spriteA = "dead1Rev"; { pc = 22; continue main; } }
      s_spriteA = "dead1Rev";
      s_playerB = "winnerKORev"; s_bBusy = "yes"; v_refTimeB = v_time;
      if (!((s_gnome === "no"))) { pc = 604; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/dead.wav"); }
      case 604:
      case 603:
      case 602:
      case 601:
      if (!((s_playerA === "deadBeheading"))) { pc = 606; continue main; }
      if ((v_time > (v_refTime + 80))) { s_spriteA = "beheading4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 70))) { s_spriteA = "beheading3"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 55))) { v_bloodBeheadingA = 0; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 50))) { v_bloodBeheadingA = 6; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_bloodBeheadingA = 5; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { v_bloodBeheadingA = 4; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 35))) { s_spriteA = "beheading2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_bloodBeheadingA = 0; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { v_bloodBeheadingA = 3; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { v_bloodBeheadingA = 2; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { v_bloodBeheadingA = 1; { pc = 22; continue main; } }
      s_spriteA = "beheading1"; s_playerB = "winner"; s_bBusy = "yes"; v_refTimeB = v_time;
      case 606:
      case 605:
      if (!((s_playerA === "deadBeheadingRev"))) { pc = 608; continue main; }
      if ((v_time > (v_refTime + 80))) { s_spriteA = "beheading4Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 70))) { s_spriteA = "beheading3Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 55))) { v_bloodBeheadingA = 0; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 50))) { v_bloodBeheadingA = 6; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_bloodBeheadingA = 5; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 40))) { v_bloodBeheadingA = 4; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 35))) { s_spriteA = "beheading2Rev"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_bloodBeheadingA = 0; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { v_bloodBeheadingA = 3; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 10))) { v_bloodBeheadingA = 2; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 5))) { v_bloodBeheadingA = 1; { pc = 22; continue main; } }
      s_spriteA = "beheading1Rev"; s_playerB = "winnerRev"; s_bBusy = "yes"; v_refTimeB = v_time;
      case 608:
      case 607:
      if (!((s_playerA === "deadWizard"))) { pc = 610; continue main; }
      if ((v_time > (v_refTime + 86))) { s_playerA = "wizardFinished"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 85))) { s_bloodA = "no"; s_spriteA = "dead4"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 71))) { { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 70))) { s_bloodA = "no"; s_spriteA = "dead3"; v_xA = (v_xA + 2); { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 15))) { s_bloodA = "no"; s_spriteA = "dead2"; { pc = 22; continue main; } }
      if ((v_time > (v_refTime + 1))) { s_spriteA = "dead1"; { pc = 22; continue main; } }
      s_spriteA = "dead1";
      if (!((s_gnome === "no"))) { pc = 612; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/dead.wav"); }
      case 612:
      case 611:
      case 610:
      case 609:
      if (!((s_playerA === "victory"))) { pc = 614; continue main; }
      s_spriteA = "protectHead";
      if ((v_time > (v_refTime + 10))) { s_spriteA = "winner1"; }
      if ((v_time > (v_refTime + 20))) { s_spriteA = "winner2"; }
      if ((v_time > (v_refTime + 30))) { s_spriteA = "winner3"; }
      if ((v_time > (v_refTime + 80))) { s_spriteA = "winner2"; }
      if (!((v_time > (v_refTime + 90)))) { pc = 616; continue main; }
      s_spriteA = "winner1"; s_playerA = "finished";
      s_game = "won";
      case 616:
      case 615:
      { pc = 36; continue main; }
      case 614:
      case 613:
      case 22: // player2
      if (((s_wizard === "yes") || (s_marianna === "yes"))) { s_bloodB = "no"; { pc = 25; continue main; } }
      if (!((s_direction === "normal"))) { pc = 618; continue main; }
      if (!((v_xB > v_xA))) { pc = 620; continue main; }
      if (!(((v_xAttackA >= v_xForeheadB) && (v_yAttackA === v_yForeheadB)))) { pc = 622; continue main; }
      if ((s_playerB === "protectHead")) { s_playerB = "clingHead"; { pc = 25; continue main; } }
      s_playerB = "fall"; v_infoBDamageForehead = (v_infoBDamageForehead + 1); { pc = 25; continue main; }
      case 622:
      case 621:
      if (!(((v_xAttackA >= v_xHeadB) && (v_yAttackA === v_yHeadB)))) { pc = 624; continue main; }
      if ((s_playerA === "headButt")) { s_playerB = "fall"; { pc = 25; continue main; } }
      s_playerB = "hit"; v_scoreA = (v_scoreA + 250); v_infoBDamageHead = (v_infoBDamageHead + 1); { pc = 25; continue main; }
      case 624:
      case 623:
      if (!(((v_xAttackA >= v_xBodyB) && (v_yAttackA === v_yBodyB)))) { pc = 626; continue main; }
      if ((s_playerB === "protectBody")) { s_playerB = "clingBody"; { pc = 25; continue main; } }
      s_playerB = "hit"; v_scoreA = (v_scoreA + 250); { pc = 25; continue main; }
      case 626:
      case 625:
      if (!(((v_xAttackA >= v_xKneeB) && (v_yAttackA === v_yKneeB)))) { pc = 628; continue main; }
      if ((s_playerA === "spider")) { s_playerB = "fall"; { pc = 25; continue main; } }
      if ((s_playerA === "rollForward")) { s_playerB = "fall"; { pc = 25; continue main; } }
      if ((s_playerB === "protectBody")) { s_playerB = "clingBody"; { pc = 25; continue main; } }
      if ((s_playerA === "kick")) { s_playerB = "fall"; v_infoBDamageKnee = (v_infoBDamageKnee + 1); { pc = 25; continue main; } }
      s_playerB = "hit"; v_scoreA = (v_scoreA + 100); v_infoBDamageKnee = (v_infoBDamageKnee + 1); { pc = 25; continue main; }
      case 628:
      case 627:
      case 620:
      case 619:
      case 618:
      case 617:
      if (!((s_direction === "reverse"))) { pc = 630; continue main; }
      if (!((v_xB < v_xA))) { pc = 632; continue main; }
      if (!(((v_xAttackA <= v_xForeheadB) && (v_yAttackA === v_yForeheadB)))) { pc = 634; continue main; }
      if ((s_playerB === "protectHeadRev")) { s_playerB = "clingHead"; { pc = 25; continue main; } }
      s_playerB = "fallRev"; v_infoBDamageForehead = (v_infoBDamageForehead + 1); { pc = 25; continue main; }
      case 634:
      case 633:
      if (!(((v_xAttackA <= v_xHeadB) && (v_yAttackA === v_yHeadB)))) { pc = 636; continue main; }
      if ((s_playerA === "headButtRev")) { s_playerB = "fallRev"; { pc = 25; continue main; } }
      s_playerB = "hitRev"; v_scoreA = (v_scoreA + 250); v_infoBDamageHead = (v_infoBDamageHead + 1); { pc = 25; continue main; }
      case 636:
      case 635:
      if (!(((v_xAttackA <= v_xBodyB) && (v_yAttackA === v_yBodyB)))) { pc = 638; continue main; }
      if ((s_playerB === "protectBodyRev")) { s_playerB = "clingBody"; { pc = 25; continue main; } }
      s_playerB = "hitRev"; v_scoreA = (v_scoreA + 250); { pc = 25; continue main; }
      case 638:
      case 637:
      if (!(((v_xAttackA <= v_xKneeB) && (v_yAttackA === v_yKneeB)))) { pc = 640; continue main; }
      if ((s_playerA === "spiderRev")) { s_playerB = "fallRev"; { pc = 25; continue main; } }
      if ((s_playerA === "rollForwardRev")) { s_playerB = "fallRev"; { pc = 25; continue main; } }
      if ((s_playerB === "protectBodyRev")) { s_playerB = "clingBody"; { pc = 25; continue main; } }
      if ((s_playerA === "kickRev")) { s_playerB = "fallRev"; v_infoBDamageKnee = (v_infoBDamageKnee + 1); { pc = 25; continue main; } }
      s_playerB = "hitRev"; v_scoreA = (v_scoreA + 100); v_infoBDamageKnee = (v_infoBDamageKnee + 1); { pc = 25; continue main; }
      case 640:
      case 639:
      case 632:
      case 631:
      case 630:
      case 629:
      if ((s_bBusy === "yes")) { { pc = 25; continue main; } }
      s_bloodB = "no";
      case 23: // keyboardB
      v_x2 = 7; v_y2 = 7;
      s_stick2 = "neutral";
      if (!((s_mode === "vs"))) { pc = 642; continue main; }
      if ((rt.keydown(105) || (rt.stick(3) < 65))) { v_y2 = (v_y2 - 1); }
      if ((rt.keydown(107) || (rt.stick(3) > 190))) { v_y2 = (v_y2 + 1); }
      if ((rt.keydown(108) || (rt.stick(2) > 190))) { v_x2 = (v_x2 + 1); }
      if ((rt.keydown(106) || (rt.stick(2) < 65))) { v_x2 = (v_x2 - 1); }
      if ((rt.keydown(32) || (rt.strig(3) === (-1)))) { s_attackB = "yes"; } else { s_attackB = "no"; }
      if ((v_y2 > 9)) { v_y2 = 9; }
      if ((v_y2 < 5)) { v_y2 = 5; }
      if ((v_x2 > 9)) { v_x2 = 9; }
      if ((v_x2 < 5)) { v_x2 = 5; }
      if (!((s_direction === "normal"))) { pc = 644; continue main; }
      if ((((v_x2 <= 6) && (v_y2 <= 6)))) { s_stick2 = "upLeft"; }
      if ((((v_x2 >= 8) && (v_y2 <= 6)))) { s_stick2 = "upRight"; }
      if ((((v_x2 <= 6) && (v_y2 >= 8)))) { s_stick2 = "downLeft"; }
      if ((((v_x2 >= 8) && (v_y2 >= 8)))) { s_stick2 = "downRight"; }
      if ((((v_x2 <= 6) && (v_y2 === 7)))) { s_stick2 = "left"; }
      if ((((v_x2 >= 8) && (v_y2 === 7)))) { s_stick2 = "right"; }
      if ((((v_x2 === 7) && (v_y2 >= 8)))) { s_stick2 = "down"; }
      if ((((v_x2 === 7) && (v_y2 <= 6)))) { s_stick2 = "up"; }
      case 644:
      case 643:
      if (!((s_direction === "reverse"))) { pc = 646; continue main; }
      if ((((v_x2 <= 6) && (v_y2 <= 6)))) { s_stick2 = "upLeft"; }
      if ((((v_x2 >= 8) && (v_y2 <= 6)))) { s_stick2 = "upRight"; }
      if ((((v_x2 <= 6) && (v_y2 >= 8)))) { s_stick2 = "downLeft"; }
      if ((((v_x2 >= 8) && (v_y2 >= 8)))) { s_stick2 = "downRight"; }
      if ((((v_x2 <= 6) && (v_y2 === 7)))) { s_stick2 = "left"; }
      if ((((v_x2 >= 8) && (v_y2 === 7)))) { s_stick2 = "right"; }
      if ((((v_x2 === 7) && (v_y2 >= 8)))) { s_stick2 = "down"; }
      if ((((v_x2 === 7) && (v_y2 <= 6)))) { s_stick2 = "up"; }
      case 646:
      case 645:
      case 642:
      case 641:
      if ((s_entry === "yes")) { s_stick2 = "left"; { pc = 24; continue main; } }
      if (!((s_exitB === "yes"))) { pc = 648; continue main; }
      if (!((s_timeFinished === "yes"))) { pc = 650; continue main; }
      if ((s_direction === "reverse")) { s_stick2 = "left"; { pc = 24; continue main; } }
      case 650:
      case 649:
      s_direction = "normal"; s_stick2 = "right"; { pc = 24; continue main; }
      case 648:
      case 647:
      if (((((s_playerA === "endRoll") || (s_playerA === "endRollRev")) || (s_playerB === "endRoll")) || (s_playerB === "endRollRev"))) { { pc = 25; continue main; } }
      if (!((s_mode === "solo"))) { pc = 652; continue main; }
      if (!((((((v_ai === 0) || (v_ai === 1)) || (v_ai === 2)) || (v_ai === 3)) || (v_ai === 6)))) { pc = 654; continue main; }
      if (!((s_direction === "normal"))) { pc = 656; continue main; }
      v_distance = (v_xB - v_xA);
      if (!((v_distance >= 15))) { pc = 658; continue main; }
      s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; }
      case 658:
      case 657:
      if (!((v_ai === 6))) { pc = 660; continue main; }
      if (!((v_distance < 15))) { pc = 662; continue main; }
      if ((s_playerA === "behead")) { s_playerB = "knee"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 662:
      case 661:
      case 660:
      case 659:
      if (!((v_ai === 3))) { pc = 664; continue main; }
      if (!((v_distance < 15))) { pc = 666; continue main; }
      if (!((v_infoBDamageHead > 2))) { pc = 668; continue main; }
      if ((s_playerA === "behead")) { s_playerB = "sit2"; { pc = 25; continue main; } }
      case 668:
      case 667:
      if ((s_playerA === "behead")) { s_playerB = "protectBody"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 666:
      case 665:
      case 664:
      case 663:
      if (((v_distance === 12) && (s_playerA === "standing"))) { s_playerB = "behead"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!(((v_distance > 9) && (v_distance < 15)))) { pc = 670; continue main; }
      if ((s_stick1 === "left")) { s_playerB = "standing"; { pc = 25; continue main; } }
      s_stick2 = "left"; { pc = 24; continue main; }
      case 670:
      case 669:
      if (!((v_distance === 9))) { pc = 672; continue main; }
      if ((v_waitingA > 50)) { s_stick2 = "left"; { pc = 24; continue main; } }
      if ((s_playerA === "rollBack")) { s_playerB = "bodyChop"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_aBusy === "yes")) { s_stick2 = "left"; { pc = 24; continue main; } }
      case 672:
      case 671:
      if (!(((v_distance < 9) && (v_distance > 6)))) { pc = 674; continue main; }
      if (((s_demo === "no") && (s_playerA === "rollForward"))) { s_playerB = "jump"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_playerA === "rollBack")) { s_playerB = "knee"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_stick1 === "left")) { s_playerB = "spider"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!((v_ai > 1))) { pc = 676; continue main; }
      if (!((v_infoBDamageKnee > 4))) { pc = 678; continue main; }
      if (((s_playerA === "sit2") || (s_playerA === "knee"))) { s_playerB = "knee"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 678:
      case 677:
      if (!((v_infoBDamageKnee > 2))) { pc = 680; continue main; }
      if (((s_playerA === "sit2") || (s_playerA === "rollForward"))) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 680:
      case 679:
      if (!((v_infoBDamageHead > 2))) { pc = 682; continue main; }
      if ((s_playerA === "neck")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 682:
      case 681:
      if (!((v_infoBDamageForehead > 2))) { pc = 684; continue main; }
      if ((s_playerA === "forehead")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 684:
      case 683:
      case 676:
      case 675:
      if ((v_infoBStrike === 0)) { s_playerB = "kick"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "standing"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spider"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "standing"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "sit2"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_playerB = "knee"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 6)) { s_stick2 = "left"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 674:
      case 673:
      if (!((v_distance <= 6))) { pc = 686; continue main; }
      if (((s_demo === "no") && (s_playerA === "jump"))) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!((v_ai === 3))) { pc = 688; continue main; }
      if ((s_playerA === "bodyChop")) { s_playerB = "protectBody"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 688:
      case 687:
      if (!((v_ai === 2))) { pc = 690; continue main; }
      if ((s_playerA === "knee")) { s_playerB = "jump"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 690:
      case 689:
      if (!((v_ai > 1))) { pc = 692; continue main; }
      if (!((v_infoBDamageKnee > 4))) { pc = 694; continue main; }
      if (((s_playerA === "sit2") || (s_playerA === "knee"))) { s_playerB = "kick"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_ai > 2)) { if ((s_playerA === "spider")) { s_playerB = "spider"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      case 694:
      case 693:
      if (!((v_infoBDamageKnee > 2))) { pc = 696; continue main; }
      if ((s_playerA === "kick")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (((s_playerA === "sit2") || (s_playerA === "knee"))) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 696:
      case 695:
      case 692:
      case 691:
      if ((v_infoBStrike === 0)) { s_playerB = "kick"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "headButt"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spider"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "standing"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "sit2"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_playerB = "knee"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 6)) { s_playerB = "standing"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 7)) { s_stick2 = "left"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 686:
      case 685:
      case 656:
      case 655:
      if (!((s_direction === "reverse"))) { pc = 698; continue main; }
      v_distance = (v_xA - v_xB);
      if (!((v_distance >= 15))) { pc = 700; continue main; }
      s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; }
      case 700:
      case 699:
      if (!((v_ai === 6))) { pc = 702; continue main; }
      if (!((v_distance < 15))) { pc = 704; continue main; }
      if ((s_playerA === "beheadRev")) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 704:
      case 703:
      case 702:
      case 701:
      if (!((v_ai === 3))) { pc = 706; continue main; }
      if (!((v_distance < 15))) { pc = 708; continue main; }
      if (!((v_infoBDamageHead > 2))) { pc = 710; continue main; }
      if ((s_playerA === "beheadRev")) { s_playerB = "sit2Rev"; { pc = 25; continue main; } }
      case 710:
      case 709:
      if ((s_playerA === "beheadRev")) { s_playerB = "protectBodyRev"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 708:
      case 707:
      case 706:
      case 705:
      if (((v_distance === 12) && (s_playerA === "standingRev"))) { s_playerB = "beheadRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!(((v_distance > 9) && (v_distance < 15)))) { pc = 712; continue main; }
      if ((s_stick1 === "right")) { s_playerB = "standingRev"; { pc = 25; continue main; } }
      s_stick2 = "right"; { pc = 24; continue main; }
      case 712:
      case 711:
      if (!((v_distance === 9))) { pc = 714; continue main; }
      if ((v_waitingA > 50)) { s_stick2 = "right"; { pc = 24; continue main; } }
      if ((s_playerA === "rollBackRev")) { s_playerB = "bodyChopRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_aBusy === "yes")) { s_stick2 = "right"; { pc = 24; continue main; } }
      case 714:
      case 713:
      if (!(((v_distance < 9) && (v_distance > 6)))) { pc = 716; continue main; }
      if (((s_demo === "no") && (s_playerA === "rollForwardRev"))) { s_playerB = "jumpRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_playerA === "rollBackRev")) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_stick1 === "right")) { s_playerB = "spiderRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!((v_ai > 1))) { pc = 718; continue main; }
      if (!((v_infoBDamageKnee > 4))) { pc = 720; continue main; }
      if (((s_playerA === "sit2Rev") || (s_playerA === "kneeRev"))) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 720:
      case 719:
      if (!((v_infoBDamageKnee > 2))) { pc = 722; continue main; }
      if (((s_playerA === "sit2Rev") || (s_playerA === "rollForwardRev"))) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 722:
      case 721:
      if (!((v_infoBDamageHead > 2))) { pc = 724; continue main; }
      if ((s_playerA === "neckRev")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 724:
      case 723:
      if (!((v_infoBDamageForehead > 2))) { pc = 726; continue main; }
      if ((s_playerA === "foreheadRev")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 726:
      case 725:
      case 718:
      case 717:
      if ((v_infoBStrike === 0)) { s_playerB = "kickRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "standingRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spiderRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "standingRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "sit2Rev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_playerB = "kneeRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 6)) { s_stick2 = "right"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 716:
      case 715:
      if (!((v_distance <= 6))) { pc = 728; continue main; }
      if (((s_demo === "no") && (s_playerA === "jumpRev"))) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!((v_ai === 3))) { pc = 730; continue main; }
      if ((s_playerA === "bodyChopRev")) { s_playerB = "protectBodyRev"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 730:
      case 729:
      if (!((v_ai === 2))) { pc = 732; continue main; }
      if ((s_playerA === "kneeRev")) { s_playerB = "jumpRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 732:
      case 731:
      if (!((v_ai > 1))) { pc = 734; continue main; }
      if (!((v_infoBDamageKnee > 4))) { pc = 736; continue main; }
      if (((s_playerA === "sit2Rev") || (s_playerA === "kneeRev"))) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_ai > 2)) { if ((s_playerA === "spiderRev")) { s_playerB = "spiderRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      case 736:
      case 735:
      if (!((v_infoBDamageKnee > 2))) { pc = 738; continue main; }
      if ((s_playerA === "kickRev")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (((s_playerA === "sit2Rev") || (s_playerA === "kickRev"))) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 738:
      case 737:
      case 734:
      case 733:
      if ((v_infoBStrike === 0)) { s_playerB = "kickRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "headButtRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spiderRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "standingRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "sit2Rev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_playerB = "kneeRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 6)) { s_playerB = "standingRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 7)) { s_stick2 = "right"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 728:
      case 727:
      case 698:
      case 697:
      case 654:
      case 653:
      if (!((((v_ai === 4) || (v_ai === 5)) || (v_ai === 7)))) { pc = 740; continue main; }
      if (!((s_direction === "normal"))) { pc = 742; continue main; }
      v_distance = (v_xB - v_xA);
      if (!((v_distance >= 15))) { pc = 744; continue main; }
      s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; }
      case 744:
      case 743:
      if (!((v_distance < 15))) { pc = 746; continue main; }
      if ((v_ai === 7)) { if ((s_playerA === "behead")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      case 746:
      case 745:
      if (((v_distance === 12) && (s_playerA === "standing"))) { s_playerB = "behead"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!(((v_distance > 9) && (v_distance < 15)))) { pc = 748; continue main; }
      if ((s_stick1 === "left")) { s_playerB = "standing"; { pc = 25; continue main; } }
      s_stick2 = "left"; { pc = 24; continue main; }
      case 748:
      case 747:
      if (!((v_distance === 9))) { pc = 750; continue main; }
      if ((v_waitingA > 50)) { s_playerB = "behead"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_demo === "yes")) { if ((v_waitingA > 13)) { s_playerB = "behead"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      if ((s_playerA === "rollBack")) { s_playerB = "knee"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_ai < 7)) { if ((s_aBusy === "yes")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      if ((v_ai === 7)) { if ((s_aBusy === "yes")) { s_stick2 = "left"; { pc = 24; continue main; } } }
      case 750:
      case 749:
      if (!(((v_distance < 9) && (v_distance > 6)))) { pc = 752; continue main; }
      if (((s_demo === "no") && (s_playerA === "rollForward"))) { s_playerB = "jump"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_playerA === "rollBack")) { s_playerB = "knee"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_stick1 === "left")) { s_playerB = "spider"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!((v_ai === 5))) { pc = 754; continue main; }
      if ((s_playerA === "forehead")) { s_playerB = "protectHead"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 754:
      case 753:
      if (!((v_infoBDamageKnee > 4))) { pc = 756; continue main; }
      if ((((s_playerA === "sit2") || (s_playerA === "knee")) || (s_playerA === "spider"))) { s_playerB = "spider"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 756:
      case 755:
      if (!((v_infoBDamageKnee > 2))) { pc = 758; continue main; }
      if ((((s_playerA === "sit2") || (s_playerA === "knee")) || (s_playerA === "spider"))) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 758:
      case 757:
      if (!((v_infoBDamageHead > 2))) { pc = 760; continue main; }
      if ((s_playerA === "neck")) { s_playerB = "knee"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 760:
      case 759:
      if (!((v_infoBDamageForehead > 2))) { pc = 762; continue main; }
      if ((v_ai < 7)) { if ((s_playerA === "forehead")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      case 762:
      case 761:
      if ((v_infoBStrike === 0)) { s_playerB = "bodyChop"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "forehead"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spider"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "spider"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "neck"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_stick2 = "left"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 752:
      case 751:
      if (!((v_distance <= 6))) { pc = 764; continue main; }
      if (((s_demo === "no") && (s_playerA === "jump"))) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_ai > 4)) { if ((s_playerA === "bodyChop")) { s_playerB = "protectBody"; v_refTimeB = v_time; { pc = 25; continue main; } } }
      if (((v_ai > 4) && (v_ai < 7))) { if ((s_playerA === "knee")) { s_playerB = "jump"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      if (!((v_infoBDamageKnee > 4))) { pc = 766; continue main; }
      if ((((s_playerA === "sit2") || (s_playerA === "knee")) || (s_playerA === "spider"))) { s_playerB = "spider"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 766:
      case 765:
      if (!((v_infoBDamageKnee > 2))) { pc = 768; continue main; }
      if ((s_playerA === "kick")) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((((s_playerA === "sit2") || (s_playerA === "knee")) || (s_playerA === "spider"))) { s_playerB = "rollForward"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 768:
      case 767:
      if ((v_infoBStrike === 0)) { s_playerB = "kick"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "headButt"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spider"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "knee"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "knee"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_stick2 = "left"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 764:
      case 763:
      case 742:
      case 741:
      if (!((s_direction === "reverse"))) { pc = 770; continue main; }
      v_distance = (v_xA - v_xB);
      if (!((v_distance >= 15))) { pc = 772; continue main; }
      s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; }
      case 772:
      case 771:
      if (!((v_distance < 15))) { pc = 774; continue main; }
      if ((v_ai === 7)) { if ((s_playerA === "beheadRev")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      case 774:
      case 773:
      if (((v_distance === 12) && (s_playerA === "standingRev"))) { s_playerB = "beheadRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!(((v_distance > 9) && (v_distance < 15)))) { pc = 776; continue main; }
      if ((s_stick1 === "right")) { s_playerB = "standingRev"; { pc = 25; continue main; } }
      s_stick2 = "right"; { pc = 24; continue main; }
      case 776:
      case 775:
      if (!((v_distance === 9))) { pc = 778; continue main; }
      if ((v_waitingA > 50)) { s_playerB = "beheadRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_demo === "yes")) { if ((v_waitingA > 50)) { s_playerB = "beheadRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      if ((s_playerA === "rollBackRev")) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_ai < 7)) { if ((s_aBusy === "yes")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      if ((v_ai === 7)) { if ((s_aBusy === "yes")) { s_stick2 = "right"; { pc = 24; continue main; } } }
      case 778:
      case 777:
      if (!(((v_distance < 9) && (v_distance > 6)))) { pc = 780; continue main; }
      if (((s_demo === "no") && (s_playerA === "rollForward"))) { s_playerB = "jumpRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_playerA === "rollBackRev")) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((s_stick1 === "right")) { s_playerB = "spiderRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if (!((v_ai === 5))) { pc = 782; continue main; }
      if ((s_playerA === "foreheadRev")) { s_playerB = "protectHeadRev"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 782:
      case 781:
      if (!((v_infoBDamageKnee > 4))) { pc = 784; continue main; }
      if ((((s_playerA === "sit2Rev") || (s_playerA === "kneeRev")) || (s_playerA === "spiderRev"))) { s_playerB = "spiderRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 784:
      case 783:
      if (!((v_infoBDamageKnee > 2))) { pc = 786; continue main; }
      if ((((s_playerA === "sit2Rev") || (s_playerA === "kneeRev")) || (s_playerA === "spiderRev"))) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 786:
      case 785:
      if (!((v_infoBDamageHead > 2))) { pc = 788; continue main; }
      if ((s_playerA === "neckRev")) { s_playerB = "kneeRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 788:
      case 787:
      if (!((v_infoBDamageForehead > 2))) { pc = 790; continue main; }
      if ((v_ai < 7)) { if ((s_playerA === "foreheadRev")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      case 790:
      case 789:
      if ((v_infoBStrike === 0)) { s_playerB = "bodyChopRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "foreheadRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spiderRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "spiderRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "neckRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_stick2 = "right"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 780:
      case 779:
      if (!((v_distance <= 6))) { pc = 792; continue main; }
      if (((s_demo === "no") && (s_playerA === "jumpRev"))) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_ai > 4)) { if ((s_playerA === "bodyChopRev")) { s_playerB = "protectBodyRev"; v_refTimeB = v_time; { pc = 25; continue main; } } }
      if (((v_ai > 4) && (v_ai < 7))) { if ((s_playerA === "kneeRev")) { s_playerB = "jumpRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } } }
      if (!((v_infoBDamageKnee > 4))) { pc = 794; continue main; }
      if ((((s_playerA === "sit2Rev") || (s_playerA === "kneeRev")) || (s_playerA === "spiderRev"))) { s_playerB = "spiderRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 794:
      case 793:
      if (!((v_infoBDamageKnee > 2))) { pc = 796; continue main; }
      if ((s_playerA === "kickRev")) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((((s_playerA === "sit2Rev") || (s_playerA === "kneeRev")) || (s_playerA === "spiderRev"))) { s_playerB = "rollForwardRev"; v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      case 796:
      case 795:
      if ((v_infoBStrike === 0)) { s_playerB = "kickRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 1)) { s_playerB = "headButtRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 2)) { s_playerB = "spiderRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 3)) { s_playerB = "kneeRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 4)) { s_playerB = "kneeRev"; v_infoBStrike = (v_infoBStrike + 1); v_refTimeB = v_time; s_bBusy = "yes"; { pc = 25; continue main; } }
      if ((v_infoBStrike === 5)) { s_stick2 = "right"; v_infoBStrike = 0; { pc = 24; continue main; } }
      case 792:
      case 791:
      case 770:
      case 769:
      case 740:
      case 739:
      case 652:
      case 651:
      if ((s_stick2 === "upLeft")) { { pc = 24; continue main; } }
      if ((s_stick2 === "upRight")) { { pc = 24; continue main; } }
      if ((s_stick2 === "downLeft")) { { pc = 24; continue main; } }
      if ((s_stick2 === "downRight")) { { pc = 24; continue main; } }
      if ((s_stick2 === "down")) { { pc = 24; continue main; } }
      if ((s_stick2 === "up")) { { pc = 24; continue main; } }
      if ((s_stick2 === "left")) { { pc = 24; continue main; } }
      if ((s_stick2 === "right")) { { pc = 24; continue main; } }
      v_spriteAdvanceB = 0;
      v_spriteRetreatB = 0;
      s_protectBodyB = "no"; s_protectHeadB = "no";
      v_waitingB = (v_waitingB + 1);
      s_stick2 = "neutral";
      s_sitB = "no";
      if ((s_playerB === "sit2")) { s_playerB = "standUp"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((s_playerB === "sit2Rev")) { s_playerB = "standUpRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (!((s_direction === "normal"))) { pc = 798; continue main; }
      if ((v_waitingB > 250)) { s_playerB = "waiting"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 798:
      case 797:
      if (!((s_direction === "reverse"))) { pc = 800; continue main; }
      if ((v_waitingB > 250)) { s_playerB = "waitingRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 800:
      case 799:
      if ((s_direction === "normal")) { s_playerB = "standing"; }
      if ((s_direction === "reverse")) { s_playerB = "standingRev"; }
      { pc = 25; continue main; }
      case 24: // actionB
      v_waitingB = 1;
      if (!((s_mode === "solo"))) { pc = 802; continue main; }
      if (!((s_direction === "normal"))) { pc = 804; continue main; }
      if (!((s_stick2 === "left"))) { pc = 806; continue main; }
      s_protectBodyB = "no";
      if ((v_spriteAdvanceB === 1)) { s_playerB = "advance1"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 2)) { s_playerB = "advance2"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 3)) { s_playerB = "advance3"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 4)) { s_playerB = "advance4"; { pc = 25; continue main; } }
      s_playerB = "advance"; v_refTimeB = v_time;
      case 806:
      case 805:
      if (!((s_stick2 === "right"))) { pc = 808; continue main; }
      s_protectHeadB = "no";
      if ((v_spriteRetreatB === 1)) { s_playerB = "retreat1"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 2)) { s_playerB = "retreat2"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 3)) { s_playerB = "retreat3"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 4)) { s_playerB = "retreat4"; { pc = 25; continue main; } }
      s_playerB = "retreat"; v_refTimeB = v_time;
      case 808:
      case 807:
      case 804:
      case 803:
      if (!((s_direction === "reverse"))) { pc = 810; continue main; }
      if (!((s_stick2 === "right"))) { pc = 812; continue main; }
      s_protectBodyB = "no";
      if ((v_spriteAdvanceB === 1)) { s_playerB = "advance1Rev"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 2)) { s_playerB = "advance2Rev"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 3)) { s_playerB = "advance3Rev"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 4)) { s_playerB = "advance4Rev"; { pc = 25; continue main; } }
      s_playerB = "advanceRev"; v_refTimeB = v_time;
      case 812:
      case 811:
      if (!((s_stick2 === "left"))) { pc = 814; continue main; }
      s_protectHeadB = "no";
      if ((v_spriteRetreatB === 1)) { s_playerB = "retreat1Rev"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 2)) { s_playerB = "retreat2Rev"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 3)) { s_playerB = "retreat3Rev"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 4)) { s_playerB = "retreat4Rev"; { pc = 25; continue main; } }
      s_playerB = "retreatRev"; v_refTimeB = v_time;
      case 814:
      case 813:
      case 810:
      case 809:
      { pc = 25; continue main; }
      case 802:
      case 801:
      if (!((s_direction === "normal"))) { pc = 816; continue main; }
      if (!((s_stick2 === "left"))) { pc = 818; continue main; }
      s_protectBodyB = "no";
      if ((v_spriteAdvanceB === 1)) { s_playerB = "advance1"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 2)) { s_playerB = "advance2"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 3)) { s_playerB = "advance3"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 4)) { s_playerB = "advance4"; { pc = 25; continue main; } }
      s_playerB = "advance"; v_refTimeB = v_time;
      if (((s_attackB === "yes") && (s_entry === "no"))) { s_playerB = "bodyChop"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 818:
      case 817:
      if (!((s_stick2 === "right"))) { pc = 820; continue main; }
      s_protectHeadB = "no";
      if ((v_spriteRetreatB === 1)) { s_playerB = "retreat1"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 2)) { s_playerB = "retreat2"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 3)) { s_playerB = "retreat3"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 4)) { s_playerB = "retreat4"; { pc = 25; continue main; } }
      s_playerB = "retreat"; v_refTimeB = v_time;
      if (((s_attackB === "yes") && (s_exitB === "no"))) { s_playerB = "behead"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 820:
      case 819:
      case 816:
      case 815:
      if (!((s_direction === "reverse"))) { pc = 822; continue main; }
      if (!((s_stick2 === "right"))) { pc = 824; continue main; }
      s_protectBodyB = "no";
      if ((v_spriteAdvanceB === 1)) { s_playerB = "advance1Rev"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 2)) { s_playerB = "advance2Rev"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 3)) { s_playerB = "advance3Rev"; { pc = 25; continue main; } }
      if ((v_spriteAdvanceB === 4)) { s_playerB = "advance4Rev"; { pc = 25; continue main; } }
      s_playerB = "advanceRev"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "bodyChopRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 824:
      case 823:
      if (!((s_stick2 === "left"))) { pc = 826; continue main; }
      s_protectHeadB = "no";
      if ((v_spriteRetreatB === 1)) { s_playerB = "retreat1Rev"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 2)) { s_playerB = "retreat2Rev"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 3)) { s_playerB = "retreat3Rev"; { pc = 25; continue main; } }
      if ((v_spriteRetreatB === 4)) { s_playerB = "retreat4Rev"; { pc = 25; continue main; } }
      s_playerB = "retreatRev"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "beheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 826:
      case 825:
      case 822:
      case 821:
      if (!((s_direction === "normal"))) { pc = 828; continue main; }
      if (!((s_stick2 === "up"))) { pc = 830; continue main; }
      s_protectBodyB = "no"; s_protectHeadB = "no";
      s_playerB = "jump"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; }
      case 830:
      case 829:
      case 828:
      case 827:
      if (!((s_direction === "reverse"))) { pc = 832; continue main; }
      if (!((s_stick2 === "up"))) { pc = 834; continue main; }
      s_protectBodyB = "no"; s_protectHeadB = "no";
      s_playerB = "jumpRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; }
      case 834:
      case 833:
      case 832:
      case 831:
      if (!((s_direction === "normal"))) { pc = 836; continue main; }
      if (!((s_stick2 === "down"))) { pc = 838; continue main; }
      if ((s_attackB === "yes")) { s_playerB = "knee"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((s_sitB === "yes")) { s_playerB = "sit2"; { pc = 25; continue main; } }
      s_playerB = "sit"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; }
      case 838:
      case 837:
      case 836:
      case 835:
      if (!((s_direction === "reverse"))) { pc = 840; continue main; }
      if (!((s_stick2 === "down"))) { pc = 842; continue main; }
      if ((s_attackB === "yes")) { s_playerB = "kneeRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((s_sitB === "yes")) { s_playerB = "sit2Rev"; { pc = 25; continue main; } }
      s_playerB = "sitRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; }
      case 842:
      case 841:
      case 840:
      case 839:
      if (!((s_direction === "normal"))) { pc = 844; continue main; }
      if (!((s_stick2 === "downLeft"))) { pc = 846; continue main; }
      s_playerB = "rollForward"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "kick"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 846:
      case 845:
      case 844:
      case 843:
      if (!((s_direction === "reverse"))) { pc = 848; continue main; }
      if (!((s_stick2 === "downRight"))) { pc = 850; continue main; }
      s_playerB = "rollForwardRev"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "kickRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 850:
      case 849:
      case 848:
      case 847:
      if (!((s_direction === "normal"))) { pc = 852; continue main; }
      if (!((s_stick2 === "downRight"))) { pc = 854; continue main; }
      s_playerB = "rollBack"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "forehead"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 854:
      case 853:
      case 852:
      case 851:
      if (!((s_direction === "reverse"))) { pc = 856; continue main; }
      if (!((s_stick2 === "downLeft"))) { pc = 858; continue main; }
      s_playerB = "rollBackRev"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "foreheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 858:
      case 857:
      case 856:
      case 855:
      if (!((s_direction === "normal"))) { pc = 860; continue main; }
      if (!((s_stick2 === "upRight"))) { pc = 862; continue main; }
      if ((s_protectHeadB === "yes")) { s_playerB = "protectHead"; { pc = 25; continue main; } }
      s_playerB = "protectHead1"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "spider"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 862:
      case 861:
      case 860:
      case 859:
      if (!((s_direction === "reverse"))) { pc = 864; continue main; }
      if (!((s_stick2 === "upLeft"))) { pc = 866; continue main; }
      if ((s_protectHeadB === "yes")) { s_playerB = "protectHeadRev"; { pc = 25; continue main; } }
      s_playerB = "protectHeadRev1"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "spiderRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 866:
      case 865:
      case 864:
      case 863:
      if (!((s_direction === "normal"))) { pc = 868; continue main; }
      if (!((s_stick2 === "upLeft"))) { pc = 870; continue main; }
      if ((s_protectBodyB === "yes")) { s_playerB = "protectBody"; { pc = 25; continue main; } }
      s_playerB = "protectBody1"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "headButt"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 870:
      case 869:
      case 868:
      case 867:
      if (!((s_direction === "reverse"))) { pc = 872; continue main; }
      if (!((s_stick2 === "upRight"))) { pc = 874; continue main; }
      if ((s_protectBodyB === "yes")) { s_playerB = "protectBodyRev"; { pc = 25; continue main; } }
      s_playerB = "protectBodyRev1"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_attackB === "yes")) { s_playerB = "headButtRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 874:
      case 873:
      case 872:
      case 871:
      case 25: // stateB
      if (!((s_playerB === "standing"))) { pc = 876; continue main; }
      s_spriteB = "standing"; s_beheadB = "yes";
      if ((s_wizard === "yes")) { s_spriteB = "drax1"; s_beheadB = "no"; }
      if ((s_marianna === "yes")) { s_spriteB = "marianna"; s_beheadB = "no"; }
      s_bloodB = "no";
      v_xAttackB = (v_xB + 4); v_yAttackB = 14;
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if (!((s_mode === "solo"))) { pc = 878; continue main; }
      if ((v_time > (v_refTimeB + 20))) { s_bBusy = "no"; }
      case 878:
      case 877:
      case 876:
      case 875:
      if (!((s_playerB === "standingRev"))) { pc = 880; continue main; }
      s_spriteB = "standingRev";
      s_beheadB = "yes";
      s_bloodB = "no";
      v_xAttackB = v_xB; v_yAttackB = 14;
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if (!((s_mode === "solo"))) { pc = 882; continue main; }
      if ((v_time > (v_refTimeB + 20))) { s_bBusy = "no"; }
      case 882:
      case 881:
      case 880:
      case 879:
      if (!((s_playerB === "waiting"))) { pc = 884; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if ((v_time > (v_refTimeB + 50))) { s_bBusy = "no"; v_waitingB = 1; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 37))) { s_spriteB = "waiting1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "waiting2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { s_spriteB = "waiting3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "waiting2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { s_spriteB = "waiting1"; { pc = 29; continue main; } }
      case 884:
      case 883:
      if (!((s_playerB === "waitingRev"))) { pc = 886; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if ((v_time > (v_refTimeB + 50))) { s_bBusy = "no"; v_waitingB = 1; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 37))) { s_spriteB = "waiting1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "waiting2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { s_spriteB = "waiting3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "waiting2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { s_spriteB = "waiting1Rev"; { pc = 29; continue main; } }
      case 886:
      case 885:
      if (!((s_playerB === "jump"))) { pc = 888; continue main; }
      v_xAttackB = (v_xB + 4); v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yKneeB = v_yBodyB; v_yAttackB = 14;
      s_beheadB = "no";
      if ((s_attackB === "yes")) { s_playerB = "neck"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_spriteB = "standing"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "standing"; v_xBodyB = v_xB; v_xKneeB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "jump1"; v_xBodyB = v_xB; v_xKneeB = (v_xB + 1); s_beheadB = "yes"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 13))) { s_spriteB = "jump2"; v_xBodyB = (v_xB + 3); v_xKneeB = (v_xB + 3); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { s_spriteB = "jump1"; v_xBodyB = v_xB; v_xKneeB = (v_xB + 3); }
      s_spriteB = "jump1";
      case 888:
      case 887:
      if (!((s_playerB === "jumpRev"))) { pc = 890; continue main; }
      v_xAttackB = v_xB; v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yKneeB = v_yBodyB; v_yAttackB = 14;
      s_beheadB = "no";
      if ((s_attackB === "yes")) { s_playerB = "neckRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_spriteB = "standingRev"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "standingRev"; v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "jump1Rev"; v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 1); s_beheadB = "yes"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 13))) { s_spriteB = "jump2Rev"; v_xBodyB = (v_xB + 1); v_xKneeB = (v_xB + 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { s_spriteB = "jump1Rev"; v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 1); }
      s_spriteB = "jump1Rev";
      case 890:
      case 889:
      if (!((s_playerB === "advance"))) { pc = 892; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      if (((s_attackB === "yes") && (s_entry === "no"))) { s_playerB = "bodyChop"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      s_spriteB = "walk1"; v_spriteAdvanceB = 1; v_xB = (v_xB - 1);
      case 892:
      case 891:
      if (!((s_playerB === "advance1"))) { pc = 894; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      if (((s_attackB === "yes") && (s_entry === "no"))) { s_playerB = "bodyChop"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { v_xB = (v_xB - 1); s_spriteB = "walk2"; v_spriteAdvanceB = 2; }
      case 894:
      case 893:
      if (!((s_playerB === "advance2"))) { pc = 896; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      s_spriteB = "walk2";
      if (((s_attackB === "yes") && (s_entry === "no"))) { s_playerB = "bodyChop"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { v_xB = (v_xB - 1); s_spriteB = "walk3"; v_spriteAdvanceB = 3; }
      case 896:
      case 895:
      if (!((s_playerB === "advance3"))) { pc = 898; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      s_spriteB = "walk3";
      if (((s_attackB === "yes") && (s_entry === "no"))) { s_playerB = "bodyChop"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 27))) { v_xB = (v_xB - 1); s_spriteB = "standing"; v_spriteAdvanceB = 4; }
      case 898:
      case 897:
      if (!((s_playerB === "advance4"))) { pc = 900; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      s_spriteB = "standing";
      if (((s_attackB === "yes") && (s_entry === "no"))) { s_playerB = "bodyChop"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 36))) { s_playerB = "standing"; v_refTimeB = v_time; v_spriteAdvanceB = 0; }
      case 900:
      case 899:
      if (!((s_playerB === "advanceRev"))) { pc = 902; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      if ((s_attackB === "yes")) { s_playerB = "bodyChopRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      s_spriteB = "walk1Rev"; v_spriteAdvanceB = 1; v_xB = (v_xB + 1);
      case 902:
      case 901:
      if (!((s_playerB === "advance1Rev"))) { pc = 904; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      if ((s_attackB === "yes")) { s_playerB = "bodyChopRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { v_xB = (v_xB + 1); s_spriteB = "walk2Rev"; v_spriteAdvanceB = 2; }
      case 904:
      case 903:
      if (!((s_playerB === "advance2Rev"))) { pc = 906; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      s_spriteB = "walk2Rev";
      if ((s_attackB === "yes")) { s_playerB = "bodyChopRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { v_xB = (v_xB + 1); s_spriteB = "walk3Rev"; v_spriteAdvanceB = 3; }
      case 906:
      case 905:
      if (!((s_playerB === "advance3Rev"))) { pc = 908; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      s_spriteB = "walk3Rev";
      if ((s_attackB === "yes")) { s_playerB = "bodyChopRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 27))) { v_xB = (v_xB + 1); s_spriteB = "standingRev"; v_spriteAdvanceB = 4; }
      case 908:
      case 907:
      if (!((s_playerB === "advance4Rev"))) { pc = 910; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      s_spriteB = "standingRev";
      if ((s_attackB === "yes")) { s_playerB = "bodyChopRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 36))) { s_playerB = "standingRev"; v_refTimeB = v_time; v_spriteAdvanceB = 0; }
      case 910:
      case 909:
      if (!((s_playerB === "retreat"))) { pc = 912; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      if (((s_attackB === "yes") && (s_exitB === "no"))) { s_playerB = "behead"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      s_spriteB = "walk3"; v_spriteRetreatB = 1; v_xB = (v_xB + 1);
      case 912:
      case 911:
      if (!((s_playerB === "retreat1"))) { pc = 914; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      if (((s_attackB === "yes") && (s_exitB === "no"))) { s_playerB = "behead"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { v_xB = (v_xB + 1); s_spriteB = "walk2"; v_spriteRetreatB = 2; }
      case 914:
      case 913:
      if (!((s_playerB === "retreat2"))) { pc = 916; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      s_spriteB = "walk2";
      if (((s_attackB === "yes") && (s_exitB === "no"))) { s_playerB = "behead"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { v_xB = (v_xB + 1); s_spriteB = "walk1"; v_spriteRetreatB = 3; }
      case 916:
      case 915:
      if (!((s_playerB === "retreat3"))) { pc = 918; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      s_spriteB = "walk1";
      if (((s_attackB === "yes") && (s_exitB === "no"))) { s_playerB = "behead"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 27))) { v_xB = (v_xB + 1); s_spriteB = "standing"; v_spriteRetreatB = 4; }
      case 918:
      case 917:
      if (!((s_playerB === "retreat4"))) { pc = 920; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      s_spriteB = "standing";
      if (((s_attackB === "yes") && (s_exitB === "no"))) { s_playerB = "behead"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 36))) { s_playerB = "standing"; v_refTimeB = v_time; v_spriteRetreatB = 0; }
      case 920:
      case 919:
      if (!((s_playerB === "retreatRev"))) { pc = 922; continue main; }
      v_xAttackB = v_xB;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if ((s_attackB === "yes")) { s_playerB = "beheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      s_spriteB = "walk3Rev"; v_spriteRetreatB = 1; v_xB = (v_xB - 1);
      case 922:
      case 921:
      if (!((s_playerB === "retreat1Rev"))) { pc = 924; continue main; }
      v_xAttackB = v_xB;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if ((s_attackB === "yes")) { s_playerB = "beheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { v_xB = (v_xB - 1); s_spriteB = "walk2Rev"; v_spriteRetreatB = 2; }
      case 924:
      case 923:
      if (!((s_playerB === "retreat2Rev"))) { pc = 926; continue main; }
      v_xAttackB = v_xB;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_spriteB = "walk2Rev";
      if ((s_attackB === "yes")) { s_playerB = "beheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { v_xB = (v_xB - 1); s_spriteB = "walk1Rev"; v_spriteRetreatB = 3; }
      case 926:
      case 925:
      if (!((s_playerB === "retreat3Rev"))) { pc = 928; continue main; }
      v_xAttackB = v_xB;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_spriteB = "walk1Rev";
      if ((s_attackB === "yes")) { s_playerB = "beheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 27))) { v_xB = (v_xB - 1); s_spriteB = "standingRev"; v_spriteRetreatB = 4; }
      case 928:
      case 927:
      if (!((s_playerB === "retreat4Rev"))) { pc = 930; continue main; }
      v_xAttackB = v_xB;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_spriteB = "standingRev";
      if ((s_attackB === "yes")) { s_playerB = "beheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 36))) { s_playerB = "standingRev"; v_refTimeB = v_time; v_spriteRetreatB = 0; }
      case 930:
      case 929:
      if (!((s_playerB === "sit"))) { pc = 932; continue main; }
      v_xAttackB = (v_xB + 4);
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = v_xB;
      s_spriteB = "sit1";
      if ((v_time > (v_refTimeB + 10))) { s_playerB = "sit2"; { pc = 29; continue main; } }
      if ((s_attackB === "yes")) { s_playerB = "knee"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 932:
      case 931:
      if (!((s_playerB === "sit2"))) { pc = 934; continue main; }
      s_sitB = "yes";
      v_xAttackB = (v_xB + 4);
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = v_xB; v_xKneeB = v_xB;
      s_spriteB = "sit2";
      if ((s_attackB === "yes")) { s_playerB = "knee"; s_bBusy = "yes"; v_refTimeB = v_time; }
      if (!((s_mode === "solo"))) { pc = 936; continue main; }
      if ((v_time > (v_refTimeB + 20))) { s_bBusy = "no"; }
      { pc = 29; continue main; }
      case 936:
      case 935:
      s_bBusy = "no";
      case 934:
      case 933:
      if (!((s_playerB === "standUp"))) { pc = 938; continue main; }
      v_xAttackB = (v_xB + 4); v_yAttackA = 14;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = v_xB; v_xKneeB = v_xB;
      s_spriteB = "sit1";
      if ((v_time > (v_refTimeB + 10))) { s_playerB = "standing"; s_bBusy = "no"; { pc = 29; continue main; } }
      if ((s_attackB === "yes")) { s_playerB = "knee"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 938:
      case 937:
      if (!((s_playerB === "sitRev"))) { pc = 940; continue main; }
      v_xAttackB = v_xB;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = (v_xB + 4);
      s_spriteB = "sit1Rev";
      if ((v_time > (v_refTime + 10))) { s_playerB = "sit2Rev"; { pc = 29; continue main; } }
      if ((s_attackB === "yes")) { s_playerB = "kneeRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 940:
      case 939:
      if (!((s_playerB === "sit2Rev"))) { pc = 942; continue main; }
      s_sitB = "yes";
      v_xAttackB = v_xB;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_spriteB = "sit2Rev";
      if ((s_attackB === "yes")) { s_playerB = "kneeRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      if (!((s_mode === "solo"))) { pc = 944; continue main; }
      if ((v_time > (v_refTimeB + 20))) { s_bBusy = "no"; }
      { pc = 29; continue main; }
      case 944:
      case 943:
      s_bBusy = "no";
      case 942:
      case 941:
      if (!((s_playerB === "standUpRev"))) { pc = 946; continue main; }
      v_xAttackB = v_xB; v_yAttackA = 14;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_spriteB = "sit1Rev";
      if ((v_time > (v_refTimeB + 10))) { s_playerB = "standingRev"; s_bBusy = "no"; { pc = 29; continue main; } }
      if ((s_attackB === "yes")) { s_playerB = "kneeRev"; s_bBusy = "yes"; v_refTimeB = v_time; }
      case 946:
      case 945:
      if (!((s_playerB === "rollForward"))) { pc = 948; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = v_xB;
      v_yKneeB = 20; v_yAttackB = v_yKneeB; v_xAttackB = (v_xB + 4);
      if ((s_attackB === "yes")) { s_playerB = "kick"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (!((v_time > (v_refTimeB + 38)))) { pc = 950; continue main; }
      s_spriteB = "standing"; v_xHeadB = v_xB; v_xBodyB = v_xB;
      s_bBusy = "no"; v_xB = (v_xB - 1); s_playerB = "endRoll"; { pc = 26; continue main; }
      case 950:
      case 949:
      if ((v_time > (v_refTimeB + 33))) { s_spriteB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 31))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { v_xB = (v_xB - 1); s_spriteB = "roll6"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 29))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 28))) { v_xB = (v_xB - 1); s_spriteB = "roll5"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 26))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 25))) { v_xB = (v_xB - 1); s_spriteB = "roll5"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 22))) { v_xB = (v_xB - 1); s_spriteB = "roll4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { v_xB = (v_xB - 1); s_spriteB = "roll4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 17))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 16))) { v_xB = (v_xB - 1); v_xAttackB = (v_xB - 1); s_spriteB = "roll3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 14))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 13))) { v_xB = (v_xB - 1); v_xAttackB = (v_xB - 1); s_spriteB = "roll3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { v_xB = (v_xB - 1); s_spriteB = "roll2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { v_xB = (v_xB - 1); s_spriteB = "roll2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 4))) { v_xB = (v_xB - 1); s_spriteB = "roll1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB - 1); s_spriteB = "roll1"; { pc = 29; continue main; } }
      case 948:
      case 947:
      case 26: // endRollB
      if (!((s_playerB === "endRoll"))) { pc = 952; continue main; }
      if (!((v_xB > v_xA))) { pc = 954; continue main; }
      s_playerB = "standing";
      s_spriteB = "standing";
      v_xAttackB = (v_xB + 4); v_yAttackB = 17;
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      { pc = 29; continue main; }
      case 954:
      case 953:
      if (!((v_xB < (v_xA + 1)))) { pc = 956; continue main; }
      s_playerA = "turn"; v_yAttackA = 14; s_aBusy = "yes"; v_refTime = v_time;
      s_playerB = "turn"; v_yAttackB = 14; s_bBusy = "yes"; v_refTimeB = v_time;
      { pc = 36; continue main; }
      case 956:
      case 955:
      case 952:
      case 951:
      if (!((s_playerB === "rollForwardRev"))) { pc = 958; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = (v_xB + 4);
      v_yKneeB = 20; v_yAttackB = v_yKneeB; v_xAttackB = v_xB;
      if ((s_attackB === "yes")) { s_playerB = "kickRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (!((v_time > (v_refTimeB + 38)))) { pc = 960; continue main; }
      s_spriteB = "standingRev"; v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4);
      s_bBusy = "no"; v_xB = (v_xB + 1); s_playerB = "endRollRev"; { pc = 27; continue main; }
      case 960:
      case 959:
      if ((v_time > (v_refTimeB + 33))) { s_spriteB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 31))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { v_xB = (v_xB + 1); s_spriteB = "roll6Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 29))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 28))) { v_xB = (v_xB + 1); s_spriteB = "roll5Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 26))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 25))) { v_xB = (v_xB + 1); s_spriteB = "roll5Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 22))) { v_xB = (v_xB + 1); s_spriteB = "roll4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { v_xB = (v_xB + 1); s_spriteB = "roll4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 17))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 16))) { v_xB = (v_xB + 1); v_xAttackB = (v_xB + 5); s_spriteB = "roll3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 14))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 13))) { v_xB = (v_xB + 1); v_xAttackB = (v_xB + 5); s_spriteB = "roll3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { v_xB = (v_xB + 1); s_spriteB = "roll2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { v_xB = (v_xB + 1); s_spriteB = "roll2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 4))) { v_xB = (v_xB + 1); s_spriteB = "roll1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB + 1); s_spriteB = "roll1Rev"; { pc = 29; continue main; } }
      case 958:
      case 957:
      case 27: // endRollBRev
      if (!((s_playerB === "endRollRev"))) { pc = 962; continue main; }
      if (!((v_xB < v_xA))) { pc = 964; continue main; }
      s_playerB = "standingRev";
      s_spriteB = "standingRev";
      v_xAttackB = v_xB; v_yAttackB = 17;
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      { pc = 29; continue main; }
      case 964:
      case 963:
      if (!((v_xB > (v_xA - 1)))) { pc = 966; continue main; }
      s_playerA = "turnRev"; s_aBusy = "yes"; v_refTime = v_time;
      s_playerB = "turnRev"; s_bBusy = "yes"; v_refTimeB = v_time;
      { pc = 36; continue main; }
      case 966:
      case 965:
      case 962:
      case 961:
      if (!((s_playerB === "rollBack"))) { pc = 968; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = v_xB;
      v_yKneeB = 20; v_yAttackB = v_yKneeB; v_xAttackB = (v_xB + 4);
      if ((s_attackB === "yes")) { s_playerB = "forehead"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (!((v_time > (v_refTimeB + 38)))) { pc = 970; continue main; }
      s_spriteB = "standing"; v_xHeadB = v_xB; v_xBodyB = v_xB;
      s_bBusy = "no"; s_playerB = "standing"; { pc = 29; continue main; }
      case 970:
      case 969:
      if ((v_time > (v_refTimeB + 33))) { s_spriteB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 29))) { v_xB = (v_xB + 1); s_spriteB = "roll1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 27))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 26))) { v_xB = (v_xB + 1); s_spriteB = "roll1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 24))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { v_xB = (v_xB + 1); s_spriteB = "roll2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 21))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { v_xB = (v_xB + 1); s_spriteB = "roll2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 17))) { v_xB = (v_xB + 1); s_spriteB = "roll3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 14))) { v_xB = (v_xB + 1); s_spriteB = "roll3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 12))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 11))) { v_xB = (v_xB + 1); s_spriteB = "roll4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { v_xB = (v_xB + 1); s_spriteB = "roll4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 6))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { v_xB = (v_xB + 1); s_spriteB = "roll5"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 3))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { v_xB = (v_xB + 1); s_spriteB = "roll6"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { s_spriteB = "roll6"; { pc = 29; continue main; } }
      case 968:
      case 967:
      if (!((s_playerB === "rollBackRev"))) { pc = 972; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = (v_xB + 4);
      v_yKneeB = 20; v_yAttackB = v_yKneeB; v_xAttackB = v_xB;
      if ((s_attackB === "yes")) { s_playerB = "foreheadRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (!((v_time > (v_refTimeB + 38)))) { pc = 974; continue main; }
      s_spriteB = "standingRev"; v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4);
      s_bBusy = "no"; s_playerB = "standingRev"; { pc = 29; continue main; }
      case 974:
      case 973:
      if ((v_time > (v_refTimeB + 33))) { s_spriteB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 29))) { v_xB = (v_xB - 1); s_spriteB = "roll1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 27))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 26))) { v_xB = (v_xB - 1); s_spriteB = "roll1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 24))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { v_xB = (v_xB - 1); s_spriteB = "roll2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 21))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { v_xB = (v_xB - 1); s_spriteB = "roll2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 17))) { v_xB = (v_xB - 1); s_spriteB = "roll3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 14))) { v_xB = (v_xB - 1); s_spriteB = "roll3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 12))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 11))) { v_xB = (v_xB - 1); s_spriteB = "roll4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { v_xB = (v_xB - 1); s_spriteB = "roll4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 6))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { v_xB = (v_xB - 1); s_spriteB = "roll5Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 3))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { v_xB = (v_xB - 1); s_spriteB = "roll6Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { s_spriteB = "roll6Rev"; { pc = 29; continue main; } }
      case 972:
      case 971:
      if (!((s_playerB === "protectHead1"))) { pc = 976; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      v_yKneeB = 20;
      if ((s_attackB === "yes")) { s_playerB = "spider"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { s_protectHeadB = "yes"; s_playerB = "protectHead"; s_bBusy = "no"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB + 1); s_spriteB = "walk1"; { pc = 29; continue main; } }
      case 976:
      case 975:
      if (!((s_playerB === "protectHead"))) { pc = 978; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_xAttackB = (v_xB + 4);
      v_yKneeB = 20;
      s_spriteB = "protectHead";
      if ((s_attackB === "yes")) { s_playerB = "spider"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 978:
      case 977:
      if (!((s_playerB === "protectHeadRev1"))) { pc = 980; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      v_yKneeB = 20;
      if ((s_attackB === "yes")) { s_playerB = "spiderRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { s_protectHeadB = "yes"; s_playerB = "protectHeadRev"; s_bBusy = "no"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB - 1); s_spriteB = "walk1Rev"; { pc = 29; continue main; } }
      case 980:
      case 979:
      if (!((s_playerB === "protectHeadRev"))) { pc = 982; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_xAttackB = v_xB;
      v_yKneeB = 20;
      s_spriteB = "protectHeadRev";
      if ((s_attackB === "yes")) { s_playerB = "spiderRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 982:
      case 981:
      if (!((s_playerB === "protectBody1"))) { pc = 984; continue main; }
      v_xAttackB = (v_xB + 4);
      v_yKneeB = 20;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      s_beheadB = "no";
      s_spriteB = "protectHead";
      if ((s_attackB === "yes")) { s_playerB = "headButt"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { s_playerB = "protectBody"; s_protectBodyB = "yes"; s_bBusy = "no"; }
      case 984:
      case 983:
      if (!((s_playerB === "protectBody"))) { pc = 986; continue main; }
      v_xAttackB = (v_xB + 4);
      v_yKneeB = 20;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      s_beheadB = "no";
      s_spriteB = "protectBody";
      if ((s_attackB === "yes")) { s_playerB = "headButt"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 986:
      case 985:
      if (!((s_playerB === "protectBodyRev1"))) { pc = 988; continue main; }
      v_xAttackB = v_xB;
      v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_beheadB = "no";
      s_spriteB = "protectHeadRev";
      if ((s_attackB === "yes")) { s_playerB = "headButtRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { s_playerB = "protectBodyRev"; s_protectBodyB = "yes"; s_bBusy = "no"; }
      case 988:
      case 987:
      if (!((s_playerB === "protectBodyRev"))) { pc = 990; continue main; }
      v_xAttackB = v_xB;
      v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_beheadB = "no";
      s_spriteB = "protectBodyRev";
      if ((s_attackB === "yes")) { s_playerB = "headButtRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      case 990:
      case 989:
      if (!((s_playerB === "neck"))) { pc = 992; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "neck2"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 31))) { v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 30)))) { pc = 994; continue main; }
      s_spriteB = "neck3";
      if ((s_playerA === "neck")) { { pc = 29; continue main; } }
      v_xHeadB = (v_xB + 4); v_xAttackB = (v_xB - 3); { pc = 29; continue main; }
      case 994:
      case 993:
      if ((v_time > (v_refTimeB + 16))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 15)))) { pc = 996; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "neck2"; v_yAttackB = v_yHeadB; { pc = 29; continue main; }
      case 996:
      case 995:
      if ((v_time > (v_refTimeB + 3))) { s_spriteB = "neck1"; { pc = 29; continue main; } }
      case 992:
      case 991:
      if (!((s_playerB === "neckRev"))) { pc = 998; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "neck2Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 31))) { v_xAttackB = v_xB; { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 30)))) { pc = 1000; continue main; }
      s_spriteB = "neck3Rev";
      if ((s_playerA === "neckRev")) { { pc = 29; continue main; } }
      v_xHeadB = v_xB; v_xAttackB = (v_xB + 7); { pc = 29; continue main; }
      case 1000:
      case 999:
      if ((v_time > (v_refTimeB + 16))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 15)))) { pc = 1002; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "neck2Rev"; v_yAttackB = v_yHeadB; { pc = 29; continue main; }
      case 1002:
      case 1001:
      if ((v_time > (v_refTimeB + 3))) { s_spriteB = "neck1Rev"; { pc = 29; continue main; } }
      case 998:
      case 997:
      if (!((s_playerB === "bodyChop"))) { pc = 1004; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "bodyChop2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 21))) { s_spriteB = "bodyChop3"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 20)))) { pc = 1006; continue main; }
      s_spriteB = "bodyChop3";
      if ((s_playerA === "bodyChop")) { { pc = 29; continue main; } }
      v_xBodyB = (v_xB + 4); v_xAttackB = (v_xB - 2); { pc = 29; continue main; }
      case 1006:
      case 1005:
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 10)))) { pc = 1008; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "bodyChop2"; v_yAttackB = v_yBodyB;
      case 1008:
      case 1007:
      s_spriteB = "bodyChop1";
      case 1004:
      case 1003:
      if (!((s_playerB === "bodyChopRev"))) { pc = 1010; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "bodyChop2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 21))) { s_spriteB = "bodyChop3Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 20)))) { pc = 1012; continue main; }
      s_spriteB = "bodyChop3Rev";
      if ((s_playerA === "bodyChopRev")) { { pc = 29; continue main; } }
      v_xBodyB = v_xB; v_xAttackB = (v_xB + 6); { pc = 29; continue main; }
      case 1012:
      case 1011:
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 10)))) { pc = 1014; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "bodyChop2Rev"; v_yAttackB = v_yBodyB; { pc = 29; continue main; }
      case 1014:
      case 1013:
      s_spriteB = "bodyChop1Rev";
      case 1010:
      case 1009:
      if (!((s_playerB === "knee"))) { pc = 1016; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = v_xB;
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "sit2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "knee2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 21))) { s_spriteB = "knee3"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 20)))) { pc = 1018; continue main; }
      s_spriteB = "knee3";
      if ((s_playerA === "knee")) { { pc = 29; continue main; } }
      v_xKneeB = (v_xB + 4); v_xAttackB = (v_xB - 3); { pc = 29; continue main; }
      case 1018:
      case 1017:
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 10)))) { pc = 1020; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "knee2"; v_yAttackB = v_yKneeB; { pc = 29; continue main; }
      case 1020:
      case 1019:
      s_spriteB = "knee1";
      case 1016:
      case 1015:
      if (!((s_playerB === "kneeRev"))) { pc = 1022; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = (v_xB + 4);
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "sit2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "knee2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 21))) { s_spriteB = "knee3Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 20)))) { pc = 1024; continue main; }
      s_spriteB = "knee3Rev";
      if ((s_playerA === "kneeRev")) { { pc = 29; continue main; } }
      v_xKneeB = v_xB; v_xAttackB = (v_xB + 7); { pc = 29; continue main; }
      case 1024:
      case 1023:
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 10)))) { pc = 1026; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "knee2Rev"; v_yAttackB = v_yKneeB; { pc = 29; continue main; }
      case 1026:
      case 1025:
      s_spriteB = "knee1Rev";
      case 1022:
      case 1021:
      if (!((s_playerB === "spider"))) { pc = 1028; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = (v_xB + 4); v_xKneeB = v_xB;
      v_yAttackB = v_yKneeB; v_xAttackB = (v_xB + 4); v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 24))) { s_bBusy = "no"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 18)))) { pc = 1030; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "web4";
      if ((s_playerA === "spider")) { { pc = 29; continue main; } }
      v_xAttackB = (v_xB - 1); { pc = 29; continue main; }
      case 1030:
      case 1029:
      if ((v_time > (v_refTimeB + 13))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 12))) { s_spriteB = "web3"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 6)))) { pc = 1032; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "web2"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; }
      case 1032:
      case 1031:
      s_spriteB = "web1";
      case 1028:
      case 1027:
      if (!((s_playerB === "spiderRev"))) { pc = 1034; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = v_xB; v_xKneeB = (v_xB + 4);
      v_yAttackB = v_yKneeB; v_xAttackB = v_xB; v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 24))) { s_bBusy = "no"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { v_xAttackB = v_xB; { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 18)))) { pc = 1036; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "web4Rev";
      if ((s_playerA === "spiderRev")) { { pc = 29; continue main; } }
      v_xAttackB = (v_xB + 5); { pc = 29; continue main; }
      case 1036:
      case 1035:
      if ((v_time > (v_refTimeB + 13))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 12))) { s_spriteB = "web3Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 6)))) { pc = 1038; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "web2Rev"; v_xAttackB = v_xB; { pc = 29; continue main; }
      case 1038:
      case 1037:
      s_spriteB = "web1Rev";
      case 1034:
      case 1033:
      if (!((s_playerB === "kick"))) { pc = 1040; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      s_spriteB = "foot1"; v_yAttackB = v_yKneeB; v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "foot2"; v_xAttackB = (v_xB - 1); }
      if ((v_time > (v_refTimeB + 16))) { s_spriteB = "foot2"; v_xAttackB = (v_xB + 4); }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "foot1"; }
      if ((v_time > (v_refTimeB + 45))) { s_spriteB = "standing"; }
      if ((v_time > (v_refTimeB + 50))) { s_bBusy = "no"; s_playerB = "standing"; }
      case 1040:
      case 1039:
      if (!((s_playerB === "kickRev"))) { pc = 1042; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      s_spriteB = "foot1Rev"; v_yAttackB = v_yKneeB; v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "foot2Rev"; v_xAttackB = (v_xB + 5); }
      if ((v_time > (v_refTimeB + 16))) { s_spriteB = "foot2Rev"; v_xAttackB = v_xB; }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "foot1Rev"; }
      if ((v_time > (v_refTimeB + 45))) { s_spriteB = "standingRev"; }
      if ((v_time > (v_refTimeB + 50))) { s_bBusy = "no"; s_playerB = "standingRev"; }
      case 1042:
      case 1041:
      if (!((s_playerB === "headButt"))) { pc = 1044; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 37))) { s_bBusy = "no"; s_spriteB = "standing"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 29))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 28))) { v_xB = (v_xB + 1); s_spriteB = "head1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { s_spriteB = "head2"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { v_xB = (v_xB - 1); s_spriteB = "head2"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { s_spriteB = "head1"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { s_spriteB = "head1"; }
      case 1044:
      case 1043:
      if (!((s_playerB === "headButtRev"))) { pc = 1046; continue main; }
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 37))) { s_bBusy = "no"; s_spriteB = "standingRev"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 29))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 28))) { v_xB = (v_xB - 1); s_spriteB = "head1Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { v_xAttackB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { s_spriteB = "head2Rev"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 18))) { v_xB = (v_xB + 1); s_spriteB = "head2Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { s_spriteB = "head1Rev"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { s_spriteB = "head1Rev"; }
      case 1046:
      case 1045:
      if (!((s_playerB === "behead"))) { pc = 1048; continue main; }
      s_beheadB = "no";
      v_xForeheadB = (v_xB + 1); v_xHeadB = (v_xB + 2); v_xBodyB = (v_xB + 2); v_xKneeB = v_xB;
      if ((v_time > (v_refTimeB + 58))) { s_bBusy = "no"; s_spriteB = "standing"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 51))) { s_spriteB = "neck2"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 50)))) { pc = 1050; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "neck3"; v_xHeadB = (v_xB + 4); v_xAttackB = (v_xB - 2); { pc = 29; continue main; }
      case 1050:
      case 1049:
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "neck3"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "neck2"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "neck1"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 25))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 24))) { v_xB = (v_xB - 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { s_spriteB = "turn3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { v_xB = (v_xB - 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "turn3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 14))) { v_xB = (v_xB - 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { s_spriteB = "turn2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { v_xB = (v_xB - 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { s_spriteB = "turn2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 4))) { v_xB = (v_xB - 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { s_spriteB = "turn1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB - 1); s_spriteB = "turn1"; { pc = 29; continue main; } }
      case 1048:
      case 1047:
      if (!((s_playerB === "beheadRev"))) { pc = 1052; continue main; }
      s_beheadB = "no";
      v_xForeheadB = (v_xB + 3); v_xHeadB = (v_xB + 2); v_xBodyB = (v_xB + 2); v_xKneeB = (v_xB + 4);
      if ((v_time > (v_refTimeB + 58))) { s_bBusy = "no"; s_spriteB = "standingRev"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 51))) { s_spriteB = "neck2Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 50)))) { pc = 1054; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "neck3Rev"; v_xHeadB = v_xB; v_xAttackB = (v_xB + 6); { pc = 29; continue main; }
      case 1054:
      case 1053:
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "neck3Rev"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "neck2Rev"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "neck1Rev"; v_yAttackB = v_yHeadB; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 25))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 24))) { v_xB = (v_xB + 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { s_spriteB = "turn3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 19))) { v_xB = (v_xB + 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "turn3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 14))) { v_xB = (v_xB + 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { s_spriteB = "turn2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { v_xB = (v_xB + 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { s_spriteB = "turn2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 4))) { v_xB = (v_xB + 1); { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { s_spriteB = "turn1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB + 1); s_spriteB = "turn1Rev"; { pc = 29; continue main; } }
      case 1052:
      case 1051:
      if (!((s_playerB === "forehead"))) { pc = 1056; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yKneeB = 20;
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "forehead2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 24))) { s_spriteB = "forehead3"; v_xAttackB = (v_xB + 4); { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 23)))) { pc = 1058; continue main; }
      s_spriteB = "forehead3";
      if ((s_playerA === "forehead")) { { pc = 29; continue main; } }
      v_xForeheadB = (v_xB + 4); v_xAttackB = (v_xB - 3); { pc = 29; continue main; }
      case 1058:
      case 1057:
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 10)))) { pc = 1060; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "forehead2"; v_yAttackB = v_yForeheadB; { pc = 29; continue main; }
      case 1060:
      case 1059:
      if ((v_time > (v_refTimeB + 5))) { s_spriteB = "forehead1"; { pc = 29; continue main; } }
      case 1056:
      case 1055:
      if (!((s_playerB === "foreheadRev"))) { pc = 1062; continue main; }
      v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if ((v_time > (v_refTimeB + 45))) { s_bBusy = "no"; s_playerB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "forehead2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 24))) { s_spriteB = "forehead3Rev"; v_xAttackB = v_xB; { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 23)))) { pc = 1064; continue main; }
      s_spriteB = "forehead3Rev";
      if ((s_playerA === "foreheadRev")) { { pc = 29; continue main; } }
      v_xForeheadB = v_xB; v_xAttackB = (v_xB + 7); { pc = 29; continue main; }
      case 1064:
      case 1063:
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 10)))) { pc = 1066; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      s_spriteB = "forehead2Rev"; v_yAttackB = v_yForeheadB; { pc = 29; continue main; }
      case 1066:
      case 1065:
      if ((v_time > (v_refTimeB + 5))) { s_spriteB = "forehead1Rev"; { pc = 29; continue main; } }
      case 1062:
      case 1061:
      if (!((s_playerB === "turn"))) { pc = 1068; continue main; }
      v_xAttackB = (v_xB + 4); v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yAttackB = 14;
      s_spriteB = "turn1";
      if ((v_time > (v_refTimeB + 5))) { s_spriteB = "turn2"; }
      if ((v_time > (v_refTimeB + 10))) { s_spriteB = "turn3"; }
      if ((v_time > (v_refTimeB + 15))) { s_playerB = "standingRev"; s_bBusy = "no"; s_direction = "reverse"; }
      case 1068:
      case 1067:
      if (!((s_playerB === "turnRev"))) { pc = 1070; continue main; }
      v_xAttackB = v_xB; v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yAttackB = 14;
      s_spriteB = "turn1Rev";
      if ((v_time > (v_refTimeB + 5))) { s_spriteB = "turn2Rev"; }
      if ((v_time > (v_refTimeB + 10))) { s_spriteB = "turn3Rev"; }
      if ((v_time > (v_refTimeB + 15))) { s_playerB = "standing"; s_bBusy = "no"; s_direction = "normal"; }
      case 1070:
      case 1069:
      if (!((s_playerB === "winner"))) { pc = 1072; continue main; }
      s_spriteB = "winner1";
      s_beheadB = "yes";
      s_bloodB = "no";
      v_xAttackB = (v_xB + 4); v_yAttackB = 14; v_yKneeB = 20;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if ((v_time > (v_refTimeB + 18))) { s_spriteB = "winner2"; }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "winner3"; }
      if ((v_time > (v_refTimeB + 85))) { s_spriteB = "winner2"; }
      if ((v_time > (v_refTimeB + 100))) { s_spriteB = "winner1"; }
      case 1072:
      case 1071:
      if (!((s_playerB === "winnerRev"))) { pc = 1074; continue main; }
      s_spriteB = "winner1Rev";
      s_beheadB = "yes";
      s_bloodB = "no";
      v_xAttackB = v_xB; v_yAttackB = 14; v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if ((v_time > (v_refTimeB + 18))) { s_spriteB = "winner2Rev"; }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "winner3Rev"; }
      if ((v_time > (v_refTimeB + 85))) { s_spriteB = "winner2Rev"; }
      if ((v_time > (v_refTimeB + 100))) { s_spriteB = "winner1Rev"; }
      case 1074:
      case 1073:
      if (!((s_playerB === "winnerKO"))) { pc = 1076; continue main; }
      s_beheadB = "yes";
      s_bloodB = "no";
      v_xAttackB = (v_xB + 4); v_yKneeB = 20;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if (!((v_time > (v_refTime + 230)))) { pc = 1078; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      v_xHeadSprite = 270;
      { pc = 36; continue main; }
      case 1078:
      case 1077:
      if ((v_time > (v_refTimeB + 205))) { s_spriteB = "winner1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 195))) { s_spriteB = "winner2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 140))) { s_spriteB = "winner3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 123))) { s_spriteB = "winner2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 105))) { s_spriteB = "winner1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 100))) { s_spriteB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 75))) { s_spriteB = "foot1"; s_spriteA = "dead4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 71))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 70)))) { pc = 1080; continue main; }
      s_spriteB = "foot2"; s_spriteA = "dead3"; v_xA = (v_xA - 2); { pc = 29; continue main; }
      case 1080:
      case 1079:
      if ((v_time > (v_refTimeB + 55))) { s_spriteB = "foot1"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 36))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 35)))) { pc = 1082; continue main; }
      v_distance = (v_xB - v_xA);
      if ((v_distance < 5)) { s_spriteB = "walk3"; v_xB = (v_xB + 1); }
      if ((v_distance > 5)) { s_spriteB = "walk3"; v_xB = (v_xB - 1); }
      { pc = 29; continue main; }
      case 1082:
      case 1081:
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "standing"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { s_spriteB = "turn3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "turn2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { s_spriteB = "turn1"; }
      case 1076:
      case 1075:
      if (!((s_playerB === "winnerKORev"))) { pc = 1084; continue main; }
      s_beheadB = "yes";
      s_bloodB = "no";
      v_xAttackB = v_xB; v_yKneeB = 20;
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if (!((v_time > (v_refTime + 230)))) { pc = 1086; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      v_xHeadSprite = 270;
      { pc = 36; continue main; }
      case 1086:
      case 1085:
      if ((v_time > (v_refTimeB + 205))) { s_spriteB = "winner1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 190))) { s_spriteB = "winner2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 140))) { s_spriteB = "winner3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 123))) { s_spriteB = "winner2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 105))) { s_spriteB = "winner1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 100))) { s_spriteB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 75))) { s_spriteB = "foot1Rev"; s_spriteA = "dead4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 71))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 70)))) { pc = 1088; continue main; }
      s_spriteB = "foot2Rev"; s_spriteA = "dead3Rev"; v_xA = (v_xA + 2); { pc = 29; continue main; }
      case 1088:
      case 1087:
      if ((v_time > (v_refTimeB + 55))) { s_spriteB = "foot1Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { s_spriteB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 36))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 35)))) { pc = 1090; continue main; }
      v_distance = (v_xA - v_xB);
      if ((v_distance < 5)) { s_spriteB = "walk3Rev"; v_xB = (v_xB - 1); }
      if ((v_distance > 5)) { s_spriteB = "walk3Rev"; v_xB = (v_xB + 1); }
      { pc = 29; continue main; }
      case 1090:
      case 1089:
      if ((v_time > (v_refTimeB + 30))) { s_spriteB = "standingRev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { s_spriteB = "turn3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "turn2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { s_spriteB = "turn1Rev"; }
      case 1084:
      case 1083:
      if (!((s_playerB === "hit"))) { pc = 1092; continue main; }
      v_waitingB = 0;
      v_xAttackB = (v_xB + 4);
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      if ((s_playerA === "kick")) { s_playerB = "fall"; { pc = 25; continue main; } }
      s_bloodB = "yes";
      s_snakeB = "yes";
      if (!(((s_playerA === "behead") && (s_beheadB === "yes")))) { pc = 1094; continue main; }
      s_playerB = "deadBeheading"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/behead.ogg"); }
      v_xHeadSprite = (v_xB + 3); v_scoreA = (v_scoreA + 250);
      s_bloodB = "no"; { pc = 28; continue main; }
      case 1094:
      case 1093:
      v_lifeB = (v_lifeB - 1);
      if (!((v_lifeB <= 0))) { pc = 1096; continue main; }
      s_playerB = "dead"; s_bBusy = "yes"; v_refTimeB = v_time; s_bloodB = "yes"; { pc = 28; continue main; }
      case 1096:
      case 1095:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/hit.ogg"); }
      s_playerB = "hit1"; s_bBusy = "yes"; v_refTimeB = v_time; s_beheadB = "yes";
      { pc = 29; continue main; }
      case 1092:
      case 1091:
      if (!((s_playerB === "hit1"))) { pc = 1098; continue main; }
      if (!((v_time > (v_refTimeB + 20)))) { pc = 1100; continue main; }
      s_spriteB = "standing"; s_bBusy = "no";
      s_playerB = "standing"; { pc = 29; continue main; }
      case 1100:
      case 1099:
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "hit4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { v_xB = (v_xB + 1); s_bloodB = "no"; s_spriteB = "hit3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 6))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { v_xB = (v_xB + 2); s_spriteB = "hit2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB + 1); s_spriteB = "hit1"; { pc = 29; continue main; } }
      s_spriteB = "hit1";
      case 1098:
      case 1097:
      if (!((s_playerB === "hitRev"))) { pc = 1102; continue main; }
      v_waitingB = 0;
      v_xAttackB = v_xB;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      if ((s_playerA === "kickRev")) { s_playerB = "fallRev"; { pc = 25; continue main; } }
      s_bloodB = "yes";
      s_snakeB = "yes";
      if (!(((s_playerA === "beheadRev") && (s_beheadB === "yes")))) { pc = 1104; continue main; }
      s_playerB = "deadBeheadingRev"; s_bBusy = "yes"; v_refTimeB = v_time;
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/behead.ogg"); }
      v_xHeadSprite = (v_xB + 3); v_scoreA = (v_scoreA + 250);
      s_bloodB = "no"; { pc = 28; continue main; }
      case 1104:
      case 1103:
      v_lifeB = (v_lifeB - 1);
      if (!((v_lifeB <= 0))) { pc = 1106; continue main; }
      s_playerB = "deadRev"; s_bBusy = "yes"; v_refTimeB = v_time; s_bloodB = "yes"; { pc = 28; continue main; }
      case 1106:
      case 1105:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/hit.ogg"); }
      s_playerB = "hit1Rev"; s_bBusy = "yes"; v_refTimeB = v_time; s_beheadB = "yes";
      { pc = 29; continue main; }
      case 1102:
      case 1101:
      if (!((s_playerB === "hit1Rev"))) { pc = 1108; continue main; }
      if (!((v_time > (v_refTimeB + 20)))) { pc = 1110; continue main; }
      s_spriteB = "standingRev"; s_bBusy = "no";
      s_playerB = "standingRev"; { pc = 29; continue main; }
      case 1110:
      case 1109:
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "hit4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 11))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { v_xB = (v_xB - 1); s_bloodB = "no"; s_spriteB = "hit3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 6))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { v_xB = (v_xB - 2); s_spriteB = "hit2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB - 1); s_spriteB = "hit1Rev"; { pc = 29; continue main; } }
      s_spriteB = "hit1Rev";
      case 1108:
      case 1107:
      if (!((s_playerB === "fall"))) { pc = 1112; continue main; }
      v_waitingB = 0;
      v_xAttackB = (v_xB + 4);
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      s_bloodB = "yes";
      s_snakeB = "yes";
      v_lifeB = (v_lifeB - 1); v_scoreA = (v_scoreA + 100);
      if ((s_playerA === "rollForward")) { v_lifeB = (v_lifeB + 1); s_bloodB = "no"; s_snakeB = "no"; v_scoreA = (v_scoreA - 100); }
      if (!((v_lifeB <= 0))) { pc = 1114; continue main; }
      s_playerB = "dead"; s_bBusy = "yes"; v_refTimeB = v_time; s_bloodB = "yes";
      if (((s_playerA === "headButt") || (s_playerA === "kick"))) { s_bloodB = "no"; }
      { pc = 28; continue main; }
      case 1114:
      case 1113:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/fall.ogg"); }
      if (!((s_playerA === "kick"))) { pc = 1116; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/nothing.ogg"); }
      case 1116:
      case 1115:
      if (!(((s_playerA === "headButt") || (s_playerA === "kick")))) { pc = 1118; continue main; }
      v_scoreA = (v_scoreA + 150); s_bloodB = "no";
      if (!((s_playerA === "headButt"))) { pc = 1120; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/ball.wav"); }
      case 1120:
      case 1119:
      case 1118:
      case 1117:
      s_playerB = "fall1"; s_bBusy = "yes"; v_refTimeB = v_time;
      { pc = 29; continue main; }
      case 1112:
      case 1111:
      if (!((s_playerB === "fall1"))) { pc = 1122; continue main; }
      v_waitingB = 0;
      v_xAttackB = (v_xB + 4);
      v_xForeheadB = (v_xB + 4); v_xHeadB = (v_xB + 4); v_xBodyB = (v_xB + 4); v_xKneeB = (v_xB + 4);
      if (!((v_time > (v_refTimeB + 25)))) { pc = 1124; continue main; }
      s_spriteB = "standing"; v_xB = (v_xB + 1); s_playerB = "standing"; s_bBusy = "no"; { pc = 29; continue main; }
      case 1124:
      case 1123:
      if ((v_time > (v_refTimeB + 20))) { s_spriteB = "fall4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "fall3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { s_bloodB = "no"; v_xB = (v_xB + 2); s_spriteB = "fall2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB + 2); { pc = 29; continue main; } }
      s_spriteB = "fall1";
      case 1122:
      case 1121:
      if (!((s_playerB === "fallRev"))) { pc = 1126; continue main; }
      v_xAttackB = v_xB;
      v_waitingB = 0;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      v_yForeheadB = 15; v_yHeadB = 16; v_yBodyB = 18; v_yKneeB = 20;
      s_bloodB = "yes";
      s_snakeB = "yes";
      v_lifeB = (v_lifeB - 1); v_scoreA = (v_scoreA + 100);
      if ((s_playerA === "rollForwardRev")) { v_lifeB = (v_lifeB + 1); s_bloodB = "no"; s_snakeB = "no"; v_scoreA = (v_scoreA - 100); }
      if (!((v_lifeB <= 0))) { pc = 1128; continue main; }
      s_playerB = "deadRev"; s_bBusy = "yes"; v_refTimeB = v_time; s_bloodB = "yes";
      if (((s_playerA === "headButtRev") || (s_playerA === "kickRev"))) { s_bloodB = "no"; }
      { pc = 28; continue main; }
      case 1128:
      case 1127:
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      if (!((s_playerA === "kickRev"))) { pc = 1130; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/nothing.ogg"); }
      case 1130:
      case 1129:
      if (!(((s_playerA === "headButtRev") || (s_playerA === "kickRev")))) { pc = 1132; continue main; }
      v_scoreA = (v_scoreA + 150); s_bloodB = "no";
      if (!((s_playerA === "headButtRev"))) { pc = 1134; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/ball.wav"); }
      case 1134:
      case 1133:
      case 1132:
      case 1131:
      s_playerB = "fall1Rev"; s_bBusy = "yes"; v_refTimeB = v_time;
      { pc = 29; continue main; }
      case 1126:
      case 1125:
      if (!((s_playerB === "fall1Rev"))) { pc = 1136; continue main; }
      v_xAttackB = v_xB;
      v_waitingB = 0;
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if (!((v_time > (v_refTimeB + 25)))) { pc = 1138; continue main; }
      s_spriteB = "standingRev"; v_xB = (v_xB - 1); s_playerB = "standingRev"; s_bBusy = "no"; { pc = 29; continue main; }
      case 1138:
      case 1137:
      if ((v_time > (v_refTimeB + 20))) { s_spriteB = "fall4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_spriteB = "fall3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 9))) { s_bloodB = "no"; v_xB = (v_xB - 2); s_spriteB = "fall2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { v_xB = (v_xB - 2); { pc = 29; continue main; } }
      s_spriteB = "fall1Rev";
      case 1136:
      case 1135:
      if (!((s_direction === "normal"))) { pc = 1140; continue main; }
      if (!((s_playerB === "clingBody"))) { pc = 1142; continue main; }
      if (((s_playerA === "behead") && (s_beheadB === "no"))) { s_playerB = "hit"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((s_playerA === "knee")) { s_playerB = "hit"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      s_playerB = "protectBody"; { pc = 29; continue main; }
      case 1142:
      case 1141:
      if (!((s_playerB === "clingHead"))) { pc = 1144; continue main; }
      s_playerB = "protectHead"; { pc = 29; continue main; }
      case 1144:
      case 1143:
      case 1140:
      case 1139:
      if (!((s_direction === "reverse"))) { pc = 1146; continue main; }
      if (!((s_playerB === "clingBody"))) { pc = 1148; continue main; }
      if (((s_playerA === "beheadRev") && (s_beheadB === "no"))) { s_playerB = "hitRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if ((s_playerA === "kneeRev")) { s_playerB = "hitRev"; s_bBusy = "yes"; v_refTimeB = v_time; { pc = 25; continue main; } }
      if (((s_repeatMusic === "no") && (v_distance < 12))) { rt.sndplayfile("C64/sound/cling.ogg"); }
      s_playerB = "protectBodyRev"; { pc = 29; continue main; }
      case 1148:
      case 1147:
      if (!((s_playerB === "clingHead"))) { pc = 1150; continue main; }
      s_playerB = "protectHeadRev"; { pc = 29; continue main; }
      case 1150:
      case 1149:
      case 1146:
      case 1145:
      case 28: // deadB
      if (!((s_playerB === "dead"))) { pc = 1152; continue main; }
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if ((v_time > (v_refTimeB + 16))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_bloodB = "no"; s_spriteB = "dead2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { s_spriteB = "dead1"; { pc = 29; continue main; } }
      s_spriteB = "dead1"; s_playerA = "winnerKO"; s_aBusy = "yes"; v_refTime = v_time;
      if (!((s_gnome === "no"))) { pc = 1154; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/dead.wav"); }
      case 1154:
      case 1153:
      case 1152:
      case 1151:
      if (!((s_playerB === "deadRev"))) { pc = 1156; continue main; }
      if ((v_time > (v_refTimeB + 16))) { { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { s_bloodB = "no"; s_spriteB = "dead2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 1))) { s_spriteB = "dead1Rev"; { pc = 29; continue main; } }
      s_spriteB = "dead1Rev"; s_playerA = "winnerKORev"; s_aBusy = "yes"; v_refTime = v_time;
      if (!((s_gnome === "no"))) { pc = 1158; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/dead.wav"); }
      case 1158:
      case 1157:
      case 1156:
      case 1155:
      if (!((s_playerB === "deadBeheading"))) { pc = 1160; continue main; }
      if ((v_time > (v_refTimeB + 80))) { s_spriteB = "beheading4"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 70))) { s_spriteB = "beheading3"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 55))) { v_bloodBeheadingB = 0; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 50))) { v_bloodBeheadingB = 6; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 45))) { v_bloodBeheadingB = 5; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { v_bloodBeheadingB = 4; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "beheading2"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { v_bloodBeheadingB = 0; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { v_bloodBeheadingB = 3; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { v_bloodBeheadingB = 2; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { v_bloodBeheadingB = 1; { pc = 29; continue main; } }
      s_spriteB = "beheading1"; s_playerA = "winner"; s_aBusy = "yes"; v_refTime = v_time;
      case 1160:
      case 1159:
      if (!((s_playerB === "deadBeheadingRev"))) { pc = 1162; continue main; }
      if ((v_time > (v_refTimeB + 80))) { s_spriteB = "beheading4Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 70))) { s_spriteB = "beheading3Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 55))) { v_bloodBeheadingB = 0; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 50))) { v_bloodBeheadingB = 6; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 45))) { v_bloodBeheadingB = 5; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 40))) { v_bloodBeheadingB = 4; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 35))) { s_spriteB = "beheading2Rev"; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 20))) { v_bloodBeheadingB = 0; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { v_bloodBeheadingB = 3; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 10))) { v_bloodBeheadingB = 2; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { v_bloodBeheadingB = 1; { pc = 29; continue main; } }
      s_spriteB = "beheading1Rev"; s_playerA = "winnerRev"; s_aBusy = "yes"; v_refTime = v_time;
      case 1162:
      case 1161:
      if (!((s_playerB === "wizard"))) { pc = 1164; continue main; }
      s_gnome = "no";
      v_xForeheadB = v_xB; v_xHeadB = v_xB; v_xBodyB = v_xB; v_xKneeB = v_xB;
      if ((v_time > (v_refTimeB + 171))) { s_spriteB = "wizard1"; v_refTimeB = v_time; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 170))) { v_xAttackB = 34; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 165))) { v_xAttackB = 9; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 160))) { v_xAttackB = 11; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 155))) { v_xAttackB = 14; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 150))) { v_xAttackB = 17; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 145))) { v_xAttackB = 20; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 140))) { v_xAttackB = 23; s_spriteB = "wizard1"; v_xB = 33; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 135))) { v_xAttackB = 26; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 131))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 130)))) { pc = 1166; continue main; }
      s_spriteB = "wizard2"; v_xB = 31; v_yAttackB = 16;
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      { pc = 29; continue main; }
      case 1166:
      case 1165:
      if ((v_time > (v_refTimeB + 90))) { v_xAttackB = 34; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 85))) { v_xAttackB = 9; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 80))) { v_xAttackB = 11; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 75))) { v_xAttackB = 14; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 70))) { v_xAttackB = 17; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 65))) { v_xAttackB = 20; v_yAttackB = 20; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 60))) { v_xAttackB = 23; s_spriteB = "wizard1"; v_xB = 33; v_yAttackB = 18; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 55))) { v_xAttackB = 26; { pc = 29; continue main; } }
      if ((v_time > (v_refTimeB + 51))) { { pc = 29; continue main; } }
      if (!((v_time > (v_refTimeB + 50)))) { pc = 1168; continue main; }
      s_spriteB = "wizard2"; v_xB = 31;
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/sword.ogg"); }
      { pc = 29; continue main; }
      case 1168:
      case 1167:
      s_spriteB = "wizard1"; v_xB = 33;
      v_xAttackB = (v_xB + 4); v_yAttackB = 16; v_yKneeB = 20;
      s_bloodB = "no";
      case 1164:
      case 1163:
      case 29: // collision
      if ((s_direction === "reverse")) { { pc = 31; continue main; } }
      if (((s_playerA === "jump") && (s_playerB === "rollForward"))) { { pc = 30; continue main; } }
      if (((s_playerB === "jump") && (s_playerA === "rollForward"))) { { pc = 30; continue main; } }
      if (!((((s_stick1 === "right") || (s_playerA === "rollForward")) || (s_playerA === "behead")))) { pc = 1170; continue main; }
      v_distance = (v_xB - v_xA);
      if ((v_distance < 4)) { v_xA = (v_xA - 1); }
      case 1170:
      case 1169:
      if (!((((s_stick2 === "left") || (s_playerB === "rollForward")) || (s_playerB === "behead")))) { pc = 1172; continue main; }
      v_distance = (v_xB - v_xA);
      if ((v_distance < 4)) { v_xB = (v_xB + 1); }
      case 1172:
      case 1171:
      if (!(((s_playerB === "standing") && (s_playerA === "standing")))) { pc = 1174; continue main; }
      v_distance = (v_xB - v_xA);
      if ((v_distance < 4)) { v_xA = (v_xA - 1); v_xB = (v_xB + 1); }
      case 1174:
      case 1173:
      case 30: // leaveFrame
      if (!(((((s_entry === "yes") || (s_exitA === "yes")) || (s_exitB === "yes")) || (s_entryWizard === "yes")))) { pc = 1176; continue main; }
      if ((v_xA < 0)) { v_xA = 0; }
      if ((v_xB < 0)) { v_xB = 0; }
      if ((v_xA > 40)) { v_xA = 40; }
      if ((v_xB > 40)) { v_xB = 40; }
      { pc = 33; continue main; }
      case 1176:
      case 1175:
      if (!((s_entry === "no"))) { pc = 1178; continue main; }
      if ((v_xA < 4)) { v_xA = 4; }
      if ((v_xA > 33)) { v_xA = 33; }
      if ((v_xB < 4)) { v_xB = 4; }
      if (!((s_marianna === "no"))) { pc = 1180; continue main; }
      if ((v_xB > 33)) { v_xB = 33; }
      case 1180:
      case 1179:
      case 1178:
      case 1177:
      if ((v_xB > 33)) { v_xB = 33; }
      { pc = 33; continue main; }
      if ((s_direction === "normal")) { { pc = 36; continue main; } }
      case 31: // collisionRev
      if (((s_playerA === "jumpRev") && (s_playerB === "rollForwardRev"))) { { pc = 32; continue main; } }
      if (((s_playerB === "jumpRev") && (s_playerA === "rollForwardRev"))) { { pc = 32; continue main; } }
      if (!((((s_stick1 === "left") || (s_playerA === "rollForwardRev")) || (s_playerA === "beheadRev")))) { pc = 1182; continue main; }
      v_distance = (v_xA - v_xB);
      if ((v_distance < 4)) { v_xA = (v_xA + 1); }
      case 1182:
      case 1181:
      if (!((((s_stick2 === "right") || (s_playerB === "rollForwardRev")) || (s_playerB === "beheadRev")))) { pc = 1184; continue main; }
      v_distance = (v_xA - v_xB);
      if ((v_distance < 4)) { v_xB = (v_xB - 1); }
      case 1184:
      case 1183:
      if (!(((s_playerB === "standingRev") && (s_playerA === "standingRev")))) { pc = 1186; continue main; }
      v_distance = (v_xA - v_xB);
      if ((v_distance < 4)) { v_xA = (v_xA + 1); v_xB = (v_xB - 1); }
      case 1186:
      case 1185:
      case 32: // leaveFrameRev
      if (!(((s_exitA === "yes") || (s_exitB === "yes")))) { pc = 1188; continue main; }
      if ((v_xA < 0)) { v_xA = 0; }
      if ((v_xB < 0)) { v_xB = 0; }
      if ((v_xA > 40)) { v_xA = 40; }
      if ((v_xB > 40)) { v_xB = 40; }
      { pc = 33; continue main; }
      case 1188:
      case 1187:
      if ((v_xA < 4)) { v_xA = 4; }
      if ((v_xA > 33)) { v_xA = 33; }
      if ((v_xB < 4)) { v_xB = 4; }
      if ((v_xB > 33)) { v_xB = 33; }
      case 33: // flyingHeads
      if (((s_exitA === "yes") || (s_exitB === "yes"))) { { pc = 36; continue main; } }
      if (!(((((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")) || (s_playerB === "deadBeheading")) || (s_playerB === "deadBeheadingRev")))) { pc = 1190; continue main; }
      if (((v_xA > 19) && (v_xB > 20))) { { pc = 34; continue main; } }
      if (!(((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")))) { pc = 1192; continue main; }
      if (!((v_time > (v_refTime + 125)))) { pc = 1194; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      { pc = 36; continue main; }
      case 1194:
      case 1193:
      if ((v_time > (v_refTime + 56))) { v_yHeadSprite = 164; v_xHeadSprite = (v_xA + 16); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 52))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xA + 15); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 48))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA + 14); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xA + 13); v_headNumber = 6; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 44)))) { pc = 1196; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 157; v_xHeadSprite = (v_xA + 13); v_headNumber = 6; { pc = 36; continue main; }
      case 1196:
      case 1195:
      if ((v_time > (v_refTime + 40))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA + 12); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 36))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA + 11); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 32))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA + 10); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 29))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA + 9); v_headNumber = 2; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 28)))) { pc = 1198; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 159; v_xHeadSprite = (v_xA + 9); v_headNumber = 2; { pc = 36; continue main; }
      case 1198:
      case 1197:
      if ((v_time > (v_refTime + 24))) { v_yHeadSprite = 139; v_xHeadSprite = (v_xA + 8); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xA + 7); v_headNumber = 6; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 16))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xA + 6); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 12))) { v_yHeadSprite = 118; v_xHeadSprite = (v_xA + 5); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 8))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xA + 4); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xA + 3); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time >= v_refTime)) { v_yHeadSprite = 111; v_xHeadSprite = (v_xA + 2); v_headNumber = 1; { pc = 36; continue main; } }
      case 1192:
      case 1191:
      if (!(((s_playerB === "deadBeheading") || (s_playerB === "deadBeheadingRev")))) { pc = 1200; continue main; }
      if (!((v_time > (v_refTime + 125)))) { pc = 1202; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      { pc = 36; continue main; }
      case 1202:
      case 1201:
      if ((v_time > (v_refTime + 56))) { v_yHeadSprite = 164; v_xHeadSprite = (v_xB + 16); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 52))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xB + 15); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 48))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB + 14); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xB + 13); v_headNumber = 6; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 44)))) { pc = 1204; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 157; v_xHeadSprite = (v_xB + 13); v_headNumber = 6; { pc = 36; continue main; }
      case 1204:
      case 1203:
      if ((v_time > (v_refTime + 40))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB + 12); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 36))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB + 11); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 32))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB + 10); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 29))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB + 9); v_headNumber = 2; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 28)))) { pc = 1206; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 159; v_xHeadSprite = (v_xB + 9); v_headNumber = 2; { pc = 36; continue main; }
      case 1206:
      case 1205:
      if ((v_time > (v_refTime + 24))) { v_yHeadSprite = 139; v_xHeadSprite = (v_xB + 8); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xB + 7); v_headNumber = 6; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 16))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xB + 6); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 12))) { v_yHeadSprite = 118; v_xHeadSprite = (v_xB + 5); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 8))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xB + 4); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xB + 3); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time >= v_refTime)) { v_yHeadSprite = 111; v_xHeadSprite = (v_xB + 2); v_headNumber = 1; { pc = 36; continue main; } }
      { pc = 36; continue main; }
      case 1200:
      case 1199:
      case 34: // headLeft
      if (!(((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")))) { pc = 1208; continue main; }
      if (!((v_time > (v_refTime + 125)))) { pc = 1210; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      { pc = 36; continue main; }
      case 1210:
      case 1209:
      if ((v_time > (v_refTime + 56))) { v_yHeadSprite = 164; v_xHeadSprite = (v_xA - 12); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 52))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xA - 11); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 48))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA - 10); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xA - 9); v_headNumber = 6; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 44)))) { pc = 1212; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 157; v_xHeadSprite = (v_xA - 9); v_headNumber = 6; { pc = 36; continue main; }
      case 1212:
      case 1211:
      if ((v_time > (v_refTime + 40))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA - 8); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 36))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA - 7); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 32))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA - 6); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 29))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xA - 5); v_headNumber = 2; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 28)))) { pc = 1214; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 159; v_xHeadSprite = (v_xA - 5); v_headNumber = 2; { pc = 36; continue main; }
      case 1214:
      case 1213:
      if ((v_time > (v_refTime + 24))) { v_yHeadSprite = 139; v_xHeadSprite = (v_xA - 4); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xA - 3); v_headNumber = 6; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 16))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xA - 2); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 12))) { v_yHeadSprite = 118; v_xHeadSprite = (v_xA - 1); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 8))) { v_yHeadSprite = 111; v_xHeadSprite = v_xA; v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xA + 1); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time >= v_refTime)) { v_yHeadSprite = 111; v_xHeadSprite = (v_xA + 2); v_headNumber = 1; { pc = 36; continue main; } }
      case 1208:
      case 1207:
      if (!(((s_playerB === "deadBeheading") || (s_playerB === "deadBeheadingRev")))) { pc = 1216; continue main; }
      if (!((v_time > (v_refTime + 125)))) { pc = 1218; continue main; }
      s_gnome = "yes"; v_refTime = v_time;
      v_xGnome = 3;
      { pc = 36; continue main; }
      case 1218:
      case 1217:
      if ((v_time > (v_refTime + 56))) { v_yHeadSprite = 164; v_xHeadSprite = (v_xB - 16); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 52))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xB - 15); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 48))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB - 14); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xB - 13); v_headNumber = 6; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 44)))) { pc = 1220; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 157; v_xHeadSprite = (v_xB - 13); v_headNumber = 6; { pc = 36; continue main; }
      case 1220:
      case 1219:
      if ((v_time > (v_refTime + 40))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB - 12); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 36))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB - 11); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 32))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB - 10); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 29))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xB - 9); v_headNumber = 2; { pc = 36; continue main; } }
      if (!((v_time > (v_refTime + 28)))) { pc = 1222; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 159; v_xHeadSprite = (v_xB - 9); v_headNumber = 2; { pc = 36; continue main; }
      case 1222:
      case 1221:
      if ((v_time > (v_refTime + 24))) { v_yHeadSprite = 139; v_xHeadSprite = (v_xB - 8); v_headNumber = 1; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 20))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xB - 7); v_headNumber = 6; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 16))) { v_yHeadSprite = 125; v_xHeadSprite = (v_xB - 6); v_headNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 12))) { v_yHeadSprite = 118; v_xHeadSprite = (v_xB - 5); v_headNumber = 4; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 8))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xB - 4); v_headNumber = 3; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 4))) { v_yHeadSprite = 111; v_xHeadSprite = (v_xB - 3); v_headNumber = 2; { pc = 36; continue main; } }
      if ((v_time >= v_refTime)) { v_yHeadSprite = 111; v_xHeadSprite = (v_xB - 2); v_headNumber = 1; { pc = 36; continue main; } }
      case 1216:
      case 1215:
      case 1190:
      case 1189:
      case 35: // gnome
      if (!((s_gnome === "yes"))) { pc = 1224; continue main; }
      if (!(((s_gnomeLaughs === "no") || (s_finishedLaughing === "yes")))) { pc = 1226; continue main; }
      v_gnomeNumber = 4;
      if ((v_time > (v_refTime + 6))) { v_gnomeNumber = 1; }
      if ((v_time > (v_refTime + 12))) { v_gnomeNumber = 2; }
      if ((v_time > (v_refTime + 18))) { v_gnomeNumber = 3; }
      if ((v_time > (v_refTime + 24))) { v_refTime = v_time; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 19))) { { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 18))) { v_xGnome = (v_xGnome + 7); { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 7))) { { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 6))) { v_xGnome = (v_xGnome + 7); { pc = 36; continue main; } }
      case 1226:
      case 1225:
      if (!(((s_gnomeLaughs === "yes") && (s_finishedLaughing === "no")))) { pc = 1228; continue main; }
      if ((v_time > (v_refTime + 100))) { s_finishedLaughing = "yes"; v_refTime = v_time; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 95))) { v_gnomeNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 75))) { v_gnomeNumber = 6; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 60))) { v_gnomeNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 45))) { v_gnomeNumber = 6; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 30))) { v_gnomeNumber = 5; { pc = 36; continue main; } }
      if ((v_time > (v_refTime + 15))) { v_gnomeNumber = 6; { pc = 36; continue main; } }
      v_gnomeNumber = 5;
      case 1228:
      case 1227:
      case 1224:
      case 1223:
      case 36: // display
      rt.putimage(v_background, 32, 96, undefined, undefined);
      if ((s_stage === "torture")) {
        const flameSeq = [0, 2, 1, 3, 2, 0, 3, 1];
        const torchX = [72, 128, 192, 248];
        for (let i = 0; i < 4; i++) {
          const f = flameSeq[((v_time >> 2) + i * 3) & 7] + 1;
          rt.putimage(rt.loadimage("C64/stage/torch" + f + ".gif", 256), torchX[i] - 16, 96, undefined, undefined);
        }
      }
      if (!((s_transition === "yes"))) { pc = 1230; continue main; }
      rt.color(0, undefined);
      if (!((v_time > (v_refTime + 55)))) { pc = 1232; continue main; }
      if (((((s_playerB === "dead") || (s_playerB === "deadRev")) || (s_playerB === "deadBeheading")) || (s_playerB === "deadBeheadingRev"))) { v_xA = 1; }
      if (((((s_playerA === "dead") || (s_playerA === "deadRev")) || (s_playerA === "deadBeheading")) || (s_playerA === "deadBeheadingRev"))) { v_xB = 39; }
      case 1232:
      case 1231:
      if ((v_time > (v_refTime + 60))) { rt.locate(8, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 65))) { rt.locate(9, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 70))) { rt.locate(10, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 75))) { rt.locate(11, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 80))) { rt.locate(12, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 85))) { rt.locate(13, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 90))) { rt.locate(14, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 95))) { rt.locate(15, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 100))) { rt.locate(16, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 105))) { rt.locate(17, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 110))) { rt.locate(18, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 115))) { rt.locate(19, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 120))) { rt.locate(20, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 125))) { rt.locate(21, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 130))) { rt.locate(22, 5); rt.print([rt.string_(32, 219)], true); }
      if ((v_time > (v_refTime + 200))) { s_transition = "no"; s_transitionFinished = "yes"; }
      case 1230:
      case 1229:
      rt.line(92, 39, 226, 51, 14, "BF");
      if (!((((s_wizard === "yes") || (s_wizard === "dead")) || (s_game === "lost")))) { pc = 1234; continue main; }
      rt.color(14, undefined);
      rt.locate(10, 15); rt.print([rt.string_(3, 219)], true);
      rt.locate(11, 15); rt.print([rt.string_(3, 219)], true);
      rt.locate(12, 14); rt.print([rt.string_(4, 219)], true);
      rt.locate(13, 14); rt.print([rt.string_(4, 219)], true);
      if (!(((s_marianna === "yes") && (s_exitA === "no")))) { pc = 1236; continue main; }
      rt.locate(10, 24); rt.print([rt.string_(3, 219)], true);
      rt.locate(11, 24); rt.print([rt.string_(3, 219)], true);
      rt.locate(12, 24); rt.print([rt.string_(3, 219)], true);
      rt.locate(13, 24); rt.print([rt.string_(3, 219)], true);
      case 1236:
      case 1235:
      rt.locate(1, 1); rt.print(["      "], true); rt.locate(2, 1); rt.print(["      "], true);
      rt.locate(1, 35); rt.print(["      "], true); rt.locate(2, 35); rt.print(["      "], true);
      case 1234:
      case 1233:
      if (((((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")) || (s_playerB === "deadBeheading")) || (s_playerB === "deadBeheadingRev"))) { { pc = 37; continue main; } }
      if (((((s_playerA === "dead") || (s_playerA === "deadRev")) || (s_playerB === "dead")) || (s_playerB === "deadRev"))) { { pc = 37; continue main; } }
      if (!((v_time > (v_tick + 40)))) { pc = 1238; continue main; }
      v_countdown = (v_countdown - 1);
      v_tick = v_time;
      case 1238:
      case 1237:
      if (!((v_countdown < 0))) { pc = 1240; continue main; }
      v_countdown = 0;
      if (!((s_mode === "vs"))) { pc = 1242; continue main; }
      s_exitA = "yes"; s_exitB = "yes"; s_timeFinished = "yes"; s_aBusy = "no"; s_bBusy = "no";
      case 1242:
      case 1241:
      case 1240:
      case 1239:
      case 37: // showTime
      rt.printmode(rt.KEEPBACKGROUND);
      rt.font(v_palaceFont);
      rt.color(3, undefined);
      if ((s_mode === "solo")) { rt.locate(3, 153); rt.print(["0"], true); rt.locate(3, 157); rt.print([v_ai], true); }
      if (!((s_mode === "vs"))) { pc = 1244; continue main; }
      if ((v_countdown > 10)) { rt.locate(3, 149); rt.print([v_countdown], true); }
      if ((v_countdown === 10)) { rt.locate(3, 149); rt.print([v_countdown], true); }
      if ((v_countdown < 10)) { rt.locate(3, 153); rt.print(["0"], true); rt.locate(3, 157); rt.print([v_countdown], true); }
      case 1244:
      case 1243:
      rt.color(3, undefined);
      if ((v_scoreA > 99999)) { v_scoreA = 0; if ((v_scoreB > 99999)) { v_scoreB = 0; } }
      if ((v_scoreA === 0)) { rt.locate(3, 97); rt.print(["00000"], true); }
      if ((v_scoreB === 0)) { rt.locate(3, 185); rt.print(["00000"], true); }
      if (!(((v_scoreA > 99) && (v_scoreA < 999)))) { pc = 1246; continue main; }
      rt.locate(3, 97); rt.print(["00"], true); rt.locate(3, 109); rt.print([v_scoreA], true);
      case 1246:
      case 1245:
      if (!(((v_scoreA > 999) && (v_scoreA < 9999)))) { pc = 1248; continue main; }
      rt.locate(3, 97); rt.print(["0"], true); rt.locate(3, 101); rt.print([v_scoreA], true);
      case 1248:
      case 1247:
      if (!(((v_scoreA > 9999) && (v_scoreA < 99999)))) { pc = 1250; continue main; }
      rt.locate(3, 93); rt.print([v_scoreA], true);
      case 1250:
      case 1249:
      if (!(((v_scoreB > 99) && (v_scoreB < 999)))) { pc = 1252; continue main; }
      rt.locate(3, 185); rt.print(["00"], true); rt.locate(3, 197); rt.print([v_scoreB], true);
      case 1252:
      case 1251:
      if (!(((v_scoreB > 999) && (v_scoreB < 9999)))) { pc = 1254; continue main; }
      rt.locate(3, 185); rt.print(["0"], true); rt.locate(3, 189); rt.print([v_scoreB], true);
      case 1254:
      case 1253:
      if (!(((v_scoreB > 9999) && (v_scoreB < 99999)))) { pc = 1256; continue main; }
      rt.locate(3, 181); rt.print([v_scoreB], true);
      case 1256:
      case 1255:
      rt.printmode(rt.FILLBACKGROUND);
      rt.font(8);
      if ((v_lifeA === 11)) { rt.locate(2, 6); rt.print([" "], true); }
      if ((v_lifeA === 10)) { rt.locate(2, 5); rt.print([" "], true); }
      if ((v_lifeA === 9)) { rt.locate(2, 4); rt.print([" "], true); }
      if ((v_lifeA === 8)) { rt.locate(2, 3); rt.print([" "], true); }
      if ((v_lifeA === 7)) { rt.locate(2, 2); rt.print([" "], true); }
      if ((v_lifeA === 6)) { rt.locate(2, 1); rt.print([" "], true); }
      if ((v_lifeA === 5)) { rt.locate(1, 6); rt.print([" "], true); }
      if ((v_lifeA === 4)) { rt.locate(1, 5); rt.print([" "], true); }
      if ((v_lifeA === 3)) { rt.locate(1, 4); rt.print([" "], true); }
      if ((v_lifeA === 2)) { rt.locate(1, 3); rt.print([" "], true); }
      if ((v_lifeA === 1)) { rt.locate(1, 2); rt.print([" "], true); }
      if ((v_lifeA === 0)) { rt.locate(1, 1); rt.print(["      "], true); rt.locate(2, 1); rt.print(["      "], true); }
      if ((v_lifeB === 11)) { rt.locate(2, 40); rt.print([" "], true); }
      if ((v_lifeB === 10)) { rt.locate(2, 39); rt.print([" "], true); }
      if ((v_lifeB === 9)) { rt.locate(2, 38); rt.print([" "], true); }
      if ((v_lifeB === 8)) { rt.locate(2, 37); rt.print([" "], true); }
      if ((v_lifeB === 7)) { rt.locate(2, 36); rt.print([" "], true); }
      if ((v_lifeB === 6)) { rt.locate(2, 35); rt.print([" "], true); }
      if ((v_lifeB === 5)) { rt.locate(1, 40); rt.print([" "], true); }
      if ((v_lifeB === 4)) { rt.locate(1, 39); rt.print([" "], true); }
      if ((v_lifeB === 3)) { rt.locate(1, 38); rt.print([" "], true); }
      if ((v_lifeB === 2)) { rt.locate(1, 37); rt.print([" "], true); }
      if ((v_lifeB === 1)) { rt.locate(1, 36); rt.print([" "], true); }
      if ((v_lifeB === 0)) { rt.locate(1, 35); rt.print(["      "], true); rt.locate(2, 35); rt.print(["      "], true); }
      if (!((s_version === "yes"))) { pc = 1258; continue main; }
      rt.locate(18, 16); rt.print(["FL VERSION"], true); rt.locate(19, 19); rt.print(["2012"], true);
      case 1258:
      case 1257:
      if ((s_spriteA === "standing")) { v_imageA = rt.loadimage("C64/spritesA/standing.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "sit1")) { v_imageA = rt.loadimage("C64/spritesA/sit1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "sit2")) { v_imageA = rt.loadimage("C64/spritesA/sit2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "waiting1")) { v_imageA = rt.loadimage("C64/spritesA/waiting1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "waiting2")) { v_imageA = rt.loadimage("C64/spritesA/waiting2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "waiting3")) { v_imageA = rt.loadimage("C64/spritesA/waiting3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "neck1")) { v_imageA = rt.loadimage("C64/spritesA/protectHead.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "neck2")) { v_imageA = rt.loadimage("C64/spritesA/neck2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "neck3")) { v_imageA = rt.loadimage("C64/spritesA/neck3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "bodyChop1")) { v_imageA = rt.loadimage("C64/spritesA/bodyChop1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "bodyChop2")) { v_imageA = rt.loadimage("C64/spritesA/bodyChop2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "bodyChop3")) { v_imageA = rt.loadimage("C64/spritesA/bodyChop3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "knee1")) { v_imageA = rt.loadimage("C64/spritesA/knee1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "knee2")) { v_imageA = rt.loadimage("C64/spritesA/sit2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "knee3")) { v_imageA = rt.loadimage("C64/spritesA/knee3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "walk1")) { v_imageA = rt.loadimage("C64/spritesA/walk1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "walk2")) { v_imageA = rt.loadimage("C64/spritesA/walk2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "walk3")) { v_imageA = rt.loadimage("C64/spritesA/walk3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "jump1")) { v_imageA = rt.loadimage("C64/spritesA/jump1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "jump2")) { v_imageA = rt.loadimage("C64/spritesA/jump2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "winner1")) { v_imageA = rt.loadimage("C64/spritesA/winner1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "winner2")) { v_imageA = rt.loadimage("C64/spritesA/winner2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "winner3")) { v_imageA = rt.loadimage("C64/spritesA/winner3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "turn1")) { v_imageA = rt.loadimage("C64/spritesA/turn1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "turn2")) { v_imageA = rt.loadimage("C64/spritesA/turn2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "turn3")) { v_imageA = rt.loadimage("C64/spritesA/turn3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "forehead1")) { v_imageA = rt.loadimage("C64/spritesA/forehead1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "forehead2")) { v_imageA = rt.loadimage("C64/spritesA/forehead2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "forehead3")) { v_imageA = rt.loadimage("C64/spritesA/forehead3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "web1")) { v_imageA = rt.loadimage("C64/spritesA/web1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "web2")) { v_imageA = rt.loadimage("C64/spritesA/web2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "web3")) { v_imageA = rt.loadimage("C64/spritesA/web3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "web4")) { v_imageA = rt.loadimage("C64/spritesA/web4.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "fall1")) { v_imageA = rt.loadimage("C64/spritesA/fall1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "fall2")) { v_imageA = rt.loadimage("C64/spritesA/fall2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "fall3")) { v_imageA = rt.loadimage("C64/spritesA/fall3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "protectBody")) { v_imageA = rt.loadimage("C64/spritesA/protectBody.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "protectHead")) { v_imageA = rt.loadimage("C64/spritesA/protectHead.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "head1")) { v_imageA = rt.loadimage("C64/spritesA/head1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "head2")) { v_imageA = rt.loadimage("C64/spritesA/head2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "hit1")) { v_imageA = rt.loadimage("C64/spritesA/hit2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "hit2")) { v_imageA = rt.loadimage("C64/spritesA/hit1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "hit3")) { v_imageA = rt.loadimage("C64/spritesA/hit2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "foot1")) { v_imageA = rt.loadimage("C64/spritesA/foot1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "foot2")) { v_imageA = rt.loadimage("C64/spritesA/foot2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "beheading1")) { v_imageA = rt.loadimage("C64/spritesA/beheading1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "beheading2")) { v_imageA = rt.loadimage("C64/spritesA/beheading2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "beheading3")) { v_imageA = rt.loadimage("C64/spritesA/beheading3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "beheading4")) { v_imageA = rt.loadimage("C64/spritesA/beheading4.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "dead1")) { v_imageA = rt.loadimage("C64/spritesA/sit1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "dead2")) { v_imageA = rt.loadimage("C64/spritesA/dead2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "dead3")) { v_imageA = rt.loadimage("C64/spritesA/dead3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "dead4")) { v_imageA = rt.loadimage("C64/spritesA/dead4.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll1")) { v_imageA = rt.loadimage("C64/spritesA/roll1.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll2")) { v_imageA = rt.loadimage("C64/spritesA/roll2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll3")) { v_imageA = rt.loadimage("C64/spritesA/roll3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll4")) { v_imageA = rt.loadimage("C64/spritesA/roll2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "roll5")) { v_imageA = rt.loadimage("C64/spritesA/roll5.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll6")) { v_imageA = rt.loadimage("C64/spritesA/roll1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "standingRev")) { v_imageA = rt.loadimage("C64/spritesA/standing.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "sit1Rev")) { v_imageA = rt.loadimage("C64/spritesA/sit1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "sit2Rev")) { v_imageA = rt.loadimage("C64/spritesA/sit2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "waiting1Rev")) { v_imageA = rt.loadimage("C64/spritesA/waiting1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "waiting2Rev")) { v_imageA = rt.loadimage("C64/spritesA/waiting2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "waiting3Rev")) { v_imageA = rt.loadimage("C64/spritesA/waiting3.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "neck1Rev")) { v_imageA = rt.loadimage("C64/spritesA/protectHead.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "neck2Rev")) { v_imageA = rt.loadimage("C64/spritesA/neck2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "neck3Rev")) { v_imageA = rt.loadimage("C64/spritesA/neck3.gif"); s_directionImageA = "large4Rev"; }
      if ((s_spriteA === "bodyChop1Rev")) { v_imageA = rt.loadimage("C64/spritesA/bodyChop1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "bodyChop2Rev")) { v_imageA = rt.loadimage("C64/spritesA/bodyChop2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "bodyChop3Rev")) { v_imageA = rt.loadimage("C64/spritesA/bodyChop3.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "knee1Rev")) { v_imageA = rt.loadimage("C64/spritesA/knee1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "knee2Rev")) { v_imageA = rt.loadimage("C64/spritesA/sit2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "knee3Rev")) { v_imageA = rt.loadimage("C64/spritesA/knee3.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "walk1Rev")) { v_imageA = rt.loadimage("C64/spritesA/walk1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "walk2Rev")) { v_imageA = rt.loadimage("C64/spritesA/walk2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "walk3Rev")) { v_imageA = rt.loadimage("C64/spritesA/walk3.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "jump1Rev")) { v_imageA = rt.loadimage("C64/spritesA/jump1.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "jump2Rev")) { v_imageA = rt.loadimage("C64/spritesA/jump2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "winner1Rev")) { v_imageA = rt.loadimage("C64/spritesA/winner1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "winner2Rev")) { v_imageA = rt.loadimage("C64/spritesA/winner2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "winner3Rev")) { v_imageA = rt.loadimage("C64/spritesA/winner3.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "turn1Rev")) { v_imageA = rt.loadimage("C64/spritesA/turn1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "turn2Rev")) { v_imageA = rt.loadimage("C64/spritesA/turn2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "turn3Rev")) { v_imageA = rt.loadimage("C64/spritesA/turn3.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "forehead1Rev")) { v_imageA = rt.loadimage("C64/spritesA/forehead1.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "forehead2Rev")) { v_imageA = rt.loadimage("C64/spritesA/forehead2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "forehead3Rev")) { v_imageA = rt.loadimage("C64/spritesA/forehead3.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "web1Rev")) { v_imageA = rt.loadimage("C64/spritesA/web1.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "web2Rev")) { v_imageA = rt.loadimage("C64/spritesA/web2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "web3Rev")) { v_imageA = rt.loadimage("C64/spritesA/web3.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "web4Rev")) { v_imageA = rt.loadimage("C64/spritesA/web4.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "fall1Rev")) { v_imageA = rt.loadimage("C64/spritesA/fall1.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "fall2Rev")) { v_imageA = rt.loadimage("C64/spritesA/fall2.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "fall3Rev")) { v_imageA = rt.loadimage("C64/spritesA/fall3.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "protectBodyRev")) { v_imageA = rt.loadimage("C64/spritesA/protectBody.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "protectHeadRev")) { v_imageA = rt.loadimage("C64/spritesA/protectHead.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "head1Rev")) { v_imageA = rt.loadimage("C64/spritesA/head1.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "head2Rev")) { v_imageA = rt.loadimage("C64/spritesA/head2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "hit1Rev")) { v_imageA = rt.loadimage("C64/spritesA/hit2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "hit2Rev")) { v_imageA = rt.loadimage("C64/spritesA/hit1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "hit3Rev")) { v_imageA = rt.loadimage("C64/spritesA/hit2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "foot1Rev")) { v_imageA = rt.loadimage("C64/spritesA/foot1.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "foot2Rev")) { v_imageA = rt.loadimage("C64/spritesA/foot2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "beheading1Rev")) { v_imageA = rt.loadimage("C64/spritesA/beheading1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "beheading2Rev")) { v_imageA = rt.loadimage("C64/spritesA/beheading2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "beheading3Rev")) { v_imageA = rt.loadimage("C64/spritesA/beheading3.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "beheading4Rev")) { v_imageA = rt.loadimage("C64/spritesA/beheading4.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "dead1Rev")) { v_imageA = rt.loadimage("C64/spritesA/sit1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "dead2Rev")) { v_imageA = rt.loadimage("C64/spritesA/dead2.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "dead3Rev")) { v_imageA = rt.loadimage("C64/spritesA/dead3.gif"); s_directionImageA = "large1Rev"; }
      if ((s_spriteA === "dead4Rev")) { v_imageA = rt.loadimage("C64/spritesA/dead4.gif"); s_directionImageA = "large3Rev"; }
      if ((s_spriteA === "roll1Rev")) { v_imageA = rt.loadimage("C64/spritesA/roll1.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "roll2Rev")) { v_imageA = rt.loadimage("C64/spritesA/roll2.gif"); s_directionImageA = "reverse"; }
      if ((s_spriteA === "roll3Rev")) { v_imageA = rt.loadimage("C64/spritesA/roll3.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll4Rev")) { v_imageA = rt.loadimage("C64/spritesA/roll2.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll5Rev")) { v_imageA = rt.loadimage("C64/spritesA/roll5.gif"); s_directionImageA = "normal"; }
      if ((s_spriteA === "roll6Rev")) { v_imageA = rt.loadimage("C64/spritesA/roll1.gif"); s_directionImageA = "normal"; }
      v_a1 = (v_xA - 1); v_b1 = (v_yForeheadA - 3);
      v_a2 = ((v_a1) * 8); v_b2 = ((v_b1) * 8);
      if (!((v_a2 > 0))) { pc = 1260; continue main; }
      if (!((s_directionImageA === "normal"))) { pc = 1262; continue main; }
      rt.putimage(v_imageA, v_a2, v_b2, undefined, undefined);
      case 1262:
      case 1261:
      if (!((s_directionImageA === "reverse"))) { pc = 1264; continue main; }
      rt.putimage(v_imageA, (v_a2 + 39), v_b2, v_a2, (v_b2 + 79));
      case 1264:
      case 1263:
      if (!((s_directionImageA === "large3Rev"))) { pc = 1266; continue main; }
      rt.putimage(v_imageA, (v_a2 + 40), v_b2, (v_a2 - 23), (v_b2 + 79));
      case 1266:
      case 1265:
      if (!((s_directionImageA === "large4Rev"))) { pc = 1268; continue main; }
      rt.putimage(v_imageA, (v_a2 + 41), v_b2, (v_a2 - 31), (v_b2 + 79));
      case 1268:
      case 1267:
      if (!((s_directionImageA === "large1Rev"))) { pc = 1270; continue main; }
      rt.putimage(v_imageA, (v_a2 + 39), v_b2, (v_a2 - 8), (v_b2 + 79));
      case 1270:
      case 1269:
      case 1260:
      case 1259:
      if ((s_spriteB === "standing")) { v_imageB = rt.loadimage("C64/spritesB/standing.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "sit1")) { v_imageB = rt.loadimage("C64/spritesB/sit1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "sit2")) { v_imageB = rt.loadimage("C64/spritesB/sit2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "waiting1")) { v_imageB = rt.loadimage("C64/spritesB/waiting1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "waiting2")) { v_imageB = rt.loadimage("C64/spritesB/waiting2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "waiting3")) { v_imageB = rt.loadimage("C64/spritesB/waiting3.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "neck1")) { v_imageB = rt.loadimage("C64/spritesB/protectHead.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "neck2")) { v_imageB = rt.loadimage("C64/spritesB/neck2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "neck3")) { v_imageB = rt.loadimage("C64/spritesB/neck3.gif", 256); s_directionImageB = "large4"; }
      if ((s_spriteB === "bodyChop1")) { v_imageB = rt.loadimage("C64/spritesB/bodyChop1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "bodyChop2")) { v_imageB = rt.loadimage("C64/spritesB/bodyChop2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "bodyChop3")) { v_imageB = rt.loadimage("C64/spritesB/bodyChop3.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "knee1")) { v_imageB = rt.loadimage("C64/spritesB/knee1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "knee2")) { v_imageB = rt.loadimage("C64/spritesB/sit2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "knee3")) { v_imageB = rt.loadimage("C64/spritesB/knee3.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "walk1")) { v_imageB = rt.loadimage("C64/spritesB/walk1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "walk2")) { v_imageB = rt.loadimage("C64/spritesB/walk2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "walk3")) { v_imageB = rt.loadimage("C64/spritesB/walk3.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "jump1")) { v_imageB = rt.loadimage("C64/spritesB/jump1.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "jump2")) { v_imageB = rt.loadimage("C64/spritesB/jump2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "winner1")) { v_imageB = rt.loadimage("C64/spritesB/winner1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "winner2")) { v_imageB = rt.loadimage("C64/spritesB/winner2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "winner3")) { v_imageB = rt.loadimage("C64/spritesB/winner3.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "turn1")) { v_imageB = rt.loadimage("C64/spritesB/turn1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "turn2")) { v_imageB = rt.loadimage("C64/spritesB/turn2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "turn3")) { v_imageB = rt.loadimage("C64/spritesB/turn3.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "forehead1")) { v_imageB = rt.loadimage("C64/spritesB/forehead1.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "forehead2")) { v_imageB = rt.loadimage("C64/spritesB/forehead2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "forehead3")) { v_imageB = rt.loadimage("C64/spritesB/forehead3.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "web1")) { v_imageB = rt.loadimage("C64/spritesB/web1.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "web2")) { v_imageB = rt.loadimage("C64/spritesB/web2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "web3")) { v_imageB = rt.loadimage("C64/spritesB/web3.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "web4")) { v_imageB = rt.loadimage("C64/spritesB/web4.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "fall1")) { v_imageB = rt.loadimage("C64/spritesB/fall1.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "fall2")) { v_imageB = rt.loadimage("C64/spritesB/fall2.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "fall3")) { v_imageB = rt.loadimage("C64/spritesB/fall3.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "protectBody")) { v_imageB = rt.loadimage("C64/spritesB/protectBody.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "protectHead")) { v_imageB = rt.loadimage("C64/spritesB/protectHead.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "head1")) { v_imageB = rt.loadimage("C64/spritesB/head1.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "head2")) { v_imageB = rt.loadimage("C64/spritesB/head2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "hit1")) { v_imageB = rt.loadimage("C64/spritesB/hit2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "hit2")) { v_imageB = rt.loadimage("C64/spritesB/hit1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "hit3")) { v_imageB = rt.loadimage("C64/spritesB/hit2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "foot1")) { v_imageB = rt.loadimage("C64/spritesB/foot1.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "foot2")) { v_imageB = rt.loadimage("C64/spritesB/foot2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "beheading1")) { v_imageB = rt.loadimage("C64/spritesB/beheading1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "beheading2")) { v_imageB = rt.loadimage("C64/spritesB/beheading2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "beheading3")) { v_imageB = rt.loadimage("C64/spritesB/beheading3.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "beheading4")) { v_imageB = rt.loadimage("C64/spritesB/beheading4.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "dead1")) { v_imageB = rt.loadimage("C64/spritesB/sit1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "dead2")) { v_imageB = rt.loadimage("C64/spritesB/dead2.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "dead3")) { v_imageB = rt.loadimage("C64/spritesB/dead3.gif", 256); s_directionImageB = "large1"; }
      if ((s_spriteB === "dead4")) { v_imageB = rt.loadimage("C64/spritesB/dead4.gif", 256); s_directionImageB = "large3"; }
      if ((s_spriteB === "roll1")) { v_imageB = rt.loadimage("C64/spritesB/roll1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "roll2")) { v_imageB = rt.loadimage("C64/spritesB/roll2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "roll3")) { v_imageB = rt.loadimage("C64/spritesB/roll3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll4")) { v_imageB = rt.loadimage("C64/spritesB/roll2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll5")) { v_imageB = rt.loadimage("C64/spritesB/roll5.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll6")) { v_imageB = rt.loadimage("C64/spritesB/roll1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "standingRev")) { v_imageB = rt.loadimage("C64/spritesB/standing.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "sit1Rev")) { v_imageB = rt.loadimage("C64/spritesB/sit1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "sit2Rev")) { v_imageB = rt.loadimage("C64/spritesB/sit2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "waiting1Rev")) { v_imageB = rt.loadimage("C64/spritesB/waiting1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "waiting2Rev")) { v_imageB = rt.loadimage("C64/spritesB/waiting2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "waiting3Rev")) { v_imageB = rt.loadimage("C64/spritesB/waiting3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "neck1Rev")) { v_imageB = rt.loadimage("C64/spritesB/protectHead.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "neck2Rev")) { v_imageB = rt.loadimage("C64/spritesB/neck2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "neck3Rev")) { v_imageB = rt.loadimage("C64/spritesB/neck3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "bodyChop1Rev")) { v_imageB = rt.loadimage("C64/spritesB/bodyChop1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "bodyChop2Rev")) { v_imageB = rt.loadimage("C64/spritesB/bodyChop2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "bodyChop3Rev")) { v_imageB = rt.loadimage("C64/spritesB/bodyChop3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "knee1Rev")) { v_imageB = rt.loadimage("C64/spritesB/knee1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "knee2Rev")) { v_imageB = rt.loadimage("C64/spritesB/sit2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "knee3Rev")) { v_imageB = rt.loadimage("C64/spritesB/knee3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "walk1Rev")) { v_imageB = rt.loadimage("C64/spritesB/walk1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "walk2Rev")) { v_imageB = rt.loadimage("C64/spritesB/walk2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "walk3Rev")) { v_imageB = rt.loadimage("C64/spritesB/walk3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "jump1Rev")) { v_imageB = rt.loadimage("C64/spritesB/jump1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "jump2Rev")) { v_imageB = rt.loadimage("C64/spritesB/jump2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "winner1Rev")) { v_imageB = rt.loadimage("C64/spritesB/winner1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "winner2Rev")) { v_imageB = rt.loadimage("C64/spritesB/winner2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "winner3Rev")) { v_imageB = rt.loadimage("C64/spritesB/winner3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "turn1Rev")) { v_imageB = rt.loadimage("C64/spritesB/turn1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "turn2Rev")) { v_imageB = rt.loadimage("C64/spritesB/turn2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "turn3Rev")) { v_imageB = rt.loadimage("C64/spritesB/turn3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "forehead1Rev")) { v_imageB = rt.loadimage("C64/spritesB/forehead1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "forehead2Rev")) { v_imageB = rt.loadimage("C64/spritesB/forehead2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "forehead3Rev")) { v_imageB = rt.loadimage("C64/spritesB/forehead3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "web1Rev")) { v_imageB = rt.loadimage("C64/spritesB/web1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "web2Rev")) { v_imageB = rt.loadimage("C64/spritesB/web2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "web3Rev")) { v_imageB = rt.loadimage("C64/spritesB/web3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "web4Rev")) { v_imageB = rt.loadimage("C64/spritesB/web4.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "fall1Rev")) { v_imageB = rt.loadimage("C64/spritesB/fall1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "fall2Rev")) { v_imageB = rt.loadimage("C64/spritesB/fall2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "fall3Rev")) { v_imageB = rt.loadimage("C64/spritesB/fall3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "protectBodyRev")) { v_imageB = rt.loadimage("C64/spritesB/protectBody.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "protectHeadRev")) { v_imageB = rt.loadimage("C64/spritesB/protectHead.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "head1Rev")) { v_imageB = rt.loadimage("C64/spritesB/head1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "head2Rev")) { v_imageB = rt.loadimage("C64/spritesB/head2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "hit1Rev")) { v_imageB = rt.loadimage("C64/spritesB/hit2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "hit2Rev")) { v_imageB = rt.loadimage("C64/spritesB/hit1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "hit3Rev")) { v_imageB = rt.loadimage("C64/spritesB/hit2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "foot1Rev")) { v_imageB = rt.loadimage("C64/spritesB/foot1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "foot2Rev")) { v_imageB = rt.loadimage("C64/spritesB/foot2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "beheading1Rev")) { v_imageB = rt.loadimage("C64/spritesB/beheading1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "beheading2Rev")) { v_imageB = rt.loadimage("C64/spritesB/beheading2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "beheading3Rev")) { v_imageB = rt.loadimage("C64/spritesB/beheading3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "beheading4Rev")) { v_imageB = rt.loadimage("C64/spritesB/beheading4.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "dead1Rev")) { v_imageB = rt.loadimage("C64/spritesB/sit1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "dead2Rev")) { v_imageB = rt.loadimage("C64/spritesB/dead2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "dead3Rev")) { v_imageB = rt.loadimage("C64/spritesB/dead3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "dead4Rev")) { v_imageB = rt.loadimage("C64/spritesB/dead4.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll1Rev")) { v_imageB = rt.loadimage("C64/spritesB/roll1.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll2Rev")) { v_imageB = rt.loadimage("C64/spritesB/roll2.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll3Rev")) { v_imageB = rt.loadimage("C64/spritesB/roll3.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll4Rev")) { v_imageB = rt.loadimage("C64/spritesB/roll2.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "roll5Rev")) { v_imageB = rt.loadimage("C64/spritesB/roll5.gif", 256); s_directionImageB = "reverse"; }
      if ((s_spriteB === "roll6Rev")) { v_imageB = rt.loadimage("C64/spritesB/roll1.gif", 256); s_directionImageB = "normal"; }
      if ((s_spriteB === "wizard1")) { v_imageB = rt.loadimage("C64/sprites/drax1.gif"); s_directionImageB = "reverse"; }
      if ((s_spriteB === "wizard2")) { v_imageB = rt.loadimage("C64/sprites/drax2.gif"); s_directionImageB = "reverse"; }
      if ((s_spriteB === "marianna")) { v_imageB = rt.loadimage("C64/sprites/marianna.gif"); s_directionImageB = "reverse"; }
      v_a3 = (v_xB - 1); v_b3 = (v_yForeheadB - 3);
      v_a4 = ((v_a3) * 8); v_b4 = ((v_b3) * 8);
      if (!((v_a4 < 290))) { pc = 1272; continue main; }
      if (!((s_directionImageB === "large4"))) { pc = 1274; continue main; }
      rt.putimage(v_imageB, (v_a4 + 41), v_b4, (v_a4 - 31), (v_b4 + 79));
      case 1274:
      case 1273:
      if (!((s_directionImageB === "large3"))) { pc = 1276; continue main; }
      rt.putimage(v_imageB, (v_a4 + 40), v_b4, (v_a4 - 23), (v_b4 + 79));
      case 1276:
      case 1275:
      if (!((s_directionImageB === "large1"))) { pc = 1278; continue main; }
      rt.putimage(v_imageB, (v_a4 + 39), v_b4, (v_a4 - 8), (v_b4 + 79));
      case 1278:
      case 1277:
      if (!((s_directionImageB === "normal"))) { pc = 1280; continue main; }
      rt.putimage(v_imageB, (v_a4 + 39), v_b4, v_a4, (v_b4 + 79));
      case 1280:
      case 1279:
      if (!((s_directionImageB === "reverse"))) { pc = 1282; continue main; }
      rt.putimage(v_imageB, v_a4, v_b4, undefined, undefined);
      case 1282:
      case 1281:
      case 1272:
      case 1271:
      if (!(((((((s_playerA === "dead") || (s_playerA === "deadRev")) || (s_playerA === "deadBeheading")) || (s_playerA === "deadBeheadingRev")) || (s_playerA === "knee")) || (s_playerA === "kneeRev")))) { pc = 1284; continue main; }
      v_a1 = (v_xA - 1); v_b1 = (v_yForeheadA - 3);
      v_a2 = ((v_a1) * 8); v_b2 = ((v_b1) * 8);
      if (!((v_a2 > 0))) { pc = 1286; continue main; }
      if (!((s_directionImageA === "normal"))) { pc = 1288; continue main; }
      rt.putimage(v_imageA, v_a2, v_b2, undefined, undefined);
      case 1288:
      case 1287:
      if (!((s_directionImageA === "reverse"))) { pc = 1290; continue main; }
      rt.putimage(v_imageA, (v_a2 + 39), v_b2, v_a2, (v_b2 + 79));
      case 1290:
      case 1289:
      if (!((s_directionImageA === "large3Rev"))) { pc = 1292; continue main; }
      rt.putimage(v_imageA, (v_a2 + 40), v_b2, (v_a2 - 23), (v_b2 + 79));
      case 1292:
      case 1291:
      if (!((s_directionImageA === "large1Rev"))) { pc = 1294; continue main; }
      rt.putimage(v_imageA, (v_a2 + 39), v_b2, (v_a2 - 8), (v_b2 + 79));
      case 1294:
      case 1293:
      case 1286:
      case 1285:
      case 1284:
      case 1283:
      if (!(((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")))) { pc = 1296; continue main; }
      if (!((v_bloodBeheadingA === 1))) { pc = 1298; continue main; }
      v_xSpurt = (((v_xA * 8)) + 1); v_ySpurt = (((v_yForeheadA - 2)) * 8);
      v_object = rt.loadimage("C64/sprites/spurt1.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1298:
      case 1297:
      if (!((v_bloodBeheadingA === 2))) { pc = 1300; continue main; }
      v_xSpurt = (((v_xA * 8)) + 1); v_ySpurt = (((v_yForeheadA - 2)) * 8);
      v_object = rt.loadimage("C64/sprites/spurt2.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1300:
      case 1299:
      if (!((v_bloodBeheadingA === 3))) { pc = 1302; continue main; }
      v_xSpurt = (((v_xA * 8)) + 1); v_ySpurt = (((v_yForeheadA - 2)) * 8);
      v_object = rt.loadimage("C64/sprites/spurt3.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1302:
      case 1301:
      if (!((v_bloodBeheadingA === 4))) { pc = 1304; continue main; }
      v_xSpurt = (v_xA * 8); v_ySpurt = (((((v_yBodyA - 3)) * 8)) - 2);
      v_object = rt.loadimage("C64/sprites/spurt1.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1304:
      case 1303:
      if (!((v_bloodBeheadingA === 5))) { pc = 1306; continue main; }
      v_xSpurt = (v_xA * 8); v_ySpurt = (((((v_yBodyA - 3)) * 8)) - 2);
      v_object = rt.loadimage("C64/sprites/spurt2.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1306:
      case 1305:
      if (!((v_bloodBeheadingA === 6))) { pc = 1308; continue main; }
      v_xSpurt = (v_xA * 8); v_ySpurt = (((((v_yBodyA - 3)) * 8)) - 2);
      v_object = rt.loadimage("C64/sprites/spurt3.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1308:
      case 1307:
      case 1296:
      case 1295:
      if (!(((s_playerB === "deadBeheading") || (s_playerB === "deadBeheadingRev")))) { pc = 1310; continue main; }
      if (!((v_bloodBeheadingB === 1))) { pc = 1312; continue main; }
      v_xSpurt = (((v_xB * 8)) + 1); v_ySpurt = (((v_yForeheadB - 2)) * 8);
      v_object = rt.loadimage("C64/sprites/spurt1.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1312:
      case 1311:
      if (!((v_bloodBeheadingB === 2))) { pc = 1314; continue main; }
      v_xSpurt = (((v_xB * 8)) + 1); v_ySpurt = (((v_yForeheadB - 2)) * 8);
      v_object = rt.loadimage("C64/sprites/spurt2.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1314:
      case 1313:
      if (!((v_bloodBeheadingB === 3))) { pc = 1316; continue main; }
      v_xSpurt = (((v_xB * 8)) + 1); v_ySpurt = (((v_yForeheadB - 2)) * 8);
      v_object = rt.loadimage("C64/sprites/spurt3.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1316:
      case 1315:
      if (!((v_bloodBeheadingB === 4))) { pc = 1318; continue main; }
      v_xSpurt = (v_xB * 8); v_ySpurt = (((((v_yBodyB - 3)) * 8)) - 2);
      v_object = rt.loadimage("C64/sprites/spurt1.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1318:
      case 1317:
      if (!((v_bloodBeheadingB === 5))) { pc = 1320; continue main; }
      v_xSpurt = (v_xB * 8); v_ySpurt = (((((v_yBodyB - 3)) * 8)) - 2);
      v_object = rt.loadimage("C64/sprites/spurt2.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1320:
      case 1319:
      if (!((v_bloodBeheadingB === 6))) { pc = 1322; continue main; }
      v_xSpurt = (v_xB * 8); v_ySpurt = (((((v_yBodyB - 3)) * 8)) - 2);
      v_object = rt.loadimage("C64/sprites/spurt3.gif");
      rt.putimage(v_object, v_xSpurt, v_ySpurt, undefined, undefined);
      case 1322:
      case 1321:
      case 1310:
      case 1309:
      if ((s_bloodA === "no")) { { pc = 38; continue main; } }
      if (!((((s_playerA === "hit1") || (s_playerA === "hit1Rev")) || (s_playerA === "dead")))) { pc = 1324; continue main; }
      v_xBlood1 = v_xA; v_yBlood1 = (v_yAttackB - 1);
      case 1324:
      case 1323:
      if (!((((s_playerA === "fall1") || (s_playerA === "fall1Rev")) || (s_playerA === "deadRev")))) { pc = 1326; continue main; }
      v_xBlood1 = v_xA; v_yBlood1 = (v_yAttackB - 1);
      case 1326:
      case 1325:
      v_xBlood2 = (v_xBlood1 * 8); v_yBlood2 = (v_yBlood1 * 8);
      v_object = rt.loadimage("C64/sprites/blood.gif");
      rt.putimage(v_object, v_xBlood2, v_yBlood2, undefined, undefined);
      case 38: // blood2
      if ((s_bloodB === "no")) { { pc = 39; continue main; } }
      if (!((((s_playerB === "hit1") || (s_playerB === "hit1Rev")) || (s_playerB === "dead")))) { pc = 1328; continue main; }
      v_xBlood1 = (v_xB + 1); v_yBlood1 = (v_yAttackA - 1);
      case 1328:
      case 1327:
      if (!((((s_playerB === "fall1") || (s_playerB === "fall1Rev")) || (s_playerB === "deadRev")))) { pc = 1330; continue main; }
      v_xBlood1 = (v_xB + 1); v_yBlood1 = (v_yAttackA - 1);
      case 1330:
      case 1329:
      v_xBlood2 = (v_xBlood1 * 8); v_yBlood2 = (v_yBlood1 * 8);
      v_object = rt.loadimage("C64/sprites/blood.gif");
      rt.putimage(v_object, v_xBlood2, v_yBlood2, undefined, undefined);
      case 39: // snake
      if (!((s_entry === "yes"))) { pc = 1332; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA1.gif");
      if ((v_xA === 3)) { v_snake = rt.loadimage("C64/stage/snakeA2.gif"); }
      if ((v_xA === 4)) { v_snake = rt.loadimage("C64/stage/snakeA3.gif"); }
      if ((v_xA === 5)) { v_snake = rt.loadimage("C64/stage/snakeA2.gif"); }
      if ((v_xA === 6)) { v_snake = rt.loadimage("C64/stage/snakeA1.gif"); }
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      v_snake = rt.loadimage("C64/stage/snakeB1.gif");
      if ((v_xB === 34)) { v_snake = rt.loadimage("C64/stage/snakeB2.gif"); }
      if ((v_xB === 33)) { v_snake = rt.loadimage("C64/stage/snakeB3.gif"); }
      if ((v_xB === 32)) { v_snake = rt.loadimage("C64/stage/snakeB2.gif"); }
      if ((v_xB === 31)) { v_snake = rt.loadimage("C64/stage/snakeB1.gif"); }
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      { pc = 45; continue main; }
      case 1332:
      case 1331:
      if (!((s_entryWizard === "yes"))) { pc = 1334; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA1.gif");
      if ((v_xA === 2)) { v_snake = rt.loadimage("C64/stage/snakeA3.gif"); }
      if ((v_xA === 3)) { v_snake = rt.loadimage("C64/stage/snakeA2.gif"); }
      if ((v_xA === 4)) { v_snake = rt.loadimage("C64/stage/snakeA1.gif"); }
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      v_snake = rt.loadimage("C64/stage/snakeB1.gif");
      if ((v_xA === 2)) { v_snake = rt.loadimage("C64/stage/snakeB3.gif"); }
      if ((v_xA === 3)) { v_snake = rt.loadimage("C64/stage/snakeB2.gif"); }
      if ((v_xA === 4)) { v_snake = rt.loadimage("C64/stage/snakeB1.gif"); }
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      { pc = 45; continue main; }
      case 1334:
      case 1333:
      if ((s_snakeA === "no")) { { pc = 40; continue main; } }
      if (!(((s_spriteA === "hit1") || (s_spriteA === "hit1Rev")))) { pc = 1336; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA2.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1336:
      case 1335:
      if (!(((s_spriteA === "hit2") || (s_spriteA === "hit2Rev")))) { pc = 1338; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA3.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1338:
      case 1337:
      if (!(((s_spriteA === "hit3") || (s_spriteA === "hit3Rev")))) { pc = 1340; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA2.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1340:
      case 1339:
      if (!(((s_spriteA === "hit4") || (s_spriteA === "hit4Rev")))) { pc = 1342; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA1.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1342:
      case 1341:
      if (!(((s_spriteA === "fall1") || (s_spriteA === "fall1Rev")))) { pc = 1344; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA2.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1344:
      case 1343:
      if (!(((s_spriteA === "fall2") || (s_spriteA === "fall2Rev")))) { pc = 1346; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA3.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1346:
      case 1345:
      if (!(((s_spriteA === "fall3") || (s_spriteA === "fall3Rev")))) { pc = 1348; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA2.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1348:
      case 1347:
      if (!(((s_spriteA === "fall4") || (s_spriteA === "fall4Rev")))) { pc = 1350; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeA1.gif");
      rt.putimage(v_snake, 0, 16, undefined, undefined);
      case 1350:
      case 1349:
      case 40: // snake2
      if ((s_snakeB === "no")) { { pc = 41; continue main; } }
      if (!(((s_spriteB === "hit1") || (s_spriteB === "hit1Rev")))) { pc = 1352; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB2.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1352:
      case 1351:
      if (!(((s_spriteB === "hit2") || (s_spriteB === "hit2Rev")))) { pc = 1354; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB3.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1354:
      case 1353:
      if (!(((s_spriteB === "hit3") || (s_spriteB === "hit3Rev")))) { pc = 1356; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB2.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1356:
      case 1355:
      if (!(((s_spriteB === "hit4") || (s_spriteB === "hit4Rev")))) { pc = 1358; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB1.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1358:
      case 1357:
      if (!(((s_spriteB === "fall1") || (s_spriteB === "fall1Rev")))) { pc = 1360; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB2.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1360:
      case 1359:
      if (!(((s_spriteB === "fall2") || (s_spriteB === "fall2Rev")))) { pc = 1362; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB3.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1362:
      case 1361:
      if (!(((s_spriteB === "fall3") || (s_spriteB === "fall3Rev")))) { pc = 1364; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB2.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1364:
      case 1363:
      if (!(((s_spriteB === "fall4") || (s_spriteB === "fall4Rev")))) { pc = 1366; continue main; }
      v_snake = rt.loadimage("C64/stage/snakeB1.gif");
      rt.putimage(v_snake, 288, 16, undefined, undefined);
      case 1366:
      case 1365:
      case 41: // head2
      if (!((s_gnome === "yes"))) { pc = 1368; continue main; }
      if (((((s_playerA === "dead") || (s_playerB === "dead")) || (s_playerA === "deadRev")) || (s_playerB === "deadRev"))) { { pc = 44; continue main; } }
      if ((s_football === "yes")) { { pc = 42; continue main; } }
      if (((v_xGnome < 273) && (v_xGnome > (v_xHeadSprite - 24)))) { s_football = "yes"; v_refTimeB = v_time; }
      { pc = 43; continue main; }
      case 42: // gnomeSlapsHead
      if (!((s_football === "yes"))) { pc = 1370; continue main; }
      if ((v_time > (v_refTimeB + 113))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 112))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 5; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 106))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 105))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 6; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 98))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 97))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 1; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 91))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 90))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 2; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 83))) { { pc = 43; continue main; } }
      if (!((v_time > (v_refTimeB + 82)))) { pc = 1372; continue main; }
      if (((((s_repeatMusic === "no") && (v_xGnome < 273)) && (v_xHeadSprite < 273)) && (v_xGnome < (v_xB * 8)))) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 159; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 3; { pc = 43; continue main; }
      case 1372:
      case 1371:
      if ((v_time > (v_refTimeB + 76))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 75))) { v_yHeadSprite = 157; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 4; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 68))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 67))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 5; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 61))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 60))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 6; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 53))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 52))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 1; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 46))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 45))) { v_yHeadSprite = 159; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 2; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 38))) { { pc = 43; continue main; } }
      if (!((v_time > (v_refTimeB + 37)))) { pc = 1374; continue main; }
      if (((((s_repeatMusic === "no") && (v_xGnome < 273)) && (v_xHeadSprite < 273)) && (v_xGnome < (v_xB * 8)))) { rt.sndplayfile("C64/sound/head.ogg"); }
      v_yHeadSprite = 159; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 3; { pc = 43; continue main; }
      case 1374:
      case 1373:
      if ((v_time > (v_refTimeB + 31))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 30))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 4; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 23))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 22))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 5; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 16))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 15))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 6; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 8))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 7))) { v_yHeadSprite = 151; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 1; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 5))) { { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 4))) { v_yHeadSprite = 153; v_xHeadSprite = (v_xHeadSprite + 16); v_headNumber = 2; { pc = 43; continue main; } }
      if ((v_time > (v_refTimeB + 2))) { { pc = 43; continue main; } }
      if (!((v_time > (v_refTimeB + 1)))) { pc = 1376; continue main; }
      if (((((s_repeatMusic === "no") && (v_xGnome < 273)) && (v_xHeadSprite < 273)) && (v_xGnome < (v_xB * 8)))) { rt.sndplayfile("C64/sound/head.ogg"); }
      { pc = 43; continue main; }
      case 1376:
      case 1375:
      case 1370:
      case 1369:
      case 43: // showHeadShadow
      if ((v_headNumber === 1)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead1.gif"); }
      if ((v_headNumber === 2)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead2.gif"); }
      if ((v_headNumber === 3)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead3.gif"); }
      if ((v_headNumber === 4)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead4.gif"); }
      if ((v_headNumber === 5)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead5.gif"); }
      if ((v_headNumber === 6)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead6.gif"); }
      v_spriteShadow = rt.loadimage("C64/spritesA/headShadow.gif");
      if ((v_xHeadSprite < 320)) { rt.putimage(v_spriteShadow, v_xHeadSprite, 168, undefined, undefined); }
      if ((v_xHeadSprite < 320)) { rt.putimage(v_spriteHead, v_xHeadSprite, v_yHeadSprite, undefined, undefined); }
      { pc = 44; continue main; }
      case 1368:
      case 1367:
      if (!(((((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")) || (s_playerB === "deadBeheading")) || (s_playerB === "deadBeheadingRev")))) { pc = 1378; continue main; }
      if ((v_headNumber === 1)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead1.gif"); }
      if ((v_headNumber === 2)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead2.gif"); }
      if ((v_headNumber === 3)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead3.gif"); }
      if ((v_headNumber === 4)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead4.gif"); }
      if ((v_headNumber === 5)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead5.gif"); }
      if ((v_headNumber === 6)) { v_spriteHead = rt.loadimage("C64/spritesA/severedHead6.gif"); }
      v_xHeadSprite = (((v_xHeadSprite - 1)) * 8);
      v_spriteShadow = rt.loadimage("C64/spritesA/headShadow.gif");
      if ((v_xHeadSprite < 320)) { rt.putimage(v_spriteShadow, v_xHeadSprite, 168, undefined, undefined); }
      if ((v_xHeadSprite < 320)) { rt.putimage(v_spriteHead, v_xHeadSprite, v_yHeadSprite, undefined, undefined); }
      case 1378:
      case 1377:
      case 44: // gnome2
      if (!((s_gnome === "yes"))) { pc = 1380; continue main; }
      if (!((v_xGnome > 350))) { pc = 1382; continue main; }
      v_xGnome = 350;
      if (!(((s_playerB === "deadBeheading") || (s_playerB === "deadBeheadingRev")))) { pc = 1384; continue main; }
      if ((s_mode === "vs")) { s_bonusA = "yes"; }
      if (!((s_mode === "solo"))) { pc = 1386; continue main; }
      if ((v_xB >= 37)) { s_exitA = "yes"; s_aBusy = "no"; }
      case 1386:
      case 1385:
      case 1384:
      case 1383:
      if (!(((s_playerB === "dead") || (s_playerB === "deadRev")))) { pc = 1388; continue main; }
      if ((s_mode === "vs")) { s_bonusA = "yes"; }
      if (!((s_mode === "solo"))) { pc = 1390; continue main; }
      if ((v_xB >= 37)) { s_exitA = "yes"; s_aBusy = "no"; }
      case 1390:
      case 1389:
      case 1388:
      case 1387:
      if (!(((s_playerA === "deadBeheading") || (s_playerA === "deadBeheadingRev")))) { pc = 1392; continue main; }
      if ((s_mode === "vs")) { s_bonusB = "yes"; }
      if (!((s_mode === "solo"))) { pc = 1394; continue main; }
      if ((v_xA >= 37)) { s_exitB = "yes"; s_bBusy = "no"; }
      case 1394:
      case 1393:
      case 1392:
      case 1391:
      if (!(((s_playerA === "dead") || (s_playerA === "deadRev")))) { pc = 1396; continue main; }
      if ((s_mode === "vs")) { s_bonusB = "yes"; }
      if (!((s_mode === "solo"))) { pc = 1398; continue main; }
      if ((v_xA >= 37)) { s_exitB = "yes"; s_bBusy = "no"; }
      case 1398:
      case 1397:
      case 1396:
      case 1395:
      case 1382:
      case 1381:
      if ((v_gnomeNumber === 1)) { v_spriteGnome = rt.loadimage("C64/sprites/gnome1.gif"); }
      if ((v_gnomeNumber === 2)) { v_spriteGnome = rt.loadimage("C64/sprites/gnome2.gif"); }
      if ((v_gnomeNumber === 3)) { v_spriteGnome = rt.loadimage("C64/sprites/gnome3.gif"); }
      if ((v_gnomeNumber === 4)) { v_spriteGnome = rt.loadimage("C64/sprites/gnome4.gif"); }
      if ((v_gnomeNumber === 5)) { v_spriteGnome = rt.loadimage("C64/sprites/gnomeLaugh1.gif"); }
      if ((v_gnomeNumber === 6)) { v_spriteGnome = rt.loadimage("C64/sprites/gnomeLaugh2.gif"); }
      if ((v_xGnome < 312)) { rt.putimage(v_spriteGnome, v_xGnome, 144, undefined, undefined); }
      case 1380:
      case 1379:
      if (!(((s_playerA === "deadBeheading") || (s_playerA === "dead")))) { pc = 1400; continue main; }
      if (!((v_xGnome > (v_a2 + 20)))) { pc = 1402; continue main; }
      if (!((s_soundLaughs === "no"))) { pc = 1404; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gnome.wav"); }
      case 1404:
      case 1403:
      s_soundLaughs = "yes";
      s_gnomeLaughs = "yes";
      case 1402:
      case 1401:
      case 1400:
      case 1399:
      if (!(((s_playerA === "deadBeheadingRev") || (s_playerA === "deadRev")))) { pc = 1406; continue main; }
      if (!((v_xGnome > v_a2))) { pc = 1408; continue main; }
      if (!((s_soundLaughs === "no"))) { pc = 1410; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gnome.wav"); }
      case 1410:
      case 1409:
      s_soundLaughs = "yes";
      s_gnomeLaughs = "yes";
      case 1408:
      case 1407:
      case 1406:
      case 1405:
      if (!(((s_playerB === "deadBeheading") || (s_playerB === "dead")))) { pc = 1412; continue main; }
      if (!((v_xGnome > v_a4))) { pc = 1414; continue main; }
      if (!((s_soundLaughs === "no"))) { pc = 1416; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gnome.wav"); }
      case 1416:
      case 1415:
      s_soundLaughs = "yes";
      s_gnomeLaughs = "yes";
      case 1414:
      case 1413:
      case 1412:
      case 1411:
      if (!(((s_playerB === "deadBeheadingRev") || (s_playerB === "deadRev")))) { pc = 1418; continue main; }
      if (!((v_xGnome > (v_a4 + 20)))) { pc = 1420; continue main; }
      if (!((s_soundLaughs === "no"))) { pc = 1422; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gnome.wav"); }
      case 1422:
      case 1421:
      s_soundLaughs = "yes";
      s_gnomeLaughs = "yes";
      case 1420:
      case 1419:
      case 1418:
      case 1417:
      if (!(((s_playerA === "deadBeheading") || (s_playerA === "dead")))) { pc = 1424; continue main; }
      if (!((v_xGnome > (v_a2 + 56)))) { pc = 1426; continue main; }
      if (!((s_gnomePulls === "yes"))) { pc = 1428; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gameover.ogg"); }
      case 1428:
      case 1427:
      s_gnomePulls = "no";
      v_xA = (v_xA + 1);
      case 1426:
      case 1425:
      case 1424:
      case 1423:
      if (!(((s_playerA === "deadBeheadingRev") || (s_playerA === "deadRev")))) { pc = 1430; continue main; }
      if (!((v_xGnome > (v_a2 + 35)))) { pc = 1432; continue main; }
      if (!((s_gnomePulls === "yes"))) { pc = 1434; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gameover.ogg"); }
      case 1434:
      case 1433:
      s_gnomePulls = "no";
      v_xA = (v_xA + 1);
      case 1432:
      case 1431:
      case 1430:
      case 1429:
      if (!(((s_playerB === "deadBeheading") || (s_playerB === "dead")))) { pc = 1436; continue main; }
      if (!((v_xGnome > (v_a4 + 35)))) { pc = 1438; continue main; }
      if (!((s_gnomePulls === "yes"))) { pc = 1440; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gameover.ogg"); }
      case 1440:
      case 1439:
      s_gnomePulls = "no";
      v_xB = (v_xB + 1);
      case 1438:
      case 1437:
      case 1436:
      case 1435:
      if (!(((s_playerB === "deadBeheadingRev") || (s_playerB === "deadRev")))) { pc = 1442; continue main; }
      if (!((v_xGnome > (v_a4 + 56)))) { pc = 1444; continue main; }
      if (!((s_gnomePulls === "yes"))) { pc = 1446; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/gameover.ogg"); }
      case 1446:
      case 1445:
      s_gnomePulls = "no";
      v_xB = (v_xB + 1);
      case 1444:
      case 1443:
      case 1442:
      case 1441:
      case 45: // trees
      if (!((((v_xA < 5) || (v_xB < 5)) || ((s_gnome === "yes") && (v_xGnome < 88))))) { pc = 1448; continue main; }
      rt.clearcolor(rt.rgb(247, 0, 0), v_treeLeft);
      rt.putimage(v_treeLeft, 0, 96, undefined, undefined);
      case 1448:
      case 1447:
      if (!(((((v_xB > 31) || (v_xA > 31)) || (v_xGnome > 256)) || (v_xHeadSprite > 263)))) { pc = 1450; continue main; }
      rt.clearcolor(rt.rgb(247, 0, 0), v_treeRight);
      rt.putimage(v_treeRight, 288, 96, undefined, undefined);
      case 1450:
      case 1449:
      if (!((((s_game === "inProgress") && (s_wizard === "yes")) && (v_xAttackB < (v_xB - 1))))) { pc = 1452; continue main; }
      v_xFire = (((v_xAttackB - 1)) * 8); v_yFire = (((v_yAttackB - 1)) * 8);
      if (!((((v_xAttackB === 26) || (v_xAttackB === 17)) || (v_xAttackB === 9)))) { pc = 1454; continue main; }
      v_object = rt.loadimage("C64/sprites/fire1.gif");
      rt.clearcolor(rt.rgb(255, 0, 0), v_object);
      rt.putimage(v_object, v_xFire, v_yFire, undefined, undefined);
      case 1454:
      case 1453:
      if (!(((v_xAttackB === 23) || ((v_xAttackB === 14) && (v_xAttackB < (v_xB - 15)))))) { pc = 1456; continue main; }
      v_object = rt.loadimage("C64/sprites/fire2.gif");
      rt.clearcolor(rt.rgb(255, 0, 0), v_object);
      rt.putimage(v_object, v_xFire, v_yFire, undefined, undefined);
      case 1456:
      case 1455:
      if (!(((v_xAttackB === 20) || (v_xAttackB === 11)))) { pc = 1458; continue main; }
      v_object = rt.loadimage("C64/sprites/fire3.gif");
      rt.clearcolor(rt.rgb(255, 0, 0), v_object);
      rt.putimage(v_object, v_xFire, v_yFire, undefined, undefined);
      case 1458:
      case 1457:
      case 1452:
      case 1451:
      if (!((s_game === "won"))) { pc = 1460; continue main; }
      v_object = rt.loadimage("C64/stage/thanks.png");
      rt.putimage(v_object, 72, 136, undefined, undefined);
      rt.display();
      yield rt.sleep();
      v_ai = 0; v_scoreA = 0; v_scoreB = 0;
      s_wizard = "no"; s_marianna = "no"; s_game = "inProgress";
      s_stage = "throne";
      { pc = 2; continue main; }
      case 1460:
      case 1459:
      if (!(((s_game === "lost") && (s_playerA === "wizardFinished")))) { pc = 1462; continue main; }
      v_object = rt.loadimage("C64/stage/gameover.png");
      rt.putimage(v_object, 88, 136, undefined, undefined);
      case 1462:
      case 1461:
      rt.display();
      yield rt.limit(40);
      if (!((s_stop === "yes"))) { pc = 1464; continue main; }
      if (!((s_game === "inProgress"))) { pc = 1466; continue main; }
      if ((s_repeatMusic === "no")) { rt.sndplayfile("C64/sound/nothing.ogg"); }
      v_scoreA = 0; v_scoreB = 0;
      { pc = 2; continue main; }
      case 1466:
      case 1465:
      if (!(((s_game === "won") || (s_game === "lost")))) { pc = 1468; continue main; }
      v_ai = 0; v_scoreA = 0; v_scoreB = 0;
      s_wizard = "no"; s_marianna = "no"; s_game = "inProgress";
      s_stage = "throne";
      { pc = 2; continue main; }
      case 1468:
      case 1467:
      case 1464:
      case 1463:
      { pc = 96; continue main; }
      default: return;
    }
    return;
  }
}
