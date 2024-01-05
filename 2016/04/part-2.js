import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 4, 2];

const sectorExpression = new RegExp('\\d+', 'g');

let result = null;

readOld(YEAR, DAY, PART).forEach((line) => {
  if (result) {
    return;
  }

  const parts = line.split('-');
  const last = parts.pop();
  const sector = Number(last.match(sectorExpression)[0]);
  const shifts = sector % 26;

  const output = [];

  for (const part of parts) {
    const word = [];

    for (const char of part) {
      const code = char.charCodeAt(0) - 97;
      word.push(String.fromCharCode(((code + shifts) % 26) + 97));
    }

    output.push(word.join(''));
  }

  if (output.includes('northpole')) {
    result = sector;
  }
});

write(YEAR, DAY, PART, result);
