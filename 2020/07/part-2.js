import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 7, 2];

const expr = /^(?<quantity>\d) (?<type>.+) bags?\.?/;
const bagsByType = new Map();

read(YEAR, DAY).forEach((line) => {
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

function dfs(type) {
  const { contains } = bagsByType.get(type);

  return (
    1 +
    contains.reduce((sum, containedBag) => sum + containedBag.quantity * dfs(containedBag.type), 0)
  );
}

const result = dfs('shiny gold') - 1;

write(YEAR, DAY, PART, result);
