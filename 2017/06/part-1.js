export function part1({ data }) {
  const banks = data.split('\t').map(Number);

  const seen = {};
  let cycles = 0;

  while (true) {
    const key = banks.join('|');

    if (key in seen) {
      break;
    } else {
      seen[key] = 1;
    }

    let distribution = Math.max(...banks);
    let index = banks.indexOf(distribution);
    banks[index] = 0;

    while (distribution > 0) {
      let nextIndex = index + 1;

      if (nextIndex >= banks.length) {
        nextIndex = 0;
      }

      banks[nextIndex]++;
      distribution--;
      index = nextIndex;
    }

    cycles++;
  }

  return cycles;
}
