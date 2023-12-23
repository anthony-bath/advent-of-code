import { printGrid } from '../../../utilities/grid.js';
import { output, read, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 23, 2];

const grid = read(YEAR, DAY, PART, { test: true }).map((line) => line.split(''));
const W = grid[0].length;
const H = grid.length;

const deltas = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

function getPath([sx, sy], [ex, ey], visited, junctions) {
  const queue = [[sx, sy, []]];

  while (queue.length) {
    const [x, y, path] = queue.shift();

    const atJunction = junctions.find(([nx, ny]) => nx === x && ny === y);

    if (atJunction) {
      const [jx, jy] = atJunction;

      if (jx === ex && jy === ey) {
        return path;
      }
    }

    // if (x === ex && y === ey) {
    //   return path;
    // }

    for (const [dx, dy] of deltas) {
      const [nx, ny] = [x + dx, y + dy];
      const key = `${nx},${ny}`;

      if (ny < 0 || ny >= H || grid[ny][nx] === '#' || path.includes(key) || visited.has(key))
        continue;

      queue.push([nx, ny, [...path, key]]);
    }
  }

  console.log(`No Path Found from ${sx},${sy} to ${ex},${ey}`);
}

const junctions = [];

for (let y = 1; y < H - 1; y++) {
  for (let x = 1; x < W - 1; x++) {
    if (grid[y][x] === '.') {
      let count = 0;

      for (const [dx, dy] of deltas) {
        if (['v', '>'].includes(grid[y + dy][x + dx])) {
          count++;
        }
      }

      if (count >= 3) {
        junctions.push([x, y]);
      }
    }
  }
}

junctions.sort((a, b) => {
  if (a[0] === b[0]) {
    return a[0] - b[0];
  }

  return a[0] - b[0];
});

let direction = 'down';
const junctionsOrder = [junctions[0]];

while (junctionsOrder.length < junctions.length) {
  const prev = junctionsOrder[junctionsOrder.length - 1];

  if (direction === 'down') {
    const possibleNext = junctions.filter(([_, ny]) => ny > prev[1]).sort((a, b) => a[0] - b[0]);

    if (possibleNext.length > 0) {
      let i = 0;

      while (junctionsOrder.includes(possibleNext[i])) {
        i++;
      }

      if (i < possibleNext.length) {
        junctionsOrder.push(possibleNext[i]);
      }
    } else {
      direction = 'up';
    }
  } else {
    const possibleNext = junctions.filter(([_, ny]) => ny < prev[1]).sort((a, b) => b[1] - a[1]);

    if (possibleNext.length > 0) {
      let i = 0;

      while (junctionsOrder.includes(possibleNext[i])) {
        i++;
      }

      if (i < possibleNext.length) {
        junctionsOrder.push(possibleNext[i]);
      }
    } else {
      direction = 'down';
    }
  }
}

console.log(junctionsOrder);
// const testOrder = [
//   [1, 0],
//   [3, 5],
//   [5, 13],
//   [13, 19],
//   [13, 13],
//   [11, 3],
//   [21, 11],
//   [19, 19],
//   [W - 2, H - 1],
// ];

const testOrder = [
  [1, 0],
  [1, H - 2],
  [9, 3],
  [W - 4, 1],
  [W - 2, H - 1],
];

let distance = 0;
const visited = new Set();

for (let i = 0; i < testOrder.length - 1; i++) {
  const [sx, sy] = testOrder[i];
  const [ex, ey] = testOrder[i + 1];

  const path = getPath([sx, sy], [ex, ey], visited, testOrder);

  for (const key of path) {
    visited.add(key);
  }

  const outputGrid = grid.map((row) => row.map((cell) => cell));

  for (const entry of path) {
    const [x, y] = entry.split(',').map(Number);
    outputGrid[y][x] = 'O';
  }

  console.log(`Path from ${sx},${sy} to ${ex},${ey}`);
  console.log(printGrid(outputGrid));
  console.log();

  distance += path.length;
}

// distance += getPath(testOrder.pop(), [W - 2, H - 1], visited);

write(YEAR, DAY, PART, distance);

// 3271 - Too Low
