import { differences } from '../../utilities/array.js';

export function part1({ lines }) {
  return lines.reduce((total, line) => {
    const rows = [line.split(' ').map((n) => Number(n))];
    let diffs = differences(rows[0]);

    while (!diffs.every((diff) => diff === 0)) {
      rows.push(diffs);
      diffs = differences(rows[rows.length - 1]);
    }

    let next = 0;

    for (let i = rows.length - 1; i >= 0; i--) {
      next += rows[i].pop();
    }

    return total + next;
  }, 0);
}
