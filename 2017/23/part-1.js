import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 23, 1];

const instructions = read(YEAR, DAY, PART).map((line) => line.split(' '));

const registers = new Map();

function getValue(arg) {
  if (/[a-z]/.test(arg)) {
    if (!registers.has(arg)) {
      registers.set(arg, 0);
    }

    return registers.get(arg);
  }

  return Number(arg);
}

let pointer = 0;
let count = 0;

while (true) {
  const [command, arg1, arg2] = instructions[pointer];

  switch (command) {
    case 'set':
      {
        registers.set(arg1, getValue(arg2));
        pointer++;
      }
      break;

    case 'sub':
      {
        registers.set(arg1, getValue(arg1) - getValue(arg2));
        pointer++;
      }
      break;

    case 'mul':
      {
        registers.set(arg1, getValue(arg1) * getValue(arg2));
        count++;
        pointer++;
      }
      break;

    case 'jnz':
      {
        if (getValue(arg1) !== 0) {
          pointer += getValue(arg2);
        } else {
          pointer++;
        }
      }
      break;
  }

  if (pointer >= instructions.length) {
    break;
  }
}

write(YEAR, DAY, PART, count);
