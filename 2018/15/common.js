import crypto from 'crypto';

export const UNIT_TYPE = {
  ELF: 'E',
  GOBLIN: 'G',
};

export const TARGET_TYPE = {
  [UNIT_TYPE.ELF]: UNIT_TYPE.GOBLIN,
  [UNIT_TYPE.GOBLIN]: UNIT_TYPE.ELF,
};

export const ATTACK_OUTCOME = {
  LIFE: 0,
  DEATH: 1,
};

class Unit {
  constructor(x, y, type, bonusAttackPower) {
    this.attackPower = 3 + (type === UNIT_TYPE.ELF ? bonusAttackPower : 0);
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

  getAttackPower() {
    return this.attackPower;
  }

  receiveDamage(damage) {
    this.hitPoints -= damage;
  }

  isDead() {
    return this.hitPoints <= 0;
  }
}

export function getInputElements(lines, bonusAttackPower = 0) {
  let units = [];

  const map = lines.map((line, y) => {
    const row = line.split('');

    for (const [x, type] of row.entries()) {
      if ([UNIT_TYPE.ELF, UNIT_TYPE.GOBLIN].includes(type)) {
        units.push(new Unit(x, y, type, bonusAttackPower));
      }
    }

    return row;
  });

  return { map, units };
}

export function readingOrder(u1, u2) {
  if (u1.y !== u2.y) return u1.y - u2.y;
  return u1.x - u2.x;
}

function hitPointsThenReadingOrder(u1, u2) {
  if (u1.hitPoints === u2.hitPoints) {
    return readingOrder(u1, u2);
  }

  return u1.hitPoints - u2.hitPoints;
}

export const deltas = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

export function getAttackTarget(unit, targets) {
  const inRangeTargets = targets
    .filter((target) =>
      deltas.some(([dx, dy]) => target.x + dx === unit.x && target.y + dy === unit.y)
    )
    .sort(hitPointsThenReadingOrder);

  if (inRangeTargets.length > 0) {
    return inRangeTargets[0];
  }

  return null;
}

export function attack(attacker, target) {
  target.receiveDamage(attacker.getAttackPower());
  return target.isDead() ? ATTACK_OUTCOME.DEATH : ATTACK_OUTCOME.LIFE;
}

export function getNextLocation(from, to, map) {
  const queue = [{ x: from.x, y: from.y, distance: 0 }];
  const visited = new Set([`${from.x}|${from.y}`]);
  const toKeys = new Set(to.map(({ x, y }) => `${x}|${y}`));
  const destinations = [];
  let minDistance = Infinity;

  while (queue.length) {
    const current = queue.shift();
    const currentKey = `${current.x}|${current.y}`;

    if (toKeys.has(currentKey)) {
      if (current.distance <= minDistance) {
        minDistance = current.distance;
        destinations.push(current);
      } else {
        break;
      }
    }

    for (const [dx, dy] of deltas) {
      if (map[current.y + dy][current.x + dx] !== '.') continue;

      const next = {
        x: current.x + dx,
        y: current.y + dy,
        distance: current.distance + 1,
        origin: current.origin || current,
      };

      const nextKey = `${next.x}|${next.y}`;

      if (!visited.has(nextKey)) {
        visited.add(nextKey);
        queue.push(next);
      }
    }
  }

  if (destinations.length) {
    const best = destinations.sort(readingOrder)[0];

    // The shortest path with the sorted by reading order destination had a first step
    // going up which is the best first step for reading order so no need to check
    // other first steps.
    if (best.origin.y < from.y) {
      return best.origin;
    }

    return getBestFirstStepToDestination(from, best, minDistance, map);
  }

  return null;
}

function getBestFirstStepToDestination(from, to, distance, map) {
  for (const [dx, dy] of deltas) {
    if (map[from.y + dy][from.x + dx] !== '.') continue;

    const queue = [{ x: from.x + dx, y: from.y + dy, distance: 1 }];
    const visited = new Set([`${from.x + dx}|${from.y + dy}`]);

    while (queue.length) {
      const current = queue.shift();

      if (current.x === to.x && current.y === to.y) {
        return { x: from.x + dx, y: from.y + dy };
      }

      for (const [dx, dy] of deltas) {
        const next = {
          x: current.x + dx,
          y: current.y + dy,
          distance: current.distance + 1,
        };

        if (next.distance > distance) continue;
        if (map[next.y][next.x] !== '.') continue;

        const nextKey = `${next.x}|${next.y}`;

        if (!visited.has(nextKey)) {
          visited.add(nextKey);
          queue.push(next);
        }
      }
    }
  }

  return null;
}
