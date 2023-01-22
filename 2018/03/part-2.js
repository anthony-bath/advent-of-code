import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 3, 2];

const claims = [];

read(YEAR, DAY, PART).forEach((line) => {
  const [id, x, y, w, h] = line.match(/\d+/g).map((n) => Number(n));
  claims.push({ id, x1: x, y1: y, x2: x + w - 1, y2: y + h - 1 });
});

let result = null;

for (const claim1 of claims) {
  let overlaps = false;

  for (const claim2 of claims) {
    if (claim1.id === claim2.id) continue;

    if (
      Math.max(claim1.x1, claim2.x1) < Math.min(claim1.x2, claim2.x2) &&
      Math.max(claim1.y2, claim2.y2) < Math.min(claim1.y1, claim2.y1)
    ) {
      overlaps = true;
      break;
    }
  }

  if (!overlaps) {
    result = claim1.id;
    break;
  }
}

write(YEAR, DAY, PART, result);
