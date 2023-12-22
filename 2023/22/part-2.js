import { read, write } from '../../utilities/io.js';
import { drop, getData } from './common.js';

const [YEAR, DAY, PART] = [2023, 22, 2];

let { bricks, space } = getData(read(YEAR, DAY, PART));

// Clone space to revert to after each brick is disintegrated
const clone = [...space.map((z) => z.map((y) => y.map((x) => x)))];

let fallCount = 0;

for (const brick1 of bricks) {
  // Disintegrate Brick
  brick1.updateSpace(space, '.');

  const movedBricks = new Set();

  for (const brick2 of bricks) {
    if (brick1 === brick2) continue;

    if (drop(brick2, space)) {
      movedBricks.add(brick2);
      brick2.reset();
    }
  }

  fallCount += movedBricks.size;
  space = [...clone.map((z) => z.map((y) => y.map((x) => x)))];
}

write(YEAR, DAY, PART, fallCount);
