import { execute } from '../IntCode_v2.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);
  const INPUT_VALUE = 1;
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
