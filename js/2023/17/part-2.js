import { PriorityQueue } from '../../utilities/queue.js';
import { DIR, deltas, key } from './common.js';

export function part2({ lines }) {
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
        queue.insert(next);
        visited.add(nextKey);
      }
    }
  }

  return minHeatLoss;
}
