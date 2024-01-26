import { tiltNorth, tiltWest, tiltSouth, tiltEast, calcLoad, getInputElements } from './common.js';

export function part2({ lines }) {
  const { xMax, yMax, blockersByColumn, blockersByRow, allStones } = getInputElements(lines);

  function getKey(load) {
    return `${allStones
      .sort((a, b) => {
        if (a.x === b.x) {
          return a.y - b.y;
        }

        return a.x - b.x;
      })
      .map((s) => `${s.x}|${s.y}`)
      .join(',')}-${load}`;
  }

  function cycle() {
    tiltNorth(allStones, xMax, blockersByColumn);
    tiltWest(allStones, yMax, blockersByRow);
    tiltSouth(allStones, xMax, yMax, blockersByColumn);
    tiltEast(allStones, xMax, yMax, blockersByRow);
  }

  const cache = {};
  const loadByCycle = [];

  let cycles = 0;
  let offset;
  let length;

  while (true) {
    cycles += 1;
    cycle();

    const load = calcLoad(allStones, yMax);
    const key = getKey(load);

    if (key in cache) {
      offset = cache[key];
      length = cycles - cache[key];
      break;
    } else {
      cache[key] = cycles;
      loadByCycle[cycles] = load;
    }
  }

  const remainingCycles = (1e9 - offset) % length;

  return loadByCycle[offset + remainingCycles];
}
