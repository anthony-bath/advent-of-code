import { execute } from '../IntCode_v2.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);

  const state = { pointer: 0, program: [...program], relativeBase: 0 };
  let result;

  while (!state.halted) {
    const output = execute(state, [2]);

    if (output) {
      result = output;
    }
  }

  return result;
}
