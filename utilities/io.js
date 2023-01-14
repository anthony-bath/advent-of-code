import fs from 'fs';
import { EOL } from 'os';

export function write(year, day, part, content) {
  console.timeEnd(getTimingLabel(year, day, part));
  console.log(content);

  if (!(typeof content === 'string')) {
    content = `${content}`;
  }

  fs.writeFileSync(`./${year}/${day.toString().padStart(2, '0')}/output-${part}.txt`, content);
}

export function read(year, day, part, { test = false, splitBy = EOL, section = null } = {}) {
  const data = fs.readFileSync(
    `./${year}/${day.toString().padStart(2, '0')}/${test ? 'test' : ''}input${
      section ? `-${section}` : ''
    }.txt`,
    'utf-8'
  );

  console.time(getTimingLabel(year, day, part));

  return splitBy !== null ? data.split(splitBy) : data;
}

export function output(content) {
  fs.writeFileSync('./debug.txt', content);
}

function getTimingLabel(year, day, part) {
  return `${year}-${day.toString().padStart(2, '0')} Part ${part} Time`;
}
