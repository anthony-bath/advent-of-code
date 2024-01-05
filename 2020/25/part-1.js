import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 25, 1];

const SUBJECT_NUMBER = 7;
const FACTOR = 20201227;
const [cardPublicKey, doorPublicKey] = readOld(YEAR, DAY, PART).map((n) => Number(n));

let cardLoopSize = 0;
let value = 1;

do {
  value *= SUBJECT_NUMBER;
  value %= FACTOR;
  cardLoopSize++;
} while (value !== cardPublicKey);

let result = 1;

for (let i = 0; i < cardLoopSize; i++) {
  result *= doorPublicKey;
  result %= FACTOR;
}

write(YEAR, DAY, PART, result);
