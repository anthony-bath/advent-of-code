import { read, write } from '../../utilities/io.js';
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

class Unit {
  constructor(x, y, type) {
    this.attackPower = 3;
    this.hitPoints = 200;
    this.type = type;
    this.x = x;
    this.y = y;
    this.id = crypto.randomUUID();
  }
}

const units = [];

const map = read(YEAR, DAY, PART).map((line, y) => {
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

const deltas = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

function getInRange(unit, targets) {
  return targets.filter((target) =>
    deltas.some(([dx, dy]) => target.x + dx === unit.x && target.y + dy === unit.y)
  );
}

let round = 0;

while (true) {
  // Sort Units in Reading Order
  units.sort(readingOrder);

  // Perform Unit Turns
  let combatFinished = false;
  const unitsThisTurn = [...units];

  for (const unit of units) {
    if (!unitsThisTurn.find((u) => u.id === unit.id)) {
      // Unit was eliminated in this turn
      continue;
    }

    const targetType = TARGET_TYPE[unit.type];
    const targets = units.filter((unit) => unit.type === targetType);

    if (targets.length === 0) {
      combatFinished = true;
      break;
    }

    // Are any targets in range immediately?
    let inRange = getInRange(unit, targets);

    if (inRange.length > 0) {
      // Perform attack
      continue;
    }

    // Move to closest Target
  }

  if (combatFinished) {
    break;
  } else {
    round++;
  }
}

write(YEAR, DAY, PART, '');
