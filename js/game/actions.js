// Joystick direction -> pose to start (walking, jumping, sitting, rolling, ...).
import { startPose, setPose, attackPressed } from './fighter.js';

export function actionA(g) {
  const { a } = g;
  a.waiting = 1;
  if (g.direction === 'normal') {
    if (a.stick === 'right') {
      a.protectBody = 'no';
      if (a.advanceStep >= 1 && a.advanceStep <= 4) { a.state = `advance${a.advanceStep}`; return 'poseA'; }
      setPose(g, a, 'advance');
      if (attackPressed(g, a) && g.entry === 'no') { startPose(g, a, 'bodyChop'); }
    }
    if (a.stick === 'left') {
      a.protectHead = 'no';
      if (a.retreatStep >= 1 && a.retreatStep <= 4) { a.state = `retreat${a.retreatStep}`; return 'poseA'; }
      setPose(g, a, 'retreat');
      if (attackPressed(g, a) && a.exiting === 'no') { startPose(g, a, 'behead'); }
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'right') {
      a.protectHead = 'no';
      if (a.retreatStep >= 1 && a.retreatStep <= 4) { a.state = `retreat${a.retreatStep}Rev`; return 'poseA'; }
      setPose(g, a, 'retreatRev');
      if (attackPressed(g, a)) { startPose(g, a, 'beheadRev'); }
    }
    if (a.stick === 'left') {
      a.protectBody = 'no';
      if (a.advanceStep >= 1 && a.advanceStep <= 4) { a.state = `advance${a.advanceStep}Rev`; return 'poseA'; }
      setPose(g, a, 'advanceRev');
      if (attackPressed(g, a)) { startPose(g, a, 'bodyChopRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (a.stick === 'up') {
      a.protectBody = 'no'; a.protectHead = 'no';
      startPose(g, a, 'jump'); return 'poseA';
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'up') {
      a.protectBody = 'no'; a.protectHead = 'no';
      startPose(g, a, 'jumpRev'); return 'poseA';
    }
  }
  if (g.direction === 'normal') {
    if (a.stick === 'down') {
      if (a.sitting === 'yes') { a.state = 'sit2'; return 'poseA'; }
      startPose(g, a, 'sit'); return 'poseA';
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'down') {
      if (a.sitting === 'yes') { a.state = 'sit2Rev'; return 'poseA'; }
      startPose(g, a, 'sitRev'); return 'poseA';
    }
  }
  if (g.direction === 'normal') {
    if (a.stick === 'downRight') {
      startPose(g, a, 'rollForward');
      if (attackPressed(g, a)) { startPose(g, a, 'kick'); }
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'downRight') {
      startPose(g, a, 'rollForwardRev');
      if (attackPressed(g, a)) { startPose(g, a, 'kickRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (a.stick === 'downLeft') {
      startPose(g, a, 'rollBack');
      if (attackPressed(g, a)) { startPose(g, a, 'forehead'); }
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'downLeft') {
      startPose(g, a, 'rollBackRev');
      if (attackPressed(g, a)) { startPose(g, a, 'foreheadRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (a.stick === 'upLeft') {
      if (a.protectHead === 'yes') { a.state = 'protectHead'; return 'poseA'; }
      startPose(g, a, 'protectHead1');
      if (attackPressed(g, a)) { startPose(g, a, 'spider'); }
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'upLeft') {
      if (a.protectHead === 'yes') { a.state = 'protectHeadRev'; return 'poseA'; }
      startPose(g, a, 'protectHeadRev1');
      if (attackPressed(g, a)) { startPose(g, a, 'spiderRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (a.stick === 'upRight') {
      if (a.protectBody === 'yes') { a.state = 'protectBody'; return 'poseA'; }
      startPose(g, a, 'protectBody1');
      if (attackPressed(g, a)) { startPose(g, a, 'headButt'); }
    }
  }
  if (g.direction === 'reverse') {
    if (a.stick === 'upRight') {
      if (a.protectBody === 'yes') { a.state = 'protectBodyRev'; return 'poseA'; }
      startPose(g, a, 'protectBodyRev1');
      if (attackPressed(g, a)) { startPose(g, a, 'headButtRev'); }
    }
  }
  return 'poseA';
}

export function actionB(g) {
  const { b } = g;
  b.waiting = 1;
  if (g.mode === 'solo') {
    if (g.direction === 'normal') {
      if (b.stick === 'left') {
        b.protectBody = 'no';
        if (b.advanceStep >= 1 && b.advanceStep <= 4) { b.state = `advance${b.advanceStep}`; return 'poseB'; }
        setPose(g, b, 'advance');
      }
      if (b.stick === 'right') {
        b.protectHead = 'no';
        if (b.retreatStep >= 1 && b.retreatStep <= 4) { b.state = `retreat${b.retreatStep}`; return 'poseB'; }
        setPose(g, b, 'retreat');
      }
    }
    if (g.direction === 'reverse') {
      if (b.stick === 'right') {
        b.protectBody = 'no';
        if (b.advanceStep >= 1 && b.advanceStep <= 4) { b.state = `advance${b.advanceStep}Rev`; return 'poseB'; }
        setPose(g, b, 'advanceRev');
      }
      if (b.stick === 'left') {
        b.protectHead = 'no';
        if (b.retreatStep >= 1 && b.retreatStep <= 4) { b.state = `retreat${b.retreatStep}Rev`; return 'poseB'; }
        setPose(g, b, 'retreatRev');
      }
    }
    return 'poseB';
  }
  if (g.direction === 'normal') {
    if (b.stick === 'left') {
      b.protectBody = 'no';
      if (b.advanceStep >= 1 && b.advanceStep <= 4) { b.state = `advance${b.advanceStep}`; return 'poseB'; }
      setPose(g, b, 'advance');
      if (b.attackKey === 'yes' && g.entry === 'no') { startPose(g, b, 'bodyChop'); }
    }
    if (b.stick === 'right') {
      b.protectHead = 'no';
      if (b.retreatStep >= 1 && b.retreatStep <= 4) { b.state = `retreat${b.retreatStep}`; return 'poseB'; }
      setPose(g, b, 'retreat');
      if (b.attackKey === 'yes' && b.exiting === 'no') { startPose(g, b, 'behead'); }
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'right') {
      b.protectBody = 'no';
      if (b.advanceStep >= 1 && b.advanceStep <= 4) { b.state = `advance${b.advanceStep}Rev`; return 'poseB'; }
      setPose(g, b, 'advanceRev');
      if (b.attackKey === 'yes') { startPose(g, b, 'bodyChopRev'); }
    }
    if (b.stick === 'left') {
      b.protectHead = 'no';
      if (b.retreatStep >= 1 && b.retreatStep <= 4) { b.state = `retreat${b.retreatStep}Rev`; return 'poseB'; }
      setPose(g, b, 'retreatRev');
      if (b.attackKey === 'yes') { startPose(g, b, 'beheadRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (b.stick === 'up') {
      b.protectBody = 'no'; b.protectHead = 'no';
      startPose(g, b, 'jump'); return 'poseB';
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'up') {
      b.protectBody = 'no'; b.protectHead = 'no';
      startPose(g, b, 'jumpRev'); return 'poseB';
    }
  }
  if (g.direction === 'normal') {
    if (b.stick === 'down') {
      if (b.attackKey === 'yes') { startPose(g, b, 'knee'); return 'poseB'; }
      if (b.sitting === 'yes') { b.state = 'sit2'; return 'poseB'; }
      startPose(g, b, 'sit'); return 'poseB';
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'down') {
      if (b.attackKey === 'yes') { startPose(g, b, 'kneeRev'); return 'poseB'; }
      if (b.sitting === 'yes') { b.state = 'sit2Rev'; return 'poseB'; }
      startPose(g, b, 'sitRev'); return 'poseB';
    }
  }
  if (g.direction === 'normal') {
    if (b.stick === 'downLeft') {
      startPose(g, b, 'rollForward');
      if (b.attackKey === 'yes') { startPose(g, b, 'kick'); }
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'downRight') {
      startPose(g, b, 'rollForwardRev');
      if (b.attackKey === 'yes') { startPose(g, b, 'kickRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (b.stick === 'downRight') {
      startPose(g, b, 'rollBack');
      if (b.attackKey === 'yes') { startPose(g, b, 'forehead'); }
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'downLeft') {
      startPose(g, b, 'rollBackRev');
      if (b.attackKey === 'yes') { startPose(g, b, 'foreheadRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (b.stick === 'upRight') {
      if (b.protectHead === 'yes') { b.state = 'protectHead'; return 'poseB'; }
      startPose(g, b, 'protectHead1');
      if (b.attackKey === 'yes') { startPose(g, b, 'spider'); }
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'upLeft') {
      if (b.protectHead === 'yes') { b.state = 'protectHeadRev'; return 'poseB'; }
      startPose(g, b, 'protectHeadRev1');
      if (b.attackKey === 'yes') { startPose(g, b, 'spiderRev'); }
    }
  }
  if (g.direction === 'normal') {
    if (b.stick === 'upLeft') {
      if (b.protectBody === 'yes') { b.state = 'protectBody'; return 'poseB'; }
      startPose(g, b, 'protectBody1');
      if (b.attackKey === 'yes') { startPose(g, b, 'headButt'); }
    }
  }
  if (g.direction === 'reverse') {
    if (b.stick === 'upRight') {
      if (b.protectBody === 'yes') { b.state = 'protectBodyRev'; return 'poseB'; }
      startPose(g, b, 'protectBodyRev1');
      if (b.attackKey === 'yes') { startPose(g, b, 'headButtRev'); }
    }
  }
  return 'poseB';
}
