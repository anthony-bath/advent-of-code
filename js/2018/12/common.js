export function getInputElements(lines) {
  const pots = new Map();
  const rules = new Map();

  lines.forEach((line) => {
    if (!line) return;
    if (line.startsWith('initial')) {
      const [, , data] = line.split(' ');
      [...data].forEach((pot, i) => pots.set(i, pot === '#' ? 1 : 0));
    } else {
      const [rule, output] = line.split(' => ');
      rules.set(
        parseInt([...rule].map((pot) => (pot === '#' ? 1 : 0)).join(''), 2),
        output === '#' ? 1 : 0
      );
    }
  });

  return { pots, rules };
}
