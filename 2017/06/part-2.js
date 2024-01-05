import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 6, 2];

const banks = readOld(YEAR, DAY, PART, { splitBy: '\t' }).map((n) => Number(n));

const seen = {};
let cycles = 0;
let result = null;

while (true) {
  const key = banks.join('|');

  if (key in seen) {
    result = cycles - seen[key];
    break;
  } else {
    seen[key] = cycles;
  }

  let distribution = Math.max(...banks);
  let index = banks.indexOf(distribution);
  banks[index] = 0;

  while (distribution > 0) {
    let nextIndex = index + 1;

    if (nextIndex >= banks.length) {
      nextIndex = 0;
    }

    banks[nextIndex]++;
    distribution--;
    index = nextIndex;
  }

  cycles++;
}
write(YEAR, DAY, PART, result);
