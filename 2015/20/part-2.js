import { read, write } from '../../utilities/io.js';
import { factors } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2015, 20, 2];

const input = Number(read(YEAR, DAY, PART, { splitBy: null }));

let houseNumber = 0;
let presents = 0;
const deliveredCountByElf = {};

while (presents < input) {
  houseNumber++;
  const visitingElves = factors(houseNumber);

  presents = visitingElves.reduce((count, id) => {
    if (!(id in deliveredCountByElf)) {
      deliveredCountByElf[id] = 0;
    }

    if (deliveredCountByElf[id] < 50) {
      deliveredCountByElf[id]++;

      return count + 11 * id;
    } else {
      return count;
    }
  }, 0);
}

write(YEAR, DAY, PART, houseNumber);
