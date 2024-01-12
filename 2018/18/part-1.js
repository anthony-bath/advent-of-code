import { ACRE_TYPE, getAdjacents } from './common.js';

export function part1({ grid: land }) {
  const MINUTES = 10;

  for (let minute = 0; minute < MINUTES; minute++) {
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
            }
            break;

          case ACRE_TYPE.TREES:
            if (adjacents.filter((adj) => adj === ACRE_TYPE.LUMBERYARD).length >= 3) {
              toLumberyard.add([x, y]);
            }
            break;

          case ACRE_TYPE.LUMBERYARD:
            if (
              !adjacents.some((adj) => adj === ACRE_TYPE.LUMBERYARD) ||
              !adjacents.some((adj) => adj === ACRE_TYPE.TREES)
            ) {
              toOpen.add([x, y]);
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
  }

  let lumberyardCount = 0;
  let treeCount = 0;

  for (let y = 0; y < land.length; y++) {
    for (let x = 0; x < land[0].length; x++) {
      switch (land[y][x]) {
        case ACRE_TYPE.LUMBERYARD:
          lumberyardCount++;
          break;

        case ACRE_TYPE.TREES:
          treeCount++;
          break;
      }
    }
  }

  return lumberyardCount * treeCount;
}
