import { pairs } from '../../utilities/array.js';
import { manhattan } from '../../utilities/math.js';
import { getBlankSpaceBetween, getInputElements } from './common.js';

export function part2({ lines }) {
  const { galaxies, emptyCols, emptyRows } = getInputElements(lines);

  return pairs(galaxies).reduce(
    (total, [g1, g2]) =>
      total + manhattan(g1, g2) + getBlankSpaceBetween(g1, g2, emptyCols, emptyRows, 1e6),
    0
  );
}
