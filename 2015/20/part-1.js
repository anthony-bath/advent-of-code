import { readOld, write } from '../../utilities/io.js';
import { factors } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2015, 20, 1];

const input = Number(readOld(YEAR, DAY, PART, { splitBy: null }));

let houseNumber = 1;
let presents = 10;

while (presents < input) {
  houseNumber++;
  const visitingElves = factors(houseNumber);
  presents = visitingElves.reduce((count, id) => count + 10 * id, 0);
}

write(YEAR, DAY, PART, houseNumber);
