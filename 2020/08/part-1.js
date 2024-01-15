import { getJumpInstruction } from './common.js';

export function part1({ lines }) {
  const instructions = lines.map((instruction) => {
    const [operation, value] = instruction.split(' ');
    return [operation, operation === 'nop' ? 0 : Number(value)];
  });

  let accumulator = 0;
  let executed = new Set();

  for (let i = 0; i < instructions.length; i++) {
    if (executed.has(i)) break;

    const [operation, value] = instructions[i];
    executed.add(i);

    if (operation === 'nop') continue;

    switch (operation) {
      case 'acc':
        accumulator += value;
        break;

      case 'jmp':
        i = getJumpInstruction(i, value);
    }
  }

  return accumulator;
}
