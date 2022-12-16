import { read, output } from '../utility.js';

const digits = new RegExp(/-?\d+/g);

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

const beacons = new Set();

const sensors = read(15).map((line) => {
  const [sx, sy, bx, by] = line.match(digits).map((n) => parseInt(n));
  beacons.add(`${bx},${by}`);
  return new Sensor(sx, sy, bx, by);
});

sensors.sort((a, b) => a.left - b.left);

const RANGE = 4000000;
let foundX = [];
for (let y = 0; y <= RANGE; y++) {
  const ranges = sensors.reduce((ranges, sensor) => {
    if (y >= sensor.top && y <= sensor.bottom) {
      const yDiff = Math.abs(sensor.y - y);
      const start = Math.max(0, sensor.left + yDiff);
      const end = Math.min(RANGE, sensor.right - yDiff);
      //console.log(end);

      return [...ranges, { start, end }];
    } else {
      return ranges;
    }
  }, []);

  const filteredSortedRanges = ranges
    .sort((a, b) => a.start - b.start)
    .filter((range, index) => {
      if (index === 0) return range;

      return range.end > ranges[index - 1].end;
    });

  //console.log(filteredSortedRanges);

  let currentEnd = 0;
  for (const range of filteredSortedRanges) {
    if (currentEnd === 0) {
      currentEnd = range.end;
      continue;
    }

    if (range.end <= currentEnd) {
      continue;
    }

    if ((range.start <= currentEnd && range.end > currentEnd) || range.start - currentEnd === 1) {
      currentEnd = range.end;
    }

    if (range.start - currentEnd > 1) {
      foundX.push(currentEnd + 1);
      break;
    }
  }
}

console.log(foundX);

let foundY = [];

for (let x = 0; x <= RANGE; x++) {
  const ranges = sensors.reduce((ranges, sensor) => {
    if (x >= sensor.left && x <= sensor.right) {
      const xDiff = Math.abs(sensor.x - x);
      const start = Math.max(0, sensor.top + xDiff);
      const end = Math.min(RANGE, sensor.bottom - xDiff);

      return [...ranges, { start, end }];
    } else {
      return ranges;
    }
  }, []);

  const filteredSortedRanges = ranges
    .sort((a, b) => a.start - b.start)
    .filter((range, index) => {
      if (index === 0) return range;

      return range.end > ranges[index - 1].end;
    });

  let currentEnd = 0;
  for (const range of filteredSortedRanges) {
    if (currentEnd === 0) {
      currentEnd = range.end;
      continue;
    }

    if (range.end <= currentEnd) {
      continue;
    }

    if ((range.start <= currentEnd && range.end > currentEnd) || range.start - currentEnd === 1) {
      currentEnd = range.end;
    }

    if (range.start - currentEnd > 1) {
      foundY.push(currentEnd + 1);
      break;
    }
  }
}

console.log(foundY);

console.log(foundX[0] * 4000000 + foundY[0]);

//

// console.log(
//   sensors
//     .map((sensor) => `${sensor.left}-${sensor.right}\t${sensor.top}-${sensor.bottom}`)
//     .join('\n')
// );
