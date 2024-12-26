import { commands } from './common.js';

export function part2({ lines }) {
  const possibles = Array.from({ length: 16 }, () => []);

  for (let row = 0; row <= 3256; row += 4) {
    const before = lines[row].match(/\d+/g).map(Number);
    const [op, A, B, C] = lines[row + 1].split(' ').map(Number);
    const after = lines[row + 2].match(/\d+/g).map(Number);

    for (const command of commands) {
      const result = command(before, A, B, C);

      if (result[C] === after[C]) {
        if (!possibles[op].includes(command)) {
          possibles[op].push(command);
        }
      }
    }
  }

  do {
    const onlyPossibles = possibles.filter((p) => p.length === 1).flat();

    for (let op = 0; op < possibles.length; op++) {
      if (possibles[op].length === 1) {
        continue;
      }

      possibles[op] = possibles[op].filter((p) => !onlyPossibles.includes(p));
    }
  } while (possibles.some((p) => p.length && p.length > 1));

  const ops = possibles.map((p) => p.shift());
  let registers = [0, 0, 0, 0];

  for (let row = 3262; row < lines.length; row++) {
    const [op, A, B, C] = lines[row].split(' ').map(Number);
    registers = ops[op](registers, A, B, C);
  }

  return registers[0];
}
