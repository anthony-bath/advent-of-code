import { output, readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 18, 1];

const maze = readOld(YEAR, DAY, PART).map((line) => line.split(''));

const W = maze[0].length;
const H = maze.length;

const keyExpr = /[a-z]/;
const doorExpr = /[A-Z]/;

const locationByKey = new Map();
const doorByLocation = new Map();
const keyValue = new Map();
const doorValue = new Map();
let origin;

maze.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (keyExpr.test(cell)) {
      keyValue.set(cell, Math.pow(2, cell.charCodeAt(0) - 97));
      locationByKey.set(cell, { x, y });
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

function bfs_distance(grid, { x, y }, collected) {
  const initialState = { x, y, steps: 0, required: 0, collected, path: [] };
  const queue = [initialState];

  const lookup = `${x}|${y}|${collected}`;
  const visited = { [lookup]: 1 };
  const distances = {};
  const startX = x;
  const startY = y;

  while (queue.length) {
    let { x, y, steps, required, collected, path } = queue.shift();

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

        // Is this a door?
        if (doorExpr.test(location)) {
          // Can I get through it with what keys I have at the moment?
          const door = doorValue.get(location);

          if (collected & door) {
            const nextRequired = required | door;

            queue.push({
              x: x + dx,
              y: y + dy,
              steps: steps + 1,
              required: nextRequired,
              collected,
              path: [...path, `${x + dx},${y + dy}`],
            });

            visited[lookup] = 1;
          } else {
            // Can't get through it, do nothing further at this time
          }

          continue;
        }

        // Is this a key?
        if (keyExpr.test(location)) {
          const nextCollected = collected | keyValue.get(location);
          const lookup = `${x + dx}|${y + dy}|${nextCollected}`;

          if (!visited[lookup]) {
            if (!distances[location] && (startX !== x + dx || startY !== y + dy)) {
              distances[location] = {
                steps: steps + 1,
                required,
                collected: nextCollected,
                path: [...path, `${x + dx},${y + dy}`],
              };
            }

            queue.push({
              x: x + dx,
              y: y + dy,
              steps: steps + 1,
              required,
              collected: nextCollected,
              path: [...path, `${x + dx},${y + dy}`],
            });

            visited[lookup] = 1;
          }

          continue;
        }

        // Must be walkable space
        queue.push({
          x: x + dx,
          y: y + dy,
          steps: steps + 1,
          required,
          collected,
          path: [...path, `${x + dx},${y + dy}`],
        });

        visited[lookup] = 1;
      }
    }
  }

  return distances;
}

const originDistances = bfs_distance(maze, origin, 0);
const keyDistances = new Map();

for (const [key, { x, y }] of locationByKey) {
  keyDistances.set(key, bfs_distance(maze, { x, y }, keyValue.get(key)));
}

// console.log(originDistances);
// console.log(bfs_distance(maze, locationByKey.get('a'), keyValue.get('a')));
// process.exit();

const allKeys = Math.pow(2, locationByKey.size) - 1;
// console.log(allKeys);

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

  for (const [key, { required, collected, steps }] of Object.entries(originDistances)) {
    if (required === 0) {
      const { x, y } = locationByKey.get(key);
      const nextState = { steps, key, collected, x, y, path: [key] };

      queue.push(nextState);
      //   insertIntoSortedQueue(queue, nextState);
      visited[`${x}|${y}|${collected}|steps`] = 1;
    }
  }

  while (queue.length) {
    const current = queue.shift();
    if (current.key === 'a') debugger;
    const distances = keyDistances.get(current.key);

    if (current.collected === allKeys) {
      if (current.steps < min) {
        min = current.steps;
      }

      continue;
    }

    for (const [key, { required, collected, steps }] of Object.entries(distances)) {
      const { x, y } = locationByKey.get(key);
      const nextCollected = current.collected | collected;
      const lookup = `${x}|${y}|${nextCollected}|${steps + 1}`;

      if ((required === 0 || (required & nextCollected) === required) && !visited[lookup]) {
        const nextState = {
          x,
          y,
          key,
          steps: current.steps + steps,
          collected: nextCollected,
          path: [...current.path, key],
        };
        queue.push(nextState);
        // insertIntoSortedQueue(queue, nextState);
        visited[lookup] = 1;
      }
    }

    // console.log(queue);
    // process.exit();
  }

  return min;
}

console.log(path());
