import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 3, 2];

const delta = { v: [0, 1], '^': [0, -1], '<': [-1, 0], '>': [1, 0] };
const presentsByCoord = { '0|0': 2 };
const santas = { [true]: [0, 0], [false]: [0, 0] };
let flip = true;

readOld(YEAR, DAY, PART, { splitBy: '' }).forEach((dir) => {
  const [dx, dy] = delta[dir];
  const [x, y] = santas[flip];
  const nextX = x + dx;
  const nextY = y + dy;

  santas[flip] = [nextX, nextY];
  const nextKey = `${nextX}|${nextY}`;

  if (!(nextKey in presentsByCoord)) {
    presentsByCoord[nextKey] = 1;
  } else {
    presentsByCoord[nextKey]++;
  }

  flip = !flip;
});

write(YEAR, DAY, PART, Object.keys(presentsByCoord).length);
