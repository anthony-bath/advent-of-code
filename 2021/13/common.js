import { read } from '../../utilities/io.js';

const [YEAR, DAY] = [2021, 13];

export const loadData = (part) => {
  const input = read(YEAR, DAY, part);

  let xMax = 0;
  let yMax = 0;
  let parsedCoords = false;
  const coords = [];
  const folds = [];

  input.forEach((line) => {
    if (!line) {
      parsedCoords = true;
      return;
    }

    if (!parsedCoords) {
      const [x, y] = line
        .trim()
        .split(',')
        .map((n) => Number(n));

      xMax = Math.max(x, xMax);
      yMax = Math.max(y, yMax);

      coords.push([x, y]);
    } else {
      const [dir, point] = line.trim().replace('fold along ', '').split('=');
      folds.push([dir, Number(point)]);
    }
  });

  return { xMax, yMax, coords, folds };
};
