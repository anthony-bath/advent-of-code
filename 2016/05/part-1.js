import { readOld, write } from '../../utilities/io.js';
import { createHash } from 'node:crypto';

const [YEAR, DAY, PART] = [2016, 5, 1];

const doorId = readOld(YEAR, DAY, PART, { splitBy: null });
const passwordChars = [];
let num = 0;

while (passwordChars.length < 8) {
  const hash = createHash('md5').update(`${doorId}${num}`).digest('hex');

  if (hash.startsWith('00000')) {
    passwordChars.push(hash[5]);
  }

  num++;
}

write(YEAR, DAY, PART, passwordChars.join(''));
