import { getJumpInstruction } from './common.js';

export function part2({ lines }) {
  const instructions = lines.map((instruction) => {
    const [operation, value] = instruction.split(' ');
    return [operation, Number(value)];
  });

  let accumulator = 0;
  let executed = new Set();
  let attempted = new Set();
  let modifiedInstruction = false;
  let nextInstructionBeforeIncrement = null;

  for (let i = 0; i < instructions.length; i++) {
    nextInstructionBeforeIncrement = null;

    if (executed.has(i)) {
      modifiedInstruction = false;
      i = 0;
      accumulator = 0;
      executed = new Set();
    }

    const [operation, value] = instructions[i];
    executed.add(i);

    switch (operation) {
      case 'nop':
        if (attempted.has(i) || modifiedInstruction) {
          continue;
        } else {
          attempted.add(i);
          modifiedInstruction = true;
          i = getJumpInstruction(i, value);
        }

        break;

      case 'acc':
        accumulator += value;
        break;

      case 'jmp':
        if (attempted.has(i) || modifiedInstruction) {
          i = getJumpInstruction(i, value);
        } else {
          attempted.add(i);
          modifiedInstruction = true;
          continue;
        }

        break;
    }
  }

  return accumulator;
}
