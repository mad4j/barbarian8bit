// Computer-controlled fighting: the demo player A and the opponent B of the 1 player game.
// Both look at the distance between the fighters and at what the other one is doing, then pick a pose
// (startPose / setPose) and return 'poseX', or push the stick (`stick`) and return 'actionX'.
// The decision is mirrored when the fighters have changed sides ('Rev' poses, sticks right instead of left).
import { startPose, setPose } from './fighter.js';

// The strikes the computer plays one after the other when nothing special happens: one pose per call,
// and after the last one the fighter walks back (`stickAfter`) and starts again.
function playStrikes(g, f, poses, stickAfter) {
  const side = f === g.a ? 'A' : 'B';
  const pose = poses[f.strike];
  if (pose) {
    startPose(g, f, pose);
    f.strike += 1;
    return `pose${side}`;
  }
  if (f.strike === poses.length) {
    f.stick = stickAfter;
    f.strike = 0;
    return `action${side}`;
  }
  return undefined;
}

export function demoFightA(g) {
  const { a, b } = g;
  if (g.demo === 'yes') {
    if (g.direction === 'normal') {
      g.distance = b.x - a.x;
      if (g.distance >= 15) { startPose(g, a, 'rollForward'); return 'poseA'; }
      if (g.distance === 12 && b.state === 'standing') { startPose(g, a, 'behead'); return 'poseA'; }
      if (g.distance === 9) {
        if (b.waiting > 50) { startPose(g, a, 'behead'); return 'poseA'; }
        if (b.state === 'rollBack') { startPose(g, a, 'knee'); return 'poseA'; }
        if (b.busy === 'yes') { startPose(g, a, 'rollForward'); return 'poseA'; }
      }
      if (g.distance < 9 && g.distance > 6) {
        if (b.state === 'rollBack') { startPose(g, a, 'knee'); return 'poseA'; }
        if (b.stick === 'left') { startPose(g, a, 'spider'); return 'poseA'; }
        if (b.state === 'forehead') { setPose(g, a, 'protectHead'); return 'poseA'; }
        if (a.damageKnee > 4) {
          if (b.state === 'sit2' || b.state === 'knee') { startPose(g, a, 'knee'); return 'poseA'; }
        }
        if (a.damageKnee > 2) {
          if (b.state === 'sit2' || b.state === 'knee') { startPose(g, a, 'rollForward'); return 'poseA'; }
        }
        if (a.damageHead > 2) {
          if (b.state === 'neck') { startPose(g, a, 'knee'); return 'poseA'; }
        }
        if (a.damageForehead > 2) {
          if (b.state === 'forehead') { startPose(g, a, 'rollForward'); return 'poseA'; }
        }
        const next = playStrikes(g, a, ['bodyChop', 'forehead', 'spider', 'spider', 'neck'], 'left');
        if (next) return next;
      }
      if (g.distance <= 6) {
        if (b.state === 'bodyChop') { setPose(g, a, 'protectBody'); return 'poseA'; }
        if (a.damageKnee > 4) {
          if (b.state === 'sit2' || b.state === 'knee') { startPose(g, a, 'knee'); return 'poseA'; }
        }
        if (a.damageKnee > 2) {
          if (b.state === 'kick') { startPose(g, a, 'rollForward'); return 'poseA'; }
          if (b.state === 'sit2' || b.state === 'knee') { startPose(g, a, 'rollForward'); return 'poseA'; }
        }
        const next = playStrikes(g, a, ['kick', 'headButt', 'spider', 'knee', 'knee'], 'left');
        if (next) return next;
      }
    }
    if (g.direction === 'reverse') { return 'menu'; }
  }
}

