import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 1, 1];

let floor = 0;

read(YEAR, DAY, PART, { splitBy: '' }).forEach((p) => (floor += p === '(' ? 1 : -1));

write(YEAR, DAY, PART, floor);
