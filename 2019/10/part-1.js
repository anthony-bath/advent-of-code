import { readOld, write } from '../../utilities/io.js';
import { Point, Line } from './common.js';

const [YEAR, DAY, PART] = [2019, 10, 1];

const asteroids = [];

readOld(YEAR, DAY, PART).forEach((line, y) =>
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
  }
});

write(YEAR, DAY, PART, max);
