import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 2, 1];

const checksum = read(YEAR, DAY, PART).reduce((sum, line) => {
  const nums = line.split('\t').map((n) => Number(n));
  return sum + (Math.max(...nums) - Math.min(...nums));
}, 0);

write(YEAR, DAY, PART, checksum);
