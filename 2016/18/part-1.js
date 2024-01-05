import { printGrid } from '../../utilities/grid.js';
import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 18, 1];

const input = readOld(YEAR, DAY, PART, { splitBy: '' });

const trapPatterns = ['^^.', '.^^', '^..', '..^'];

let safeCount = input.filter((t) => t === '.').length;
const rows = [input];
let prevRowIndex = 0;

while (rows.length < 40) {
  const nextRow = [];
  const prevRow = rows[prevRowIndex];

  for (let tile = 0; tile < prevRow.length; tile++) {
    const left = tile - 1 >= 0 ? prevRow[tile - 1] : '.';
    const center = prevRow[tile];
    const right = tile + 1 < prevRow.length ? prevRow[tile + 1] : '.';

    if (trapPatterns.includes(`${left}${center}${right}`)) {
      nextRow.push('^');
    } else {
      safeCount++;
      nextRow.push('.');
    }
  }

  rows.push(nextRow);
  prevRowIndex++;
}

write(YEAR, DAY, PART, safeCount);
