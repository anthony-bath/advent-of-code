import { read, write } from '../../utilities/io.js';
import { DIR, deltas, key, insertIntoSortedQueue } from './common.js';

const [YEAR, DAY, PART] = [2023, 17, 2];

const grid = read(YEAR, DAY, PART).map((line) => line.split('').map((n) => Number(n)));

const W = grid[0].length;
const H = grid.length;

const visited = new Set();
let minHeatLoss = Infinity;

const queue = [
  {
    x: 0,
    y: 0,
    heatLoss: 0,
    stepsInCurrentDirection: 1,
    direction: DIR.RIGHT,
  },
  {
    x: 0,
    y: 0,
    heatLoss: 0,
    stepsInCurrentDirection: 1,
    direction: DIR.DOWN,
  },
];

while (queue.length) {
  const current = queue.shift();

  if (current.x === W - 1 && current.y === H - 1) {
    if (current.stepsInCurrentDirection >= 4) {
      minHeatLoss = current.heatLoss;
      break;
    }

    continue;
  }

  for (const [dx, dy, dir] of deltas) {
    const next = { x: current.x + dx, y: current.y + dy };

    if (next.x < 0 || next.x >= W || next.y < 0 || next.y >= H) continue;

    // Can't go in opposite direction so skip
    if (dir === (current.direction + 2) % 4) {
      continue;
    }

    // Can only continue straight if have less than 10 steps in current direction
    if (dir === current.direction && current.stepsInCurrentDirection < 10) {
      const straight = {
        ...next,
        heatLoss: current.heatLoss + grid[next.y][next.x],
        stepsInCurrentDirection: current.stepsInCurrentDirection + 1,
        direction: current.direction,
      };

      const straightKey = key(straight);

      if (!visited.has(straightKey)) {
        insertIntoSortedQueue(queue, straight);
        visited.add(straightKey);
      }
    }

    // Remaining 2 directions are turns only if at least 4 steps in current direction
    if (dir !== current.direction && current.stepsInCurrentDirection >= 4) {
      const turn = {
        ...next,
        heatLoss: current.heatLoss + grid[next.y][next.x],
        stepsInCurrentDirection: 1,
        direction: dir,
      };

      const turnKey = key(turn);

      if (!visited.has(turnKey)) {
        insertIntoSortedQueue(queue, turn);
        visited.add(turnKey);
      }
    }
  }
}

write(YEAR, DAY, PART, minHeatLoss);
