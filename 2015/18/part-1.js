import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 18, 1];

const grid = read(YEAR, DAY, PART).map((line) => line.split(''));

function getOnNeighbors(x, y, grid) {
  const deltas = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];

  let count = 0;

  for (const [dx, dy] of deltas) {
    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX < 0 || nextY < 0 || nextX >= 100 || nextY >= 100) continue;

    if (grid[nextY][nextX] === '#') count++;
  }

  return count;
}

const STEPS = 100;

for (let step = 0; step < STEPS; step++) {
  const toTurnOn = [];
  const toTurnOff = [];

  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      let onNeighbourCount = getOnNeighbors(x, y, grid);

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

write(
  YEAR,
  DAY,
  PART,
  grid.reduce((count, row) => count + row.filter((light) => light === '#').length, 0)
);
