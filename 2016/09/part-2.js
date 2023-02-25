import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 9, 2];

const input = read(YEAR, DAY, PART, { splitBy: '' });

function getDecompressedLength(input) {
  if (input.indexOf('(') === -1) {
    return input.length;
  }

  let length = 0;

  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      const marker = [];

      while (input[i] !== ')') {
        marker.push(input[i++]);
      }

      i++;

      const [charCount, repeatCount] = marker
        .join('')
        .match(/\d+/g)
        .map((n) => Number(n));

      const chars = input.slice(i, i + charCount);

      length += repeatCount * getDecompressedLength(chars);
      i += charCount - 1;
    } else {
      length++;
    }
  }

  return length;
}

write(YEAR, DAY, PART, getDecompressedLength(input));
