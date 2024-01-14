export function part1({ lines }) {
  return lines.reduce((fuel, mass) => fuel + (Math.floor(Number(mass) / 3) - 2), 0);
}
