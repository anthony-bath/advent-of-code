import { part1 } from './part-1.js';

export function part2({ lines }) {
  const TARGET = part1({ lines });
  const input = lines.map(Number);

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

  return contiguous.shift() + contiguous.pop();
}
