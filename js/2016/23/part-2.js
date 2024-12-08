import { execute } from './common.js';

export function part2({ lines }) {
  const registers = new Map([
    ['a', 12],
    ['b', 0],
    ['c', 0],
    ['d', 0],
  ]);

  const instructions = lines.map((line) => line.split(' '));

  instructions[4] = ['mul', 'b', 'd'];
  instructions[5] = ['cpy', '0', 'c'];
  instructions[6] = ['cpy', '0', 'd'];
  instructions[7] = ['cpy', '0', '0'];
  instructions[8] = ['cpy', '0', '0'];
  instructions[9] = ['cpy', '0', '0'];

  execute(instructions, registers);

  return registers.get('a');
}
