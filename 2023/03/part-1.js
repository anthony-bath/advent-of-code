import { getPositions } from './common.js';

export function part1({ lines }) {
  const H = lines.length;
  const W = lines[0].length;

  const partExpr = /\d+/g;
  const symbol = /[^0-9\.]/;

  function isSymbol(x, y) {
    return y >= 0 && y < H && x >= 0 && x < W && symbol.test(lines[y][x]);
  }

  let sum = 0;

  for (let y = 0; y < lines.length; y++) {
    for (const match of lines[y].matchAll(partExpr)) {
      const len = match[0].length;

      for (const [xPos, yPos] of getPositions(match.index, y, len)) {
        if (isSymbol(xPos, yPos)) {
          sum += Number(match[0]);
          break;
        }
      }
    }
  }

  return sum;
}
