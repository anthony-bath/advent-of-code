import { Point, manhattan } from '../../../utilities/math.js';
import { sum } from '../../../utilities/array.js';

export function part2({ lines }) {
  let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

  const points = lines.map((line) => {
    const [x, y] = line.split(', ').map((n) => Number(n));

    if (x < minX) {
      minX = x;
    } else if (x > maxX) {
      maxX = x;
    }

    if (y < minY) {
      minY = y;
    } else if (y > maxY) {
      maxY = y;
    }

    return new Point(x, y);
  });

  let area = 0;

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const current = new Point(x, y);
      const distance = sum(points.map((point) => manhattan(point, current)));

      if (distance < 10000) {
        area++;
      }
    }
  }

  return area;
}
