import fs from 'fs';

let top3Carriers = [];
let currentElfTotal = 0;

fs.readFileSync('./01/input.txt')
  .toString()
  .split('\n')
  .forEach((carryValue) => {
    if (!carryValue) {
      if (top3Carriers.length < 3) {
        top3Carriers.push(currentElfTotal);
      } else {
        top3Carriers = [...top3Carriers, currentElfTotal].sort((a, b) => b - a).slice(0, 3);
      }

      currentElfTotal = 0;
    } else {
      currentElfTotal += parseInt(carryValue, 10);
    }
  });

fs.writeFileSync('./01/output-2.txt', `${top3Carriers.reduce((a, c) => (a += c), 0)}`);
