export function part1({ lines }) {
  let currentElfTotal = 0;
  let currentMax = -Infinity;

  lines.forEach((carryValue) => {
    if (!carryValue) {
      if (currentElfTotal > currentMax) {
        currentMax = currentElfTotal;
      }

      currentElfTotal = 0;
    } else {
      currentElfTotal += parseInt(carryValue, 10);
    }
  });

  return currentMax;
}
