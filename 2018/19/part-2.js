import { sum } from '../../utilities/array.js';
import { factors } from '../../utilities/math.js';

export function part2() {
  return sum(factors(10551298));
}
