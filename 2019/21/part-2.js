import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 21, 2];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

function toASCIICommand(text) {
  return [...text.split('').map((c) => c.charCodeAt(0)), 10];
}

const state = { pointer: 0, program: [...program], relativeBase: 0 };

const output = [];
const commands = [
  'NOT A J',
  'NOT B T',
  'OR T J',
  'NOT C T',
  'OR T J',
  'AND D J',
  'NOT I T',
  'NOT T T',
  'OR F T',
  'AND E T',
  'OR H T',
  'AND T J',
  'RUN',
];
const input = commands.map((command) => toASCIICommand(command)).flat();

while (!state.halted) {
  const result = execute(state, input);
  if (!result) break;

  output.push(result);
}

write(YEAR, DAY, PART, output.pop());
