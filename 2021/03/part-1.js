export function part1({ lines }) {
  const report = lines.map((x) => x.trim());
  const bitCounts = [];

  for (const entry of report) {
    [...entry].forEach((value, bit) => {
      if (!bitCounts[bit]) {
        bitCounts[bit] = [0, 0];
      }

      bitCounts[bit][parseInt(value)]++;
    });
  }

  let gamma = '';
  let epsilon = '';

  for (const [low, high] of bitCounts) {
    if (high > low) {
      gamma += '1';
      epsilon += '0';
    } else {
      gamma += '0';
      epsilon += '1';
    }
  }

  return parseInt(gamma, 2) * parseInt(epsilon, 2);
}
