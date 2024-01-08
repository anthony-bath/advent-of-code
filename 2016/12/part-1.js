import { execute } from './common.js';

export function part1({ lines }) {
  const registers = new Map([
    ['a', 0],
    ['b', 0],
    ['c', 0],
    ['d', 0],
  ]);

  const instructions = lines.map((line) => line.split(' '));

  execute(instructions, registers);

  return registers.get('a');
}
