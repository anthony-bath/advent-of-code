import { readOld, write } from '../../utilities/io.js';
import { DIR, deltas, key, insertIntoSortedQueue } from './common.js';

const [YEAR, DAY, PART] = [2023, 17, 2];

const grid = readOld(YEAR, DAY, PART).map((line) => line.split('').map((n) => Number(n)));

const W = grid[0].length;
const H = grid.length;

const visited = new Set();
let minHeatLoss = Infinity;

const queue = [
  {
    x: 0,
    y: 0,
    heatLoss: 0,
    steps: 1,
    direction: DIR.RIGHT,
  },
];

while (queue.length) {
  const current = queue.shift();

  if (current.x === W - 1 && current.y === H - 1) {
    if (current.steps >= 4) {
      minHeatLoss = current.heatLoss;
      break;
    }

    continue;
  }

  for (const [dx, dy, direction] of deltas) {
    // Can't go in opposite direction so skip
    if (direction === (current.direction + 2) % 4) {
      continue;
    }

    // Can't turn if less than 4 steps in current direction
    if (direction !== current.direction && current.steps < 4) {
      continue;
    }

    const [x, y] = [current.x + dx, current.y + dy];

    if (x < 0 || x >= W || y < 0 || y >= H) continue;

    const heatLoss = current.heatLoss + grid[y][x];
    const steps = direction === current.direction ? current.steps + 1 : 1;

    const next = {
      x,
      y,
      heatLoss,
      steps,
      direction,
    };

    const nextKey = key(next);

    if (next.steps <= 10 && !visited.has(nextKey)) {
      insertIntoSortedQueue(queue, next);
      visited.add(nextKey);
    }
  }
}

write(YEAR, DAY, PART, minHeatLoss);
