import { sum } from '../../utilities/array.js';
import { getGrids, getReflectionValue } from './common.js';

export function part2({ lines }) {
  return sum(getGrids(lines).map((g) => getReflectionValue(g, 1)));
}
