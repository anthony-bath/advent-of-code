import { getInputElements, evaluate } from './common.js';

export function part1({ lines }) {
  const { queue, risk, visited, grid } = getInputElements(lines, 1);
  const cols = grid[0].length;
  const rows = grid.length;

  while (queue.isNotEmpty()) {
    const { y, x } = queue.next();

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

  return risk[rows - 1][cols - 1];
}
