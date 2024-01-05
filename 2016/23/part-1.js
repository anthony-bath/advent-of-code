import { readOld, write } from '../../utilities/io.js';
import { execute } from './common.js';

const [YEAR, DAY, PART] = [2016, 23, 1];

const registers = new Map([
  ['a', 7],
  ['b', 0],
  ['c', 0],
  ['d', 0],
]);

const instructions = readOld(YEAR, DAY, PART).map((line) => line.split(' '));

execute(instructions, registers);

write(YEAR, DAY, PART, registers.get('a'));
