import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 8, 1];

const grid = read(YEAR, DAY, PART).map((line) => line.split('').map((n) => parseInt(n, 10)));

let visibleTreeCount = 0;
let maxFromNorth = [...grid[0]];

for (let row = 0; row < grid.length; row++) {
  if (row === 0 || row === grid.length - 1) {
    visibleTreeCount += grid[0].length;
    continue;
  }

  let maxFromEast = grid[row][0];

  for (let col = 0; col < grid[0].length; col++) {
    if (col === 0 || col === grid[0].length - 1) {
      visibleTreeCount++;
    } else {
      const treeHeight = grid[row][col];
      const maxFromNorthTemp = maxFromNorth[col];
      maxFromNorth[col] = Math.max(treeHeight, maxFromNorthTemp);

      // Check East
      if (treeHeight > maxFromEast) {
        visibleTreeCount++;
        maxFromEast = treeHeight;
        continue;
      }

      // Check North
      if (treeHeight > maxFromNorthTemp) {
        visibleTreeCount++;
        continue;
      }

      // Check West
      if (evaluate('row', col + 1, row, treeHeight, grid[0].length)) {
        visibleTreeCount++;
        continue;
      }

      // Check South
      if (evaluate('col', row + 1, col, treeHeight, grid.length)) {
        visibleTreeCount++;
        continue;
      }
    }
  }
}

function evaluate(direction, movingIndex, staticIndex, treeHeight, endValue) {
  let isVisible = true;

  while (movingIndex < endValue) {
    const compareHeight =
      direction === 'col' ? grid[movingIndex][staticIndex] : grid[staticIndex][movingIndex];

    if (compareHeight >= treeHeight) {
      isVisible = false;
      break;
    } else {
      movingIndex++;
    }
  }

  return isVisible;
}

write(YEAR, DAY, PART, visibleTreeCount);
