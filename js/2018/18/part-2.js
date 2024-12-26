import { ACRE_TYPE, getAdjacents } from './common.js';

export function part2({ grid: land }) {
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

  const seen = new Map();
  const cache = new Map();
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
    }

    for (const [x, y] of toTrees) {
      land[y][x] = ACRE_TYPE.TREES;
    }

    for (const [x, y] of toLumberyard) {
      land[y][x] = ACRE_TYPE.LUMBERYARD;
    }

    openCount += toOpen.size;
    treeCount += toTrees.size;
    lumberyardCount += toLumberyard.size;

    cache.set(minute, lumberyardCount * treeCount);
    const key = `${treeCount}|${openCount}|${lumberyardCount}|${land[0].join('')}`;

    if (seen.has(key)) {
      cycleStart = seen.get(key);
      break;
    } else {
      seen.set(key, minute);
    }

    minute++;
  }

  const minsZeroIndexed = 1000000000 - 1;
  const cycleSize = minute - cycleStart;
  const leftoverMinutes = (minsZeroIndexed - minute) % cycleSize;

  return cache.get(cycleStart + leftoverMinutes);
}
