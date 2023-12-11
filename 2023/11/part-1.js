import { pairs } from '../../utilities/array.js';
import { write } from '../../utilities/io.js';
import { manhattan } from '../../utilities/math.js';
import { getBlankSpaceBetween, loadData } from './common.js';

const [YEAR, DAY, PART] = [2023, 11, 1];
const { galaxies, emptyCols, emptyRows } = loadData(YEAR, DAY, PART);

write(
  YEAR,
  DAY,
  PART,
  pairs(galaxies).reduce(
    (total, [g1, g2]) =>
      total + manhattan(g1, g2) + getBlankSpaceBetween(g1, g2, emptyCols, emptyRows, 2),
    0
  )
);
