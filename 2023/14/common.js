import { readOld } from '../../utilities/io.js';

export function loadData(year, day, part) {
  let [yMax, xMax] = [-Infinity, -Infinity];
  const blockersByColumn = {};
  const blockersByRow = {};
  const allStones = [];

  readOld(year, day, part).forEach((line, y) => {
    const row = line.split('');

    for (let x = 0; x < line.length; x++) {
      if (row[x] === '#') {
        if (!blockersByColumn[x]) {
          blockersByColumn[x] = [];
        }

        if (!blockersByRow[y]) {
          blockersByRow[y] = [];
        }

        blockersByColumn[x].push(y);
        blockersByRow[y].push(x);
      } else if (row[x] === 'O') {
        allStones.push({ x, y });
      }
    }

    xMax = line.length;
    yMax = y + 1;
  });

  return { xMax, yMax, blockersByColumn, blockersByRow, allStones };
}

export function calcLoad(allStones, yMax) {
  return allStones.reduce((load, stone) => load + (yMax - stone.y), 0);
}

/**
 * @param {Array} allStones
 * @param {Number} xMax
 * @param {Object} blockersByColumn
 */
export function tiltNorth(allStones, xMax, blockersByColumn) {
  for (let x = 0; x < xMax; x++) {
    let stones = allStones.filter((s) => s.x === x).sort((s1, s2) => s1.y - s2.y);
    if (!stones.length) continue;

    for (const stone of stones) {
      if (stone.y === 0) {
        continue;
      }

      const blockersAbove = blockersByColumn[x]?.filter((by) => by < stone.y) ?? [];
      const stonesAbove = stones.filter((s) => s.y < stone.y).map((s) => s.y);
      const occupied = blockersAbove.concat(stonesAbove);

      stone.y = occupied.length ? 1 + Math.max(...occupied) : 0;
    }
  }
}

/**
 * @param {Array} allStones
 * @param {Number} yMax
 * @param {Object} blockersByRow
 */
export function tiltWest(allStones, yMax, blockersByRow) {
  for (let y = 0; y < yMax; y++) {
    let stones = allStones.filter((s) => s.y === y).sort((s1, s2) => s1.x - s2.x);
    if (!stones.length) continue;

    for (const stone of stones) {
      if (stone.x === 0) continue;

      const blockersLeft = blockersByRow[y]?.filter((bx) => bx < stone.x) ?? [];
      const stonesLeft = stones.filter((s) => s.x < stone.x).map((s) => s.x);
      const occupied = blockersLeft.concat(stonesLeft);

      stone.x = occupied.length ? 1 + Math.max(...occupied) : 0;
    }
  }
}

/**
 * @param {Array} allStones
 * @param {Number} xMax
 * @param {Number} yMax
 * @param {Object} blockersByColumn
 */
export function tiltSouth(allStones, xMax, yMax, blockersByColumn) {
  for (let x = 0; x < xMax; x++) {
    let stones = allStones.filter((s) => s.x === x).sort((s1, s2) => s2.y - s1.y);
    if (!stones.length) continue;

    for (const stone of stones) {
      if (stone.y === yMax - 1) continue;

      const blockersBelow = blockersByColumn[x]?.filter((by) => by > stone.y) ?? [];
      const stonesBelow = stones.filter((s) => s.y > stone.y).map((s) => s.y);
      const occupied = blockersBelow.concat(stonesBelow);

      stone.y = occupied.length ? Math.min(...occupied) - 1 : yMax - 1;
    }
  }
}

/**
 * @param {Array} allStones
 * @param {Number} xMax
 * @param {Number} yMax
 * @param {Object} blockersByRow
 */
export function tiltEast(allStones, xMax, yMax, blockersByRow) {
  for (let y = 0; y < yMax; y++) {
    let stones = allStones.filter((s) => s.y === y).sort((s1, s2) => s2.x - s1.x);
    if (!stones.length) continue;

    for (const stone of stones) {
      if (stone.x === xMax - 1) continue;

      const blockersRight = blockersByRow[y]?.filter((bx) => bx > stone.x) ?? [];
      const stonesRight = stones.filter((sx) => sx.x > stone.x);
      const occupied = blockersRight.concat(stonesRight.map((s) => s.x));

      stone.x = occupied.length ? Math.min(...occupied) - 1 : xMax - 1;
    }
  }
}
