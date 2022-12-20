import { read, write } from '../utility.js';

const MULTIPLIER = 811589153;
const input = read(20);

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

const nodes = input.map((value) => new Node(Number(value) * MULTIPLIER));
const LENGTH = nodes.length;
let head;

for (let i = 0; i < LENGTH; i++) {
  nodes[i].next = i < LENGTH - 1 ? nodes[i + 1] : nodes[0];
  nodes[i].previous = i > 0 ? nodes[i - 1] : nodes[LENGTH - 1];

  if (nodes[i].value === 0) {
    head = nodes[i];
  }
}

function mix() {
  for (let i = 0; i < LENGTH; i++) {
    const current = nodes[i];

    if (current.value > 0) {
      moveNodeForward(current);
    } else if (current.value < 0) {
      moveNodeBackward(current);
    }
  }
}

console.time();
for (let i = 0; i < 10; i++) {
  mix();
}

const values = getValues([1000, 2000, 3000], head);
console.timeEnd();
write(20, 2, values.reduce((sum, value) => sum + value, 0).toString());

function moveNodeForward(node) {
  const fullCycles = Math.floor(node.value / (LENGTH - 1));
  let moves = node.value - fullCycles * (LENGTH - 1);

  while (moves > 0) {
    const tempPrev = node.previous;
    const tempNext = node.next;

    tempPrev.next = tempNext;
    node.next = tempNext.next;
    tempNext.next.previous = node;
    node.previous = tempNext;
    tempNext.next = node;
    tempNext.previous = tempPrev;

    moves--;
  }
}

function moveNodeBackward(node) {
  const value = Math.abs(node.value);
  const fullCycles = Math.floor(value / (LENGTH - 1));
  let moves = value - fullCycles * (LENGTH - 1);

  while (moves > 0) {
    const tempNext = node.next;
    const tempPrev = node.previous;

    tempPrev.previous.next = node;
    node.previous = tempPrev.previous;
    node.next = tempPrev;
    tempPrev.next = tempNext;
    tempPrev.previous = node;
    tempNext.previous = tempPrev;

    moves--;
  }
}

function getValues(indices, head) {
  const output = [];
  let index = 0;
  let current = head;

  while (output.length < indices.length) {
    if (indices.includes(index)) {
      output.push(current.value);
    }

    index++;
    current = current.next;
  }

  return output;
}

function print(node) {
  const output = [];
  for (let i = 0; i < LENGTH; i++) {
    output.push(node.value);
    node = node.next;
  }

  console.log(output.join(', '));
}
