export function part2({ lines }) {
  const joltages = lines.map(Number).sort((a, b) => a - b);

  joltages.unshift(0); // source
  joltages.push(joltages[joltages.length - 1] + 3); // built-in adapter

  const cache = {};

  function getPaths(index) {
    if (index === joltages.length - 1) return 1;
    if (cache[index]) return cache[index];

    let count = 0;

    for (let j = index + 1; joltages[j] - joltages[index] <= 3; j++) {
      count += getPaths(j);
    }

    cache[index] = count;
    return count;
  }

  return getPaths(0);
}
