import { run } from './common.js';

export function part2({ lines }) {
  const instructions = lines.map((line) => line.replace(',', '').split(' '));
  return run(instructions, { a: 1, b: 0 }, 'b');
}
