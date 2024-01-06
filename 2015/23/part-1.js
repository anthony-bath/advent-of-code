import { run } from './common.js';

export function part1({ lines }) {
  const instructions = lines.map((line) => line.replace(',', '').split(' '));
  return run(instructions, { a: 0, b: 0 }, 'b');
}
