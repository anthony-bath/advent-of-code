import { sparseHash } from './common.js';

export function part1({ data }) {
  const lengths = data.split(',').map(Number);

  const list = sparseHash(
    Array(256)
      .fill()
      .map((_, i) => i),
    lengths
  );

  return list.shift() * list.shift();
}
