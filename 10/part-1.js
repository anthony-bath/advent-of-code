import { read, write } from '../utility.js';

const joltages = read(10)
  .map((n) => Number(n))
  .sort((a, b) => a - b);

joltages.unshift(0); // source
joltages.push(joltages[joltages.length - 1] + 3); // built-in adapter

const differences = [0, 0, 0];

for (let i = 1; i < joltages.length; i++) {
  differences[joltages[i] - joltages[i - 1] - 1]++;
}

write(10, 1, `${differences[0] * differences[2]}`);
