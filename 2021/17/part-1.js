import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2021, 17, 1];

const [[x1, x2], [y1, y2]] = read(YEAR, DAY, { splitBy: null })
  .replace(/[^\.,-\d]/g, '')
  .split(',')
  .map((v) => v.split('..').map((n) => Number(n)));

const maxHeight = (-y1 * (-y1 - 1)) / 2;

write(YEAR, DAY, PART, maxHeight);
