export function part1({ data }) {
  const n = Number(data);

  // Josephus Problem
  return 2 * (n - Math.pow(2, Math.floor(Math.log2(n)))) + 1;
}
