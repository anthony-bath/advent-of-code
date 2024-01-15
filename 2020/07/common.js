export function getBagsByType(lines) {
  const expr = /^(?<quantity>\d) (?<type>.+) bags?\.?/;
  const bagsByType = new Map();

  lines.forEach((line) => {
    const [type, others] = line.split(' bags contain ');
    const contains = [];

    others.split(', ').forEach((bag) => {
      const match = bag.match(expr);

      if (match) {
        const { quantity, type } = match.groups;
        contains.push({ type, quantity: Number(quantity) });

        if (!bagsByType.has(type)) {
          bagsByType.set(type, { type, contains: [] });
        }
      }
    });

    bagsByType.set(type, { type, contains });
  });

  return bagsByType;
}
