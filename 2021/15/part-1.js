import { write } from '../../utilities/io.js';
import { loadData, evaluate } from './common.js';

const [YEAR, DAY, PART] = [2021, 15, 1];

const { queue, risk, visited, grid } = loadData(PART);
const cols = grid[0].length;
const rows = grid.length;

while (queue.length) {
  const { y, x } = queue.pop();

  if (visited[y][x]) {
    continue;
  } else {
    visited[y][x] = true;
  }

  const args = { y, x, risk, grid, queue };

  x > 0 && !visited[y][x - 1] && evaluate(y, x - 1, args);
  x < cols - 1 && !visited[y][x + 1] && evaluate(y, x + 1, args);
  y < rows - 1 && !visited[y + 1][x] && evaluate(y + 1, x, args);
  y > 0 && !visited[y - 1][x] && evaluate(y - 1, x, args);
}

write(YEAR, DAY, PART, risk[rows - 1][cols - 1]);
