export const QueueOrder = {
  ASC: 1,
  DESC: -1,
};

export class PriorityQueue {
  items;
  order;
  weightProp;

  constructor(items, weightProp, order = QueueOrder.ASC) {
    this.items = items;
    this.weightProp = weightProp;
    this.order = order;
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

    if (this.order === QueueOrder.ASC) {
      while (low < high) {
        let mid = (low + high) >>> 1;

        if (this.items[mid][this.weightProp] < item[this.weightProp]) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
    } else {
      while (low < high) {
        let mid = (low + high) >>> 1;

        if (this.items[mid][this.weightProp] > item[this.weightProp]) {
          low = mid + 1;
        } else {
          high = mid;
        }
      }
    }

    this.items.splice(low, 0, item);
  }
}
