import { permute } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';
import { scramble } from './common.js';

const [YEAR, DAY, PART] = [2016, 21, 2];

const instructions = read(YEAR, DAY, PART);
const passwords = permute('abcdefgh'.split(''));
const TARGET = 'fbgdceah';
let result = null;

for (const password of passwords) {
  if (scramble(instructions, password) === TARGET) {
    result = password.join('');
    break;
  }
}

write(YEAR, DAY, PART, result);
