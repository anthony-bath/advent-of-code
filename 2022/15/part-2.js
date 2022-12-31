import { read, write } from '../../utility.js';
import { filterAndSortRanges, findMissingWithinRanges } from './common.js';

const [YEAR, DAY, PART] = [2022, 15, 2];

const digits = new RegExp(/-?\d+/g);
const SEARCH_RANGE = 4000000;

class Sensor {
  constructor(x, y, bx, by) {
    this.x = x;
    this.y = y;
    this.range = Math.abs(x - bx) + Math.abs(y - by);
    this.top = y - this.range;
    this.bottom = y + this.range;
    this.left = x - this.range;
    this.right = x + this.range;
  }
}

const sensors = read(YEAR, DAY).map((line) => {
  const [sx, sy, bx, by] = line.match(digits).map((n) => parseInt(n));
  return new Sensor(sx, sy, bx, by);
});

let foundX;

for (let y = 0; y <= SEARCH_RANGE; y++) {
  const ranges = sensors.reduce((ranges, sensor) => {
    if (y >= sensor.top && y <= sensor.bottom) {
      const yDiff = Math.abs(sensor.y - y);
      const start = Math.max(0, sensor.left + yDiff);
      const end = Math.min(SEARCH_RANGE, sensor.right - yDiff);

      return [...ranges, { start, end }];
    } else {
      return ranges;
    }
  }, []);

  const filteredSortedRanges = filterAndSortRanges(ranges);
  const result = findMissingWithinRanges(filteredSortedRanges);

  if (result) {
    foundX = result;
    break;
  }
}

const ranges = sensors
  .filter((sensor) => sensor.left <= foundX && sensor.right >= foundX)
  .reduce((ranges, sensor) => {
    const xDiff = Math.abs(sensor.x - foundX);
    const start = Math.max(0, sensor.top + xDiff);
    const end = Math.min(SEARCH_RANGE, sensor.bottom - xDiff);

    return [...ranges, { start, end }];
  }, []);

const filteredSortedRanges = filterAndSortRanges(ranges);
const foundY = findMissingWithinRanges(filteredSortedRanges);

write(YEAR, DAY, PART, foundX * 4000000 + foundY);
