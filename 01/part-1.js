import fs from 'fs';

let currentElfTotal = 0;
let currentMax = -Infinity;

fs.readFileSync('./01/input.txt')
  .toString()
  .split('\n')
  .forEach((carryValue) => {
    if (!carryValue) {
      if (currentElfTotal > currentMax) {
        currentMax = currentElfTotal;
      }

      currentElfTotal = 0;
    } else {
      currentElfTotal += parseInt(carryValue, 10);
    }
  });

fs.writeFileSync('./01/output-1.txt', `${currentMax}`);
