export function part1({ data }) {
  const [, [y1]] = data
    .replace(/[^\.,-\d]/g, '')
    .split(',')
    .map((v) => v.split('..').map((n) => Number(n)));

  const maxHeight = (-y1 * (-y1 - 1)) / 2;

  return maxHeight;
}
