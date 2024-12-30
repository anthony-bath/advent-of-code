import { getNeighbors, getKey } from './common.js';

export function part1({ lines }) {
  const lavaCache = {};
  const lavaCoordinates = [];

  lines.forEach((line) => {
    const [x, y, z] = line.split(',').map((n) => Number(n));
    lavaCoordinates.push([x, y, z]);
    lavaCache[`${x}-${y}-${z}`] = 1;
  });

  const countFromCache = (x, y, z) => {
    return getNeighbors([x, y, z])
      .map(getKey)
      .reduce((count, key) => count + (lavaCache[key] ? 0 : 1), 0);
  };

  const surfaceArea = lavaCoordinates.reduce(
    (area, [x, y, z]) => area + countFromCache(x, y, z),
    0
  );

  return surfaceArea;
}
