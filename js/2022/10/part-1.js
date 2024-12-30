import { loadCycles, TRACKED_CYCLE_INDICES } from './common.js';

export function part1({ lines }) {
  const cycles = loadCycles(lines);

  let X = 1;
  let signalStrength = 0;

  for (let cycleIndex = 0; cycleIndex < cycles.length; cycleIndex++) {
    if (TRACKED_CYCLE_INDICES.includes(cycleIndex)) {
      signalStrength += X * (cycleIndex + 1);
    }

    X += cycles[cycleIndex];
  }

  return signalStrength;
}
