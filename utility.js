import fs from 'fs';
import { EOL } from 'os';

export function write(year, day, part, content) {
  console.log(content);

  if (!(typeof content === 'string')) {
    content = `${content}`;
  }

  fs.writeFileSync(`./${year}/${day.toString().padStart(2, '0')}/output-${part}.txt`, content);
}

export function read(year, day, { test = false, splitBy = EOL, part = null } = {}) {
  const data = fs.readFileSync(
    `./${year}/${day.toString().padStart(2, '0')}/${test ? 'test' : ''}input${
      part ? `-${part}` : ''
    }.txt`,
    'utf-8'
  );

  return splitBy ? data.split(splitBy) : data;
}

export function output(content) {
  fs.writeFileSync('./debug.txt', content);
}
