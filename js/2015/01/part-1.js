export function part1({ data }) {
  let floor = 0;

  data.split('').forEach((p) => (floor += p === '(' ? 1 : -1));

  return floor;
}
