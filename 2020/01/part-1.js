import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 1, 1];

const numbers = readOld(YEAR, DAY, PART).map((n) => parseInt(n, 10));

let result;

for (const number of numbers) {
  if (numbers.includes(2020 - number)) {
    result = number * (2020 - number);
    break;
  }
}

write(YEAR, DAY, PART, result);
