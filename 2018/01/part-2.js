import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 1, 2];

const input = readOld(YEAR, DAY, PART);

const seen = {};
let result;
let frequency = 0;
let index = 0;

while (true) {
  frequency += Number(input[index]);

  if (seen[frequency]) {
    result = frequency;
    break;
  }

  seen[frequency] = 1;

  index++;

  if (index >= input.length) {
    index = 0;
  }
}

write(YEAR, DAY, PART, result);
