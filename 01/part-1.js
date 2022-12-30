import { read, write } from '../utility.js';

const numbers = read(1).map((n) => parseInt(n, 10));

let result;

for (const number of numbers) {
  if (numbers.includes(2020 - number)) {
    result = number * (2020 - number);
    break;
  }
}

write(1, 1, result);
