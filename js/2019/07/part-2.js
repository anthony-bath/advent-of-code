import { execute } from '../IntCode_v2.js';
import { permute } from '../../utilities/array.js';

export function part2({ data }) {
  const program = data.split(',').map(Number);

  let max = -Infinity;

  const phaseOrders = permute([5, 6, 7, 8, 9]);

  for (const phaseOrder of phaseOrders) {
    const states = phaseOrder.map(() => ({
      program: [...program],
      halted: false,
      pointer: 0,
    }));

    let result;
    let amplifier = 0;
    const phased = [0, 0, 0, 0, 0];

    while (true) {
      const inputs = [];

      if (!phased[amplifier]) {
        inputs.push(phaseOrder[amplifier]);
        phased[amplifier] = 1;
      }

      inputs.push(result ?? 0);

      result = execute(states[amplifier], inputs);

      if (!result) {
        break;
      } else if (result > max) {
        max = result;
      }

      amplifier = ++amplifier % 5;
    }
  }

  return max;
}
