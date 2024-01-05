import { readOld, write } from '../../utilities/io.js';
import { commandsByName } from '../16/common.js';

const [YEAR, DAY, PART] = [2018, 19, 1];

let IP_REGISTER;
const instructions = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  if (line.startsWith('#')) {
    IP_REGISTER = Number(line.match(/\d+/));
  } else {
    const [command, A, B, C] = line.split(' ');
    instructions.push([command, Number(A), Number(B), Number(C)]);
  }
});

let registers = Array(6).fill(0);
let pointer = 0;

while (pointer < instructions.length) {
  registers[IP_REGISTER] = pointer;

  const [command, A, B, C] = instructions[pointer];
  registers = commandsByName.get(command)(registers, A, B, C);

  pointer = registers[IP_REGISTER] + 1;
}

write(YEAR, DAY, PART, registers[0]);
