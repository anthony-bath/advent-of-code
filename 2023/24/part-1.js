import { pairs } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 24, 1];

const hailstones = read(YEAR, DAY, PART).map((line) => {
  return line.match(/-?\d+/g).map(Number);
});

const combinations = pairs(hailstones);

const MIN_POS = 200000000000000;
const MAX_POS = 400000000000000;

let count = 0;

for (const [h1, h2] of combinations) {
  const [x1, y1, z1, vx1, vy1, vz1] = h1;
  const [x2, y2, z2, vx2, vy2, vz2] = h2;

  const h1p2 = [x1 + vx1, y1 + vy1, z1 + vz1];
  const h2p2 = [x2 + vx2, y2 + vy2, z2 + vz2];

  const [x1p2, y1p2, z1p2] = h1p2;
  const [x2p2, y2p2, z2p2] = h2p2;

  // y = mx + b
  const h1m = (y1p2 - y1) / (x1p2 - x1);
  const h1b = y1 - h1m * x1;
  const h2m = (y2p2 - y2) / (x2p2 - x2);
  const h2b = y2 - h2m * x2;

  // Find intersection of two lines
  const x = (h2b - h1b) / (h1m - h2m);
  const y = h1m * x + h1b;

  // Check if intersection is within bounds
  if (x >= MIN_POS && x <= MAX_POS && y >= MIN_POS && y <= MAX_POS) {
    // Time  to reach intersection
    const h1t = (x - x1) / vx1;
    const h2t = (x - x2) / vx2;

    console.log(h1t, h2t);

    if (h1t >= 0 && h2t >= 0) {
      count++;
    }
  }
}

write(YEAR, DAY, PART, count);
