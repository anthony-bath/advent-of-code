import { readOld } from '../../utilities/io.js';

const [YEAR, DAY] = [2022, 10];

export function loadCycles(lines) {
  const cycles = [];

  for (const instruction of lines) {
    if (instruction === 'noop') {
      cycles.push(0);
    } else {
      const [_, change] = instruction.split(' ');
      cycles.push(0, parseInt(change, 10));
    }
  }

  return cycles;
}

export const LINE_LENGTH = 40;
export const LIT_PIXEL = '#';
export const DARK_PIXEL = '.';
export const TRACKED_CYCLE_INDICES = [19, 59, 99, 139, 179, 219];
