import { readOld, write } from '../../utilities/io.js';
import { moveNodeForward, moveNodeBackward, getValues, Node } from './common.js';

const [YEAR, DAY, PART] = [2022, 20, 2];

const MULTIPLIER = 811589153;

const input = readOld(YEAR, DAY, PART);
const nodes = input.map((value) => new Node(Number(value) * MULTIPLIER));

const LENGTH = nodes.length;
const MIX_COUNT = 10;

let head;

for (let i = 0; i < LENGTH; i++) {
  nodes[i].next = i < LENGTH - 1 ? nodes[i + 1] : nodes[0];
  nodes[i].previous = i > 0 ? nodes[i - 1] : nodes[LENGTH - 1];

  if (nodes[i].value === 0) {
    head = nodes[i];
  }
}

const iterations = LENGTH * MIX_COUNT;

for (let i = 0; i < iterations; i++) {
  const current = nodes[i % LENGTH];

  if (current.value > 0) {
    moveNodeForward(current, LENGTH);
  } else if (current.value < 0) {
    moveNodeBackward(current, LENGTH);
  }
}

write(
  YEAR,
  DAY,
  PART,
  getValues([1000, 2000, 3000], head).reduce((sum, value) => sum + value, 0)
);
