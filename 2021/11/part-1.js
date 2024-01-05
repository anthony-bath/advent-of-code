import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 11, 1];

let grid = readOld(YEAR, DAY, PART).map((row) =>
  row
    .trim()
    .split('')
    .map((n) => Number(n))
);

const STEPS = 100;

let flashes = 0;

for (let step = 0; step < STEPS; step++) {
  const flashed = [...Array(10)].map((_) => Array(10).fill(0));
  const willFlash = [];

  // Increase Energy of All
  grid.forEach((row, i) =>
    row.forEach((_, j) => {
      grid[i][j] += 1;

      if (grid[i][j] > 9) {
        willFlash.push([i, j]);
      }
    })
  );

  while (willFlash.length > 0) {
    const [row, col] = willFlash.pop();

    if (flashed[row][col]) {
      continue;
    } else {
      flashed[row][col] = 1;
    }

    // Evaluate Neighbours
    row > 0 && evaluate(willFlash, flashed, row - 1, col);
    row < 9 && evaluate(willFlash, flashed, row + 1, col);
    col > 0 && evaluate(willFlash, flashed, row, col - 1);
    col < 9 && evaluate(willFlash, flashed, row, col + 1);
    row > 0 && col > 0 && evaluate(willFlash, flashed, row - 1, col - 1);
    row > 0 && col < 9 && evaluate(willFlash, flashed, row - 1, col + 1);
    row < 9 && col > 0 && evaluate(willFlash, flashed, row + 1, col - 1);
    row < 9 && col < 9 && evaluate(willFlash, flashed, row + 1, col + 1);
  }

  // Reset Flashers
  grid = grid.map((row, i) => row.map((energy, j) => (flashed[i][j] ? flashes++ && 0 : energy)));
}

function evaluate(willFlash, flashed, row, col) {
  grid[row][col] += 1;

  if (grid[row][col] > 9 && !flashed[row][col]) {
    willFlash.push([row, col]);
  }
}

write(YEAR, DAY, PART, flashes);
