import { execute } from '../IntCode_v2.js';
import { permute } from '../../../utilities/array.js';

export function part1({ data }) {
  const program = data.split(',').map(Number);

  let max = -Infinity;

  const phaseOrders = permute([0, 1, 2, 3, 4]);

  for (const order of phaseOrders) {
    let result;

    for (const phase of order) {
      const state = { pointer: 0, program: [...program] };
      const inputs = [phase, result ?? 0];

      result = execute(state, inputs);
    }

    if (result > max) {
      max = result;
    }
  }

  return max;
}
