import { readOld, write } from '../../utilities/io.js';
import { createHash } from 'node:crypto';

const [YEAR, DAY, PART] = [2016, 14, 1];

const salt = readOld(YEAR, DAY, PART, { splitBy: null });

const keys = [];
const hashes = {};
let index = 0;

function checkNext1000(fromIndex, character) {
  const expr = new RegExp(`${character}{5}`);

  for (let checkIndex = fromIndex; checkIndex < fromIndex + 1000; checkIndex++) {
    if (!(checkIndex in hashes)) {
      hashes[checkIndex] = createHash('md5').update(`${salt}${checkIndex}`).digest('hex');
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
    hashes[index] = createHash('md5').update(`${salt}${index}`).digest('hex');
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
