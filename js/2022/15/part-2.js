import { filterAndSortRanges, findMissingWithinRanges, Sensor } from './common.js';

const { max, min, abs } = Math;

export function part2({ lines }) {
  const digits = new RegExp(/-?\d+/g);
  const SEARCH_RANGE = 4000000;

  const sensors = lines.map((line) => {
    const [sx, sy, bx, by] = line.match(digits).map((n) => parseInt(n));
    return new Sensor(sx, sy, bx, by);
  });

  let foundX;

  for (let y = 0; y <= SEARCH_RANGE; y++) {
    const ranges = sensors.reduce((ranges, sensor) => {
      if (y >= sensor.top && y <= sensor.bottom) {
        const yDiff = abs(sensor.y - y);
        const start = max(0, sensor.left + yDiff);
        const end = min(SEARCH_RANGE, sensor.right - yDiff);

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
      const xDiff = abs(sensor.x - foundX);
      const start = max(0, sensor.top + xDiff);
      const end = min(SEARCH_RANGE, sensor.bottom - xDiff);

      return [...ranges, { start, end }];
    }, []);

  const filteredSortedRanges = filterAndSortRanges(ranges);
  const foundY = findMissingWithinRanges(filteredSortedRanges);

  return foundX * 4000000 + foundY;
}
