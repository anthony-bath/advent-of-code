export function part1({ lines }) {
  return lines.reduce((count, line) => {
    const [a, b, c] = line
      .trim()
      .split(/\s+/)
      .map((n) => Number(n));

    if (a + b > c && a + c > b && b + c > a) {
      return count + 1;
    }

    return count;
  }, 0);
}
