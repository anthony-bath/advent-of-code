import { write } from '../../utility.js';
import { cycles, TRACKED_CYCLE_INDICES } from './common.js';

const [YEAR, DAY, PART] = [2022, 10, 1];

let X = 1;
let signalStrength = 0;

for (let cycleIndex = 0; cycleIndex < cycles.length; cycleIndex++) {
  if (TRACKED_CYCLE_INDICES.includes(cycleIndex)) {
    signalStrength += X * (cycleIndex + 1);
  }

  X += cycles[cycleIndex];
}

write(YEAR, DAY, PART, signalStrength);
