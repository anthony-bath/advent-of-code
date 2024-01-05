import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 23, 2];

class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.previous = prev;
  }
}

const input = readOld(YEAR, DAY, PART, { splitBy: '' }).map((n) => Number(n));
const cups = [];

cups[input[0]] = new Node(input[0]);

for (const [index, cup] of input.entries()) {
  if (index === 0) continue;

  const prev = cups[input[index - 1]];
  const node = new Node(cup, null, prev);
  cups[cup] = node;
  prev.next = node;
}

const MAX = 1000000;

for (let x = 10; x <= MAX; x++) {
  const prev = x === 10 ? cups[input[input.length - 1]] : cups[x - 1];
  const node = new Node(x, null, prev);
  cups[x] = node;
  prev.next = node;
}

const first = cups[input[0]];
const last = cups[MAX];

first.prev = last;
last.next = first;

const MOVES = 10000000;
let currentCup = first;

for (let move = 0; move < MOVES; move++) {
  const pickup = [];
  const pickupLabels = [];
  let temp = currentCup.next;

  while (pickup.length < 3) {
    pickup.push(temp);
    pickupLabels.push(temp.value);
    temp = temp.next;
  }

  let destinationLabel = currentCup.value - 1;

  while (pickupLabels.includes(destinationLabel) || destinationLabel <= 0) {
    destinationLabel--;

    if (destinationLabel < 1) {
      destinationLabel = MAX;
    }
  }

  const destinationCup = cups[destinationLabel];

  currentCup.next = pickup[2].next;
  pickup[0].prev = destinationCup;
  pickup[2].next = destinationCup.next;
  destinationCup.next = pickup[0];

  currentCup = currentCup.next;
}

const one = cups[1];

write(YEAR, DAY, PART, one.next.value * one.next.next.value);
