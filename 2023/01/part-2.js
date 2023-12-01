import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 1, 2];

const digitMap = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
};

const expr = /\d|one|two|three|four|five|six|seven|eight|nine/g;

const result = read(YEAR, DAY, PART).reduce((total, line) => {
  let match;
  const digits = [];

  while ((match = expr.exec(line)) !== null) {
    digits.push(match[0]);
    expr.lastIndex = match.index + 1;
  }

  const first = digitMap[digits[0]];
  const last = digitMap[digits[digits.length - 1]];

  return total + Number(`${first}${last}`);
}, 0);

write(YEAR, DAY, PART, result);
