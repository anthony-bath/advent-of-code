import { read, write } from '../../utilities/io.js';
import { run } from './common.js';

const [YEAR, DAY, PART] = [2015, 23, 2];

const instructions = read(YEAR, DAY, PART).map((line) => line.replace(',', '').split(' '));

write(YEAR, DAY, PART, run(instructions, { a: 1, b: 0 }, 'b'));
