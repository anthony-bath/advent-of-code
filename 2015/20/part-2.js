import { factors } from '../../utilities/math.js';

export function part2({ data }) {
  const input = Number(data);

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

  return houseNumber;
}
