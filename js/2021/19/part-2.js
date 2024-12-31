import { manhattan3D } from '../../utilities/math.js';
import { Transformation, loadScannersWithOverlapsCalculated, rotations } from './common.js';

export function part2({ lines }) {
  const scanners = loadScannersWithOverlapsCalculated(lines);
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

    for (const transformation of current.transformations) {
      scanner.location = transformation.apply(scanner.location);
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

  let maxDistance = -Infinity;

  for (const scanner1 of scanners) {
    for (const scanner2 of scanners) {
      if (scanner1 === scanner2) continue;
      maxDistance = Math.max(maxDistance, manhattan3D(scanner1.location, scanner2.location));
    }
  }

  return maxDistance;
}
