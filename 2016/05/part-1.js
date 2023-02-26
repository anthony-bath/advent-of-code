import { read, write } from '../../utilities/io.js';
import md5 from 'md5';

const [YEAR, DAY, PART] = [2016, 5, 1];

const doorId = read(YEAR, DAY, PART, { splitBy: null });
const passwordChars = [];
let num = 0;

while (passwordChars.length < 8) {
  const hash = md5(`${doorId}${num}`);

  if (hash.startsWith('00000')) {
    passwordChars.push(hash[5]);
  }

  num++;
}

write(YEAR, DAY, PART, passwordChars.join(''));
