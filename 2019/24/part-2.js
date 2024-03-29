export function part2({ grid: tile }) {
  const SIZE = tile.length;
  const MID = Math.floor(SIZE / 2);
  const DURATION = 200;

  let count = tile.reduce((sum, row) => sum + row.filter((c) => c === '#').length, 0);

  const grid = {
    0: tile,
  };

  for (let range = -DURATION / 2 - 2; range <= DURATION / 2 + 2; range++) {
    if (range === 0) continue;

    grid[range] = Array(SIZE)
      .fill()
      .map(() => Array(SIZE).fill('.'));
  }

  let minute = 0;

  const deltas = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  const neighborsByRowCol = new Map();

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (row === MID && col === MID) continue;

      const neighbors = [];

      for (const [dc, dr] of deltas) {
        const nr = row + dr;
        const nc = col + dc;

        if (nr === MID && nc === MID) {
          // Center neighbor, will have 5 extra at +1 depth
          if (row === MID - 1 || row === MID + 1) {
            // Center is above or below
            const r = row === MID - 1 ? 0 : SIZE - 1;

            for (let c = 0; c < SIZE; c++) {
              neighbors.push([1, r, c]);
            }
          } else {
            // Center is right or left
            const c = col === 1 ? 0 : SIZE - 1;

            for (let r = 0; r < SIZE; r++) {
              neighbors.push([1, r, c]);
            }
          }
        } else {
          if (nc === SIZE) {
            // Right Neighbor at Depth -1
            neighbors.push([-1, MID, MID + 1]);
          } else if (nc === -1) {
            // Left Neighbor at Depth -1
            neighbors.push([-1, MID, MID - 1]);
          } else if (nr === SIZE) {
            // Below Neighbor at Depth -1
            neighbors.push([-1, MID + 1, MID]);
          } else if (nr === -1) {
            // Above Neighbor at Depth -1
            neighbors.push([-1, MID - 1, MID]);
          } else {
            // Same Depth Neighbor
            neighbors.push([0, nr, nc]);
          }
        }
      }

      neighborsByRowCol.set(`${row}|${col}`, neighbors);
    }
  }

  while (minute < DURATION) {
    const births = new Set();
    const deaths = new Set();

    for (let depth = -DURATION / 2 - 1; depth <= DURATION / 2 + 1; depth++) {
      for (let row = 0; row < SIZE; row++) {
        for (let col = 0; col < SIZE; col++) {
          if (row === MID && col === MID) continue;

          let adjacentBugs = 0;

          for (const [dd, r, c] of neighborsByRowCol.get(`${row}|${col}`)) {
            if (grid[depth + dd][r][c] === '#') {
              adjacentBugs++;
            }
          }

          if (grid[depth][row][col] === '#' && adjacentBugs !== 1) {
            deaths.add([depth, row, col]);
          } else if (grid[depth][row][col] === '.' && [1, 2].includes(adjacentBugs)) {
            births.add([depth, row, col]);
          }
        }
      }
    }

    for (const [depth, row, col] of births) {
      grid[depth][row][col] = '#';
    }

    for (const [depth, row, col] of deaths) {
      grid[depth][row][col] = '.';
    }

    count = count + births.size - deaths.size;
    minute++;
  }

  return count;
}
