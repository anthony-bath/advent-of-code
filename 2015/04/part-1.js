import { read, write } from '../../utilities/io.js';
import { createHash } from 'node:crypto';

const [YEAR, DAY, PART] = [2015, 4, 1];

const input = read(YEAR, DAY, PART, { splitBy: null });

let num = 0;

while (true) {
  const value = createHash('md5').update(`${input}${num}`).digest('hex');

  if (value.startsWith('00000')) {
    break;
  }

  num++;
}

write(YEAR, DAY, PART, num);
