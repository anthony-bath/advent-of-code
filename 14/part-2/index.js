import fs from "fs";
import { loadData, getElementDifference } from "../util/index.js";

let { template, rules, pairs } = loadData(2);
const STEPS = 40;

for (let step = 0; step < STEPS; step++) {
  const nextPairs = new Map(pairs);

  for (const [pair, count] of pairs.entries()) {
    const insert = rules.get(pair);
    const newPairs = [`${pair[0]}${insert}`, `${insert}${pair[1]}`];

    newPairs.forEach((newPair) => {
      if (!nextPairs.has(newPair)) {
        nextPairs.set(newPair, count);
      } else {
        nextPairs.set(newPair, nextPairs.get(newPair) + count);
      }
    });

    if (nextPairs.get(pair) === count) {
      nextPairs.delete(pair);
    } else {
      nextPairs.set(pair, nextPairs.get(pair) - count);
    }
  }

  pairs = nextPairs;
}

const elements = new Map();

// Get raw count of all elements
for (const [pair, count] of pairs.entries()) {
  const pairElements = pair.split("");

  pairElements.forEach((element) => {
    if (!elements.has(element)) {
      elements.set(element, count);
    } else {
      elements.set(element, elements.get(element) + count);
    }
  });
}

// Account for first and last template elements and then
// halve all counts to account for the pair overlapping
for (const element of elements.keys()) {
  if (element === template[0]) {
    elements.set(element, elements.get(element) + 1);
  }

  if (element === template[template.length - 1]) {
    elements.set(element, elements.get(element) + 1);
  }

  elements.set(element, elements.get(element) / 2);
}

fs.writeFileSync(
  "./14/part-2/output.txt",
  getElementDifference(elements).toString()
);
