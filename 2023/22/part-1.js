import { read, write } from '../../utilities/io.js';
import { canDrop, getData } from './common.js';

const [YEAR, DAY, PART] = [2023, 22, 1];

let { bricks, space } = getData(read(YEAR, DAY, PART));

let canDistintegrateCount = 0;

for (const brick1 of bricks) {
  let allowsMovement = false;

  // Temporarily Disintegrate Brick
  brick1.updateSpace(space, '.');

  for (const brick2 of bricks) {
    if (brick1 === brick2) {
      continue;
    }

    if (canDrop(brick2, space)) {
      allowsMovement = true;
      break;
    }
  }

  // Restore Brick
  brick1.updateSpace(space, '#');

  if (!allowsMovement) canDistintegrateCount++;
}

write(YEAR, DAY, PART, canDistintegrateCount);
