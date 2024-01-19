import { Transformation, loadScannersWithOverlapsCalculated, rotations } from './common.js';

export function part1({ lines }) {
  const scanners = loadScannersWithOverlapsCalculated(lines);
  const allBeacons = new Set();

  for (const beacon of scanners[0].relativeBeacons) {
    allBeacons.add(beacon.id);
  }

  const queue = [{ id: 0, transformations: [] }];
  const visited = {};

  while (queue.length) {
    const current = queue.shift();
    const key = `${current.id}`;

    if (key in visited) {
      continue;
    } else {
      visited[key] = true;
    }

    const scanner = scanners[current.id];

    if (current.transformations.length > 0) {
      let points = scanner.relativeBeacons.map((b) => ({ ...b }));

      for (const transformation of current.transformations) {
        const nextPoints = [];

        for (const point of points) {
          nextPoints.push(transformation.apply(point));
        }

        points = nextPoints;
      }

      for (const point of points) {
        allBeacons.add(`${point.x}|${point.y}|${point.z}`);
      }
    }

    for (const overlappingScannerId of Object.keys(scanner.matchedDistances)) {
      const overlappingBeacons = [...scanner.matchedDistances[overlappingScannerId]].map((p) => {
        const [x, y, z] = p.split('|').map((n) => Number(n));
        return { x, y, z };
      });

      const rotatedOverlappingBeacons = [
        ...scanners[overlappingScannerId].matchedDistances[current.id],
      ].map((p) => {
        const [x, y, z] = p.split('|').map((n) => Number(n));
        return rotations({ x, y, z });
      });

      const transformationCountsByKey = {};
      let transformation = null;

      for (let beacon = 0; beacon < 12; beacon++) {
        for (let rotation = 0; rotation < 24; rotation++) {
          const { x, y, z } = rotatedOverlappingBeacons[beacon][rotation];

          for (const beacon of overlappingBeacons) {
            const { x: x0, y: y0, z: z0 } = beacon;
            const transformationKey = `${x0 - x},${y0 - y},${z0 - z},${rotation}`;

            if (!(transformationKey in transformationCountsByKey)) {
              transformationCountsByKey[transformationKey] = 1;
            } else {
              transformationCountsByKey[transformationKey]++;
            }

            if (transformationCountsByKey[transformationKey] >= 3) {
              transformation = new Transformation(x0 - x, y0 - y, z0 - z, rotation);
              break;
            }
          }

          if (transformation) break;
        }

        if (transformation) break;
      }

      queue.push({
        id: overlappingScannerId,
        transformations: [transformation, ...current.transformations],
      });
    }
  }

  return allBeacons.size;
}
