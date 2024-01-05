import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 22, 1];

const nodes = new Map();
const expr = /\d+/g;

readOld(YEAR, DAY, PART).forEach((line) => {
  const matches = line.match(expr);

  if (matches) {
    const [x, y, size, used, avail, useP] = matches.map((n) => Number(n));
    nodes.set(`${x}|${y}`, { x, y, size, used, avail, useP });
  }
});

const pairs = new Set();

for (const [key1, node1] of nodes) {
  for (const [key2, node2] of nodes) {
    if (node1 === node2 || node1.used === 0) continue;

    if (node1.used <= node2.avail) {
      pairs.add(`${key1}^${key2}`);
    }
  }
}

write(YEAR, DAY, PART, pairs.size);