export function fightB(g) {
  const { a, b } = g;
  if (g.mode === 'solo') {
    if (g.ai === 0 || g.ai === 1 || g.ai === 2 || g.ai === 3 || g.ai === 6) {
      if (g.direction === 'normal') {
        g.distance = b.x - a.x;
        if (g.distance >= 15) { startPose(g, b, 'rollForward'); return 'poseB'; }
        if (g.ai === 6) {
          if (g.distance < 15) {
            if (a.state === 'behead') { startPose(g, b, 'knee'); return 'poseB'; }
          }
        }
        if (g.ai === 3) {
          if (g.distance < 15) {
            if (b.damageHead > 2) {
              if (a.state === 'behead') { b.state = 'sit2'; return 'poseB'; }
            }
            if (a.state === 'behead') { setPose(g, b, 'protectBody'); return 'poseB'; }
          }
        }
        if (g.distance === 12 && a.state === 'standing') { startPose(g, b, 'behead'); return 'poseB'; }
        if (g.distance > 9 && g.distance < 15) {
          if (a.stick === 'left') { b.state = 'standing'; return 'poseB'; }
          b.stick = 'left'; return 'actionB';
        }
        if (g.distance === 9) {
          if (a.waiting > 50) { b.stick = 'left'; return 'actionB'; }
          if (a.state === 'rollBack') { startPose(g, b, 'bodyChop'); return 'poseB'; }
          if (a.busy === 'yes') { b.stick = 'left'; return 'actionB'; }
        }
        if (g.distance < 9 && g.distance > 6) {
          if (g.demo === 'no' && a.state === 'rollForward') { startPose(g, b, 'jump'); return 'poseB'; }
          if (a.state === 'rollBack') { startPose(g, b, 'knee'); return 'poseB'; }
          if (a.stick === 'left') { startPose(g, b, 'spider'); return 'poseB'; }
          if (g.ai > 1) {
            if (b.damageKnee > 4) {
              if (a.state === 'sit2' || a.state === 'knee') { startPose(g, b, 'knee'); return 'poseB'; }
            }
            if (b.damageKnee > 2) {
              if (a.state === 'sit2' || a.state === 'rollForward') { startPose(g, b, 'rollForward'); return 'poseB'; }
            }
            if (b.damageHead > 2) {
              if (a.state === 'neck') { startPose(g, b, 'rollForward'); return 'poseB'; }
            }
            if (b.damageForehead > 2) {
              if (a.state === 'forehead') { startPose(g, b, 'rollForward'); return 'poseB'; }
            }
          }
          const next = playStrikes(g, b, ['kick', 'standing', 'spider', 'standing', 'sit2', 'knee'], 'left');
          if (next) return next;
        }
        if (g.distance <= 6) {
          if (g.demo === 'no' && a.state === 'jump') { startPose(g, b, 'rollForward'); return 'poseB'; }
          if (g.ai === 3) {
            if (a.state === 'bodyChop') { setPose(g, b, 'protectBody'); return 'poseB'; }
          }
          if (g.ai === 2) {
            if (a.state === 'knee') { startPose(g, b, 'jump'); return 'poseB'; }
          }
          if (g.ai > 1) {
            if (b.damageKnee > 4) {
              if (a.state === 'sit2' || a.state === 'knee') { startPose(g, b, 'kick'); return 'poseB'; }
              if (g.ai > 2) {
                if (a.state === 'spider') { startPose(g, b, 'spider'); return 'poseB'; }
              }
            }
            if (b.damageKnee > 2) {
              if (a.state === 'kick') { startPose(g, b, 'rollForward'); return 'poseB'; }
              if (a.state === 'sit2' || a.state === 'knee') { startPose(g, b, 'rollForward'); return 'poseB'; }
            }
          }
          const next = playStrikes(g, b, ['kick', 'headButt', 'spider', 'standing', 'sit2', 'knee', 'standing'], 'left');
          if (next) return next;
        }
      }
      if (g.direction === 'reverse') {
        g.distance = a.x - b.x;
        if (g.distance >= 15) { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
        if (g.ai === 6) {
          if (g.distance < 15) {
            if (a.state === 'beheadRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
          }
        }
        if (g.ai === 3) {
          if (g.distance < 15) {
            if (b.damageHead > 2) {
              if (a.state === 'beheadRev') { b.state = 'sit2Rev'; return 'poseB'; }
            }
            if (a.state === 'beheadRev') { setPose(g, b, 'protectBodyRev'); return 'poseB'; }
          }
        }
        if (g.distance === 12 && a.state === 'standingRev') { startPose(g, b, 'beheadRev'); return 'poseB'; }
        if (g.distance > 9 && g.distance < 15) {
          if (a.stick === 'right') { b.state = 'standingRev'; return 'poseB'; }
          b.stick = 'right'; return 'actionB';
        }
        if (g.distance === 9) {
          if (a.waiting > 50) { b.stick = 'right'; return 'actionB'; }
          if (a.state === 'rollBackRev') { startPose(g, b, 'bodyChopRev'); return 'poseB'; }
          if (a.busy === 'yes') { b.stick = 'right'; return 'actionB'; }
        }
        if (g.distance < 9 && g.distance > 6) {
          if (g.demo === 'no' && a.state === 'rollForwardRev') { startPose(g, b, 'jumpRev'); return 'poseB'; }
          if (a.state === 'rollBackRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
          if (a.stick === 'right') { startPose(g, b, 'spiderRev'); return 'poseB'; }
          if (g.ai > 1) {
            if (b.damageKnee > 4) {
              if (a.state === 'sit2Rev' || a.state === 'kneeRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
            }
            if (b.damageKnee > 2) {
              if (a.state === 'sit2Rev' || a.state === 'rollForwardRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
            }
            if (b.damageHead > 2) {
              if (a.state === 'neckRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
            }
            if (b.damageForehead > 2) {
              if (a.state === 'foreheadRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
            }
          }
          const next = playStrikes(g, b, ['kickRev', 'standingRev', 'spiderRev', 'standingRev', 'sit2Rev', 'kneeRev'], 'right');
          if (next) return next;
        }
        if (g.distance <= 6) {
          if (g.demo === 'no' && a.state === 'jumpRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
          if (g.ai === 3) {
            if (a.state === 'bodyChopRev') { setPose(g, b, 'protectBodyRev'); return 'poseB'; }
          }
          if (g.ai === 2) {
            if (a.state === 'kneeRev') { startPose(g, b, 'jumpRev'); return 'poseB'; }
          }
          if (g.ai > 1) {
            if (b.damageKnee > 4) {
              if (a.state === 'sit2Rev' || a.state === 'kneeRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
              if (g.ai > 2) {
                if (a.state === 'spiderRev') { startPose(g, b, 'spiderRev'); return 'poseB'; }
              }
            }
            if (b.damageKnee > 2) {
              if (a.state === 'kickRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
              if (a.state === 'sit2Rev' || a.state === 'kickRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
            }
          }
          const next = playStrikes(g, b, ['kickRev', 'headButtRev', 'spiderRev', 'standingRev', 'sit2Rev', 'kneeRev', 'standingRev'], 'right');
          if (next) return next;
        }
      }
    }
    if (g.ai === 4 || g.ai === 5 || g.ai === 7) {
      if (g.direction === 'normal') {
        g.distance = b.x - a.x;
        if (g.distance >= 15) { startPose(g, b, 'rollForward'); return 'poseB'; }
        if (g.distance < 15) {
          if (g.ai === 7) {
            if (a.state === 'behead') { startPose(g, b, 'rollForward'); return 'poseB'; }
          }
        }
        if (g.distance === 12 && a.state === 'standing') { startPose(g, b, 'behead'); return 'poseB'; }
        if (g.distance > 9 && g.distance < 15) {
          if (a.stick === 'left') { b.state = 'standing'; return 'poseB'; }
          b.stick = 'left'; return 'actionB';
        }
        if (g.distance === 9) {
          if (a.waiting > 50) { startPose(g, b, 'behead'); return 'poseB'; }
          if (g.demo === 'yes') {
            if (a.waiting > 13) { startPose(g, b, 'behead'); return 'poseB'; }
          }
          if (a.state === 'rollBack') { startPose(g, b, 'knee'); return 'poseB'; }
          if (g.ai < 7) {
            if (a.busy === 'yes') { startPose(g, b, 'rollForward'); return 'poseB'; }
          }
          if (g.ai === 7) {
            if (a.busy === 'yes') { b.stick = 'left'; return 'actionB'; }
          }
        }
        if (g.distance < 9 && g.distance > 6) {
          if (g.demo === 'no' && a.state === 'rollForward') { startPose(g, b, 'jump'); return 'poseB'; }
          if (a.state === 'rollBack') { startPose(g, b, 'knee'); return 'poseB'; }
          if (a.stick === 'left') { startPose(g, b, 'spider'); return 'poseB'; }
          if (g.ai === 5) {
            if (a.state === 'forehead') { setPose(g, b, 'protectHead'); return 'poseB'; }
          }
          if (b.damageKnee > 4) {
            if (a.state === 'sit2' || a.state === 'knee' || a.state === 'spider') { startPose(g, b, 'spider'); return 'poseB'; }
          }
          if (b.damageKnee > 2) {
            if (a.state === 'sit2' || a.state === 'knee' || a.state === 'spider') {
              startPose(g, b, 'rollForward'); return 'poseB';
            }
          }
          if (b.damageHead > 2) {
            if (a.state === 'neck') { startPose(g, b, 'knee'); return 'poseB'; }
          }
          if (b.damageForehead > 2) {
            if (g.ai < 7) {
              if (a.state === 'forehead') { startPose(g, b, 'rollForward'); return 'poseB'; }
            }
          }
          const next = playStrikes(g, b, ['bodyChop', 'forehead', 'spider', 'spider', 'neck'], 'left');
          if (next) return next;
        }
        if (g.distance <= 6) {
          if (g.demo === 'no' && a.state === 'jump') { startPose(g, b, 'rollForward'); return 'poseB'; }
          if (g.ai > 4) {
            if (a.state === 'bodyChop') { setPose(g, b, 'protectBody'); return 'poseB'; }
          }
          if (g.ai > 4 && g.ai < 7) {
            if (a.state === 'knee') { startPose(g, b, 'jump'); return 'poseB'; }
          }
          if (b.damageKnee > 4) {
            if (a.state === 'sit2' || a.state === 'knee' || a.state === 'spider') { startPose(g, b, 'spider'); return 'poseB'; }
          }
          if (b.damageKnee > 2) {
            if (a.state === 'kick') { startPose(g, b, 'rollForward'); return 'poseB'; }
            if (a.state === 'sit2' || a.state === 'knee' || a.state === 'spider') {
              startPose(g, b, 'rollForward'); return 'poseB';
            }
          }
          const next = playStrikes(g, b, ['kick', 'headButt', 'spider', 'knee', 'knee'], 'left');
          if (next) return next;
        }
      }
      if (g.direction === 'reverse') {
        g.distance = a.x - b.x;
        if (g.distance >= 15) { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
        if (g.distance < 15) {
          if (g.ai === 7) {
            if (a.state === 'beheadRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
          }
        }
        if (g.distance === 12 && a.state === 'standingRev') { startPose(g, b, 'beheadRev'); return 'poseB'; }
        if (g.distance > 9 && g.distance < 15) {
          if (a.stick === 'right') { b.state = 'standingRev'; return 'poseB'; }
          b.stick = 'right'; return 'actionB';
        }
        if (g.distance === 9) {
          if (a.waiting > 50) { startPose(g, b, 'beheadRev'); return 'poseB'; }
          if (g.demo === 'yes') {
            if (a.waiting > 50) { startPose(g, b, 'beheadRev'); return 'poseB'; }
          }
          if (a.state === 'rollBackRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
          if (g.ai < 7) {
            if (a.busy === 'yes') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
          }
          if (g.ai === 7) {
            if (a.busy === 'yes') { b.stick = 'right'; return 'actionB'; }
          }
        }
        if (g.distance < 9 && g.distance > 6) {
          if (g.demo === 'no' && a.state === 'rollForward') { startPose(g, b, 'jumpRev'); return 'poseB'; }
          if (a.state === 'rollBackRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
          if (a.stick === 'right') { startPose(g, b, 'spiderRev'); return 'poseB'; }
          if (g.ai === 5) {
            if (a.state === 'foreheadRev') { setPose(g, b, 'protectHeadRev'); return 'poseB'; }
          }
          if (b.damageKnee > 4) {
            if (a.state === 'sit2Rev' || a.state === 'kneeRev' || a.state === 'spiderRev') {
              startPose(g, b, 'spiderRev'); return 'poseB';
            }
          }
          if (b.damageKnee > 2) {
            if (a.state === 'sit2Rev' || a.state === 'kneeRev' || a.state === 'spiderRev') {
              startPose(g, b, 'rollForwardRev'); return 'poseB';
            }
          }
          if (b.damageHead > 2) {
            if (a.state === 'neckRev') { startPose(g, b, 'kneeRev'); return 'poseB'; }
          }
          if (b.damageForehead > 2) {
            if (g.ai < 7) {
              if (a.state === 'foreheadRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
            }
          }
          const next = playStrikes(g, b, ['bodyChopRev', 'foreheadRev', 'spiderRev', 'spiderRev', 'neckRev'], 'right');
          if (next) return next;
        }
        if (g.distance <= 6) {
          if (g.demo === 'no' && a.state === 'jumpRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
          if (g.ai > 4) {
            if (a.state === 'bodyChopRev') { setPose(g, b, 'protectBodyRev'); return 'poseB'; }
          }
          if (g.ai > 4 && g.ai < 7) {
            if (a.state === 'kneeRev') { startPose(g, b, 'jumpRev'); return 'poseB'; }
          }
          if (b.damageKnee > 4) {
            if (a.state === 'sit2Rev' || a.state === 'kneeRev' || a.state === 'spiderRev') {
              startPose(g, b, 'spiderRev'); return 'poseB';
            }
          }
          if (b.damageKnee > 2) {
            if (a.state === 'kickRev') { startPose(g, b, 'rollForwardRev'); return 'poseB'; }
            if (a.state === 'sit2Rev' || a.state === 'kneeRev' || a.state === 'spiderRev') {
              startPose(g, b, 'rollForwardRev'); return 'poseB';
            }
          }
          const next = playStrikes(g, b, ['kickRev', 'headButtRev', 'spiderRev', 'kneeRev', 'kneeRev'], 'right');
          if (next) return next;
        }
      }
    }
  }
}
