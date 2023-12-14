import { write } from '../../utilities/io.js';
import { tiltNorth, tiltWest, tiltSouth, tiltEast, calcLoad, loadData } from './common.js';

const [YEAR, DAY, PART] = [2023, 14, 2];

const { xMax, yMax, blockersByColumn, blockersByRow, allStones } = loadData(YEAR, DAY, PART);

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

write(YEAR, DAY, PART, loadByCycle[offset + remainingCycles]);
