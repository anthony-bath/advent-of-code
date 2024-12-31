import { differences } from '../../utilities/array.js';

export function part2({ lines }) {
  return lines.reduce((total, line) => {
    const rows = [line.split(' ').map((n) => Number(n))];
    let diffs = differences(rows[0]);

    while (!diffs.every((diff) => diff === 0)) {
      rows.push(diffs);
      diffs = differences(rows[rows.length - 1]);
    }

    let inserted = rows[rows.length - 1][0];

    for (let i = rows.length - 1; i > 0; i--) {
      inserted = rows[i - 1][0] - inserted;
    }

    return total + inserted;
  }, 0);
}
