import fs from "fs";

const grid = fs
  .readFileSync("./11/input.txt")
  .toString()
  .split("\n")
  .map((row) =>
    row
      .trim()
      .split("")
      .map((n) => parseInt(n))
  );

const STEPS = 100;

let flashes = 0;

for (let step = 0; step < STEPS; step++) {
  const flashesThisStep = [...Array(10)].map((_) => Array(10).fill(0));
  const willFlash = [];

  //increase all energy
  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      grid[row][col] += 1;

      if (grid[row][col] > 9) {
        willFlash.push([row, col]);
      }
    }
  }

  while (willFlash.length > 0) {
    const [row, col] = willFlash.pop();

    if (flashesThisStep[row][col]) {
      continue;
    } else {
      flashesThisStep[row][col] = 1;
    }

    // increase adjacent energy

    // UP
    if (row > 0) {
      grid[row - 1][col] += 1;

      if (grid[row - 1][col] > 9 && !flashesThisStep[row - 1][col]) {
        willFlash.push([row - 1, col]);
      }
    }

    // DOWN
    if (row < 9) {
      grid[row + 1][col] += 1;

      if (grid[row + 1][col] > 9 && !flashesThisStep[row + 1][col]) {
        willFlash.push([row + 1, col]);
      }
    }

    // LEFT
    if (col > 0) {
      grid[row][col - 1] += 1;

      if (grid[row][col - 1] > 9 && !flashesThisStep[row][col - 1]) {
        willFlash.push([row, col - 1]);
      }
    }

    // RIGHT
    if (col < 9) {
      grid[row][col + 1] += 1;

      if (grid[row][col + 1] > 9 && !flashesThisStep[row][col + 1]) {
        willFlash.push([row, col + 1]);
      }
    }

    // UP-LEFT
    if (row > 0 && col > 0) {
      grid[row - 1][col - 1] += 1;

      if (grid[row - 1][col - 1] > 9 && !flashesThisStep[row - 1][col - 1]) {
        willFlash.push([row - 1, col - 1]);
      }
    }

    // UP-RIGHT
    if (row > 0 && col < 9) {
      grid[row - 1][col + 1] += 1;

      if (grid[row - 1][col + 1] > 9 && !flashesThisStep[row - 1][col + 1]) {
        willFlash.push([row - 1, col + 1]);
      }
    }

    // DOWN-LEFT
    if (row < 9 && col > 0) {
      grid[row + 1][col - 1] += 1;

      if (grid[row + 1][col - 1] > 9 && !flashesThisStep[row + 1][col - 1]) {
        willFlash.push([row + 1, col - 1]);
      }
    }

    // DOWN-RIGHT
    if (row < 9 && col < 9) {
      grid[row + 1][col + 1] += 1;

      if (grid[row + 1][col + 1] > 9 && !flashesThisStep[row + 1][col + 1]) {
        willFlash.push([row + 1, col + 1]);
      }
    }
  }

  // reset flashers
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      if (flashesThisStep[i][j]) {
        grid[i][j] = 0;
        flashes += 1;
      }
    }
  }
}

fs.writeFileSync("./11/part-1/output.txt", flashes.toString());
