import { commandsByName } from '../16/common.js';

export function part1({ lines }) {
  let IP_REGISTER;
  const instructions = [];

  lines.forEach((line) => {
    if (line.startsWith('#')) {
      IP_REGISTER = Number(line.match(/\d+/));
    } else {
      const [command, A, B, C] = line.split(' ');
      instructions.push([command, Number(A), Number(B), Number(C)]);
    }
  });

  let registers = Array(6).fill(0);
  let pointer = 0;
  let result = null;

  while (pointer < instructions.length) {
    if (pointer === 30) {
      // Register 0 is only evaluated at instruction 30 for my input, and if it is
      // equal to Register 3, the program will halt.
      result = registers[3];
      break;
    }

    registers[IP_REGISTER] = pointer;

    const [command, A, B, C] = instructions[pointer];
    registers = commandsByName.get(command)(registers, A, B, C);

    pointer = registers[IP_REGISTER] + 1;
  }

  return result;
}
