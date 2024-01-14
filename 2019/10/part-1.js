import { Point, Line } from './common.js';

export function part1({ lines }) {
  const asteroids = [];

  lines.forEach((line, y) =>
    line.split('').forEach((cell, x) => {
      if (cell === '#') asteroids.push(new Point(x, y));
    })
  );

  let max = -Infinity;

  for (let i = 0; i < asteroids.length; i++) {
    const a1 = asteroids[i];
    let count = 0;

    for (let j = 0; j < asteroids.length; j++) {
      if (j === i) continue;
      if (asteroids.length - j + count < max) break;

      const line = new Line(a1, asteroids[j]);
      let hasLineOfSight = true;

      for (let k = 0; k < asteroids.length; k++) {
        if (k === i) continue;

        if (asteroids[k].isPartOfLine(line)) {
          hasLineOfSight = false;
          break;
        }
      }

      if (hasLineOfSight) {
        count++;
      }
    }

    if (count > max) {
      max = count;
    }
  }

  return max;
}
