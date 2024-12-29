export function part1({ lines }) {
  const report = lines.map(Number);

  return report.reduce((depthIncreaseCount, depth, i) => {
    return i === 0 ? depthIncreaseCount : depthIncreaseCount + (depth > report[i - 1] ? 1 : 0);
  }, 0);
}
