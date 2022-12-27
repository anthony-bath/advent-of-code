import { read, write } from '../utility.js';

const TARGET = 556543474; //part-1 result

const input = read(9).map((n) => Number(n));

let sum = input[0] + input[1];
let start = 0;
let contiguous = [];

// Sliding Window
for (let i = 2; i < input.length; i++) {
  while (sum > TARGET && start < i - 1) {
    sum = sum - input[start];
    start++;
  }

  if (sum === TARGET) {
    contiguous = input.slice(start, i);
    break;
  }

  sum += input[i];
}

contiguous.sort((a, b) => a - b);

write(9, 2, `${contiguous.shift() + contiguous.pop()}`);
