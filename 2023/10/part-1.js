import { write } from '../../utilities/io.js';
import { loadData, walkLoop } from './common.js';

const [YEAR, DAY, PART] = [2023, 10, 1];

const { grid, start } = loadData(YEAR, DAY, PART);
const loop = walkLoop(grid, start);

write(YEAR, DAY, PART, loop.length / 2);
