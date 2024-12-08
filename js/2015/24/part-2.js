import { sum } from '../../utilities/array.js';
import { shortestSum } from './common.js';

export function part2({ lines }) {
  const weights = lines.map((n) => Number(n)).sort((a, b) => b - a);
  const targetWeight = sum(weights) / 4;

  // With weights sorted in descending order, the solution will always
  // use the first shortest sum to the target weight
  return shortestSum(targetWeight, weights).reduce((product, w) => product * w, 1);
}
