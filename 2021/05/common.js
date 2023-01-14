import { read } from '../../utilities/io.js';

const [YEAR, DAY] = [2021, 5];

export const loadData = (part) => {
  let xMax = 0;
  let yMax = 0;
  const lines = [];

  read(YEAR, DAY, part).forEach((row) => {
    const [start, end] = row.split(' -> ');
    const [x1, y1] = start.split(',').map((n) => parseInt(n));
    const [x2, y2] = end.split(',').map((n) => parseInt(n));

    xMax = Math.max(x1, x2, xMax);
    yMax = Math.max(y1, y2, yMax);

    lines.push({ x1, y1, x2, y2 });
  });

  const grid = [...Array(yMax + 1)].map((x) => Array(xMax + 1).fill(0));

  return { lines, grid };
};

export const plotVertical = (y1, y2, x, grid) => {
  for (let y = y1, yStep = y1 > y2 ? -1 : 1; y1 > y2 ? y >= y2 : y <= y2; y += yStep) {
    grid[y][x] += 1;
  }
};

export const plotHorizontal = (x1, x2, y, grid) => {
  for (let x = x1, xStep = x1 > x2 ? -1 : 1; x1 > x2 ? x >= x2 : x <= x2; x += xStep) {
    grid[y][x] += 1;
  }
};

export const plotDiagonal = (x1, x2, y1, y2, grid) => {
  for (
    let x = x1, y = y1, xStep = x1 > x2 ? -1 : 1, yStep = y1 > y2 ? -1 : 1;
    x1 > x2 ? x >= x2 : x <= x2, y1 > y2 ? y >= y2 : y <= y2;
    x += xStep, y += yStep
  ) {
    grid[y][x] += 1;
  }
};

export const evaluateGrid = (grid) => {
  let points = 0;

  for (const row of grid) {
    points += row.filter((x) => x > 1).length;
  }

  return points;
};
