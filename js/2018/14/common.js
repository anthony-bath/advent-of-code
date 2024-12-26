export class Recipe {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }

  setNext(next) {
    this.next = next;
    return this;
  }

  setPrev(prev) {
    this.prev = prev;
    return this;
  }
}

export function advance(pointer) {
  let steps = 1 + pointer.value;

  while (steps > 0) {
    pointer = pointer.next;
    steps--;
  }

  return pointer;
}
