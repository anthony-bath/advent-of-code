import { sum } from '../../utilities/array.js';

export function part2({ data }) {
  const input = data.split(' ').map(Number);
  const root = buildNode(input);

  return root.value();
}

class TreeNode {
  constructor(children, metadata) {
    this.children = children;
    this.metadata = metadata;
  }

  value() {
    if (this.children.length === 0) {
      return sum(this.metadata);
    } else {
      const values = [];

      for (const entry of this.metadata) {
        if (entry === 0) continue;
        if (entry > this.children.length) continue;

        values.push(this.children[entry - 1].value());
      }

      return sum(values);
    }
  }
}

function buildNode(data) {
  const [childrenCount, metadataCount] = data.splice(0, 2);
  const children = [];

  if (childrenCount > 0) {
    for (let i = 0; i < childrenCount; i++) {
      children.push(buildNode(data));
    }
  }

  return new TreeNode(children, data.splice(0, metadataCount));
}
