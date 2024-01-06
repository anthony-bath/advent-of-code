import { loadouts, simulate } from './common.js';

export function part2({ lines }) {
  const bossStats = lines.map((line) => Number(line.match(/\d+/)));

  loadouts.sort((a, b) => b.cost - a.cost);
  let result = null;

  for (const loadout of loadouts) {
    if (!simulate(loadout, bossStats)) {
      result = loadout.cost;
      break;
    }
  }

  return result;
}
