import { sum } from '../../utilities/array.js';
import { write } from '../../utilities/io.js';
import { getGrids, getReflectionValue } from './common.js';

const [YEAR, DAY, PART] = [2023, 13, 1];
const grids = getGrids(YEAR, DAY, PART);

write(YEAR, DAY, PART, sum(grids.map((g) => getReflectionValue(g, 0))));
