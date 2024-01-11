function rotateGrid(grid) {
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

function flatten(data) {
  return data.map((row) => row.join('')).join('/');
}

function getUpdatedGrid(size, grid, currentPieceSize, targetPieceSize, rules) {
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

export function getOnCount(lines, iterations) {
  const rules = new Map();

  lines.forEach((line) => {
    const [input, output] = line.split(' => ');
    const inputData = input.split('/').map((row) => row.split(''));
    const outputData = output.split('/').map((row) => row.split(''));

    rules.set(input, outputData);

    if (input.includes('#')) {
      let data = inputData;
      const rotations = [];

      for (let i = 0; i < 4; i++) {
        rotations.push(data);
        data = rotateGrid(data);
      }

      data = data.map((row) => [...row].reverse());

      for (let i = 0; i < 4; i++) {
        rotations.push(data);
        data = rotateGrid(data);
      }

      rotations.forEach((rot) => rules.set(flatten(rot), outputData));
    }
  });

  let size = 3;

  let grid = [
    ['.', '#', '.'],
    ['.', '.', '#'],
    ['#', '#', '#'],
  ];

  for (let iteration = 0; iteration < iterations; iteration++) {
    if (size % 2 === 0) {
      [grid, size] = getUpdatedGrid(size, grid, 2, 3, rules);
    } else {
      [grid, size] = getUpdatedGrid(size, grid, 3, 4, rules);
    }
  }

  let count = 0;

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === '#') {
        count++;
      }
    }
  }

  return count;
}
