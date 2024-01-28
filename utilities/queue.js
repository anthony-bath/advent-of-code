export class PriorityQueue {
  items;
  comparator;

  constructor(initial, comparator) {
    if (Array.isArray(initial)) {
      this.items = initial;
    } else {
      this.items = [initial];
    }

    this.comparator = comparator;
  }

  isNotEmpty() {
    return this.items.length > 0;
  }

  next() {
    return this.items.shift();
  }

  insert(item) {
    let low = 0;
    let high = this.items.length;

    while (low < high) {
      let mid = (low + high) >>> 1;

      if (this.comparator(this.items[mid], item) < 0) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }

    this.items.splice(low, 0, item);
  }
}
