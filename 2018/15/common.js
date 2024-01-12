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

export function getInputElements(lines) {
  let units = [];

  const map = lines.map((line, y) => {
    const row = line.split('');

    for (const [x, type] of row.entries()) {
      if ([UNIT_TYPE.ELF, UNIT_TYPE.GOBLIN].includes(type)) {
        units.push(new Unit(x, y, type));
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
    return inRangeTargets.shift();
  }

  return null;
}

export function attack(attacker, target) {
  target.receiveDamage(attacker.getAttackPower());
  return target.isDead() ? ATTACK_OUTCOME.DEATH : ATTACK_OUTCOME.LIFE;
}

export function getNextLocation(from, to, map) {
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
