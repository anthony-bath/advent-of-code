import { getCompare } from './common.js';

export function part1({ lines }) {
  let total = 0;
  let pairNumber = 1;

  const compare = getCompare(-1);

  for (let i = 0; i < lines.length; i += 3) {
    const left = JSON.parse(lines[i]);
    const right = JSON.parse(lines[i + 1]);

    const result = compare(left, right);

    if (result === 1) {
      total += pairNumber;
    }

    pairNumber++;
  }

  return total;
}
