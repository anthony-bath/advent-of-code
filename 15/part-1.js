import { read, output } from '../utility.js';

const digits = new RegExp(/-?\d+/g);

class Sensor {
  constructor(x, y, bx, by) {
    this.x = x;
    this.y = y;
    this.range = Math.abs(x - bx) + Math.abs(y - by);
    this.top = y - this.range;
    this.bottom = y + this.range;
  }
}

const beacons = new Set();

const sensors = read(15).map((line) => {
  const [sx, sy, bx, by] = line.match(digits).map((n) => parseInt(n));
  beacons.add(`${bx},${by}`);
  return new Sensor(sx, sy, bx, by);
});

const targetY = 2000000;
const points = new Set();

sensors.forEach((sensor) => {
  const yDiff = Math.abs(sensor.y - targetY);
  const startX = sensor.x - sensor.range + yDiff;
  const endX = sensor.x + sensor.range - yDiff;

  for (let x = startX; x <= endX; x++) {
    if (!beacons.has(`${x},${targetY}`)) points.add(x);
  }
});

console.log(points.size);
