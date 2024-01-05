import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 21, 2];

const grid = readOld(YEAR, DAY, PART).map((line) => line.split(''));

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

const distances = Array(grid.length)
  .fill()
  .map(() => Array(grid[0].length).fill(Infinity));

distances[start.y][start.x] = 0;

const queue = [[start.x, start.y]];

while (queue.length) {
  const [cx, cy] = queue.shift();

  for (const [dx, dy] of deltas) {
    const nx = cx + dx;
    const ny = cy + dy;

    if (nx < 0 || nx >= grid[0].length || ny < 0 || ny >= grid.length) {
      continue;
    }

    if (grid[ny][nx] === '#') {
      continue;
    }

    if (distances[cy][cx] + 1 < distances[ny][nx]) {
      distances[ny][nx] = distances[cy][cx] + 1;
      queue.push([nx, ny]);
    }
  }
}

const evenDistances = distances.flat().filter((distance) => distance % 2 === 0).length;
const oddDistances = distances.flat().filter((distance) => distance % 2 === 1).length;

const oddCornerDistances = distances
  .flat()
  .filter((distance) => distance > 65 && distance % 2 === 1).length;

const evenCornerDistances = distances
  .flat()
  .filter((distance) => distance > 65 && distance % 2 === 0).length;

const STEPS = 26501365;
const n = Math.floor(STEPS / 131);

const total =
  Math.pow(n + 1, 2) * oddDistances +
  Math.pow(n, 2) * evenDistances -
  (n + 1) * oddCornerDistances +
  n * evenCornerDistances -
  n;

write(YEAR, DAY, PART, total);
