import { read, write } from '../utility.js';

const cache = {};
const parsed = [];

read(18).forEach((line) => {
  const [x, y, z] = line.split(',').map((n) => Number(n));
  parsed.push([x, y, z]);

  cache[`${x}-${y}-${z}`] = 1;
});

const countFromCache = (x, y, z) => {
  const keys = [
    `${x - 1}-${y}-${z}`,
    `${x + 1}-${y}-${z}`,
    `${x}-${y + 1}-${z}`,
    `${x}-${y - 1}-${z}`,
    `${x}-${y}-${z + 1}`,
    `${x}-${y}-${z - 1}`,
  ];

  return keys.reduce((count, key) => count + (cache[key] ? 0 : 1), 0);
};

const surfaceArea = parsed.reduce(
  (area, [x, y, z]) => area + countFromCache(x, y, z),
  0
);

write(18, 1, `${surfaceArea}`);
