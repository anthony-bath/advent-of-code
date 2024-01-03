import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 1, 1];

export function part1() {
  let floor = 0;

  read(YEAR, DAY, PART, { splitBy: '' }).forEach((p) => (floor += p === '(' ? 1 : -1));

  return floor;
}

write(YEAR, DAY, PART, part1());
