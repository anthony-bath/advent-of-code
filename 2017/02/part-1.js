export function part1({ lines }) {
  return lines.reduce((sum, line) => {
    const nums = line.split('\t').map((n) => Number(n));
    return sum + (Math.max(...nums) - Math.min(...nums));
  }, 0);
}
