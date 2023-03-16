import { read, write } from '../../utilities/io.js';
import { execute } from './common.js';

const [YEAR, DAY, PART] = [2016, 23, 2];

const registers = new Map([
  ['a', 12],
  ['b', 0],
  ['c', 0],
  ['d', 0],
]);

const instructions = read(YEAR, DAY, PART).map((line) => line.split(' '));

instructions[4] = ['mul', 'b', 'd'];
instructions[5] = ['cpy', '0', 'c'];
instructions[6] = ['cpy', '0', 'd'];
instructions[7] = ['cpy', '0', '0'];
instructions[8] = ['cpy', '0', '0'];
instructions[9] = ['cpy', '0', '0'];

execute(instructions, registers);

write(YEAR, DAY, PART, registers.get('a'));
