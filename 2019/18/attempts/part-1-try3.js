import { output, readOld, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 18, 1];

const maze = readOld(YEAR, DAY, PART, { test: true }).map((line) => line.split(''));

const W = maze[0].length;
const H = maze.length;

const keyExpr = /[a-z]/;
const doorExpr = /[A-Z]/;

const keyByLocation = new Map();
const doorByLocation = new Map();
const keyValue = new Map();
const doorValue = new Map();
let origin;

maze.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (keyExpr.test(cell)) {
      keyValue.set(cell, Math.pow(2, cell.charCodeAt(0) - 97));
      keyByLocation.set(`${x}|${y}`, cell);
    } else if (doorExpr.test(cell)) {
      doorValue.set(cell, Math.pow(2, cell.toLowerCase().charCodeAt(0) - 97));
      doorByLocation.set(`${x}|${y}`, cell);
    } else if (cell === '@') {
      maze[y][x] = '.';
      origin = { x, y };
    }
  });
});

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs_distance(grid, { x, y }) {
  const collected = keyByLocation.has(`${x}|${y}`)
    ? keyValue.get(keyByLocation.get(`${x}|${y}`))
    : 0;

  const queue = [
    {
      x,
      y,
      steps: 0,
      doors: 0,
      required: 0,
      collected,
    },
  ];

  const lookup = `${x}|${y}|${collected}`;
  const visited = { [lookup]: 1 };
  const distances = {};

  while (queue.length) {
    let { x, y, steps, required, collected } = queue.shift();

    for (const [dx, dy] of deltas) {
      const lookup = `${x + dx}|${y + dy}|${collected}`;

      if (
        x + dx >= 0 &&
        x + dx < W &&
        y + dy >= 0 &&
        y + dy < H &&
        grid[y + dy][x + dx] !== '#' &&
        !visited[lookup]
      ) {
        const location = grid[y + dy][x + dx];

        if (doorExpr.test(location) && collected & doorValue.get(location)) {
          required |= doorValue.get(location);
          queue.push({ x: x + dx, y: y + dy, steps: steps + 1, required, collected });
        } else if (keyExpr.test(location)) {
          collected |= keyValue.get(location);

          const lookup = `${x + dx}|${y + dy}|${collected}`;

          if (!distances[lookup]) {
            distances[lookup] = {
              steps: steps + 1,
              required,
              collected,
              key: location,
            };
          }

          queue.push({ x: x + dx, y: y + dy, steps: steps + 1, required, collected });
        } else if (location === '.') {
          queue.push({ x: x + dx, y: y + dy, steps: steps + 1, required, collected });
        }

        visited[lookup] = 1;
      }
    }
  }

  return distances;
}

const originDistances = bfs_distance(maze, origin);

const keyDistances = new Map();

for (const [location, key] of keyByLocation) {
  const [x, y] = location.split('|').map((n) => Number(n));
  keyDistances.set(key, bfs_distance(maze, { x, y }));
}

const allKeys = Math.pow(2, keyByLocation.size) - 1;

function insertIntoSortedQueue(queue, state) {
  let low = 0;
  let high = queue.length;

  while (low < high) {
    let mid = (low + high) >>> 1;

    if (queue[mid].steps < state.steps) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  queue.splice(low, 0, state);
}

function path() {
  const queue = [];
  const visited = {};
  let min = Infinity;

  for (const [location, { required, collected, steps, key }] of Object.entries(originDistances)) {
    if (
      required === 0 &&
      Object.values(keyDistances.get(key)).some(
        (keyData) => (keyData.required & collected) === keyData.required
      )
    ) {
      const [x, y] = location.split('|').map((n) => Number(n));
      const nextState = { steps, key, collected, x, y };
      //   queue.push({ steps, key, collected, x, y });
      insertIntoSortedQueue(queue, nextState);
      visited[`${x}|${y}|${collected}`] = 1;
    }
  }

  while (queue.length) {
    const current = queue.shift();
    const distances = keyDistances.get(current.key);

    if (current.collected === allKeys) {
      return current.steps;
    }

    // console.log(`At ${current.key} having taken ${current.steps} steps.`);

    for (const [location, { required, collected, steps, key }] of Object.entries(distances)) {
      const nextCollected = current.collected | collected;
      const cacheKey = `${location}|${nextCollected}`;

      if (
        (required & current.collected) === required &&
        !(current.collected & keyValue.get(key)) &&
        !visited[cacheKey]
      ) {
        // console.log(` Considering ${key}  Required: ${required}  Collected: ${current.collected}`);
        const [x, y] = location.split('|').map((n) => Number(n));
        const nextState = {
          steps: current.steps + steps,
          key,
          collected: nextCollected,
          x,
          y,
        };

        insertIntoSortedQueue(queue, nextState);

        visited[cacheKey] = 1;
      }
    }
  }

  return min;
}

console.log(path());
