import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 24, 1];

const grid = readOld(YEAR, DAY, PART).map((line) => line.split(''));
const SIZE = grid.length;

function getScore() {
  let score = 0;

  for (let row = 0; row < SIZE; row++) {
    for (let col = 0; col < SIZE; col++) {
      if (grid[row][col] === '#') {
        score += Math.pow(2, row * SIZE + col);
      }
    }
  }

  return score;
}

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const cache = {};
let result = null;

while (true) {
  const score = getScore();

  if (cache[score]) {
    result = score;
    break;
  } else {
    cache[score] = 1;
  }

  const births = new Set();
  const deaths = new Set();

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let adjacentBugs = 0;

      deltas.forEach(([dx, dy]) => {
        if (
          x + dx >= 0 &&
          x + dx < SIZE &&
          y + dy >= 0 &&
          y + dy < SIZE &&
          grid[y + dy][x + dx] === '#'
        ) {
          adjacentBugs += 1;
        }
      });

      if (grid[y][x] === '#' && adjacentBugs != 1) {
        deaths.add([x, y]);
      } else if (grid[y][x] === '.' && [1, 2].includes(adjacentBugs)) {
        births.add([x, y]);
      }
    }
  }

  for (const [x, y] of births) {
    grid[y][x] = '#';
  }

  for (const [x, y] of deaths) {
    grid[y][x] = '.';
  }
}

write(YEAR, DAY, PART, result);
