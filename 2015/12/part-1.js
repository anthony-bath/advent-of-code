import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 12, 1];

write(
  YEAR,
  DAY,
  PART,
  read(YEAR, DAY, PART, { splitBy: null })
    .match(/-?\d+/g)
    .reduce((sum, value) => sum + Number(value), 0)
);
