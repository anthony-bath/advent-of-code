import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 13, 1];

const offset = Number(read(YEAR, DAY, PART, { splitBy: null }));

const deltas = [
  [1, 0],
  [0, 1],
  [0, -1],
  [-1, 0],
];

function isOddParity(num) {
  console.log(num, [...num.toString(2)]);
  return [...num.toString(2)].filter((b) => b === '1').length % 2 === 1;
}

function getLocationType(x, y, offset) {
  const num = x * x + 3 * x + 2 * x * y + y + y * y + offset;

  if (isOddParity(num)) {
    return '#';
  } else {
    return '.';
  }
}

function bfs(state, goalX, goalY) {
  const visited = [];
  const map = [];
  const queue = [state];

  const { x, y } = state;

  if (!visited[y]) {
    visited[y] = [];
  }

  visited[y][x] = 1;

  while (queue.length) {
    const current = queue.shift();

    if (current.x === goalX && current.y === goalY) {
      return current.steps;
    }

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
}

write(YEAR, DAY, PART, bfs({ x: 1, y: 1, steps: 0 }, 31, 39));
