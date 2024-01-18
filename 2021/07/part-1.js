import { abs } from '../../utilities/math.js';

export function part1({ data }) {
  const positions = data.split(',').map(Number);

  const maxPos = Math.max(...positions);
  let fuelByPosition = Array(maxPos + 1).fill(0);

  for (const position of positions) {
    fuelByPosition = fuelByPosition.map((fuel, targetPosition) => {
      return (fuel += abs(position - targetPosition));
    });
  }

  return Math.min(...fuelByPosition);
}
