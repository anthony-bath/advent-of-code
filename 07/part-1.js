import { read, write } from '../utility.js';

const expr = /^(?<quantity>\d) (?<type>.+) bags?\.?/;
const bagsByType = new Map();

read(7).forEach((line) => {
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

  let count = 0;

  if (
    contains.map((contains) => contains.type).includes('shiny gold') ||
    contains.reduce((count, containedBag) => count + dfs(containedBag.type), 0) > 0
  ) {
    count = 1;
  }

  return count;
}

let result = 0;

for (const [key] of bagsByType) {
  result += dfs(key);
}

write(7, 1, result);
