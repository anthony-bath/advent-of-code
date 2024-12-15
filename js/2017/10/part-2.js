import { sparseHash } from './common.js';

export function part2({ data }) {
  const lengths = [...data.trim()].map((c) => c.charCodeAt(0)).concat(17, 31, 73, 47, 23);

  const hashData = sparseHash(
    Array(256)
      .fill()
      .map((_, i) => i),
    lengths,
    64
  );

  const blocks = [];

  while (hashData.length) {
    blocks.push(
      hashData
        .splice(0, 16)
        .reduce((result, num) => (result ^= num), 0)
        .toString(16)
        .padStart(2, '0')
    );
  }

  return blocks.join('');
}
