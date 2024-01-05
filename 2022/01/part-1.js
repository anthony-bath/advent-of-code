import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 1, 1];

let currentElfTotal = 0;
let currentMax = -Infinity;

readOld(YEAR, DAY, PART).forEach((carryValue) => {
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
