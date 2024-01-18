import { abs, sumN } from '../../utilities/math.js';

export function part2({ data }) {
  const positions = data.split(',').map(Number);

  const maxPos = Math.max(...positions);
  const moveCostByDistance = new Map();
  let fuelByPosition = Array(maxPos + 1).fill(0);

  for (const position of positions) {
    fuelByPosition = fuelByPosition.map((fuel, targetPosition) => {
      const distance = abs(position - targetPosition);

      if (!moveCostByDistance.has(distance)) {
        moveCostByDistance.set(distance, sumN(distance));
      }

      return fuel + moveCostByDistance.get(distance);
    });
  }

  return Math.min(...fuelByPosition);
}
