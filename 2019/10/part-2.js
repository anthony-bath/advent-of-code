import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 10, 2];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.key = `${x}|${y}`;
  }

  isPartOfLine(line) {
    const { p1, p2 } = line;

    if (line.vertical) {
      return this.x === line.x || Math.abs(this.x - line.x) < 1e-10;
    } else {
      const diff = Math.abs(this.y - (line.m * this.x + line.b));
      return diff < 1e-10;
    }
  }

  distanceFrom(point) {
    return Math.sqrt(
      Math.pow(Math.abs(this.x - point.x), 2) + Math.pow(Math.abs(this.y - point.y), 2)
    );
  }
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;

    if (p1.x === p2.x || Math.abs(p1.x - p2.x) < 1e-10) {
      // Vertical Line
      this.vertical = true;
      this.x = p1.x;
    } else {
      this.m = (p2.y - p1.y) / (p2.x - p1.x);
      this.b = p1.y - this.m * p1.x;
    }
  }
}

const asteroids = new Map();

read(YEAR, DAY).forEach((line, y) =>
  line.split('').forEach((cell, x) => {
    if (cell === '#') {
      const p = new Point(x, y);
      asteroids.set(p.key, p);
    }
  })
);

function getSlope(angleDeg) {
  if (angleDeg === 90) {
    return Infinity;
  }
}

function degToRad(angleDeg) {
  return (angleDeg * Math.PI) / 180;
}

const origin = new Point(17, 22); // from Part 1
let angleDeg = 270;
const len = 50;

// while (angleDeg < 360) {
//   console.log(
//     `(${origin.x + len * Math.cos(degToRad(angleDeg))},${
//       origin.y - len * Math.sin(degToRad(angleDeg))
//     })`
//   );

//   angleDeg++;
// }

const blasted = [];

while (blasted.length < 200) {
  const end = new Point(
    origin.x + len * Math.cos(degToRad(angleDeg)),
    origin.y - len * Math.sin(degToRad(angleDeg))
  );

  const line = new Line(origin, end);

  const targeted = [];

  for (const asteroid of asteroids.values()) {
    if (asteroid.isPartOfLine(line)) {
      targeted.push({ asteroid, distance: asteroid.distanceFrom(origin) });
    }
  }

  if (targeted.length > 0) {
    const hit = targeted.shift().asteroid;

    blasted.push(hit);
    asteroids.delete(hit.key);
  }

  angleDeg = ++angleDeg % 360;
}

const last = blasted.pop();

write(YEAR, DAY, PART, last.x * 100 + last.y);
