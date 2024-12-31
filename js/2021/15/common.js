import { PriorityQueue } from '../../utilities/queue.js';

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

  const state = { x: 0, y: 0, risk: 0 };
  const queue = new PriorityQueue(state, (a, b) => a.risk - b.risk);

  return { grid, visited, risk, queue };
}

export const evaluate = (yNext, xNext, args) => {
  const { y, x, risk, grid, queue } = args;

  risk[yNext][xNext] = Math.min(risk[yNext][xNext], risk[y][x] + grid[yNext][xNext]);

  queue.insert({
    y: yNext,
    x: xNext,
    risk: risk[yNext][xNext],
  });
};
