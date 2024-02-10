import { commands } from './common.js';

export function part1({ lines }) {
  let result = 0;

  for (let row = 0; row <= 3256; row += 4) {
    const before = lines[row].match(/\d+/g).map(Number);
    const [, A, B, C] = lines[row + 1].split(' ').map(Number);
    const after = lines[row + 2].match(/\d+/g).map(Number);

    let count = 0;

    for (const command of commands) {
      const result = command(before, A, B, C);

      if (result[C] === after[C]) {
        count++;
      }
    }

    if (count >= 3) {
      result++;
    }
  }

  return result;
}
