import fs from 'fs';

let top3Carriers = [-Infinity, -Infinity, -Infinity];
let currentElfTotal = 0;

fs.readFileSync('./01/input.txt')
  .toString()
  .split('\n')
  .forEach((carryValue) => {
    if (!carryValue) {
      if (currentElfTotal > top3Carriers[0]) {
        top3Carriers = [currentElfTotal, top3Carriers[0], top3Carriers[1]];
      } else if (currentElfTotal > top3Carriers[1]) {
        top3Carriers = [top3Carriers[0], currentElfTotal, top3Carriers[1]];
      } else if (currentElfTotal > top3Carriers[2]) {
        top3Carriers[2] = currentElfTotal;
      }

      currentElfTotal = 0;
    } else {
      currentElfTotal += parseInt(carryValue, 10);
    }
  });

fs.writeFileSync('./01/output-2.txt', `${top3Carriers.reduce((a, c) => (a += c), 0)}`);
