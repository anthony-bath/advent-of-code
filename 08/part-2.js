import fs from 'fs';

const grid = fs
  .readFileSync('./08/input.txt', 'utf-8')
  .split('\n')
  .map((line) => line.split('').map((n) => parseInt(n, 10)));

let maxScenicScoreSoFar = -Infinity;

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
      continue;
    } else {
      // Inner Trees
      treesAbove[col].push(grid[row - 1][col]);

      const treeHeight = grid[row][col];
      const scenicScore = [
        grid[row].slice(0, col).reverse(),
        grid[row].slice(col + 1),
        [...treesAbove[col]].reverse(),
        treesBelow[col],
      ].reduce((scenicScore, trees) => scenicScore * getScore(treeHeight, trees), 1);

      if (scenicScore > maxScenicScoreSoFar) {
        maxScenicScoreSoFar = scenicScore;
      }
    }
  }

  // Remove current row of trees
  if (row >= 1) {
    treesBelow.forEach((data) => data.shift());
  }
}

fs.writeFileSync('./08/output-2.txt', `${maxScenicScoreSoFar}`);

function getScore(height, trees) {
  let score = 0;

  for (let i = 0; i < trees.length; i++) {
    score++;

    if (trees[i] >= height) {
      break;
    }
  }

  return score;
}
