import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 10, 1];

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.key = `${x}|${y}`;
  }

  isPartOfLine(line) {
    const { p1, p2 } = line;

    if (line.vertical) {
      return this.x === line.x && this.y > Math.min(p1.y, p2.y) && this.y < Math.max(p1.y, p2.y);
    } else {
      const diff = Math.abs(this.y - (line.m * this.x + line.b));
      return diff < 1e-10 && this.x > Math.min(p1.x, p2.x) && this.x < Math.max(p1.x, p2.x);
    }
  }
}

class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;

    if (p1.x === p2.x) {
      // Vertical Line
      this.vertical = true;
      this.x = p1.x;
    } else {
      this.m = (p2.y - p1.y) / (p2.x - p1.x);
      this.b = p1.y - this.m * p1.x;
    }
  }
}

const asteroids = [];

read(YEAR, DAY).forEach((line, y) =>
  line.split('').forEach((cell, x) => {
    if (cell === '#') asteroids.push(new Point(x, y));
  })
);

let max = -Infinity;

asteroids.forEach((a1) => {
  let count = 0;

  asteroids.forEach((a2) => {
    if (a1.key === a2.key) return;

    const line = new Line(a1, a2);
    let hasLineOfSight = true;

    for (const a3 of asteroids) {
      if ([a1.key, a2.key].includes(a3.key)) continue;

      if (a3.isPartOfLine(line)) {
        hasLineOfSight = false;
        break;
      }
    }

    if (hasLineOfSight) {
      count++;
    }
  });

  if (count > max) {
    max = count;
    console.log(a1.key, count);
  }
});

write(YEAR, DAY, PART, max);
