export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.previous = null;
  }
}

export function moveNodeForward(node, length) {
  let moves = node.value % (length - 1);
  if (moves === 0) return;

  const oldNext = node.next;
  const oldPrev = node.previous;
  let target = node;

  while (moves > 0) {
    target = target.next;
    moves--;
  }

  oldNext.previous = oldPrev;
  oldPrev.next = oldNext;

  node.next = target.next;
  target.next.previous = node;
  target.next = node;
  node.previous = target;
}

export function moveNodeBackward(node, length) {
  let moves = Math.abs(node.value) % (length - 1);
  if (moves === 0) return;

  const oldNext = node.next;
  const oldPrev = node.previous;
  let target = node;

  while (moves > 0) {
    target = target.previous;
    moves--;
  }

  oldNext.previous = oldPrev;
  oldPrev.next = oldNext;

  target.previous.next = node;
  node.next = target;
  node.previous = target.previous;
  target.previous = node;
}

export function getValues(indices, head) {
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
