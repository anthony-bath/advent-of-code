import { pairs } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 24, 1];

const hailstones = read(YEAR, DAY, PART).map((line) => line.match(/-?\d+/g).map(Number));
const combinations = pairs(hailstones);

const MIN_POS = 200000000000000;
const MAX_POS = 400000000000000;

let count = 0;

for (const [h1, h2] of combinations) {
  const [x1, y1, , vx1, vy1] = h1;
  const [x2, y2, , vx2, vy2] = h2;

  // y = mx + b
  const h1m = vy1 / vx1;
  const h1b = y1 - h1m * x1;
  const h2m = vy2 / vx2;
  const h2b = y2 - h2m * x2;

  // Find intersection of the two lines
  const x = (h2b - h1b) / (h1m - h2m);
  const y = h1m * x + h1b;

  // Check if intersection is within bounds
  if (x >= MIN_POS && x <= MAX_POS && y >= MIN_POS && y <= MAX_POS) {
    // Time  to reach intersection
    const h1t = (x - x1) / vx1;
    const h2t = (x - x2) / vx2;

    if (h1t >= 0 && h2t >= 0) {
      count++;
    }
  }
}

write(YEAR, DAY, PART, count);
