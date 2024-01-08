import { createHash } from 'node:crypto';

export function part1({ data }) {
  const passwordChars = [];
  let num = 0;

  while (passwordChars.length < 8) {
    const hash = createHash('md5').update(`${data}${num}`).digest('hex');

    if (hash.startsWith('00000')) {
      passwordChars.push(hash[5]);
    }

    num++;
  }

  return passwordChars.join('');
}
