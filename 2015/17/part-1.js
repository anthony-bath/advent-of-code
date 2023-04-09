import { read, write } from '../../utilities/io.js';
import { fill } from './common.js';

const [YEAR, DAY, PART] = [2015, 17, 1];

const input = read(YEAR, DAY, PART)
  .map((n) => Number(n))
  .sort((a, b) => b - a);

write(YEAR, DAY, PART, fill(150, input).length);
