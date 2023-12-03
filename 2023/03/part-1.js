import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 3, 1];

const rows = read(YEAR, DAY, PART);

const H = rows.length;
const W = rows[0].length;

const partExpr = /\d+/g;
const symbol = /[^0-9\.]/;

function symbolAdjacent(x, y) {
  return y >= 0 && y < H && x.some((x) => x >= 0 && x < W && symbol.test(rows[y][x]));
}

function getDeltas(len) {
  return [
    [-1, 0],
    [-1, -1],
    [-1, 1],
    [len, 0],
    [len, -1],
    [len, 1],
  ];
}

let sum = 0;

for (let y = 0; y < rows.length; y++) {
  for (const match of rows[y].matchAll(partExpr)) {
    const part = Number(match[0]);
    const len = match[0].length;
    const x = match.index;

    const partIndexes = Array.from({ length: len }, (_, i) => i + x);

    if (symbolAdjacent(partIndexes, y - 1)) {
      sum += part;
      continue;
    }

    if (symbolAdjacent(partIndexes, y + 1)) {
      sum += part;
      continue;
    }

    for (const [dx, dy] of getDeltas(len)) {
      if (symbolAdjacent([x + dx], y + dy)) {
        sum += part;
        break;
      }
    }
  }
}

write(YEAR, DAY, PART, sum);
