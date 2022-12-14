import fs from 'fs';
import { EOL } from 'os';

export function write(day, part, content) {
  console.log(content);
  fs.writeFileSync(`./${day.toString().padStart(2, '0')}/output-${part}.txt`, content);
}

export function read(day, splitBy = EOL) {
  return fs.readFileSync(`./${day.toString().padStart(2, '0')}/input.txt`, 'utf-8').split(splitBy);
}

export function output(content) {
  fs.writeFileSync('./debug.txt', content);
}
