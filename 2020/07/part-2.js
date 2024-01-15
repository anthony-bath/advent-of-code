import { getBagsByType } from './common.js';

export function part2({ lines }) {
  const bagsByType = getBagsByType(lines);

  function dfs(type) {
    const { contains } = bagsByType.get(type);

    return (
      1 +
      contains.reduce(
        (sum, containedBag) => sum + containedBag.quantity * dfs(containedBag.type),
        0
      )
    );
  }

  const result = dfs('shiny gold') - 1;

  return result;
}
