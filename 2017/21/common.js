export function rotateGrid(grid) {
  // First, we flip the grid horizontally
  const rotated = grid.map((row) => [...row].reverse());

  // Then, we transpose the grid (swap rows and columns)
  for (let i = 0; i < rotated.length; i++) {
    for (let j = 0; j < i; j++) {
      [rotated[i][j], rotated[j][i]] = [rotated[j][i], rotated[i][j]];
    }
  }

  return rotated;
}

export function flatten(data) {
  return data.map((row) => row.join('')).join('/');
}

export function getUpdatedGrid(size, grid, currentPieceSize, targetPieceSize, rules) {
  const parts = size / currentPieceSize;
  const nextSize = parts * targetPieceSize;

  const nextGrid = Array(nextSize)
    .fill()
    .map((_) => Array(nextSize).fill());

  for (let i = 0; i < parts; i++) {
    for (let j = 0; j < parts; j++) {
      const segment = [];

      for (let k = 0; k < currentPieceSize; k++) {
        const row = [];

        for (let l = 0; l < currentPieceSize; l++) {
          row.push(grid[i * currentPieceSize + k][j * currentPieceSize + l]);
        }

        segment.push(row);
      }

      const updated = rules.get(flatten(segment));

      for (let k = 0; k < targetPieceSize; k++) {
        for (let l = 0; l < targetPieceSize; l++) {
          nextGrid[i * targetPieceSize + k][j * targetPieceSize + l] = updated[k][l];
        }
      }
    }
  }

  return [nextGrid, nextSize];
}
