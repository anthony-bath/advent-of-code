import { readOld, write } from '../../utilities/io.js';
import { createHash } from 'node:crypto';

const [YEAR, DAY, PART] = [2016, 5, 2];

const doorId = readOld(YEAR, DAY, PART, { splitBy: null });
const passwordChars = new Map();
const positions = [...Array(8).keys()];

let num = 0;

while (passwordChars.size < 8) {
  const hash = createHash('md5').update(`${doorId}${num}`).digest('hex');

  if (hash.startsWith('00000')) {
    const position = Number(hash[5]);

    if (
      Number.isInteger(position) &&
      positions.includes(position) &&
      !passwordChars.has(position)
    ) {
      passwordChars.set(position, hash[6]);
    }
  }

  num++;
}

write(YEAR, DAY, PART, positions.map((position) => passwordChars.get(position)).join(''));
