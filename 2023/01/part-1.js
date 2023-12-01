import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2023, 1, 1];

const result = read(YEAR, DAY, PART).reduce((total, line) => {
  const digits = line.match(/\d/g);

  if (digits.length === 1) {
    return total + Number(`${digits[0]}${digits[0]}`);
  }

  return total + Number(`${digits[0]}${digits[digits.length - 1]}`);
}, 0);

write(YEAR, DAY, PART, result);
