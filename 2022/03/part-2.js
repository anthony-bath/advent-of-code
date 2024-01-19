import { priorityMap } from './common.js';

export function part2({ lines }) {
  const groups = [];
  let currentGroup = [];

  lines.forEach((rucksack) => {
    currentGroup.push(rucksack);

    if (currentGroup.length === 3) {
      groups.push([...currentGroup]);
      currentGroup = [];
    }
  });

  return groups.reduce((sum, [r1, r2, r3]) => {
    const r2Set = new Set([...r2.split('')]);
    const r1r2Intersection = new Set([...r1.split('').filter((item) => r2Set.has(item))]);
    const commonItem = [...r3.split('').filter((item) => r1r2Intersection.has(item))][0];

    return (sum += priorityMap.get(commonItem));
  }, 0);
}
