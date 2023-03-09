import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 2, 2];

const expr = /\d+/g;

const result = read(YEAR, DAY, PART).reduce((totalArea, dimensions) => {
  const [l, w, h] = dimensions.match(expr).map((n) => Number(n));

  const p1 = 2 * (l + w);
  const p2 = 2 * (l + h);
  const p3 = 2 * (w + h);

  return totalArea + l * w * h + Math.min(p1, p2, p3);
}, 0);

write(YEAR, DAY, PART, result);
