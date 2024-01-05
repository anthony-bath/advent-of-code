import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 24, 3];

const instructions = readOld(YEAR, DAY, PART);
const inputs = (62911941716111)
  .toString()
  .split('')
  .map((n) => Number(n));

const registers = new Map([
  ['w', 0],
  ['x', 0],
  ['y', 0],
  ['z', 0],
]);

let inputIndex = 0;

function getValue(val) {
  if (/[wxyz]/.test(val)) {
    return registers.get(val);
  }

  return Number(val);
}

for (const instruction of instructions) {
  const [command, arg1, arg2] = instruction.split(' ');

  switch (command) {
    case 'inp':
      registers.set('w', inputs[inputIndex]);
      inputIndex++;
      break;

    case 'mul':
      registers.set(arg1, getValue(arg1) * getValue(arg2));
      break;

    case 'add':
      registers.set(arg1, getValue(arg1) + getValue(arg2));
      break;

    case 'mod':
      registers.set(arg1, getValue(arg1) % getValue(arg2));
      break;

    case 'eql':
      const equal = getValue(arg1) === getValue(arg2);
      registers.set(arg1, equal ? 1 : 0);
      break;

    case 'div':
      registers.set(arg1, Math.floor(getValue(arg1) / getValue(arg2)));
      break;
  }
}

write(YEAR, DAY, registers.get('z'));
