export function getInputElements(lines) {
  const rules = new Map();
  const messages = [];

  lines.forEach((line) => {
    if (!line) return;
    if (/^\d/.test(line)) {
      const [number, rule] = line.split(': ');

      if (rule.startsWith('"')) {
        rules.set(number, rule.substring(1, 2));
      } else {
        if (rule.includes('|')) {
          const combos = rule.split(' | ');
          rules.set(
            number,
            combos.map((combo) => combo.split(' '))
          );
        } else {
          rules.set(number, [rule.split(' ')]);
        }
      }
    } else {
      messages.push(line);
    }
  });

  return { rules, messages };
}
