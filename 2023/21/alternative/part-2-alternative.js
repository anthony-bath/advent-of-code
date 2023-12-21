// Followed the solution from https://www.youtube.com/watch?v=9UOMZSL0JTg

import { read, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 21, 2];

const grid = read(YEAR, DAY, PART).map((line) => line.split(''));
const SIZE = grid.length;

let start;

for (let y = 0; y < grid.length; y++) {
  for (let x = 0; x < grid[y].length; x++) {
    if (grid[y][x] === 'S') {
      start = { x, y };
      break;
    }
  }
}

const deltas = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

function search(sx, sy, ssteps) {
  const answer = new Set();
  const seen = new Set(`${sx},${sy}`);
  const queue = [[sx, sy, ssteps]];

  while (queue.length) {
    const [x, y, steps] = queue.shift();

    if (steps % 2 === 0) {
      answer.add(`${x},${y}`);
    }

    if (steps === 0) {
      continue;
    }

    for (const [dx, dy] of deltas) {
      const nx = x + dx;
      const ny = y + dy;

      if (nx < 0 || nx >= SIZE || ny < 0 || ny >= SIZE) {
        continue;
      }

      if (grid[ny][nx] === '#') {
        continue;
      }

      if (seen.has(`${nx},${ny}`)) {
        continue;
      }

      seen.add(`${nx},${ny}`);
      queue.push([nx, ny, steps - 1]);
    }
  }

  return answer.size;
}

const STEPS = 26501365;
const grid_width = Math.floor(STEPS / SIZE) - 1;
const odd_grids = Math.pow(Math.floor(grid_width / 2) * 2 + 1, 2);
const even_grids = Math.pow(Math.floor((grid_width + 1) / 2) * 2, 2);

const odd_points = search(start.x, start.y, SIZE * 2 + 1);
const even_points = search(start.x, start.y, SIZE * 2);

const corner_t = search(start.x, SIZE - 1, SIZE - 1);
const corner_r = search(0, start.y, SIZE - 1);
const corner_b = search(start.x, 0, SIZE - 1);
const corner_l = search(SIZE - 1, start.y, SIZE - 1);

const small_tr = search(0, SIZE - 1, Math.floor(SIZE / 2) - 1);
const small_tl = search(SIZE - 1, SIZE - 1, Math.floor(SIZE / 2) - 1);
const small_br = search(0, 0, Math.floor(SIZE / 2) - 1);
const small_bl = search(SIZE - 1, 0, Math.floor(SIZE / 2) - 1);

const large_tr = search(0, SIZE - 1, Math.floor((SIZE * 3) / 2) - 1);
const large_tl = search(SIZE - 1, SIZE - 1, Math.floor((SIZE * 3) / 2) - 1);
const large_br = search(0, 0, Math.floor((SIZE * 3) / 2) - 1);
const large_bl = search(SIZE - 1, 0, Math.floor((SIZE * 3) / 2) - 1);

const total =
  odd_grids * odd_points +
  even_grids * even_points +
  corner_t +
  corner_r +
  corner_b +
  corner_l +
  (grid_width + 1) * (small_tr + small_tl + small_br + small_bl) +
  grid_width * (large_tr + large_tl + large_br + large_bl);

write(YEAR, DAY, PART, total);
