import { createHash } from 'node:crypto';

export function part2(data) {
  let num = 0;

  while (true) {
    const value = createHash('md5').update(`${data}${num}`).digest('hex');

    if (value.startsWith('000000')) {
      break;
    }

    num++;
  }

  return num;
}
