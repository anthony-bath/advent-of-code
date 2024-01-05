import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 5, 2];

const seatIds = readOld(YEAR, DAY, PART, { splitBy: null })
  .replace(/[FL]/g, '0')
  .replace(/[BR]/g, '1')
  .split('\n')
  .map((line) => {
    const row = parseInt(line.substring(0, 7), 2);
    const col = parseInt(line.substring(7), 2);

    return row * 8 + col;
  })
  .sort((a, b) => a - b);

write(YEAR, DAY, PART, 1 + seatIds.find((id, index) => seatIds[index + 1] !== id + 1));
