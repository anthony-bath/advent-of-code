import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 2, 1];

const data = read(YEAR, DAY, PART).map((row) => {
  const [direction, amount] = row.split(' ');
  return [direction, Number(amount)];
});

let horizontal = 0;
let depth = 0;

for (const [direction, amount] of data) {
  switch (direction) {
    case 'forward':
      horizontal += amount;
      break;
    case 'up':
      depth -= amount;
      break;
    case 'down':
      depth += amount;
      break;
  }
}

write(YEAR, DAY, PART, horizontal * depth);
