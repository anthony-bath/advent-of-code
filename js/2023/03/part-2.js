import { getPositions } from './common.js';

export function part2({ lines }) {
  const H = lines.length;
  const W = lines[0].length;

  function isGear(x, y) {
    return y >= 0 && y < H && x >= 0 && x < W && lines[y][x] === '*';
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

  for (let y = 0; y < lines.length; y++) {
    for (const match of lines[y].matchAll(partExpr)) {
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

  return sum;
}
