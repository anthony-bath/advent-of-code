import { execute, toASCIICommand } from '../IntCode_v2.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);
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

  return output.pop();
}
