import { sum } from '../../utilities/array.js';

export function part2({ lines }) {
  let top3Carriers = [-Infinity, -Infinity, -Infinity];
  let currentElfTotal = 0;

  lines.forEach((carryValue) => {
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
      currentElfTotal += Number(carryValue);
    }
  });

  return sum(top3Carriers);
}
