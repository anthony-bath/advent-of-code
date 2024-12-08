import { getLocationType } from './common.js';

export function part2({ data }) {
  const offset = Number(data);

  const deltas = [
    [1, 0],
    [0, 1],
    [0, -1],
    [-1, 0],
  ];

  function bfs(state, maxSteps) {
    const visited = [];
    const map = [];
    const queue = [state];
    let visitCount = 0;

    const { x, y } = state;

    if (!visited[y]) {
      visited[y] = [];
    }

    visited[y][x] = 1;

    while (queue.length) {
      const current = queue.shift();

      if (current.steps >= maxSteps) {
        continue;
      }

      visitCount++;

      for (const [dx, dy] of deltas) {
        const nextY = current.y + dy;
        const nextX = current.x + dx;

        if (nextX < 0 || nextY < 0) continue;
        if (visited[nextY] && visited[nextY][nextX]) continue;

        if (!map[nextY]) {
          map[nextY] = [];
          visited[nextY] = [];
        }

        visited[nextY][nextX] = 1;

        if (!map[nextY][nextX]) {
          map[nextY][nextX] = getLocationType(nextX, nextY, offset);
        }

        if (map[nextY][nextX] === '.') {
          queue.push({ x: nextX, y: nextY, steps: current.steps + 1 });
        }
      }
    }

    return visitCount;
  }

  return bfs({ x: 1, y: 1, steps: 0 }, 50);
}
