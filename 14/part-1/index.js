import fs from "fs";
import { Node, loadData, getElementDifference } from "../util/index.js";

const { rules, start } = loadData(1);
let current = start;
const STEPS = 10;

for (let step = 0; step < STEPS; step++) {
  while (current.next) {
    const next = current.next;
    const pair = `${current.element}${next.element}`;
    const insert = new Node(rules.get(pair));

    current.setNext(insert);
    insert.setNext(next);
    current = next;
  }

  current = start;
}

const elements = new Map();
current = start;

while (current.next) {
  if (!elements.has(current.element)) {
    elements.set(current.element, 1);
  } else {
    elements.set(current.element, elements.get(current.element) + 1);
  }

  current = current.next;
}

if (!elements.has(current.element)) {
  elements.set(current.element, 1);
} else {
  elements.set(current.element, elements.get(current.element) + 1);
}

fs.writeFileSync(
  "./14/part-1/output.txt",
  getElementDifference(elements).toString()
);
