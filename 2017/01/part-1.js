import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 1, 1];

const input = readOld(YEAR, DAY, PART, { splitBy: '' }).map((n) => Number(n));

let result = 0;

for (let i = 0; i < input.length; i++) {
  if (input[i] === input[(i + 1) % input.length]) {
    result += input[i];
  }
}

write(YEAR, DAY, PART, result);
