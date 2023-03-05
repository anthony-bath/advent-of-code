import { read, write } from '../../utilities/io.js';
import md5 from 'md5';

const [YEAR, DAY, PART] = [2016, 14, 1];

const salt = read(YEAR, DAY, PART, { splitBy: null, test: true });

const keys = [];
const hashes = {};
let index = 0;

function checkNext1000(fromIndex, character) {
  const expr = new RegExp(`${character}{5}`);

  for (let checkIndex = fromIndex; checkIndex < fromIndex + 1000; checkIndex++) {
    if (!(checkIndex in hashes)) {
      hashes[checkIndex] = md5(`${salt}${checkIndex}`);
    }

    if (expr.test(hashes[checkIndex])) {
      return true;
    }
  }

  return false;
}

const expr = /([a-zA-Z0-9])\1\1/;

while (keys.length < 64) {
  if (!(index in hashes)) {
    hashes[index] = md5(`${salt}${index}`);
  }

  const result = expr.exec(hashes[index]);

  if (result) {
    if (checkNext1000(index + 1, result[1])) {
      keys.push(index);
    }
  }

  index++;
}

write(YEAR, DAY, PART, keys.pop());
