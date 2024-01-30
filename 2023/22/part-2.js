import { drop, getInputElements } from './common.js';

export function part2({ lines }) {
  let { bricks, space } = getInputElements(lines);

  // Clone space to revert to after each brick is disintegrated
  const clone = [...space.map((z) => z.map((y) => y.map((x) => x)))];

  let fallCount = 0;

  for (const brick1 of bricks) {
    // Disintegrate Brick
    brick1.updateSpace(space, '.');

    for (const brick2 of bricks) {
      if (brick1 === brick2) continue;

      if (drop(brick2, space)) {
        fallCount++;
        brick2.reset();
      }
    }

    space = [...clone.map((z) => z.map((y) => y.map((x) => x)))];
  }

  return fallCount;
}
