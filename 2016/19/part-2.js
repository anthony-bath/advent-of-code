class Elf {
  constructor(id, prev) {
    this.id = id;
    this.next = null;
    this.prev = prev;
  }
}

export function part2({ data }) {
  const n = Number(data);
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
  let mid = elves.get(Math.floor(1 + elves.size / 2));
  let flip = false;

  while (elves.size > 1) {
    const removedPrev = mid.prev;
    const removedNext = mid.next;
    removedPrev.next = removedNext;
    removedNext.prev = removedPrev;

    elves.delete(mid.id);

    if (flip) {
      mid = mid.next;
    } else {
      mid = mid.next.next;
    }

    flip = !flip;
    currentElf = currentElf.next;
  }

  return currentElf.id;
}
