import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 3, 2];

const claims = [];

read(YEAR, DAY, PART).forEach((line) => {
  const [id, x, y, w, h] = line.match(/\d+/g).map((n) => Number(n));
  claims.push({ id, x1: x, y1: y, x2: x + w - 1, y2: y + h - 1 });
});

let result = null;

for (const claim1 of claims) {
  let overlapCount = 0;

  for (const claim2 of claims) {
    if (claim1.id === claim2.id) continue;

    if (
      claim1.x1 > claim2.x2 ||
      claim2.x1 > claim1.x2 ||
      claim1.y1 > claim2.y2 ||
      claim2.y1 > claim1.y2
    ) {
      // Does not overlap
      continue;
    } else {
      overlapCount++;
      break;
    }
  }

  if (overlapCount === 0) {
    result = claim1.id;
    break;
  }
}

write(YEAR, DAY, PART, result);