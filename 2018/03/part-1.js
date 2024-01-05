import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 3, 1];

const fabric = [...Array(1000).keys()].map((_) => Array(1000).fill('.'));

readOld(YEAR, DAY, PART).forEach((line) => {
  const [_, x, y, w, h] = line.match(/\d+/g).map((n) => Number(n));

  for (let row = y; row < y + h; row++) {
    for (let col = x; col < x + w; col++) {
      if (fabric[row][col] === '.') {
        fabric[row][col] = '#';
      } else {
        fabric[row][col] = 'X';
      }
    }
  }
});

write(
  YEAR,
  DAY,
  PART,
  fabric.reduce((count, row) => count + row.filter((square) => square === 'X').length, 0)
);
