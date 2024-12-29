export function part2({ lines }) {
  const grid = lines.map((line) => line.trim().split('').map(Number));
  const basinSizes = [];
  const visited = [...Array(grid.length + 1)].map((_) => Array(grid[0].length + 1).fill(false));

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (!visited[i][j]) {
        basinSizes.push(search(grid, i, j));
      }
    }
  }

  function search(grid, i, j) {
    visited[i][j] = true;

    if (grid[i][j] === 9) {
      return 0;
    }

    let basinSize = 1;

    if (i > 0 && !visited[i - 1][j]) {
      basinSize += search(grid, i - 1, j);
    }

    if (i < grid.length - 1 && !visited[i + 1][j]) {
      basinSize += search(grid, i + 1, j);
    }

    if (j > 0 && !visited[i][j - 1]) {
      basinSize += search(grid, i, j - 1);
    }

    if (j < grid[i].length - 1 && !visited[i][j + 1]) {
      basinSize += search(grid, i, j + 1);
    }

    return basinSize;
  }

  basinSizes.sort((x, y) => y - x);

  return basinSizes[0] * basinSizes[1] * basinSizes[2];
}
