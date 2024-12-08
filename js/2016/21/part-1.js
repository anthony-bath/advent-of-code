import { scramble } from './common.js';

export function part1({ lines }) {
  return scramble(lines, 'abcdefgh'.split(''));
}
