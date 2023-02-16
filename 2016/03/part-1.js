import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 3, 1];

let possibleCount = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const [a, b, c] = line
    .trim()
    .split(/\s+/)
    .map((n) => Number(n));

  if (a + b > c && a + c > b && b + c > a) {
    possibleCount++;
  }
});

write(YEAR, DAY, PART, possibleCount);
