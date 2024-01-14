import { execute } from '../IntCode.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);

  const state = { pointer: 0, program: [...program], relativeBase: 0 };
  let result;

  while (!state.halted) {
    const output = execute(state, [1]);

    if (output) {
      result = output;
    }
  }

  return result;
}
