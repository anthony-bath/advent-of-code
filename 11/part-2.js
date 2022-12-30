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

      let checkRow = row;
      let checkCol = col;
      let colOffset = 1;
      let seen = [0, 0, 0, 0, 0, 0, 0, 0];

      // Look Up [0] + Up-Left [1] + Up-Right [2]
      while ((!seen[0] || !seen[1] || !seen[2]) && checkRow - 1 >= 0) {
        checkRow--;

        if (grid[checkRow][checkCol] === '#' && !seen[0]) {
          seen[0] = 1;
          occupiedCount += 1;
        } else if (grid[checkRow][checkCol] === 'L') {
          seen[0] = 1;
        }

        if (left && !seen[1]) {
          if (grid[checkRow][checkCol - colOffset] === '#') {
            seen[1] = 1;
            occupiedCount += 1;
          } else if (grid[checkRow][checkCol - colOffset] === 'L') {
            seen[1] = 1;
          }
        }

        if (right && !seen[2]) {
          if (grid[checkRow][checkCol + colOffset] === '#') {
            seen[2] = 1;
            occupiedCount += 1;
          } else if (grid[checkRow][checkCol + colOffset] === 'L') {
            seen[2] = 1;
          }
        }

        colOffset++;
      }

      // Look Left [3]
      checkRow = row;
      while (!seen[3] && checkCol - 1 >= 0) {
        checkCol--;

        if (!seen[3] && grid[checkRow][checkCol] === '#') {
          seen[3] = 1;
          occupiedCount += 1;
          break;
        } else if (!seen[3] && grid[checkRow][checkCol] === 'L') {
          seen[3] = 1;
          break;
        }
      }

      // Look Right [4]
      checkCol = col;
      while (!seen[4] && checkCol + 1 < WIDTH) {
        checkCol++;

        if (!seen[4] && grid[checkRow][checkCol] === '#') {
          seen[4] = 1;
          occupiedCount += 1;
          break;
        } else if (!seen[4] && grid[checkRow][checkCol] === 'L') {
          seen[4] = 1;
          break;
        }
      }

      // Look Down [5] + Down-Left [6] + Down-Right [7]
      checkCol = col;
      colOffset = 1;
      while ((!seen[5] || !seen[6] || !seen[7]) && checkRow + 1 < HEIGHT) {
        checkRow++;

        if (!seen[5] && grid[checkRow][checkCol] === '#') {
          seen[5] = 1;
          occupiedCount += 1;
        } else if (!seen[5] && grid[checkRow][checkCol] === 'L') {
          seen[5] = 1;
        }

        if (!seen[6] && left) {
          if (grid[checkRow][checkCol - colOffset] === '#') {
            seen[6] = 1;
            occupiedCount += 1;
          } else if (grid[checkRow][checkCol - colOffset] === 'L') {
            seen[6] = 1;
          }
        }

        if (!seen[7] && right) {
          if (grid[checkRow][checkCol + colOffset] === '#') {
            seen[7] = 1;
            occupiedCount += 1;
          } else if (grid[checkRow][checkCol + colOffset] === 'L') {
            seen[7] = 1;
          }
        }

        colOffset++;
      }

      totalOccupiedCount += grid[row][col] === '#' ? 1 : 0;

      if (occupiedCount === 0 && grid[row][col] === 'L') {
        toOccupy.add([row, col]);
      } else if (occupiedCount >= 5 && grid[row][col] === '#') {
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

write(11, 2, totalOccupiedCount);
