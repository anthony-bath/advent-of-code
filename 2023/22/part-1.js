import { canDrop, getInputElements } from './common.js';

export function part1({ lines }) {
  let { bricks, space } = getInputElements(lines);

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

  return canDistintegrateCount;
}
