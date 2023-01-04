import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 2, 1];

const input = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));
input[1] = 12;
input[2] = 2;

for (let i = 0; i < input.length; i += 4) {
  const op = input[i];
  const p1 = input[i + 1];
  const p2 = input[i + 2];
  const p3 = input[i + 3];

  switch (op) {
    case 1:
      input[p3] = input[p1] + input[p2];
      break;

    case 2:
      input[p3] = input[p1] * input[p2];
      break;

    case 99:
      break;
  }
}

write(YEAR, DAY, PART, input[0]);
