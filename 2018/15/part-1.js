import {
  getInputElements,
  TARGET_TYPE,
  ATTACK_OUTCOME,
  getAttackTarget,
  attack,
  getNextLocation,
  deltas,
  readingOrder,
} from './common.js';

export function part1({ lines }) {
  let { map, units } = getInputElements(lines);
  let round = 0;

  while (true) {
    // Sort Units in Reading Order
    units.sort(readingOrder);

    // Perform Unit Turns
    let combatFinished = false;
    let unitsThisTurn = [...units];

    for (const unit of units) {
      if (!unitsThisTurn.find((u) => u.id === unit.id)) {
        // Unit was eliminated in this turn so does not get a turn this round
        continue;
      }

      const targetType = TARGET_TYPE[unit.type];
      const targets = unitsThisTurn.filter((unit) => unit.type === targetType);

      if (targets.length === 0) {
        combatFinished = true;
        break;
      }

      // Are any targets in range immediately?
      let attackTarget = getAttackTarget(unit, targets);

      if (attackTarget) {
        const result = attack(unit, attackTarget);

        if (result === ATTACK_OUTCOME.DEATH) {
          unitsThisTurn = unitsThisTurn.filter((u) => u.id !== attackTarget.id);
          map[attackTarget.y][attackTarget.x] = '.';
        }

        continue;
      }

      // No targets in range, can this unit move?
      if (!deltas.some(([dx, dy]) => map[unit.y + dy][unit.x + dx] === '.')) {
        // Unit has no empty squares around it so cannot move, end of turn
        continue;
      }

      // Find open squares adjacent to targets
      const openSquares = targets.reduce((squares, target) => {
        const targetOpenSquares = deltas
          .filter(([dx, dy]) => map[target.y + dy][target.x + dx] === '.')
          .map(([dx, dy]) => ({ x: target.x + dx, y: target.y + dy }));

        return [...squares, ...targetOpenSquares];
      }, []);

      if (openSquares.length === 0) {
        // No available squares to move to, end of turn
        continue;
      }

      const nextLocation = getNextLocation(unit, openSquares, map);

      if (!nextLocation) {
        // Could not find a path to an open square, end of turn
        continue;
      }

      unit.move(map, nextLocation);

      // Are there any targets in range now after moving?
      attackTarget = getAttackTarget(unit, targets);

      if (attackTarget) {
        const result = attack(unit, attackTarget);

        if (result === ATTACK_OUTCOME.DEATH) {
          unitsThisTurn = unitsThisTurn.filter((u) => u.id !== attackTarget.id);
          map[attackTarget.y][attackTarget.x] = '.';
        }
      }
    }

    units = unitsThisTurn;

    if (combatFinished) {
      break;
    } else {
      round++;
    }
  }

  const remainingHitPoints = units.reduce((total, unit) => total + unit.hitPoints, 0);

  return round * remainingHitPoints;
}
