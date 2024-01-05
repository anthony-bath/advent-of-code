import { readOld, write } from '../../utilities/io.js';
import { knotHash } from './common.js';

const [YEAR, DAY, PART] = [2017, 14, 1];

const lengths = [...readOld(YEAR, DAY, PART, { splitBy: null }).trim()]
  .map((c) => c.charCodeAt(0))
  .concat('-'.charCodeAt(0));

const suffix = [17, 31, 73, 47, 23];

let used = 0;

for (let row = 0; row < 128; row++) {
  const rowLengths = [...`${row}`].map((c) => c.charCodeAt(0));
  const input = [...lengths, ...rowLengths, ...suffix];
  const hash = knotHash(input);

  used += [...hash].filter((b) => b === '1').length;
}

write(YEAR, DAY, PART, used);
