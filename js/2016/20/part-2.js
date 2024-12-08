export function part2({ lines }) {
  const ranges = lines.map((line) => {
    const [start, end] = line.split('-').map((n) => Number(n));
    return { start, end };
  });

  ranges.sort((a, b) => a.start - b.start);

  const MAX = 4294967295;

  let allowedCount = 0;
  let currentMax = 0;

  for (const range of ranges) {
    allowedCount += Math.max(0, range.start - currentMax - 1);
    currentMax = Math.max(currentMax, range.end);
  }

  allowedCount += Math.max(0, MAX - currentMax);

  return allowedCount;
}
