import { getOnNeighborCount } from './common.js';

export function part2({ grid }) {
  const corners = [
    [0, 0],
    [99, 0],
    [0, 99],
    [99, 99],
  ];

  corners.forEach(([x, y]) => (grid[y][x] = '#'));

  const STEPS = 100;

  for (let step = 0; step < STEPS; step++) {
    const toTurnOn = [];
    const toTurnOff = [];

    for (let y = 0; y < 100; y++) {
      for (let x = 0; x < 100; x++) {
        if (corners.some(([cx, cy]) => cx === x && cy === y)) continue;

        let onNeighbourCount = getOnNeighborCount(x, y, grid);

        if (grid[y][x] === '#' && ![2, 3].includes(onNeighbourCount)) {
          toTurnOff.push([x, y]);
        } else if (grid[y][x] === '.' && onNeighbourCount === 3) {
          toTurnOn.push([x, y]);
        }
      }
    }

    for (const [x, y] of toTurnOn) {
      grid[y][x] = '#';
    }

    for (const [x, y] of toTurnOff) {
      grid[y][x] = '.';
    }
  }

  return grid.reduce((count, row) => count + row.filter((light) => light === '#').length, 0);
}
