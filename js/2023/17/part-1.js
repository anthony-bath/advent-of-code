import { PriorityQueue } from '../../utilities/queue.js';
import { DIR, deltas, key } from './common.js';

export function part1({ lines }) {
  const grid = lines.map((line) => line.split('').map(Number));

  const W = grid[0].length;
  const H = grid.length;

  const visited = new Set();
  let minHeatLoss = Infinity;

  const state = {
    x: 0,
    y: 0,
    heatLoss: 0,
    steps: 1,
    direction: DIR.RIGHT,
  };

  const queue = new PriorityQueue(state, (a, b) => a.heatLoss - b.heatLoss);

  while (queue.isNotEmpty()) {
    const current = queue.next();

    if (current.x === W - 1 && current.y === H - 1) {
      minHeatLoss = current.heatLoss;
      break;
    }

    for (const [dx, dy, direction] of deltas) {
      // Can't go in opposite direction so skip
      if (direction === (current.direction + 2) % 4) {
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

      if (next.steps <= 3 && !visited.has(nextKey)) {
        queue.insert(next);
        visited.add(nextKey);
      }
    }
  }

  return minHeatLoss;
}
