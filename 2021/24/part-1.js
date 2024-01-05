import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 24, 1];

readOld(YEAR, DAY, PART);

let type1 = Array(7).fill(9);

function decrement() {
  let change = true;
  let index = type1.length - 1;

  while (change && index > 0) {
    type1[index]--;

    if (type1[index] === 0) {
      type1[index] = 9;
      index--;
    } else {
      change = false;
    }
  }
}

let type2 = Array(7).fill(null);

while (true) {
  // Digit 1
  let z = type1[0] + 6;

  // Digit 2
  z = 26 * z + type1[1] + 6;

  // Digit 3
  z = 26 * z + type1[2] + 3;

  // Digit 4
  type2[0] = (z % 26) - 11;
  z = Math.floor(z / 26);

  // Digit 5
  z = 26 * z + type1[3] + 9;

  // Digit 6
  type2[1] = (z % 26) - 1;
  z = Math.floor(z / 26);

  // Digit 7
  z = 26 * z + type1[4] + 13;

  // Digit 8
  z = 26 * z + type1[5] + 6;

  // Digit 9
  type2[2] = z % 26;
  z = Math.floor(z / 26);

  // Digit 10
  z = 26 * z + type1[6] + 10;

  // Digit 11
  type2[3] = (z % 26) - 5;
  z = Math.floor(z / 26);

  // Digit 12
  type2[4] = (z % 26) - 16;
  z = Math.floor(z / 26);

  // Digit 13
  type2[5] = (z % 26) - 7;
  z = Math.floor(z / 26);

  // Digit 14
  type2[6] = (z % 26) - 11;
  z = Math.floor(z / 26);

  if (type2.some((d) => d <= 0 || d > 9)) {
    decrement();
    continue;
  }

  if (z === 0) break;
}

const result = [
  type1[0],
  type1[1],
  type1[2],
  type2[0],
  type1[3],
  type2[1],
  type1[4],
  type1[5],
  type2[2],
  type1[6],
  type2[3],
  type2[4],
  type2[5],
  type2[6],
];

write(YEAR, DAY, PART, result.join(''));
