import fs from "fs";

let grid = fs
  .readFileSync("./11/input.txt")
  .toString()
  .split("\n")
  .map((row) =>
    row
      .trim()
      .split("")
      .map((n) => parseInt(n))
  );

let step = 1;

while (true) {
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
  let flashes = 0;
  grid = grid.map((row, i) =>
    row.map((energy, j) => (flashed[i][j] ? flashes++ && 0 : energy))
  );

  if (flashes === 100) {
    break;
  } else {
    step++;
  }
}

function evaluate(willFlash, flashed, row, col) {
  grid[row][col] += 1;

  if (grid[row][col] > 9 && !flashed[row][col]) {
    willFlash.push([row, col]);
  }
}

fs.writeFileSync("./11/output-2.txt", step.toString());
