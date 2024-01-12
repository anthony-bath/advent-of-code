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

  const areasByPoint = new Map();

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      const current = new Point(x, y);

      const distances = points
        .map((point) => ({ point, distance: manhattan(current, point) }))
        .sort((a, b) => a.distance - b.distance);

      const { point, distance } = distances[0];
      const equiDistantCount = distances.filter((d) => d.distance === distance).length;

      if (equiDistantCount === 1) {
        if (!areasByPoint.has(point)) {
          areasByPoint.set(point, 1);
        } else {
          areasByPoint.set(point, areasByPoint.get(point) + 1);
        }
      }
    }
  }

  return Math.max(...areasByPoint.values());
}
