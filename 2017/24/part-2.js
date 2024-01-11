import { Component } from './common.js';

export function part2({ lines }) {
  const components = lines.map((line) => new Component(line.split('/').map((n) => Number(n))));

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

  return dfs(0, 0, 0);
}
