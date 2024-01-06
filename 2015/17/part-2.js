import { fill } from './common.js';

export function part2({ lines }) {
  const input = lines.map((n) => Number(n)).sort((a, b) => b - a);
  const combinations = fill(150, input).sort((a, b) => a.length - b.length);

  return combinations.filter((combination) => combination.length === combinations[0].length).length;
}
