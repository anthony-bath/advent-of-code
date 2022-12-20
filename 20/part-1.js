import { read, write } from '../utility.js';
import {
  moveNodeForward,
  moveNodeBackward,
  getValues,
  Node,
} from './common.js';

const input = read(20);
const nodes = input.map((value) => new Node(Number(value)));

const LENGTH = nodes.length;

let head;

for (let i = 0; i < LENGTH; i++) {
  nodes[i].next = i < LENGTH - 1 ? nodes[i + 1] : nodes[0];
  nodes[i].previous = i > 0 ? nodes[i - 1] : nodes[LENGTH - 1];

  if (nodes[i].value === 0) {
    head = nodes[i];
  }
}

console.time();
for (let i = 0; i < LENGTH; i++) {
  const current = nodes[i];

  if (current.value > 0) {
    moveNodeForward(current, LENGTH);
  } else if (current.value < 0) {
    moveNodeBackward(current, LENGTH);
  }
}
console.timeEnd();

write(
  20,
  1,
  getValues([1000, 2000, 3000], head)
    .reduce((sum, value) => sum + value, 0)
    .toString()
);
