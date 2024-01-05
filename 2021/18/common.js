import { readOld } from '../../utilities/io.js';

const [YEAR, DAY] = [2021, 18];

export const loadData = (part) => {
  const fishData = readOld(YEAR, DAY, part).map((line) => JSON.parse(line.trim()));
  return fishData.map((data) => new Fish(data, 1));
};

export default class Fish {
  constructor(data, depth, parent) {
    const [left, right] = data;

    this.depth = depth;
    this.parent = parent;
    this.left = Array.isArray(left) ? new Fish(left, depth + 1, this) : left;
    this.right = Array.isArray(right) ? new Fish(right, depth + 1, this) : right;
    this.numeric = Number.isInteger(this.left) && Number.isInteger(this.right);
  }

  data() {
    return [
      this.left instanceof Fish ? this.left.data() : this.left,
      this.right instanceof Fish ? this.right.data() : this.right,
    ];
  }

  magnitude() {
    return (
      3 * (this.left instanceof Fish ? this.left.magnitude() : this.left) +
      2 * (this.right instanceof Fish ? this.right.magnitude() : this.right)
    );
  }

  add(fish) {
    return this.reduce(new Fish([this.data(), fish.data()], 1));
  }

  reduce(fish) {
    let order, explode, split;

    do {
      order = this.getOrder(fish);
      explode = this.getExplodeFish(order);
      split = this.getSplitFish(order);

      if (explode) {
        this.explode(explode.fish, order);
      } else if (split) {
        this.split(split.fish);
      }
    } while (explode || split);

    return fish;
  }

  explode(explodedFish, order) {
    const leftIndex = order.findIndex(
      (result) => result.fish == explodedFish && result.side === 'left'
    );
    const rightIndex = order.findIndex(
      (result) => result.fish == explodedFish && result.side === 'right'
    );

    if (leftIndex > 0) {
      const { fish, side } = order[leftIndex - 1];
      fish[side] += explodedFish.left;
    }

    if (rightIndex < order.length - 1) {
      const { fish, side } = order[rightIndex + 1];
      fish[side] += explodedFish.right;
    }

    if (explodedFish.parent.right === explodedFish) {
      explodedFish.parent.right = 0;
    } else {
      explodedFish.parent.left = 0;
    }
  }

  split(splitFish) {
    const side = splitFish.left >= 10 ? 'left' : 'right';
    const val = splitFish[side];
    const newFish = new Fish(
      [Math.floor(val / 2), Math.ceil(val / 2)],
      splitFish.depth + 1,
      splitFish
    );

    splitFish[side] = newFish;
  }

  getOrder(fish) {
    const order = [];

    search(fish);

    function search(fish) {
      if (fish.left instanceof Fish) {
        search(fish.left);
      } else {
        order.push({ fish, side: 'left' });
      }

      if (fish.right instanceof Fish) {
        search(fish.right);
      } else {
        order.push({ fish, side: 'right' });
      }
    }

    return order;
  }

  getExplodeFish(order) {
    return order.find(({ fish: { depth, numeric } }) => numeric && depth >= 5);
  }

  getSplitFish(order) {
    return order.find(({ fish: { left, right } }) => left >= 10 || right >= 10);
  }

  toString() {
    return `[${this.left instanceof Fish ? this.left.toString() : this.left},${
      this.right instanceof Fish ? this.right.toString() : this.right
    }]`;
  }
}
