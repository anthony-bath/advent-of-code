import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 5, 1];

write(
  YEAR,
  DAY,
  PART,
  Math.max(
    ...read(YEAR, DAY, PART, { splitBy: null })
      .replace(/[FL]/g, '0')
      .replace(/[BR]/g, '1')
      .split('\n')
      .map((line) => {
        const row = parseInt(line.substring(0, 7), 2);
        const col = parseInt(line.substring(7), 2);

        return row * 8 + col;
      })
  )
);
