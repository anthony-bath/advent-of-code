import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 1, 2];

const numbers = read(YEAR, DAY, PART).map((n) => parseInt(n, 10));

function findTwoNumbersToSum(target, array) {
  for (const number of array) {
    if (array.includes(target - number)) {
      return [number, target - number];
    }
  }

  return [];
}

let result;

for (const number of numbers) {
  const target = 2020 - number;
  const pair = findTwoNumbersToSum(target, numbers);

  if (pair.length) {
    result = number * pair[0] * pair[1];
    break;
  }
}

write(YEAR, DAY, PART, result);
