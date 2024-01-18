import { readOld } from '../../utilities/io.js';

const [YEAR, DAY] = [2021, 15];

const DIMENSION = 100;

export function getInputElements(lines, part) {
  const partialGrid = lines.map((row) => row.trim().split('').map(Number));

  let grid;

  if (part === 1) {
    grid = partialGrid;
  } else {
    grid = [...Array(5 * partialGrid.length)].map((x) => Array(5 * partialGrid[0].length));

    for (let y = 0; y < grid.length; y++) {
      const incY = Math.floor(y / DIMENSION);

      for (let x = 0; x < grid[0].length; x++) {
        const increment = Math.floor(x / DIMENSION) + incY;
        let mappedValue = partialGrid[y % DIMENSION][x % DIMENSION] + increment;
        mappedValue = mappedValue > 9 ? mappedValue - 9 : mappedValue;

        grid[y][x] = mappedValue;
      }
    }
  }

  const visited = [...Array(grid.length)].map((_) => Array(grid[0].length).fill(false));

  const risk = [...Array(grid.length)].map((_) => Array(grid[0].length).fill(Infinity));

  risk[0][0] = 0;

  const queue = [{ x: 0, y: 0, risk: 0 }];

  return { grid, visited, risk, queue };
}

function insertIntoSortedQueue(queue, node) {
  let low = 0;
  let high = queue.length;

  while (low < high) {
    let mid = (low + high) >>> 1;

    if (queue[mid].risk > node.risk) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  queue.splice(low, 0, node);
}

export const evaluate = (yNext, xNext, args) => {
  const { y, x, risk, grid, queue } = args;

  risk[yNext][xNext] = Math.min(risk[yNext][xNext], risk[y][x] + grid[yNext][xNext]);

  insertIntoSortedQueue(queue, {
    y: yNext,
    x: xNext,
    risk: risk[yNext][xNext],
  });
};
