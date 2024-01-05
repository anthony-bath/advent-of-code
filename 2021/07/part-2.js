import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 7, 2];

const positions = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const maxPos = Math.max(...positions);
const moveCostByDistance = new Map();
let fuelByPosition = Array(maxPos + 1).fill(0);

for (const position of positions) {
  fuelByPosition = fuelByPosition.map((fuel, targetPosition) => {
    const distance = Math.abs(position - targetPosition);

    if (!moveCostByDistance.has(distance)) {
      moveCostByDistance.set(distance, sumN(distance));
    }

    return fuel + moveCostByDistance.get(distance);
  });
}

function sumN(n) {
  return (n * (n + 1)) / 2;
}

write(YEAR, DAY, PART, Math.min(...fuelByPosition));
