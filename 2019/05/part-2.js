import { execute } from '../IntCode.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);

  const INPUT_VALUE = 5;
  let output;

  const state = { pointer: 0, program: [...program], halted: false };

  while (!state.halted) {
    const result = execute(state, [INPUT_VALUE]);

    if (result !== null) {
      output = result;
    }
  }

  return output;
}
