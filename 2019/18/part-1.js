import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 18, 1];

const maze = read(YEAR, DAY, PART).map((line) => line.split(''));

const W = maze[0].length;
const H = maze.length;

const keyExpr = /[a-z]/;
const doorExpr = /[A-Z]/;

const keyByLocation = new Map();
const doorByLocation = new Map();
let location;

maze.forEach((row, y) => {
  row.forEach((cell, x) => {
    if (keyExpr.test(cell)) {
      keyByLocation.set(`${x}|${y}`, cell);
    } else if (doorExpr.test(cell)) {
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
    steps,
    keys,
    location: { x, y },
  } = state;

  return `${JSON.stringify(keys.sort())}|${x}|${y}`;
}

// const allKeys = [...keyByLocation.values()];

// function insertIntoSortedQueue(queue, state) {
//   let low = 0;
//   let high = queue.length;

//   while (low < high) {
//     let mid = (low + high) >>> 1;

//     if (queue[mid].rank > state.rank) {
//       low = mid + 1;
//     } else {
//       high = mid;
//     }
//   }

//   queue.splice(low, 0, state);
// }

function bfs(state) {
  const visited = {};
  const queue = [state];

  while (queue.length) {
    const current = queue.shift();
    const {
      location: { x, y },
      steps,
      keys,
      doors,
      stepsSinceKey,
      stepsSinceDoor,
      // maze,
    } = current;

    visited[getCacheKey(current)] = 1;

    if (keys.length === keyByLocation.size) {
      return steps;
    }

    // if (allKeys.every((key) => keys.includes(key))) {
    //   return steps;
    // }

    if (steps > 1000) {
      continue;
    }

    if (stepsSinceKey > 300 || (stepsSinceDoor > 300 && !(doors.length === doorByLocation.size))) {
      continue;
    }

    for (const [dx, dy] of deltas) {
      const nextState = {
        stepsSinceKey: stepsSinceKey + 1,
        stepsSinceDoor: stepsSinceDoor + 1,
        steps: steps + 1,
        location: { x: x + dx, y: y + dy },
        keys: [...keys],
        doors: [...doors],
        // maze: maze.map((row) => [...row]),
      };

      let nextCacheKey = getCacheKey(nextState);

      if (x + dx >= 0 && x + dx < W && y + dy >= 0 && y + dy < H && maze[y + dy][x + dx] !== '#') {
        const cell = maze[y + dy][x + dx];

        if (keyExpr.test(cell)) {
          if (!nextState.keys.includes(cell)) {
            nextState.keys.push(cell);
            nextState.stepsSinceKey = 0;
            // nextState.maze[y + dy][x + dx] = '.';
            nextCacheKey = getCacheKey(nextState);
            // insertIntoSortedQueue(queue, { ...nextState, rank: 4 });
          }

          if (!visited[nextCacheKey]) {
            // insertIntoSortedQueue(queue, { ...nextState, rank: 2 });
            queue.push(nextState);
          }
        } else if (doorExpr.test(cell)) {
          if (nextState.keys.includes(cell.toLowerCase())) {
            if (!visited[nextCacheKey]) {
              // insertIntoSortedQueue(queue, { ...nextState, rank: 4 });
              if (!nextState.doors.includes(cell)) {
                nextState.doors.push(cell);
                nextState.stepsSinceDoor = 0;
              }

              // nextState.maze[y + dy][x + dx] = '.';
              queue.push(nextState);
            }
          }
        } else {
          if (!visited[nextCacheKey]) {
            // insertIntoSortedQueue(queue, { ...nextState, rank: 3 });
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
  keys: [],
  doors: [],
  stepsSinceKey: 0,
  stepsSinceDoor: 0,
  // maze: input.map((row) => [...row]),
};

write(YEAR, DAY, PART, bfs(state));
