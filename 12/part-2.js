import { read } from '../utility.js';
import fs from 'fs';

let start;
let end;

const lowPoints = [];

const grid = read(12).map((line, rowIndex) => {
  const row = line.split('');
  const startX = row.indexOf('S');

  if (startX !== -1) {
    start = { x: startX, y: rowIndex };
    row[startX] = 'a';
  }

  const endX = row.indexOf('E');

  if (endX !== -1) {
    end = { x: endX, y: rowIndex };
    row[endX] = 'z';
  }

  const rowWithHeights = row.map((letter, column) => {
    if (letter === 'a') {
      lowPoints.push({ x: column, y: rowIndex });
    }

    return letter.charCodeAt(0) - 97;
  });

  return rowWithHeights;
});

console.log(lowPoints.length);

const visited = [...Array(grid.length)].map((_) => Array(grid[0].length).fill(false));
const cost = [...Array(grid.length)].map((_) => Array(grid[0].length).fill(Infinity));

cost[end.y][end.x] = 0;

const queue = [{ x: end.x, y: end.y, cost: 0 }];

const cols = grid[0].length;
const rows = grid.length;

while (queue.length) {
  const { y, x } = queue.pop();

  if (visited[y][x]) {
    continue;
  } else {
    visited[y][x] = true;
  }

  const args = { y, x, cost, grid, queue };

  x > 0 &&
    !visited[y][x - 1] &&
    (grid[y][x - 1] >= grid[y][x] || grid[y][x] - grid[y][x - 1] === 1) &&
    evaluate(y, x - 1, args);

  x < cols - 1 &&
    !visited[y][x + 1] &&
    (grid[y][x + 1] >= grid[y][x] || grid[y][x] - grid[y][x + 1] === 1) &&
    evaluate(y, x + 1, args);

  y < rows - 1 &&
    !visited[y + 1][x] &&
    (grid[y + 1][x] >= grid[y][x] || grid[y][x] - grid[y + 1][x] === 1) &&
    evaluate(y + 1, x, args);

  y > 0 &&
    !visited[y - 1][x] &&
    (grid[y - 1][x] >= grid[y][x] || grid[y][x] - grid[y - 1][x] === 1) &&
    evaluate(y - 1, x, args);
}

console.log(Math.min(...lowPoints.map(({ x, y }) => cost[y][x])));

function insertIntoSortedQueue(queue, node) {
  let low = 0;
  let high = queue.length;

  while (low < high) {
    let mid = (low + high) >>> 1;

    if (queue[mid].cost > node.cost) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  queue.splice(low, 0, node);
}

function evaluate(yNext, xNext, args) {
  const { y, x, cost, grid, queue } = args;

  cost[yNext][xNext] = Math.min(cost[yNext][xNext], cost[y][x] + 1);

  insertIntoSortedQueue(queue, {
    y: yNext,
    x: xNext,
    cost: cost[yNext][xNext],
  });
}
