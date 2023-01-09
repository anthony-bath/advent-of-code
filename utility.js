import fs from 'fs';
import { EOL } from 'os';

export function write(year, day, part, content) {
  console.timeEnd(getTimingLabel(year, day));
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

  console.time(getTimingLabel(year, day));

  return splitBy !== null ? data.split(splitBy) : data;
}

export function output(content) {
  fs.writeFileSync('./debug.txt', content);
}

function getTimingLabel(year, day) {
  return `${year}-${day.toString().padStart(2, '0')} Time`;
}

export function permute(permutation) {
  let length = permutation.length,
    result = [permutation.slice()],
    c = new Array(length).fill(0),
    i = 1,
    k,
    p;

  while (i < length) {
    if (c[i] < i) {
      k = i % 2 && c[i];
      p = permutation[i];
      permutation[i] = permutation[k];
      permutation[k] = p;
      ++c[i];
      i = 1;
      result.push(permutation.slice());
    } else {
      c[i] = 0;
      ++i;
    }
  }

  return result;
}
