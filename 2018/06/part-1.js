import { Point, manhattan } from '../../utilities/math.js';

export function part1({ lines }) {
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

  const areas = Array(points.length).fill(0);

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const current = new Point(x, y);

      let index = -1;
      let minDistance = Infinity;

      for (let i = 0; i < points.length; i++) {
        const distance = manhattan(current, points[i]);

        if (distance < minDistance) {
          index = i;
          minDistance = distance;
        } else if (distance === minDistance) {
          index = -1;
        }
      }

      if (index === -1) continue;

      if (x === minX || x === maxX || y === minY || y === maxY) {
        areas[index] = 0;
      } else {
        areas[index]++;
      }
    }
  }

  return Math.max(...areas);
}
