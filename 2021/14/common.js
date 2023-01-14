import { read } from '../../utilities/io.js';

const [YEAR, DAY] = [2021, 14];

export class Node {
  constructor(element) {
    this.element = element;
  }

  setNext(n) {
    this.next = n;
  }
}

export const loadData = (part) => {
  const data = read(YEAR, DAY, part).map((line) => line.trim());

  const template = data[0];

  const rules = new Map();
  data.slice(2).forEach((rule) => {
    const [pair, insert] = rule.split(' -> ');
    rules.set(pair, insert);
  });

  if (part === 1) {
    let start = new Node(template[0]);
    let current = start;

    for (let i = 1; i < template.length; i++) {
      const next = new Node(template[i]);
      current.setNext(next);
      current = next;
    }

    return { rules, start };
  } else {
    let pairs = new Map();

    for (let i = 0; i < template.length - 1; i++) {
      const pair = template.slice(i, i + 2);

      if (!pairs.has(pair)) {
        pairs.set(pair, 1);
      } else {
        pairs.set(pair, pairs.get(pair) + 1);
      }
    }

    return { template, rules, pairs };
  }
};

export const getElementDifference = (elements) => {
  const sorted = [...elements.values()].sort((a, b) => b - a);
  return sorted.shift() - sorted.pop();
};
