import { readOld, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 23, 1];

const grid = readOld(YEAR, DAY, PART, { test: true }).map((line) => line.split(''));
const W = grid[0].length;
const H = grid.length;

const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function insertIntoSortedQueue(queue, state) {
  let low = 0;
  let high = queue.length;

  while (low < high) {
    let mid = (low + high) >>> 1;

    if (queue[mid][2] > state[2]) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  queue.splice(low, 0, state);
}

function nextStep(nx, ny, steps) {
  switch (grid[ny][nx]) {
    case '>':
      {
        const key = `${nx},${ny},1,0`;

        if (!visited.has(key)) {
          visited.add(key);
          insertIntoSortedQueue(queue, [nx, ny, steps + 1, 1, 0]);
        }
      }
      break;
    case 'v':
      {
        const key = `${nx},${ny},0,1`;

        if (!visited.has(key)) {
          visited.add(key);
          insertIntoSortedQueue(queue, [nx, ny, steps + 1, 0, 1]);
        }
      }
      break;
    default: {
      const key = `${nx},${ny},0,0`;

      if (!visited.has(key)) {
        visited.add(key);
        insertIntoSortedQueue(queue, [nx, ny, steps + 1, 0, 0]);
      }
    }
  }
}

const queue = [[1, 0, 0, 0, 0]];
const visited = new Set();
let max = -Infinity;

while (queue.length) {
  const [x, y, steps, snx, sny] = queue.shift();

  if (x === W - 2 && y === H - 1) {
    max = Math.max(max, steps);
  }

  if (snx && sny) {
    nextStep(x + snx, y + snx, steps);
  }

  for (const [dx, dy] of deltas) {
    const [nx, ny] = [x + dx, y + dy];

    if (nx < 0 || nx >= W || ny < 0 || ny >= H || grid[ny][nx] === '#') {
      continue;
    }

    nextStep(nx, ny, steps);
  }
}

write(YEAR, DAY, PART, max);
