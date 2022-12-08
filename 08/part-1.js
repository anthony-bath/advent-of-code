import fs from 'fs';

const grid = fs
  .readFileSync('./08/input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split('').map((n) => parseInt(n, 10)));

let visibleTreeCount = 0;

const treesAbove = Array.from({ length: grid.length }).map((_) => []);
const treesBelow = Array.from({ length: grid[0].length }).map((_) => []);

// Store all trees below 1st Row
for (let row = 2; row < grid.length; row++) {
  for (let col = 1; col < grid[0].length - 1; col++) {
    treesBelow[col].push(grid[row][col]);
  }
}

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid[0].length; col++) {
    if (row === 0 || row === grid.length - 1 || col === 0 || col === grid[0].length - 1) {
      visibleTreeCount++;
    } else {
      treesAbove[col].push(grid[row - 1][col]);

      // Inner Trees
      const treeHeight = grid[row][col];
      const adjacentTrees = [
        grid[row].slice(0, col),
        grid[row].slice(col + 1),
        treesAbove[col],
        treesBelow[col],
      ];

      if (adjacentTrees.some((trees) => trees.every((height) => height < treeHeight))) {
        visibleTreeCount++;
      }
    }
  }

  // Remove current row of trees
  if (row >= 1) {
    treesBelow.forEach((trees) => trees.shift());
  }
}

fs.writeFileSync('./08/output-1.txt', `${visibleTreeCount}`);
