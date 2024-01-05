import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 24, 2];

class Component {
  constructor([left, right]) {
    this.used = false;
    this.left = left;
    this.right = right;
    this.strength = left + right;
  }
}

const components = readOld(YEAR, DAY, PART).map(
  (line) => new Component(line.split('/').map((n) => Number(n)))
);

let maxLength = -Infinity;
let maxStrengthOfLongest = -Infinity;

function dfs(connector, strength, length) {
  maxLength = Math.max(length, maxLength);

  if (length === maxLength) {
    maxStrengthOfLongest = Math.max(maxStrengthOfLongest, strength);
  }

  for (const c of components) {
    if (!c.used && (c.left === connector || c.right === connector)) {
      c.used = true;
      dfs(c.left === connector ? c.right : c.left, strength + c.strength, length + 1);
      c.used = false;
    }
  }

  return maxStrengthOfLongest;
}

write(YEAR, DAY, PART, dfs(0, 0, 0));
