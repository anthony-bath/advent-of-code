import { flow, count, TYPE } from './common.js';

export function part2({ lines }) {
  const expr = /(x|y)=(?<n1>\d+), (x|y)=(?<n2>\d+)..(?<n3>\d+)/;

  let [yMin, yMax] = [Infinity, -Infinity];
  const grid = new Map();

  lines.forEach((line) => {
    const { n1, n2, n3 } = line.match(expr).groups;

    if (line.startsWith('y')) {
      const y = Number(n1);

      yMin = Math.min(yMin, y);
      yMax = Math.max(yMax, y);
    } else {
      yMin = Math.min(yMin, Number(n2));
      yMax = Math.max(yMax, Number(n3));
    }

    for (let n = Number(n2); n <= Number(n3); n++) {
      if (line.startsWith('x')) {
        grid.set(`${n1}|${n}`, TYPE.CLAY);
      } else {
        grid.set(`${n}|${n1}`, TYPE.CLAY);
      }
    }
  });

  flow({ x: 500, y: 0 }, { grid, yMin, yMax });

  return count([TYPE.WATER_AT_REST], grid);
}
