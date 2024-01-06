import { fill } from './common.js';

export function part1({ lines }) {
  const input = lines.map((n) => Number(n)).sort((a, b) => b - a);
  return fill(150, input).length;
}
