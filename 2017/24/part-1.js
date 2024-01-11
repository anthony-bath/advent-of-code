import { Component } from './common.js';

export function part1({ lines }) {
  const components = lines.map((line) => new Component(line.split('/').map((n) => Number(n))));

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

  return dfs(0, 0);
}
