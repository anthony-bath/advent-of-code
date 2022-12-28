import fs from 'fs';
import { EOL } from 'os';

export function write(day, part, content) {
  console.log(content);

  if (!(typeof content === 'string')) {
    content = `${content}`;
  }

  fs.writeFileSync(`./${day.toString().padStart(2, '0')}/output-${part}.txt`, content);
}

export function read(day, { test = false, splitBy = EOL } = {}) {
  return fs
    .readFileSync(`./${day.toString().padStart(2, '0')}/${test ? 'test' : ''}input.txt`, 'utf-8')
    .split(splitBy);
}
