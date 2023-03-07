import { read, write } from '../../utilities/io.js';
import { checksum, fillDisk } from './common.js';

const [YEAR, DAY, PART] = [2016, 16, 1];

const SIZE = 272;
const input = read(YEAR, DAY, PART, { splitBy: null });

let data = fillDisk(input, SIZE);

while (data.length % 2 === 0) {
  data = checksum(data);
}

write(YEAR, DAY, PART, data.join(''));
