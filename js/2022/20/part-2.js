import { moveNodeForward, moveNodeBackward, getValues, Node } from './common.js';

export function part2({ lines }) {
  const MULTIPLIER = 811589153;
  const nodes = lines.map((value) => new Node(Number(value) * MULTIPLIER));

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

  return getValues([1000, 2000, 3000], head).reduce((sum, value) => sum + value, 0);
}
