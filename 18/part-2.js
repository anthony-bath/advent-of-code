import { read, write } from '../utility.js';

const lavaCache = {};
const waterCache = {};
const lavaCoordinates = [];
let [minX, minY, minZ] = [Infinity, Infinity, Infinity];
let [maxX, maxY, maxZ] = [-Infinity, -Infinity, -Infinity];

read(18).forEach((line) => {
  const [x, y, z] = line.split(',').map((n) => Number(n));
  lavaCoordinates.push([x, y, z]);
  lavaCache[`${x}-${y}-${z}`] = 1;

  if (x >= maxX) maxX = x + 1;
  if (x <= minX) minX = x - 1;
  if (y >= maxY) maxY = y + 1;
  if (y <= minY) minY = y - 1;
  if (z >= maxZ) maxZ = z + 1;
  if (z <= minZ) minZ = z - 1;
});

function inRange([x, y, z]) {
  return (
    x >= minX && x <= maxX && y >= minY && y <= maxY && z >= minZ && z <= maxZ
  );
}

function getKey([x, y, z]) {
  return `${x}-${y}-${z}`;
}

function getNeighbors([x, y, z]) {
  return [
    [x + 1, y, z],
    [x - 1, y, z],
    [x, y + 1, z],
    [x, y - 1, z],
    [x, y, z + 1],
    [x, y, z - 1],
  ];
}

function fill(origin) {
  const queue = [origin];

  while (queue.length) {
    const current = queue.shift();
    const neighbors = getNeighbors(current);

    neighbors.forEach((neighbor) => {
      const key = getKey(neighbor);

      if (!waterCache[key] && inRange(neighbor) && !lavaCache[key]) {
        waterCache[key] = 1;
        queue.push(neighbor);
      }
    });
  }
}

const getArea = ([x, y, z]) => {
  const keys = [
    `${x - 1}-${y}-${z}`,
    `${x + 1}-${y}-${z}`,
    `${x}-${y + 1}-${z}`,
    `${x}-${y - 1}-${z}`,
    `${x}-${y}-${z + 1}`,
    `${x}-${y}-${z - 1}`,
  ];

  return keys.reduce((count, key) => count + (waterCache[key] ? 1 : 0), 0);
};

fill([minX, minY, minZ]);

const surfaceArea = lavaCoordinates.reduce(
  (area, [x, y, z]) => area + getArea([x, y, z]),
  0
);

write(18, 1, `${surfaceArea}`);
