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

let units = [];

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

function getPaths(from, to, map) {
  const queue = [{ ...from, path: [] }];
  const visited = { [`${from.x}|${from.y}`]: 1 };
  const toKeys = to.map(({ x, y }) => `${x}|${y}`);

  const paths = [];

  while (queue.length) {
    const current = queue.shift();
    const currentKey = `${current.x}|${current.y}`;

    if (toKeys.includes(currentKey)) {
      // Have reached one of the target locations
      paths.push(current.path);
    }

    for (const [dx, dy] of deltas) {
      const next = { x: current.x + dx, y: current.y + dy };

      if (!visited[`${next.x}|${next.y}`] && map[next.y][next.x] === '.') {
        visited[`${next.x}|${next.y}`] = 1;
        queue.push({ ...next, path: [...current.path, next] });
      }
    }
  }

  return paths;
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
    let inRangeTargets = getInRange(unit, targets);

    if (inRangeTargets.length > 0) {
      // Identify lowest HP target and attack
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

    const paths = getPaths(unit, openSquares, map);
    console.log(paths);
    process.exit();
  }

  if (combatFinished) {
    break;
  } else {
    round++;
  }
}

write(YEAR, DAY, PART, '');
