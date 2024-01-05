import { readOld, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 17, 2];

const program = readOld(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));
program[0] = 2;

const state = { pointer: 0, program: [...program], relativeBase: 0 };

function toASCIICommand(text) {
  return [...text.split('').map((c) => c.charCodeAt(0)), 10];
}

// Solved by hand specific to my input
const input = [
  ...toASCIICommand('A,B,A,C,A,B,C,A,B,C'),
  ...toASCIICommand('R,8,R,10,R,10'),
  ...toASCIICommand('R,4,R,8,R,10,R,12'),
  ...toASCIICommand('R,12,R,4,L,12,L,12'),
  ...toASCIICommand('n'),
];

let dust;

while (!state.halted) {
  const result = execute(state, input);
  if (result) dust = result;
}

write(YEAR, DAY, PART, dust);
