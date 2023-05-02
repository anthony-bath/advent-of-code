import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 21, 1];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

function toASCIICommand(text) {
  return [...text.split('').map((c) => c.charCodeAt(0)), 10];
}

const state = { pointer: 0, program: [...program], relativeBase: 0 };

const output = [];
const commands = ['NOT A J', 'NOT B T', 'AND D T', 'OR T J', 'WALK'];
// const commands = ['OR D J', 'WALK'];
const input = commands.map((command) => toASCIICommand(command)).flat();

while (!state.halted) {
  const result = execute(state, input);
  if (!result) break;

  output.push(result);
}

console.log(output.map((c) => String.fromCharCode(c)).join(''));

write(YEAR, DAY, PART, '');
