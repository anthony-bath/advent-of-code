import { read, write } from '../utility.js';

const digits = new RegExp(/-?\d+/g);
const SEARCH_Y = 2000000;

class Sensor {
  constructor(x, y, bx, by) {
    this.x = x;
    this.y = y;
    this.range = Math.abs(x - bx) + Math.abs(y - by);
    this.top = y - this.range;
    this.bottom = y + this.range;
  }
}

const beacons = {};

const sensors = read(15).map((line) => {
  const [sx, sy, bx, by] = line.match(digits).map((n) => parseInt(n));

  if (by === SEARCH_Y) {
    beacons[bx] = 1;
  }

  return new Sensor(sx, sy, bx, by);
});

let unavailableLocations = 0;
let alreadyUnavailable = {};

sensors.forEach((sensor) => {
  const yDiff = Math.abs(sensor.y - SEARCH_Y);
  const startX = sensor.x - sensor.range + yDiff;
  const endX = sensor.x + sensor.range - yDiff;

  for (let x = startX; x <= endX; x++) {
    if (!beacons[x] && !alreadyUnavailable[x]) {
      alreadyUnavailable[x] = 1;
      unavailableLocations++;
    }
  }
});

write(15, 1, `${unavailableLocations}`);
