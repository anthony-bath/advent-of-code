import { write } from '../../utility.js';
import { cycles, DARK_PIXEL, LIT_PIXEL, LINE_LENGTH } from './common.js';

const [YEAR, DAY, PART] = [2022, 10, 2];

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

write(YEAR, DAY, PART, output.join('\n'));
