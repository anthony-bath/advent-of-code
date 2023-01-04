import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 2, 2];

const TARGET = 19690720;

const input = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

let noun;
let verb;
let found = false;

for (noun = 0; noun < 99; noun++) {
  for (verb = 0; verb < 99; verb++) {
    const data = [...input];
    data[1] = noun;
    data[2] = verb;

    for (let i = 0; i < data.length; i += 4) {
      const op = data[i];
      const p1 = data[i + 1];
      const p2 = data[i + 2];
      const p3 = data[i + 3];

      switch (op) {
        case 1:
          data[p3] = data[p1] + data[p2];
          break;

        case 2:
          data[p3] = data[p1] * data[p2];
          break;

        case 99:
          break;
      }
    }

    if (data[0] === TARGET) {
      found = true;
      break;
    }
  }

  if (found) {
    break;
  }
}

write(YEAR, DAY, PART, 100 * noun + verb);
