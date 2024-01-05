import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 17, 1];

const [[x1, x2], [y1, y2]] = readOld(YEAR, DAY, PART, { splitBy: null })
  .replace(/[^\.,-\d]/g, '')
  .split(',')
  .map((v) => v.split('..').map((n) => Number(n)));

const maxHeight = (-y1 * (-y1 - 1)) / 2;

write(YEAR, DAY, PART, maxHeight);
