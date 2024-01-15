import { getBagsByType } from './common.js';

export function part1({ lines }) {
  const bagsByType = getBagsByType(lines);

  function dfs(type) {
    const { contains } = bagsByType.get(type);

    let count = 0;

    if (
      contains.map((contains) => contains.type).includes('shiny gold') ||
      contains.reduce((count, containedBag) => count + dfs(containedBag.type), 0) > 0
    ) {
      count = 1;
    }

    return count;
  }

  let result = 0;

  for (const [key] of bagsByType) {
    result += dfs(key);
  }

  return result;
}
