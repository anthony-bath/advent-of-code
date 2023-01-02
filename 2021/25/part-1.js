import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2021, 25, 1];

const grid = read(YEAR, DAY).map((row) => row.split(''));

const HEIGHT = grid.length;
const WIDTH = grid[0].length;

let steps = 0;

while (true) {
  let moved = false;
  let toMove = [];

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      if (grid[row][col] === '>') {
        if (col + 1 < WIDTH && grid[row][col + 1] === '.') {
          toMove.push([row, col, col + 1]);
          moved = true;
        } else if (col + 1 >= WIDTH && grid[row][0] === '.') {
          toMove.push([row, col, 0]);
          moved = true;
        }
      }
    }
  }

  for (const [row, col, targetCol] of toMove) {
    grid[row][col] = '.';
    grid[row][targetCol] = '>';
  }

  toMove = [];

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      if (grid[row][col] === 'v') {
        if (row + 1 < HEIGHT && grid[row + 1][col] === '.') {
          toMove.push([row, col, row + 1]);
          moved = true;
        } else if (row + 1 >= HEIGHT && grid[0][col] === '.') {
          toMove.push([row, col, 0]);
          moved = true;
        }
      }
    }
  }

  for (const [row, col, targetRow] of toMove) {
    grid[row][col] = '.';
    grid[targetRow][col] = 'v';
  }

  steps++;

  if (!moved) break;
}

write(YEAR, DAY, PART, steps);
