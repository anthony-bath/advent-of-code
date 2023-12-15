import { read, write } from '../../utilities/io.js';
import { hash } from './common.js';

const [YEAR, DAY, PART] = [2023, 15, 1];

const total = read(YEAR, DAY, PART, { splitBy: ',' }).reduce(
  (total, part) => total + hash(part),
  0
);

write(YEAR, DAY, PART, total);
