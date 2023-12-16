import { read, write } from '../../utilities/io.js';
import { DIR, evaluate } from './common.js';

const [YEAR, DAY, PART] = [2023, 16, 1];

const grid = read(YEAR, DAY, PART).map((line) => line.split(''));

write(YEAR, DAY, PART, evaluate([{ x: 0, y: 0, dir: DIR.RIGHT }], grid));
