import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 10, 2];

const joltages = read(YEAR, DAY)
  .map((n) => Number(n))
  .sort((a, b) => a - b);

joltages.unshift(0); // source
joltages.push(joltages[joltages.length - 1] + 3); // built-in adapter

const cache = {};

function getPaths(index) {
  if (index === joltages.length - 1) return 1;
  if (cache[index]) return cache[index];

  let count = 0;

  for (let j = index + 1; joltages[j] - joltages[index] <= 3; j++) {
    count += getPaths(j);
  }

  cache[index] = count;
  return count;
}

write(YEAR, PART, DAY, getPaths(0));
