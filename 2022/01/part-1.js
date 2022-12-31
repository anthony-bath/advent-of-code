import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2022, 1, 1];

let currentElfTotal = 0;
let currentMax = -Infinity;

read(YEAR, DAY).forEach((carryValue) => {
  if (!carryValue) {
    if (currentElfTotal > currentMax) {
      currentMax = currentElfTotal;
    }

    currentElfTotal = 0;
  } else {
    currentElfTotal += parseInt(carryValue, 10);
  }
});

write(YEAR, DAY, PART, currentMax);
