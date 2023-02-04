import { read, write } from '../../utilities/io.js';
import { commands } from './common.js';

const [YEAR, DAY, PART] = [2018, 16, 1];

const input = read(YEAR, DAY, PART);

let result = 0;

for (let row = 0; row <= 3256; row += 4) {
  const before = JSON.parse(input[row].split(': ')[1]);
  const [, A, B, C] = input[row + 1].split(' ').map((n) => Number(n));
  const after = JSON.parse(input[row + 2].split(': ')[1]);

  let count = 0;

  for (const command of commands) {
    const result = command(before, A, B, C);

    if (result[C] === after[C]) {
      count++;
    }
  }

  if (count >= 3) {
    result++;
  }
}

write(YEAR, DAY, PART, result);
