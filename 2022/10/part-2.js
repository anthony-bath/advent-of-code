import { printTextGrid } from '../../utilities/grid.js';
import { loadCycles, DARK_PIXEL, LIT_PIXEL, LINE_LENGTH } from './common.js';

export function part2({ lines }) {
  const cycles = loadCycles(lines);

  let X = 1;
  const output = [];
  let currentLine = [];

  for (let cycleIndex = 0; cycleIndex < cycles.length; cycleIndex++) {
    if ([X - 1, X, X + 1].includes(cycleIndex % LINE_LENGTH)) {
      currentLine.push(LIT_PIXEL);
    } else {
      currentLine.push(DARK_PIXEL);
    }

    X += cycles[cycleIndex];

    if (currentLine.length === LINE_LENGTH) {
      output.push(currentLine);
      currentLine = [];
    }
  }

  return printTextGrid(output, '#');
}
