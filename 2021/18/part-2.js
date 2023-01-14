import { write } from '../../utilities/io.js';
import { loadData } from './common.js';

const [YEAR, DAY, PART] = [2021, 18, 2];

const magnitudes = [];
const fish = loadData(PART);

for (const fish1 of fish) {
  for (const fish2 of fish) {
    magnitudes.push(fish1.add(fish2).magnitude());
  }
}

write(YEAR, DAY, PART, Math.max(...magnitudes));
