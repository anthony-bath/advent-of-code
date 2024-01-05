import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 24, 2];

const maze = [];
const targets = {};

readOld(YEAR, DAY, PART).forEach((line, y) => {
  const points = line.split('');

  for (const [x, point] of points.entries()) {
    if (/\d/.test(point)) {
      targets[point] = { x, y, value: point };
      points[x] = '.';
    }
  }

  maze.push(points);
});

const deltas = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

function getDistances({ x, y }, toPoints) {
  const distances = {};
  const visited = { [`${x}|${y}`]: 1 };
  const queue = [{ x, y, distance: 0 }];

  while (queue.length) {
    const current = queue.shift();
    const target = toPoints.find((p) => p.x === current.x && p.y === current.y);

    if (target) {
      distances[target.value] = current.distance;
    }

    for (const [dx, dy] of deltas) {
      const nextX = current.x + dx;
      const nextY = current.y + dy;
      const nextKey = `${nextX}|${nextY}`;

      if (maze[nextY][nextX] !== '.') continue;

      if (!visited[nextKey]) {
        queue.push({ x: nextX, y: nextY, distance: current.distance + 1 });
        visited[nextKey] = 1;
      }
    }
  }

  return distances;
}

const distances = {};

for (const [target, data] of Object.entries(targets)) {
  distances[target] = getDistances(
    data,
    Object.values(targets).filter((t) => t.value !== target)
  );
}

const state = { collected: 1, value: 0, distance: 0 };
const queue = [state];
let result = Infinity;
const allCollected = Math.pow(2, Object.keys(targets).length) - 1;

while (queue.length) {
  const current = queue.shift();

  if (current.collected === allCollected) {
    const finalDistance = current.distance + distances[current.value][0];

    if (finalDistance < result) {
      result = finalDistance;
    }
  }

  for (const [target, distance] of Object.entries(distances[current.value])) {
    const targetValue = Math.pow(2, Number(target));

    if (!(current.collected & targetValue)) {
      queue.push({
        collected: current.collected | targetValue,
        value: target,
        distance: current.distance + distance,
      });
    }
  }
}

write(YEAR, DAY, PART, result);
