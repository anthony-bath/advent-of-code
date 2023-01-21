import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 18, 1];

const map = read(YEAR, DAY, PART, { test: true }).map((line) => line.split(''));

const W = map[0].length;
const H = map.length;

const keyExpr = /[a-z]/;
const doorExpr = /[A-Z]/;

const keyByLocation = new Map();
const doorByLocation = new Map();
let location;

map.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (keyExpr.test(cell)) {
      keyByLocation.set(`${x}|${y}`, cell);
    } else if (doorExpr.test(cell)) {
      doorByLocation.set(`${x}|${y}`, cell);
    } else if (cell === '@') {
      map[y][x] = '.';
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
    steps,
    keys,
    location: { x, y },
  } = state;

  // keys.sort();

  return `${JSON.stringify(keys)}|${x}|${y}`;
}

const allKeys = [...keyByLocation.values()];

function insertIntoSortedQueue(queue, state) {
  let low = 0;
  let high = queue.length;

  while (low < high) {
    let mid = (low + high) >>> 1;

    if (queue[mid].rank > state.rank) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  queue.splice(low, 0, state);
}

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

    if (allKeys.every((key) => keys.includes(key))) {
      return steps;
    }

    for (const [dx, dy] of deltas) {
      const nextState = {
        steps: steps + 1,
        location: { x: x + dx, y: y + dy },
        keys: [...keys],
      };

      let nextCacheKey = getCacheKey(nextState);

      if (x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H && map[y + dy][x + dx] !== '#') {
        const cell = map[y + dy][x + dx];

        if (keyExpr.test(cell)) {
          if (!nextState.keys.includes(cell)) {
            nextState.keys.push(cell);
            insertIntoSortedQueue(queue, { ...nextState, rank: 4 });
          }

          if (!visited[nextCacheKey]) {
            queue.push(nextState);
            insertIntoSortedQueue(queue, { ...nextState, rank: 2 });
          }
        } else if (doorExpr.test(cell)) {
          if (nextState.keys.includes(cell.toLowerCase())) {
            if (!visited[nextCacheKey]) {
              insertIntoSortedQueue(queue, { ...nextState, rank: 4 });
            }
          }
        } else {
          if (!visited[nextCacheKey]) {
            insertIntoSortedQueue(queue, { ...nextState, rank: 3 });
          }
        }
      }
    }
  }
}

const state = {
  location,
  steps: 0,
  keys: [],
  rank: 0,
};

// dfs(state);

write(YEAR, DAY, PART, bfs(state));
