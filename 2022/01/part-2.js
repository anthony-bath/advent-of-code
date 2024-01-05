import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 1, 2];

let top3Carriers = [-Infinity, -Infinity, -Infinity];
let currentElfTotal = 0;

readOld(YEAR, DAY, PART).forEach((carryValue) => {
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

write(
  YEAR,
  DAY,
  PART,
  top3Carriers.reduce((a, c) => (a += c), 0)
);
