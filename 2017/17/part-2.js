import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 17, 2];

const steps = Number(read(YEAR, DAY, PART, { splitBy: null }));

let position = 0;
let value = 0;

for (let i = 1; i <= 50000000; i++) {
  position = ((position + steps) % i) + 1;

  if (position === 1) {
    value = i;
  }
}

write(YEAR, DAY, PART, value);

// 1745250 - Too Low
// 11995607 - Answer
