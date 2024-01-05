import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 8, 1];

const instructions = readOld(YEAR, DAY, PART).map((instruction) => {
  const [operation, value] = instruction.split(' ');
  return [operation, operation === 'nop' ? 0 : Number(value)];
});

function getJumpInstruction(index, value) {
  if (index === 0) {
    return index - 1;
  }

  if (index > 0) {
    return index + value - 1;
  }

  return index - (Math.abs(value) + 1);
}

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

write(YEAR, DAY, PART, accumulator);
