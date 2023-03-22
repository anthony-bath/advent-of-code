import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 17, 1];

const steps = Number(read(YEAR, DAY, PART, { splitBy: null }));

class Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

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

write(YEAR, DAY, PART, current.next.value);
