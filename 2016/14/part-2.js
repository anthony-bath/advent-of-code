import { read, write } from '../../utilities/io.js';
import md5 from 'md5';

const [YEAR, DAY, PART] = [2016, 14, 2];

const salt = read(YEAR, DAY, PART, { splitBy: null });

const keys = [];
const hashes = {};
let index = 0;

function checkNext1000(fromIndex, character) {
  const expr = new RegExp(`${character}{5}`);

  for (let checkIndex = fromIndex; checkIndex < fromIndex + 1000; checkIndex++) {
    if (!(checkIndex in hashes)) {
      hashes[checkIndex] = stretchHash(`${salt}${checkIndex}`);
    }

    if (expr.test(hashes[checkIndex])) {
      return true;
    }
  }

  return false;
}

function stretchHash(value) {
  let result = md5(value);

  for (let i = 0; i < 2016; i++) {
    result = md5(result);
  }

  return result;
}

const expr = /([a-zA-Z0-9])\1\1/;

while (keys.length < 64) {
  if (!(index in hashes)) {
    hashes[index] = stretchHash(`${salt}${index}`);
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
