class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

export function part1({ data }) {
  const steps = Number(data);
  const head = new Node(0);
  head.next = head;

  let current = head;

  for (let i = 1; i < 2018; i++) {
    for (let step = 0; step < steps; step++) {
      current = current.next;
    }

    const node = new Node(i, current.next);

    current.next = node;
    current = node;
  }

  return current.next.value;
}
