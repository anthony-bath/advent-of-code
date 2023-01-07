import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 4, 1];

const [start, end] = read(YEAR, DAY, { splitBy: '-' }).map((n) => Number(n));

const dups = /(11|22|33|44|55|66|77|88|99|00)/;
const neverDecreases = (number) => {
  const digits = number.split('').map((n) => Number(n));

  for (const [i, digit] of digits.entries()) {
    if (i === 0) continue;
    if (digits[i - 1] > digit) return false;
  }

  return true;
};

let count = 0;

for (let password = start; password <= end; password++) {
  const str = password.toString();

  if (dups.test(str) && neverDecreases(str)) {
    count++;
  }
}

write(YEAR, DAY, PART, count);
