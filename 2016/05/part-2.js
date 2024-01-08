import { createHash } from 'node:crypto';

export function part2({ data }) {
  const passwordChars = new Map();
  const positions = [...Array(8).keys()];

  let num = 0;

  while (passwordChars.size < 8) {
    const hash = createHash('md5').update(`${data}${num}`).digest('hex');

    if (hash.startsWith('00000')) {
      const position = Number(hash[5]);

      if (
        Number.isInteger(position) &&
        positions.includes(position) &&
        !passwordChars.has(position)
      ) {
        passwordChars.set(position, hash[6]);
      }
    }

    num++;
  }

  return positions.map((position) => passwordChars.get(position)).join('');
}
