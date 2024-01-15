export function part1({ lines }) {
  const joltages = lines.map(Number).sort((a, b) => a - b);

  joltages.unshift(0); // source
  joltages.push(joltages[joltages.length - 1] + 3); // built-in adapter

  const differences = [0, 0, 0];

  for (let i = 1; i < joltages.length; i++) {
    differences[joltages[i] - joltages[i - 1] - 1]++;
  }

  return differences[0] * differences[2];
}
