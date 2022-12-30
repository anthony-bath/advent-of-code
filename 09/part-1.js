import { read, write } from '../utility.js';

const SIZE = 25;

const input = read(9).map((n) => Number(n));
const preamble = input.slice(0, SIZE);
let sums = [];
const used = new Set();

for (let i = 0; i < SIZE; i++) {
  preamble.forEach((value, j) => {
    const key1 = `${i}-${j}`;
    const key2 = `${j}-${i}`;

    if (j !== i && !used.has(key1) && !used.has(key2)) {
      sums.push({ indexes: [i, j], value: input[i] + value });
      used.add(key1);
      used.add(key2);
    }
  });
}

let result;

for (let i = SIZE; i < input.length; i++) {
  if (sums.filter((sum) => sum.value === input[i]).length === 0) {
    result = input[i];
    break;
  }

  const start = i - (SIZE - 1);
  const prev = start - 1;

  sums = sums.filter(({ indexes }) => !indexes.includes(prev));

  input
    .slice(start, start + SIZE)
    .forEach((value, j) => sums.push({ indexes: [i, j + start], value: input[i] + value }));
}

write(9, 1, result);
