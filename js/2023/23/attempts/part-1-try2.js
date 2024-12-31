import { readOld, write } from '../../../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 23, 1];

const grid = readOld(YEAR, DAY, PART, { test: true }).map((line) => line.split(''));
const W = grid[0].length;
const H = grid.length;

const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const queue = [[1, 0, 0]];
const visited = new Set();
let max = -Infinity;

while (queue.length) {
  const [x, y, steps] = queue.shift();

  if (x === W - 2 && y === H - 1) {
    max = Math.max(max, steps);
    continue;
  }

  for (const [dx, dy] of deltas) {
    const [nx, ny] = [x + dx, y + dy];

    if (nx < 0 || nx >= W || ny < 0 || ny >= H || grid[ny][nx] === '#') continue;

    switch (grid[ny][nx]) {
      case '>':
        {
          const key = `${nx + 1},${ny}`;

          if (!visited.has(key)) {
            queue.push([nx + 1, ny, steps + 2]);
            visited.add(key);
            visited.add(`${nx},${ny}`);
          }
        }
        break;

      case 'v':
        {
          const key = `${nx},${ny + 1}`;

          if (!visited.has(key)) {
            queue.push([nx, ny + 1, steps + 2]);
            visited.add(key);
            visited.add(`${nx},${ny}`);
          }
        }
        break;

      case '.':
        {
          const key = `${nx},${ny}`;

          if (!visited.has(key)) {
            queue.push([nx, ny, steps + 1]);
            visited.add(key);
          }
        }
        break;
    }
  }
}

write(YEAR, DAY, PART, max);
