import { readOld, write } from '../../utilities/io.js';

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
let location;

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
      location = { x, y };
    }
  });
});

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function getCacheKey(state) {
  const {
    keys,
    location: { x, y },
  } = state;

  return `${keys}|${x}|${y}`;
}

const allKeys = Math.pow(2, keyByLocation.size) - 1;

function bfs(state) {
  const visited = {};
  const queue = [state];

  while (queue.length) {
    const current = queue.shift();
    const {
      location: { x, y },
      steps,
      keys,
    } = current;

    visited[getCacheKey(current)] = 1;

    if (keys === allKeys) {
      return steps;
    } else {
      console.log(steps);
    }

    for (const [dx, dy] of deltas) {
      const nextState = {
        ...current,
        steps: steps + 1,
        location: { x: x + dx, y: y + dy },
      };

      let nextCacheKey = getCacheKey(nextState);

      if (x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H && maze[y + dy][x + dx] !== '#') {
        const cell = maze[y + dy][x + dx];

        if (keyExpr.test(cell)) {
          nextState.keys |= keyValue.get(cell);

          nextCacheKey = getCacheKey(nextState);

          if (!visited[nextCacheKey]) {
            queue.push(nextState);
          }
        } else if (doorExpr.test(cell)) {
          nextState.doors |= doorValue.get(cell);

          if (nextState.keys & doorValue.get(cell)) {
            if (!visited[nextCacheKey]) {
              nextState.stepsSinceDoor = 0;
              queue.push(nextState);
            }
          }
        } else {
          if (!visited[nextCacheKey]) {
            queue.push(nextState);
          }
        }
      }
    }
  }
}

const state = {
  location,
  steps: 0,
  keys: 0,
  doors: 0,
  // maze: input.map((row) => [...row]),
};

write(YEAR, DAY, PART, bfs(state));
