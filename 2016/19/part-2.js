import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 19, 2];

const n = Number(read(YEAR, DAY, PART, { splitBy: null }));

class Elf {
  constructor(id, prev) {
    this.id = id;
    this.next = null;
    this.prev = prev;
  }
}

const elves = new Map();
const head = new Elf(1);

elves.set(1, head);

for (let i = 2; i <= n; i++) {
  const elf = new Elf(i, elves.get(i - 1));

  elves.set(i, elf);
  elves.get(i - 1).next = elf;
}

elves.get(n).next = head;
head.prev = elves.get(n);

let currentElf = head;

while (elves.size > 1) {
  let steps = Math.floor(elves.size / 2);
  let stolenElf = currentElf;

  while (steps > 0) {
    stolenElf = stolenElf.next;
    steps--;
  }

  const prevElf = stolenElf.prev;
  const nextElf = stolenElf.next;

  prevElf.next = nextElf;
  nextElf.prev = prevElf;

  elves.delete(stolenElf.id);

  currentElf = currentElf.next;
}

write(YEAR, DAY, PART, currentElf.id);
