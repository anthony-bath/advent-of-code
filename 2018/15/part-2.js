import { readOld, write } from '../../utilities/io.js';
import crypto from 'crypto';

const [YEAR, DAY, PART] = [2018, 15, 1];

const UNIT_TYPE = {
  ELF: 'E',
  GOBLIN: 'G',
};

const TARGET_TYPE = {
  [UNIT_TYPE.ELF]: UNIT_TYPE.GOBLIN,
  [UNIT_TYPE.GOBLIN]: UNIT_TYPE.ELF,
};

const ATTACK_OUTCOME = {
  LIFE: 0,
  DEATH: 1,
};

class Unit {
  constructor(x, y, type) {
    this.attackPower = 3;
    this.hitPoints = 200;
    this.type = type;
    this.x = x;
    this.y = y;
    this.id = crypto.randomUUID();

    this.startX = x;
    this.startY = y;
  }

  move(map, { x, y }) {
    map[this.y][this.x] = '.';
    map[y][x] = this.type;
    this.x = x;
    this.y = y;
  }

  increaseAttackPower(bonus) {
    this.attackPower += bonus;
  }

  getAttackPower() {
    return this.attackPower;
  }

  receiveDamage(damage) {
    this.hitPoints -= damage;
  }

  isDead() {
    return this.hitPoints <= 0;
  }

  reset() {
    this.x = this.startX;
    this.y = this.startY;
    this.hitPoints = 200;
    this.attackPower = 3;
  }
}

let units = [];

const map = readOld(YEAR, DAY, PART).map((line, y) => {
  const row = line.split('');

  for (const [x, type] of row.entries()) {
    if ([UNIT_TYPE.ELF, UNIT_TYPE.GOBLIN].includes(type)) {
      units.push(new Unit(x, y, type));
    }
  }

  return row;
});

function readingOrder(u1, u2) {
  if (u1.y !== u2.y) return u1.y - u2.y;
  return u1.x - u2.x;
}

function hitPointsThenReadingOrder(u1, u2) {
  if (u1.hitPoints === u2.hitPoints) {
    return readingOrder(u1, u2);
  }

  return u1.hitPoints - u2.hitPoints;
}

const deltas = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function getAttackTarget(unit, targets) {
  const inRangeTargets = targets
    .filter((target) =>
      deltas.some(([dx, dy]) => target.x + dx === unit.x && target.y + dy === unit.y)
    )
    .sort(hitPointsThenReadingOrder);

  if (inRangeTargets.length > 0) {
    return inRangeTargets.shift();
  }

  return null;
}

function attack(attacker, target) {
  target.receiveDamage(attacker.getAttackPower());
  return target.isDead() ? ATTACK_OUTCOME.DEATH : ATTACK_OUTCOME.LIFE;
}

function getNextLocation(from, to, map) {
  const queue = [{ ...from }];
  const visited = { [`${from.x}|${from.y}`]: 1 };
  const toKeys = to.map(({ x, y }) => `${x}|${y}`);

  while (queue.length) {
    const current = queue.shift();
    const currentKey = `${current.x}|${current.y}`;

    if (toKeys.includes(currentKey)) {
      return current.origin;
    }

    for (const [dx, dy] of deltas) {
      const next = { x: current.x + dx, y: current.y + dy };

      if (!visited[`${next.x}|${next.y}`] && map[next.y][next.x] === '.') {
        visited[`${next.x}|${next.y}`] = 1;
        queue.push({ ...next, origin: current.origin ? current.origin : next });
      }
    }
  }

  return null;
}

function simulate(units, map, bonusAttackPower) {
  let unitsThisSimulation = [...units];
  const mapThisSimulation = map.map((row) => [...row]);

  unitsThisSimulation.forEach((unit) => {
    unit.reset();

    if (unit.type === UNIT_TYPE.ELF) {
      unit.increaseAttackPower(bonusAttackPower);
    }
  });

  let deadElves = 0;
  let round = 0;

  while (true) {
    // Sort Units in Reading Order
    units.sort(readingOrder);

    // Perform Unit Turns
    let combatFinished = false;
    let unitsThisTurn = [...unitsThisSimulation];

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
          if (attackTarget.type === UNIT_TYPE.ELF) {
            deadElves++;
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
      const openSquares = targets.reduce((squares, target) => {
        const targetOpenSquares = deltas
          .filter(([dx, dy]) => mapThisSimulation[target.y + dy][target.x + dx] === '.')
          .map(([dx, dy]) => ({ x: target.x + dx, y: target.y + dy }));

        return [...squares, ...targetOpenSquares];
      }, []);

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
            deadElves++;
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

  const remainingHitPoints = unitsThisSimulation.reduce((total, unit) => total + unit.hitPoints, 0);

  return { round, remainingHitPoints, deadElves, outcome: round * remainingHitPoints };
}

let result;

for (let bonusAttackPower = 1; bonusAttackPower < 197; bonusAttackPower++) {
  result = simulate(units, map, bonusAttackPower);

  if (result.deadElves === 0) {
    break;
  }
}

write(YEAR, DAY, PART, result.outcome);
