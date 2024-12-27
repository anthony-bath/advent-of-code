export function part2({ lines }) {
  const masses = lines.map(Number);
  let result = 0;

  while (masses.length) {
    const current = masses.shift();
    const fuel = Math.floor(current / 3) - 2;

    result += fuel;

    if (fuel > 6) {
      masses.push(fuel);
    }
  }

  return result;
}
