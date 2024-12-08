export function part1({ data }) {
  return data.match(/-?\d+/g).reduce((sum, value) => sum + Number(value), 0);
}
