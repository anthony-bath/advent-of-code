import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 3, 1];

const delta = { v: [0, 1], '^': [0, -1], '<': [-1, 0], '>': [1, 0] };
const presentsByCoord = { '0|0': 1 };
let [x, y] = [0, 0];

read(YEAR, DAY, PART, { splitBy: '' }).forEach((dir) => {
  const [dx, dy] = delta[dir];
  x += dx;
  y += dy;
  const nextKey = `${x}|${y}`;

  if (!(nextKey in presentsByCoord)) {
    presentsByCoord[nextKey] = 1;
  } else {
    presentsByCoord[nextKey]++;
  }
});

write(YEAR, DAY, PART, Object.keys(presentsByCoord).length);
