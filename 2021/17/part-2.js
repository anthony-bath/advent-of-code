import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 17, 2];

const [[x1, x2], [y1, y2]] = read(YEAR, DAY, PART, { splitBy: null })
  .replace(/[^\.,-\d]/g, '')
  .split(',')
  .map((v) => v.split('..').map((n) => Number(n)));

function isWithinRange(x, y, xMin, xMax, yMin, yMax) {
  return x >= xMin && x <= xMax && y >= yMin && y <= yMax;
}

const xMaxVelocity = x2; // at t = 1, it would be at the right of the area
const xMinVelocity = Math.ceil((-1 + Math.sqrt(1 + 8 * x1)) / 2); // solving n(n+1)/2 === x1
const yMinVelocity = y1; // at t = 1, it would be at the bottom of the area
const yMaxVelocity = -y1 - 1;

const STEPS = 252; // max number of steps that can occur to reach the area (occurs with yMaxVelocity in y-direction)
const velocities = [];

for (let xVelocity = xMinVelocity; xVelocity <= xMaxVelocity; xVelocity++) {
  for (let yVelocity = yMinVelocity; yVelocity <= yMaxVelocity; yVelocity++) {
    let madeIt = false;
    let x = 0;
    let y = 0;
    let xV = xVelocity;
    let yV = yVelocity;

    for (let step = 0; step < STEPS; step++) {
      x += xV;
      y += yV;
      xV = Math.max(0, xV - 1);
      yV -= 1;

      if (isWithinRange(x, y, x1, x2, y1, y2)) {
        madeIt = true;
        break;
      }
    }

    if (madeIt) {
      velocities.push([xVelocity, yVelocity]);
    }
  }
}

write(YEAR, DAY, PART, velocities.length);
