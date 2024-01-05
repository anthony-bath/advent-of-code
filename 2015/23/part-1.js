import { readOld, write } from '../../utilities/io.js';
import { run } from './common.js';

const [YEAR, DAY, PART] = [2015, 23, 1];

const instructions = readOld(YEAR, DAY, PART).map((line) => line.replace(',', '').split(' '));

write(YEAR, DAY, PART, run(instructions, { a: 0, b: 0 }, 'b'));
