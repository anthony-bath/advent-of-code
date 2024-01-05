import { readOld, write } from '../../utilities/io.js';
import { sparseHash } from './common.js';

const [YEAR, DAY, PART] = [2017, 10, 2];

const lengths = [...readOld(YEAR, DAY, PART, { splitBy: null }).trim()]
  .map((c) => c.charCodeAt(0))
  .concat(17, 31, 73, 47, 23);

const SIZE = 256;

const data = sparseHash(
  Array(SIZE)
    .fill()
    .map((_, i) => i),
  lengths,
  64
);

const blocks = [];

while (data.length) {
  blocks.push(
    data
      .splice(0, 16)
      .reduce((result, num) => (result ^= num), 0)
      .toString(16)
      .padStart(2, '0')
  );
}

write(YEAR, DAY, PART, blocks.join(''));
