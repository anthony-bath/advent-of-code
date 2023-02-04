import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 2, 2];

const checksum = read(YEAR, DAY, PART).reduce((sum, line) => {
  const nums = line.split('\t').map((n) => Number(n));

  let result = null;

  for (const num1 of nums) {
    for (const num2 of nums) {
      if (num1 === num2) continue;

      result = Math.max(num1, num2) / Math.min(num1, num2);

      if (!Number.isInteger(result)) {
        result = null;
      } else {
        break;
      }
    }

    if (result) {
      break;
    }
  }

  return sum + result;
}, 0);

write(YEAR, DAY, PART, checksum);
