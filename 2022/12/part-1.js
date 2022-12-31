import { write } from '../../utility.js';
import { evaluate, grid, visited, cost, start, end } from './common.js';

const [YEAR, DAY, PART] = [2022, 12, 1];

const WIDTH = grid[0].length;
const HEIGHT = grid.length;

const queue = [{ x: start.x, y: start.y, cost: 0 }];
cost[start.y][start.x] = 0;

while (queue.length) {
  const { y, x } = queue.pop();

  if (visited[y][x]) {
    continue;
  } else {
    visited[y][x] = true;
  }

  const args = { y, x, cost, grid, queue };

  x > 0 && !visited[y][x - 1] && canAscend(0, -1, y, x) && evaluate(y, x - 1, args);
  x < WIDTH - 1 && !visited[y][x + 1] && canAscend(0, 1, y, x) && evaluate(y, x + 1, args);
  y < HEIGHT - 1 && !visited[y + 1][x] && canAscend(1, 0, y, x) && evaluate(y + 1, x, args);
  y > 0 && !visited[y - 1][x] && canAscend(-1, 0, y, x) && evaluate(y - 1, x, args);
}

function canAscend(yDelta, xDelta, y, x) {
  return (
    grid[y + yDelta][x + xDelta] <= grid[y][x] || grid[y + yDelta][x + xDelta] - grid[y][x] === 1
  );
}

write(YEAR, DAY, PART, cost[end.y][end.x]);
