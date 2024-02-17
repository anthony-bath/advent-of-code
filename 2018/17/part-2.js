import { flow, count, TYPE, getInputElements } from './common.js';

export function part2({ lines }) {
  const data = getInputElements(lines);

  flow({ x: 500 - data.xMin, y: 0 }, data);

  return count([TYPE.WATER_AT_REST], data.grid);
}
