import { printTextGrid } from '../../utilities/grid.js';
import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 10, 1];

const particles = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  const [x, y, xv, yv] = line.match(/-?\d+/g).map((n) => Number(n));
  particles.push({ x, y, xv, yv });
});

let result;

while (true) {
  let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

  particles.forEach((p) => {
    p.x += p.xv;
    p.y += p.yv;

    if (p.x < minX) {
      minX = p.x;
    } else if (p.x > maxX) {
      maxX = p.x;
    }

    if (p.y < minY) {
      minY = p.y;
    } else if (p.y > maxY) {
      maxY = p.y;
    }
  });

  if (maxY - minY <= 10) {
    const grid = [];

    for (let y = minY; y <= maxY; y++) {
      const row = [];
      for (let x = minX; x <= maxX; x++) {
        if (particles.find((p) => p.x === x && p.y === y)) {
          row.push('#');
        } else {
          row.push('.');
        }
      }

      grid.push(row);
    }

    result = printTextGrid(grid, '#');
    break;
  }
}

write(YEAR, DAY, PART, result);
