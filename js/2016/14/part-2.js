import { createHash } from 'node:crypto';

export function part2({ data }) {
  const keys = [];
  const hashes = {};
  let index = 0;

  function checkNext1000(fromIndex, character) {
    const expr = new RegExp(`${character}{5}`);

    for (let checkIndex = fromIndex; checkIndex < fromIndex + 1000; checkIndex++) {
      if (!(checkIndex in hashes)) {
        hashes[checkIndex] = stretchHash(`${data}${checkIndex}`);
      }

      if (expr.test(hashes[checkIndex])) {
        return true;
      }
    }

    return false;
  }

  function stretchHash(value) {
    let result = createHash('md5').update(value).digest('hex');

    for (let i = 0; i < 2016; i++) {
      result = createHash('md5').update(result).digest('hex');
    }

    return result;
  }

  const expr = /([a-zA-Z0-9])\1\1/;

  while (keys.length < 64) {
    if (!(index in hashes)) {
      hashes[index] = stretchHash(`${data}${index}`);
    }

    const result = expr.exec(hashes[index]);

    if (result) {
      if (checkNext1000(index + 1, result[1])) {
        keys.push(index);
      }
    }

    index++;
  }

  return keys.pop();
}
