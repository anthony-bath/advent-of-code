export function part1({ lines }) {
  return lines.reduce((sum, num) => sum + Number(num), 0);
}
