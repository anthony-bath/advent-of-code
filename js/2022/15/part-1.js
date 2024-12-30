import { Sensor } from './common.js';

const { abs } = Math;

export function part1({ lines }) {
  const digits = new RegExp(/-?\d+/g);
  const SEARCH_Y = 2000000;

  const beacons = {};

  const sensors = lines.map((line) => {
    const [sx, sy, bx, by] = line.match(digits).map(Number);

    if (by === SEARCH_Y) {
      beacons[bx] = 1;
    }

    return new Sensor(sx, sy, bx, by);
  });

  let unavailableLocations = 0;
  let alreadyUnavailable = {};

  sensors.forEach((sensor) => {
    const yDiff = abs(sensor.y - SEARCH_Y);
    const startX = sensor.x - sensor.range + yDiff;
    const endX = sensor.x + sensor.range - yDiff;

    for (let x = startX; x <= endX; x++) {
      if (!beacons[x] && !alreadyUnavailable[x]) {
        alreadyUnavailable[x] = 1;
        unavailableLocations++;
      }
    }
  });

  return unavailableLocations;
}
