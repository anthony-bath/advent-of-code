export function part1({ lines }) {
  let [a, b] = lines.map((line) => Number(line.match(/\d+/g)[0]));

  const ROUNDS = 40000000;
  let round = 0;
  let count = 0;

  const seenA = new Set();
  const seenB = new Set();

  while (round < ROUNDS) {
    a = (a * 16807) % 2147483647;
    b = (b * 48271) % 2147483647;

    if ((a & 0xffff) === (b & 0xffff)) {
      count++;
    }

    round++;
  }

  return count;
}
