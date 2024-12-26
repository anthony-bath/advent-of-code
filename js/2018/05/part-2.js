const { abs } = Math;

export function part2({ data }) {
  const polymer = data.split('').map((c) => c.charCodeAt(0));

  function react(polymer) {
    let index = 1;

    while (index < polymer.length) {
      const l1 = polymer[index];
      const l2 = polymer[index - 1];

      if (abs(l1 - l2) === 32) {
        polymer.splice(index - 1, 2);
        index--;
      } else {
        index++;
      }
    }

    return polymer;
  }

  let min = Infinity;

  const basePolymer = react(polymer);

  for (let unit = 65; unit <= 90; unit++) {
    const result = react(basePolymer.filter((x) => x !== unit && x !== unit + 32)).length;

    if (result < min) {
      min = result;
    }
  }

  return min;
}
