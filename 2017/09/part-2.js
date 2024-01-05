import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 9, 2];

const expr = /(!.)/g;

const input = readOld(YEAR, DAY, PART, { splitBy: null }).replaceAll(expr, '').split('');

let inGarbage = false;
let count = 0;

for (const item of input) {
  if (inGarbage && item !== '>') {
    count++;
    continue;
  }

  if (item === '<') {
    inGarbage = true;
    continue;
  }

  if (item === '>') {
    inGarbage = false;
  }
}

write(YEAR, DAY, PART, count);
