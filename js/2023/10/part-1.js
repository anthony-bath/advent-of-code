import { getInputElements, walkLoop } from './common.js';

export function part1({ lines }) {
  const { grid, start } = getInputElements(lines);
  const loop = walkLoop(grid, start);

  return loop.length / 2;
}
