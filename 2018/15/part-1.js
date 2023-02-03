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

function distanceThenReadingOrder(p1, p2) {
  if (p1.distance === p2.distance) {
    return readingOrder(p1, p2);
  }

  return p1.distance - p2.distance;
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

function getClosestSquareToMoveTo(from, to, map) {
  const queue = [{ ...from, distance: 0 }];
  const visited = { [`${from.x}|${from.y}`]: 1 };
  const toKeys = to.map(({ x, y }) => `${x}|${y}`);

  const squares = [];
  let shortestPathDistance = Infinity;

  while (queue.length) {
    const current = queue.shift();

    if (current.distance > shortestPathDistance) {
      continue;
    }

    const currentKey = `${current.x}|${current.y}`;

    if (toKeys.includes(currentKey)) {
      // Have reached one of the target locations
      squares.push(current);

      if (current.distance < shortestPathDistance) {
        shortestPathDistance = current.distance;
      }
    }

    for (const [dx, dy] of deltas) {
      const next = { x: current.x + dx, y: current.y + dy };

      if (!visited[`${next.x}|${next.y}`] && map[next.y][next.x] === '.') {
        visited[`${next.x}|${next.y}`] = 1;
        queue.push({ ...next, distance: current.distance + 1 });
      }
    }
  }

  if (squares.length === 0) {
    return null;
  }

  if (squares.length > 0) {
    squares.sort(readingOrder);
  }

  return squares.shift();
}

function dijkstra(map, { x, y }) {
  const distance = [...Array(map.length).keys()].map((_) => Array(map[0].length).fill(Infinity));
  const visited = [...Array(map.length).keys()].map((_) => Array(map[0].length).fill(0));

  distance[y][x] = 0;

  const queue = [{ x, y }];

  while (queue.length) {
    const current = queue.shift();

    for (const [dx, dy] of deltas) {
      const next = { x: current.x + dx, y: current.y + dy };

      if (!visited[next.y][next.x] && map[next.y][next.x] === '.') {
        visited[next.y][next.x] = 1;

        distance[next.y][next.x] = Math.min(
          distance[next.y][next.x],
          distance[current.y][current.x] + 1
        );

        queue.push(next);
      }
    }
  }

  return distance;
}

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

    const targetSquare = getClosestSquareToMoveTo(unit, openSquares, map);

    if (!targetSquare) {
      // Could not find a path to an open square, end of turn
      continue;
    }

    // Get distance from target square to every other square
    const distance = dijkstra(map, targetSquare);

    // Get the distances from the target square of the 4 squares adjacent to this unit
    const unitAdjacentDistances = deltas
      .map(([dx, dy]) => ({
        x: unit.x + dx,
        y: unit.y + dy,
        distance: distance[unit.y + dy][unit.x + dx],
      }))
      .sort(distanceThenReadingOrder);

    unit.move(map, unitAdjacentDistances.shift());

    // Are any targets in range now?
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

write(YEAR, DAY, PART, round * remainingHitPoints);
