import { readOld, write } from '../../utilities/io.js';
import { loadouts, simulate } from './common.js';

const [YEAR, DAY, PART] = [2015, 21, 2];

const bossStats = readOld(YEAR, DAY, PART).map((line) => Number(line.match(/\d+/)));

loadouts.sort((a, b) => b.cost - a.cost);
let result = null;

for (const loadout of loadouts) {
  if (!simulate(loadout, bossStats)) {
    result = loadout.cost;
    break;
  }
}

write(YEAR, DAY, PART, result);
