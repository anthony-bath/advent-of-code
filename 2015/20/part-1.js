import { factors } from '../../utilities/math.js';

export function part1({ data }) {
  const input = Number(data);

  let houseNumber = 1;
  let presents = 10;

  while (presents < input) {
    houseNumber++;
    const visitingElves = factors(houseNumber);
    presents = visitingElves.reduce((count, id) => count + 10 * id, 0);
  }

  return houseNumber;
}
