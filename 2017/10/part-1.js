import { readOld, write } from '../../utilities/io.js';
import { sparseHash } from './common.js';

const [YEAR, DAY, PART] = [2017, 10, 1];

const config = { splitBy: ',' };
const lengths = readOld(YEAR, DAY, PART, config).map((n) => Number(n));
const SIZE = config.test ? 5 : 256;

const list = sparseHash(
  Array(SIZE)
    .fill()
    .map((_, i) => i),
  lengths
);

write(YEAR, DAY, PART, list.shift() * list.shift());
