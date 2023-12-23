import { read, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 23, 1];

const grid = read(YEAR, DAY, PART).map((line) => line.split(''));
const W = grid[0].length;
const H = grid.length;

const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const queue = [[1, 0, []]];
let max = -Infinity;

while (queue.length) {
  const [x, y, path] = queue.shift();

  if (x === W - 2 && y === H - 1) {
    max = Math.max(max, path.length);
  }

  for (const [dx, dy] of deltas) {
    const [nx, ny] = [x + dx, y + dy];

    if (ny < 0 || ny >= H || grid[ny][nx] === '#') continue;

    switch (grid[ny][nx]) {
      case '>':
        {
          if (dx === -1) continue;
          const key = `${nx + 1}|${ny}`;

          if (!path.includes(key)) {
            queue.push([nx + 1, ny, [...path, `${nx}|${ny}`, key]]);
          }
        }
        break;

      case 'v':
        {
          if (dy === -1) continue;
          const key = `${nx}|${ny + 1}`;

          if (!path.includes(key)) {
            queue.push([nx, ny + 1, [...path, `${nx}|${ny}`, key]]);
          }
        }
        break;

      case '.':
        {
          const key = `${nx}|${ny}`;

          if (!path.includes(key)) {
            queue.push([nx, ny, [...path, key]]);
          }
        }
        break;
    }
  }
}

write(YEAR, DAY, PART, max);
