import { write } from '../../utility.js';
import { end, cost, grid, visited, lowPoints, evaluate } from './common.js';

const [YEAR, DAY, PART] = [2022, 12, 2];

const WIDTH = grid[0].length;
const HEIGHT = grid.length;

const queue = [{ x: end.x, y: end.y, cost: 0 }];
cost[end.y][end.x] = 0;

while (queue.length) {
  const { y, x } = queue.pop();

  if (visited[y][x]) {
    continue;
  } else {
    visited[y][x] = true;
  }

  const args = { y, x, cost, queue };

  x > 0 && !visited[y][x - 1] && canAscend(0, -1, y, x) && evaluate(y, x - 1, args);
  x < WIDTH - 1 && !visited[y][x + 1] && canAscend(0, 1, y, x) && evaluate(y, x + 1, args);
  y < HEIGHT - 1 && !visited[y + 1][x] && canAscend(1, 0, y, x) && evaluate(y + 1, x, args);
  y > 0 && !visited[y - 1][x] && canAscend(-1, 0, y, x) && evaluate(y - 1, x, args);
}

function canAscend(yDelta, xDelta, y, x) {
  return (
    grid[y + yDelta][x + xDelta] >= grid[y][x] || grid[y][x] - grid[y + yDelta][x + xDelta] === 1
  );
}

write(YEAR, DAY, PART, Math.min(...lowPoints.map(({ x, y }) => cost[y][x])));
