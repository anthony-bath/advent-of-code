import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 15, 1];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const deltas = [
  [0, 1, 1],
  [0, -1, 2],
  [-1, 0, 3],
  [1, 0, 4],
];

let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

function updateBounds(x, y) {
  if (x > maxX) {
    maxX = x;
  } else if (x < minX) {
    minX = x;
  }

  if (y > maxY) {
    maxY = y;
  } else if (y < minY) {
    minY = y;
  }
}

function getMap(state) {
  const visited = new Map();
  visited.set(`${state.search.x}|${state.search.y}`, '.');

  const queue = [state];

  while (queue.length) {
    const current = queue.shift();
    const { x, y } = current.search;

    deltas.forEach(([dx, dy, command]) => {
      if (!visited.has(`${x + dx}|${y + dy}`)) {
        const key = `${x + dx}|${y + dy}`;
        const ic = { ...current.ic, program: [...current.ic.program] };
        const result = execute(ic, [command]);
        updateBounds(x + dx, y + dy);

        if (result === 2) {
          visited.set(key, 'O');
        } else if (result === 1) {
          visited.set(key, '.');

          queue.push({
            ...current,
            search: { x: x + dx, y: y + dy },
            ic,
          });
        } else {
          visited.set(key, '#');
        }
      }
    });
  }

  const map = [];

  for (let y = maxY; y >= minY; y--) {
    const row = [];
    for (let x = minX; x <= maxX; x++) {
      if (!visited.has(`${x}|${y}`)) {
        row.push(' ');
      } else {
        row.push(visited.get(`${x}|${y}`));
      }
    }

    map.push(row);
  }

  return map;
}

function findNormalizedOxygen(map) {
  let result;

  for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
      if (map[row][col] === 'O') {
        result = [col, row];
        break;
      }
    }

    if (result) break;
  }

  return result;
}

function floodFill(map, x, y, duration) {
  const times = [];

  for (const [dx, dy] of deltas) {
    if (
      x + dx < WIDTH &&
      x + dx >= 0 &&
      y + dy < HEIGHT &&
      y + dy >= 0 &&
      map[y + dy][x + dx] === '.'
    ) {
      map[y + dy][x + dx] = 'O';
      times.push(floodFill(map, x + dx, y + dy, duration + 1));
    }
  }

  return Math.max(...times, duration);
}

const state = {
  ic: { pointer: 0, program: [...program], relativeBase: 0 },
  search: { x: 0, y: 0 },
};

const map = getMap(state);

const WIDTH = map[0].length;
const HEIGHT = map.length;

const [x, y] = findNormalizedOxygen(map);
const result = floodFill(map, x, y, 0);

write(YEAR, DAY, PART, result);
