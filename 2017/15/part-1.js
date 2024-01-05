import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 15, 1];

let [a, b] = readOld(YEAR, DAY, PART).map((line) => Number(line.match(/\d+/g)[0]));

const ROUNDS = 40000000;
let round = 0;
let count = 0;

while (round < ROUNDS) {
  a = (a * 16807) % 2147483647;
  b = (b * 48271) % 2147483647;

  if ((a & 0xffff) === (b & 0xffff)) {
    count++;
  }

  round++;
}

write(YEAR, DAY, PART, count);
