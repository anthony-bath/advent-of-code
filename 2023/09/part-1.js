import { differences } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 9, 1];

const result = read(YEAR, DAY, PART).reduce((total, line) => {
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

write(YEAR, DAY, PART, result);
