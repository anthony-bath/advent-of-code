import {
  getInputElements,
  TARGET_TYPE,
  ATTACK_OUTCOME,
  UNIT_TYPE,
  getAttackTarget,
  attack,
  getNextLocation,
  deltas,
  readingOrder,
} from './common.js';

export function part2({ lines }) {
  function simulate(lines, bonusAttackPower) {
    let { map: mapThisSimulation, units: unitsThisSimulation } = getInputElements(
      lines,
      bonusAttackPower
    );

    let round = 0;

    while (true) {
      // Sort Units in Reading Order
      unitsThisSimulation.sort(readingOrder);

      // Perform Unit Turns
      let combatFinished = false;
      let unitsThisTurn = unitsThisSimulation;

      for (const unit of unitsThisSimulation) {
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
            if (attackTarget.type === UNIT_TYPE.ELF) {
              return null;
            }

            unitsThisTurn = unitsThisTurn.filter((u) => u.id !== attackTarget.id);
            mapThisSimulation[attackTarget.y][attackTarget.x] = '.';
          }

          continue;
        }

        // No targets in range, can this unit move?
        if (!deltas.some(([dx, dy]) => mapThisSimulation[unit.y + dy][unit.x + dx] === '.')) {
          // Unit has no empty squares around it so cannot move, end of turn
          continue;
        }

        // Find open squares adjacent to targets
        const openSquares = targets
          .map((target) =>
            deltas
              .filter(([dx, dy]) => mapThisSimulation[target.y + dy][target.x + dx] === '.')
              .map(([dx, dy]) => ({ x: target.x + dx, y: target.y + dy }))
          )
          .flat();

        if (openSquares.length === 0) {
          // No available squares to move to, end of turn
          continue;
        }

        const nextLocation = getNextLocation(unit, openSquares, mapThisSimulation);

        if (!nextLocation) {
          // Could not find a path to an open square, end of turn
          continue;
        }

        unit.move(mapThisSimulation, nextLocation);

        // Are there any targets in range now after moving?
        attackTarget = getAttackTarget(unit, targets);

        if (attackTarget) {
          const result = attack(unit, attackTarget);

          if (result === ATTACK_OUTCOME.DEATH) {
            if (attackTarget.type === UNIT_TYPE.ELF) {
              return null;
            }

            unitsThisTurn = unitsThisTurn.filter((u) => u.id !== attackTarget.id);
            mapThisSimulation[attackTarget.y][attackTarget.x] = '.';
          }
        }
      }

      unitsThisSimulation = unitsThisTurn;

      if (combatFinished) {
        break;
      } else {
        round++;
      }
    }

    const remainingHitPoints = unitsThisSimulation.reduce(
      (total, unit) => total + unit.hitPoints,
      0
    );

    return { round, remainingHitPoints, outcome: round * remainingHitPoints };
  }

  let bonusAttackFloor = 4;
  let bonusAttackCeiling = 50;
  let bonusAttackPower = 25;
  let outcome;

  while (true) {
    const result = simulate(lines, bonusAttackPower);

    if (result) {
      bonusAttackCeiling = bonusAttackPower;
      bonusAttackPower = (bonusAttackPower + bonusAttackFloor) >> 1;
      outcome = result.outcome;
    } else {
      bonusAttackFloor = bonusAttackPower;
      bonusAttackPower = (bonusAttackPower + bonusAttackCeiling) >> 1;
    }

    if (bonusAttackCeiling - bonusAttackFloor <= 1) {
      return outcome;
    }
  }
}
