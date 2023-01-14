import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 10, 1];

const joltages = read(YEAR, DAY, PART)
  .map((n) => Number(n))
  .sort((a, b) => a - b);

joltages.unshift(0); // source
joltages.push(joltages[joltages.length - 1] + 3); // built-in adapter

const differences = [0, 0, 0];

for (let i = 1; i < joltages.length; i++) {
  differences[joltages[i] - joltages[i - 1] - 1]++;
}

write(YEAR, DAY, PART, differences[0] * differences[2]);
