import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 10, 2];

const particles = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  const [x, y, xv, yv] = line.match(/-?\d+/g).map((n) => Number(n));
  particles.push({ x, y, xv, yv });
});

let count = 0;

while (true) {
  let [minX, maxX, minY, maxY] = [Infinity, -Infinity, Infinity, -Infinity];

  particles.forEach((p) => {
    p.x += p.xv;
    p.y += p.yv;

    if (p.x < minX) {
      minX = p.x;
    } else if (p.x > maxX) {
      maxX = p.x;
    }

    if (p.y < minY) {
      minY = p.y;
    } else if (p.y > maxY) {
      maxY = p.y;
    }
  });

  count++;

  if (maxY - minY <= 10) {
    break;
  }
}

write(YEAR, DAY, PART, count);
