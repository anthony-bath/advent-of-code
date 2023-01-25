import { sum } from '../../utilities/array.js';
import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 8, 2];

const input = read(YEAR, DAY, PART, { splitBy: ' ' }).map((n) => Number(n));

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

const root = buildNode(input);

write(YEAR, DAY, PART, root.value());
