export function part2({ lines }) {
  let [a, b] = lines.map((line) => Number(line.match(/\d+/g)[0]));
  let comparisons = 0;
  let count = 0;

  while (comparisons < 5000000) {
    do a = (a * 16807) % 2147483647;
    while (a % 4);

    do b = (b * 48271) % 2147483647;
    while (b % 8);

    if ((a & 0xffff) === (b & 0xffff)) {
      count++;
    }

    comparisons++;
  }

  return count;
}
