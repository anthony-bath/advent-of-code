export function getGrids(lines) {
  const grids = [];
  let currentGrid;

  lines.forEach((line) => {
    if (!line) {
      grids.push(currentGrid);
      currentGrid = null;
      return;
    }

    const row = line.split('');

    if (!currentGrid) {
      currentGrid = [row];
    } else {
      currentGrid.push(row);
    }
  });

  grids.push(currentGrid);

  return grids;
}

export function getReflectionValue(grid, maxDifferences) {
  const W = grid[0].length;
  const H = grid.length;

  const columnIndices = [...Array(W).keys()];
  const rowIndices = [...Array(H).keys()];

  // Check Horizontal
  const rowEntries = [];

  for (let row = 1; row < H; row++) {
    const differences = columnIndices.filter((i) => grid[row][i] !== grid[row - 1][i]).length;

    if (differences <= maxDifferences) {
      rowEntries.push({ row, differences });
    }
  }

  for (const entry of rowEntries) {
    let up = entry.row - 2;
    let down = entry.row + 1;
    let { differences } = entry;

    while (up >= 0 && down < H) {
      differences += columnIndices.filter((i) => grid[up][i] !== grid[down][i]).length;

      if (differences > maxDifferences) {
        break;
      }

      up--;
      down++;
    }

    if (differences === maxDifferences) {
      return entry.row * 100;
    }
  }

  // Check Vertical
  const colEntries = [];

  for (let col = 1; col < W; col++) {
    const differences = rowIndices.filter((i) => grid[i][col] !== grid[i][col - 1]).length;

    if (differences <= maxDifferences) {
      colEntries.push({ col, differences });
    }
  }

  for (const entry of colEntries) {
    let left = entry.col - 2;
    let right = entry.col + 1;
    let { differences } = entry;

    while (left >= 0 && right < W) {
      differences += rowIndices.filter((i) => grid[i][left] !== grid[i][right]).length;

      if (differences > maxDifferences) {
        break;
      }

      left--;
      right++;
    }

    if (differences === maxDifferences) {
      return entry.col;
    }
  }

  return null;
}
