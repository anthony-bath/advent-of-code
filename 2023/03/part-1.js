import { readOld, write } from '../../utilities/io.js';
import { getPositions } from './common.js';

const [YEAR, DAY, PART] = [2023, 3, 1];

const rows = readOld(YEAR, DAY, PART);
const H = rows.length;
const W = rows[0].length;

const partExpr = /\d+/g;
const symbol = /[^0-9\.]/;

function isSymbol(x, y) {
  return y >= 0 && y < H && x >= 0 && x < W && symbol.test(rows[y][x]);
}

let sum = 0;

for (let y = 0; y < rows.length; y++) {
  for (const match of rows[y].matchAll(partExpr)) {
    const len = match[0].length;

    for (const [xPos, yPos] of getPositions(match.index, y, len)) {
      if (isSymbol(xPos, yPos)) {
        sum += Number(match[0]);
        break;
      }
    }
  }
}

write(YEAR, DAY, PART, sum);
