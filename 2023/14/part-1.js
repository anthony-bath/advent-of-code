import { tiltNorth, calcLoad, getInputElements } from './common.js';

export function part1({ lines }) {
  const { xMax, yMax, blockersByColumn, allStones } = getInputElements(lines);

  tiltNorth(allStones, xMax, blockersByColumn);

  return calcLoad(allStones, yMax);
}
