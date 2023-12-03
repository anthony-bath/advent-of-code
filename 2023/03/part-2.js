import { read, write } from '../../utilities/io.js';
import { getPositions } from './common.js';

const [YEAR, DAY, PART] = [2023, 3, 2];

const rows = read(YEAR, DAY, PART);
const H = rows.length;
const W = rows[0].length;

function isGear(x, y) {
  return y >= 0 && y < H && x >= 0 && x < W && rows[y][x] === '*';
}

function addPartToGear(x, y, part) {
  const key = `${x}|${y}`;

  if (!gears[key]) {
    gears[key] = [part];
  } else {
    gears[key].push(part);
  }
}

const partExpr = /\d+/g;
const gears = {};

for (let y = 0; y < rows.length; y++) {
  for (const match of rows[y].matchAll(partExpr)) {
    const len = match[0].length;
    const part = Number(match[0]);

    for (const [xPos, yPos] of getPositions(match.index, y, len)) {
      if (isGear(xPos, yPos)) {
        addPartToGear(xPos, yPos, part);
      }
    }
  }
}

const sum = Object.values(gears).reduce((sum, parts) => {
  if (parts.length === 2) {
    return sum + parts[0] * parts[1];
  }

  return sum;
}, 0);

write(YEAR, DAY, PART, sum);
