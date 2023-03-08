import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 2, 1];

const expr = /\d+/g;

const result = read(YEAR, DAY, PART).reduce((totalArea, dimensions) => {
  const [l, w, h] = dimensions.match(expr).map((n) => Number(n));

  const s1 = l * w;
  const s2 = l * h;
  const s3 = w * h;

  return totalArea + 2 * (s1 + s2 + s3) + Math.min(s1, s2, s3);
}, 0);

write(YEAR, DAY, PART, result);
