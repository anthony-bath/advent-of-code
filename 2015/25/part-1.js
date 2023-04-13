import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 25, 1];

let [row, col] = read(YEAR, DAY, PART, { splitBy: null })
  .match(/\d+/g)
  .map((n) => Number(n));

let positionValue = ((row - 1) * row) / 2 + 1;
let colOffsetStart = row + 1;

for (let i = 0; i < col - 1; i++) {
  positionValue += colOffsetStart++;
}

let result = 20151125;

for (let value = 2; value <= positionValue; value++) {
  result *= 252533;
  result %= 33554393;
}

write(YEAR, DAY, PART, result);
