import { read, write } from '../../utilities/io.js';
import { commandsByName } from '../16/common.js';

const [YEAR, DAY, PART] = [2018, 21, 2];

let IP_REGISTER;
const instructions = [];

read(YEAR, DAY, PART).forEach((line) => {
  if (line.startsWith('#')) {
    IP_REGISTER = Number(line.match(/\d+/));
  } else {
    const [command, A, B, C] = line.split(' ');
    instructions.push([command, Number(A), Number(B), Number(C)]);
  }
});

let registers = Array(6).fill(0);
let pointer = 0;

const values = new Set();
let lastValue = null;

while (pointer < instructions.length) {
  if (pointer === 30) {
    // Register 0 is only evaluated at instruction 30 for my input, and if it is
    // equal to Register 3, the program will halt. These values repeat and so for
    // the most instructions to be executed, the answer is the final value before
    // it starts repeating.
    if (values.has(registers[3])) {
      break;
    } else {
      values.add(registers[3]);
      lastValue = registers[3];
    }
  }

  registers[IP_REGISTER] = pointer;

  const [command, A, B, C] = instructions[pointer];
  registers = commandsByName.get(command)(registers, A, B, C);

  pointer = registers[IP_REGISTER] + 1;
}

write(YEAR, DAY, PART, lastValue);
