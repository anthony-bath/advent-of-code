import { printGrid } from '../../utilities/grid.js';
import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 18, 1];

const land = readOld(YEAR, DAY, PART).map((line) => line.split(''));

const ACRE_TYPE = {
  OPEN: '.',
  TREES: '|',
  LUMBERYARD: '#',
};

function getAdjacents(x, y, grid) {
  const deltas = [
    [-1, -1],
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
  ];

  return deltas.map(([dx, dy]) => {
    const nextX = x + dx;
    const nextY = y + dy;

    if (nextX < 0 || nextX >= grid[0].length) {
      return null;
    }

    if (nextY < 0 || nextY >= grid.length) {
      return null;
    }

    return grid[nextY][nextX];
  });
}

let lumberyardCount = 0;
let treeCount = 0;
let openCount = 0;

for (let y = 0; y < land.length; y++) {
  for (let x = 0; x < land[0].length; x++) {
    switch (land[y][x]) {
      case ACRE_TYPE.LUMBERYARD:
        lumberyardCount++;
        break;

      case ACRE_TYPE.TREES:
        treeCount++;
        break;

      case ACRE_TYPE.OPEN:
        openCount++;
        break;
    }
  }
}

const seen = {};
const cache = {};
let minute = 0;
let cycleStart = 0;

while (true) {
  const toOpen = new Set();
  const toTrees = new Set();
  const toLumberyard = new Set();

  for (let y = 0; y < land.length; y++) {
    for (let x = 0; x < land[0].length; x++) {
      const acre = land[y][x];
      const adjacents = getAdjacents(x, y, land);

      switch (acre) {
        case ACRE_TYPE.OPEN:
          if (adjacents.filter((adj) => adj === ACRE_TYPE.TREES).length >= 3) {
            toTrees.add([x, y]);
            openCount--;
          }
          break;

        case ACRE_TYPE.TREES:
          if (adjacents.filter((adj) => adj === ACRE_TYPE.LUMBERYARD).length >= 3) {
            toLumberyard.add([x, y]);
            treeCount--;
          }
          break;

        case ACRE_TYPE.LUMBERYARD:
          if (
            !adjacents.some((adj) => adj === ACRE_TYPE.LUMBERYARD) ||
            !adjacents.some((adj) => adj === ACRE_TYPE.TREES)
          ) {
            toOpen.add([x, y]);
            lumberyardCount--;
          }
      }
    }
  }

  for (const [x, y] of toOpen) {
    land[y][x] = ACRE_TYPE.OPEN;
    openCount++;
  }

  for (const [x, y] of toTrees) {
    land[y][x] = ACRE_TYPE.TREES;
    treeCount++;
  }

  for (const [x, y] of toLumberyard) {
    land[y][x] = ACRE_TYPE.LUMBERYARD;
    lumberyardCount++;
  }

  cache[minute] = lumberyardCount * treeCount;
  const key = `${treeCount}|${openCount}|${lumberyardCount}|${land[0].join('')}`;

  if (seen[key]) {
    cycleStart = seen[key];
    break;
  } else {
    seen[key] = minute;
  }

  minute++;
}

const minsZeroIndexed = 1000000000 - 1;
const cycleSize = minute - cycleStart;
const leftoverMinutes = (minsZeroIndexed - minute) % cycleSize;

write(YEAR, DAY, PART, cache[cycleStart + leftoverMinutes]);
