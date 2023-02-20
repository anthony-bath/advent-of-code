import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 6, 1];

const positionData = [...Array(8).keys()].map((_) => ({}));

read(YEAR, DAY, PART).forEach((line) => {
  const parts = line.split('');

  for (const [position, letter] of parts.entries()) {
    const data = positionData[position];

    if (!(letter in data)) {
      data[letter] = 1;
    } else {
      data[letter]++;
    }
  }
});

const result = [];

for (const data of positionData) {
  const [letter] = Object.entries(data)
    .sort(([, c1], [, c2]) => c2 - c1)
    .shift();

  result.push(letter);
}

write(YEAR, DAY, PART, result.join(''));
