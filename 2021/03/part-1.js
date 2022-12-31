import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2021, 3, 1];

const data = read(YEAR, DAY, PART).map((x) => x.trim());

const bitCounts = [];

for (const entry of data) {
  [...entry].forEach((value, bit) => {
    if (!bitCounts[bit]) {
      bitCounts[bit] = [0, 0];
    }

    bitCounts[bit][parseInt(value)]++;
  });
}

let gamma = '';
let epsilon = '';

for (const [low, high] of bitCounts) {
  if (high > low) {
    gamma += '1';
    epsilon += '0';
  } else {
    gamma += '0';
    epsilon += '1';
  }
}

write(YEAR, DAY, PART, parseInt(gamma, 2) * parseInt(epsilon, 2));
