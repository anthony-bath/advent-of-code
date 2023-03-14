import { read, write } from '../../utilities/io.js';
import { scramble } from './common.js';

const [YEAR, DAY, PART] = [2016, 21, 1];
const instructions = read(YEAR, DAY, PART);

write(YEAR, DAY, PART, scramble(instructions, 'abcdefgh'.split('')));
