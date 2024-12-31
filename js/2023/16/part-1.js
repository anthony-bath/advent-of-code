import { DIR, evaluate } from './common.js';

export function part1({ grid }) {
  return evaluate([{ x: 0, y: 0, dir: DIR.RIGHT }], grid);
}
