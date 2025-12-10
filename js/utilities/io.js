import fs from 'fs';
import { EOL } from 'os';

export function write(year, day, part, content) {
  console.timeEnd(getTimingLabel(year, day, part));
  console.log(content);

  if (!(typeof content === 'string')) {
    content = `${content}`;
  }

  fs.writeFileSync(`./js/${year}/${day.toString().padStart(2, '0')}/output-${part}.txt`, content);
}

export function readOld(year, day, part, { test = false, splitBy = EOL } = {}) {
  const dayPadded = day.toString().padStart(2, '0');
  const data = fs.readFileSync(
    `./problems/inputs/${year}/${dayPadded}${test ? '-test' : ''}.txt`,
    'utf-8'
  );

  console.time(getTimingLabel(year, day, part));

  return splitBy !== null ? data.split(splitBy) : data;
}

export function loadInput(year, day, { test = false } = {}) {
  const dayPadded = day.toString().padStart(2, '0');
  const data = fs.readFileSync(
    `./problems/inputs/${year}/${dayPadded}${test ? '-test' : ''}.txt`,
    'utf-8'
  );

  const lines = data.split(EOL);

  return { data, lines };
}

export function output(content) {
  fs.writeFileSync('./debug.txt', content);
}

function getTimingLabel(year, day, part) {
  return `${year}-${day.toString().padStart(2, '0')} Part ${part} Time`;
}
