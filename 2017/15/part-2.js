import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 15, 2];

let [a, b] = read(YEAR, DAY, PART).map((line) => Number(line.match(/\d+/g)[0]));

let comparisons = 0;
let count = 0;

while (comparisons < 5000000) {
  let aFound = false;
  let bFound = false;

  while (!aFound || !bFound) {
    if (!aFound) {
      a = (a * 16807) % 2147483647;

      if (a % 4 === 0) {
        aFound = true;
      }
    }

    if (!bFound) {
      b = (b * 48271) % 2147483647;

      if (b % 8 === 0) {
        bFound = true;
      }
    }
  }

  if ((a & 0xffff) === (b & 0xffff)) {
    count++;
  }

  comparisons++;
}

write(YEAR, DAY, PART, count);
