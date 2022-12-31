import { read } from '../../utility.js';

const [YEAR, DAY] = [2021, 13];

export const loadData = () => {
  let xMax = 0;
  let yMax = 0;

  const coords = read(YEAR, DAY, { part: 1 }).map((entry) => {
    const [x, y] = entry
      .trim()
      .split(',')
      .map((val) => Number(val));

    xMax = Math.max(x, xMax);
    yMax = Math.max(y, yMax);

    return [x, y];
  });

  const folds = read(YEAR, DAY, { part: 2 }).map((line) => {
    const [dir, point] = line.trim().replace('fold along ', '').split('=');
    return [dir, Number(point)];
  });

  return { xMax, yMax, coords, folds };
};
