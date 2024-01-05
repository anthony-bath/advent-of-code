import { readOld, write } from '../../utilities/io.js';
import { execute } from './common.js';

const [YEAR, DAY, PART] = [2016, 12, 2];

const registers = new Map([
  ['a', 0],
  ['b', 0],
  ['c', 1],
  ['d', 0],
]);

const instructions = readOld(YEAR, DAY, PART).map((line) => line.split(' '));

execute(instructions, registers);

write(YEAR, DAY, PART, registers.get('a'));
