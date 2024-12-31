import { sum } from '../../utilities/array.js';
import { getGrids, getReflectionValue } from './common.js';

export function part1({ lines }) {
  return sum(getGrids(lines).map((g) => getReflectionValue(g, 0)));
}
