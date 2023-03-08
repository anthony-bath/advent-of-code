import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 1, 2];

let floor = 0;
let result = null;

read(YEAR, DAY, PART, { splitBy: '' }).forEach((p, i) => {
  floor += p === '(' ? 1 : -1;

  if (floor === -1 && !result) {
    result = i;
  }
});

write(YEAR, DAY, PART, result + 1);
