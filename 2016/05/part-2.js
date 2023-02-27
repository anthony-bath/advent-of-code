import { read, write } from '../../utilities/io.js';
import md5 from 'md5';

const [YEAR, DAY, PART] = [2016, 5, 2];

const doorId = read(YEAR, DAY, PART, { splitBy: null });
const passwordChars = new Map();
const positions = [...Array(8).keys()];

let num = 0;

while (passwordChars.size < 8) {
  const hash = md5(`${doorId}${num}`);

  if (hash.startsWith('00000')) {
    const position = Number(hash[5]);

    if (
      Number.isInteger(position) &&
      positions.includes(position) &&
      !passwordChars.has(position)
    ) {
      passwordChars.set(position, hash[6]);
    }
  }

  num++;
}

write(YEAR, DAY, PART, positions.map((position) => passwordChars.get(position)).join(''));
