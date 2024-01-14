import { execute } from '../IntCode.js';

export function part1({ data }) {
  const input = data.split(',').map(Number);
  input[1] = 12;
  input[2] = 2;

  const state = { pointer: 0, program: [...input] };
  execute(state);

  return state.program[0];
}
