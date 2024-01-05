import { readOld } from '../../utilities/io.js';

const [YEAR, DAY] = [2022, 12];

export function loadData(part) {
  let start;
  let end;
  const lowPoints = [];

  const grid = readOld(YEAR, DAY, part).map((line, rowIndex) => {
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

  const visited = [...Array(grid.length)].map((_) => Array(grid[0].length).fill(false));
  const cost = [...Array(grid.length)].map((_) => Array(grid[0].length).fill(Infinity));

  return { start, end, grid, visited, cost, lowPoints };
}

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

const STEP_COST = 1;

export function evaluate(yNext, xNext, args) {
  const { y, x, cost, queue } = args;

  cost[yNext][xNext] = Math.min(cost[yNext][xNext], cost[y][x] + STEP_COST);

  insertIntoSortedQueue(queue, {
    y: yNext,
    x: xNext,
    cost: cost[yNext][xNext],
  });
}
