import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2015, 8, 2];

let result = 0;

read(YEAR, DAY, PART).forEach((line) => {
  const initial = line.length;

  line = line.replace(/\\/g, '\\\\');
  line = line.replace(/"/g, '\\"');

  const final = 2 + line.length;

  result += final - initial;
});

write(YEAR, DAY, PART, result);
