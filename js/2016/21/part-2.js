import { permute } from '../../../utilities/array.js';
import { scramble } from './common.js';

export function part2({ lines }) {
  const passwords = permute('abcdefgh'.split(''));
  const TARGET = 'fbgdceah';
  let result = null;

  for (const password of passwords) {
    if (scramble(lines, password) === TARGET) {
      result = password.join('');
      break;
    }
  }

  return result;
}
