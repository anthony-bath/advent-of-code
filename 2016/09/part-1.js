import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 9, 1];

const input = read(YEAR, DAY, PART, { splitBy: '' });
const output = [];

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

    const chars = input
      .slice(i, i + charCount)
      .join('')
      .repeat(repeatCount)
      .split('');

    output.push(...chars);

    i += charCount - 1;
  } else {
    output.push(input[i]);
  }
}

write(YEAR, DAY, PART, output.length);
