import { permute, read, write } from '../../utility.js';
import { execute2 } from './common.js';

const [YEAR, DAY, PART] = [2019, 7, 2];

const program = read(YEAR, DAY, { splitBy: ',' }).map((n) => Number(n));

let max = -Infinity;

const phaseOrders = permute([5, 6, 7, 8, 9]);

for (const order of phaseOrders) {
  const states = order.map((phase, i) => ({
    amplifier: i,
    program: [...program],
    halted: false,
    pointer: 0,
    phased: false,
    phase,
  }));

  let result;
  let amplifier = 0;

  while (true) {
    result = execute2(states[amplifier], result ?? 0);

    if (result > max) {
      max = result;
    }

    if (amplifier === 4 && states[amplifier].halted) {
      break;
    }

    amplifier++;

    if (amplifier === 5) amplifier = 0;
  }
}

write(YEAR, DAY, PART, max);
