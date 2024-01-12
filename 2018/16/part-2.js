import { commands } from './common.js';

export function part2({ lines }) {
  const possibles = Array.from({ length: 16 }).map(() => []);

  for (let row = 0; row <= 3256; row += 4) {
    const before = JSON.parse(lines[row].split(': ')[1]);
    const [op, A, B, C] = lines[row + 1].split(' ').map((n) => Number(n));
    const after = JSON.parse(lines[row + 2].split(': ')[1]);

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
