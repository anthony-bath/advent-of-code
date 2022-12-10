import { read, write } from '../utility.js';

let currentElfTotal = 0;
let currentMax = -Infinity;

read(1).forEach((carryValue) => {
  if (!carryValue) {
    if (currentElfTotal > currentMax) {
      currentMax = currentElfTotal;
    }

    currentElfTotal = 0;
  } else {
    currentElfTotal += parseInt(carryValue, 10);
  }
});

write(1, 1, `${currentMax}`);
