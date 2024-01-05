import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 8, 1];

const inputs = [];
const outputs = [];

readOld(YEAR, DAY, PART).forEach((line) => {
  const [input, output] = line.trim().split(' | ');
  inputs.push(input);
  outputs.push(output);
});

const easyDigitLengths = [2, 3, 4, 7];

write(
  YEAR,
  DAY,
  PART,
  outputs.reduce(
    (count, output) =>
      count + output.split(' ').filter((digit) => easyDigitLengths.includes(digit.length)).length,
    0
  )
);
