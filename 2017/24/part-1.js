import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 24, 1];

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

function dfs(connector, strength) {
  const strengths = [strength];

  for (const c of components) {
    if (!c.used && (c.left === connector || c.right === connector)) {
      c.used = true;
      strengths.push(dfs(c.left === connector ? c.right : c.left, strength + c.strength));
      c.used = false;
    }
  }

  return Math.max(...strengths);
}

write(YEAR, DAY, PART, dfs(0, 0));
