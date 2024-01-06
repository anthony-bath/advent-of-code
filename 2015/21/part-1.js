import { loadouts, simulate } from './common.js';

export function part1({ lines }) {
  const bossStats = lines.map((line) => Number(line.match(/\d+/)));

  loadouts.sort((a, b) => a.cost - b.cost);
  let result = null;

  for (const loadout of loadouts) {
    if (simulate(loadout, bossStats)) {
      result = loadout.cost;
      break;
    }
  }

  return result;
}
