import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 9, 1];

const expr = /(!.)/g;

const input = readOld(YEAR, DAY, PART, { splitBy: null, test: true })
  .replaceAll(expr, '')
  .split('');

let inGarbage = false;
let depth = 0;
let score = 0;

for (const item of input) {
  if (item === '{' && !inGarbage) {
    depth++;
  } else if (item === '<' && !inGarbage) {
    inGarbage = true;
  } else if (item === '>' && inGarbage) {
    inGarbage = false;
  } else if (item === '}' && !inGarbage) {
    score += depth;
    depth--;
  }
}

write(YEAR, DAY, PART, score);
