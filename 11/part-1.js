import { read, write } from '../utility.js';

const grid = read(11).map((line) => line.split(''));

const WIDTH = grid[0].length;
const HEIGHT = grid.length;

let toOccupy;
let toVacate;
let totalOccupiedCount;

do {
  toOccupy = new Set();
  toVacate = new Set();
  totalOccupiedCount = 0;

  for (let row = 0; row < HEIGHT; row++) {
    for (let col = 0; col < WIDTH; col++) {
      let occupiedCount = 0;
      const right = col + 1 < WIDTH;
      const left = col - 1 >= 0;
      const up = row - 1 >= 0;
      const down = row + 1 < HEIGHT;

      totalOccupiedCount += grid[row][col] === '#' ? 1 : 0;

      if (up) occupiedCount += grid[row - 1][col] === '#' ? 1 : 0;
      if (up && left) occupiedCount += grid[row - 1][col - 1] === '#' ? 1 : 0;
      if (up && right) occupiedCount += grid[row - 1][col + 1] === '#' ? 1 : 0;
      if (left) occupiedCount += grid[row][col - 1] === '#' ? 1 : 0;
      if (right) occupiedCount += grid[row][col + 1] === '#' ? 1 : 0;
      if (down) occupiedCount += grid[row + 1][col] === '#' ? 1 : 0;
      if (down && left) occupiedCount += grid[row + 1][col - 1] === '#' ? 1 : 0;
      if (down && right) occupiedCount += grid[row + 1][col + 1] === '#' ? 1 : 0;

      if (occupiedCount === 0 && grid[row][col] === 'L') {
        toOccupy.add([row, col]);
      } else if (occupiedCount >= 4 && grid[row][col] === '#') {
        toVacate.add([row, col]);
      }
    }
  }

  for (const [row, col] of toOccupy) {
    grid[row][col] = '#';
  }

  for (const [row, col] of toVacate) {
    grid[row][col] = 'L';
  }
} while (toOccupy.size > 0 || toVacate.size > 0);

write(11, 1, `${totalOccupiedCount}`);
