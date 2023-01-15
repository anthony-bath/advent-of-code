import { printTextGrid } from '../../utilities/grid.js';
import { write } from '../../utilities/io.js';
import { loadCycles, DARK_PIXEL, LIT_PIXEL, LINE_LENGTH } from './common.js';

const [YEAR, DAY, PART] = [2022, 10, 2];

const cycles = loadCycles(PART);

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

write(YEAR, DAY, PART, printTextGrid(output, '#'));
