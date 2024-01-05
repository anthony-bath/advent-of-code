import { readOld, write } from '../../utilities/io.js';
import { checksum, fillDisk } from './common.js';

const [YEAR, DAY, PART] = [2016, 16, 2];

const SIZE = 35651584;
const input = readOld(YEAR, DAY, PART, { splitBy: null });

let data = fillDisk(input, SIZE);

while (data.length % 2 === 0) {
  data = checksum(data);
}

write(YEAR, DAY, PART, data.join(''));
