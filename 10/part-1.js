import fs from 'fs';
import { cycles, TRACKED_CYCLE_INDICES } from './common.js';

let X = 1;
let signalStrength = 0;

for (let cycleIndex = 0; cycleIndex < cycles.length; cycleIndex++) {
  if (TRACKED_CYCLE_INDICES.includes(cycleIndex)) {
    signalStrength += X * (cycleIndex + 1);
  }

  X += cycles[cycleIndex];
}

fs.writeFileSync('./10/output-1.txt', `${signalStrength}`);
