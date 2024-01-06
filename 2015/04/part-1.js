import { createHash } from 'node:crypto';

export function part1({ data }) {
  let num = 0;

  while (true) {
    const value = createHash('md5').update(`${data}${num}`).digest('hex');

    if (value.startsWith('00000')) {
      break;
    }

    num++;
  }

  return num;
}
