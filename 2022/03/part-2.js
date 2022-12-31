import { read, write } from '../../utility.js';
import { generatePriorityMap } from './common.js';

const [YEAR, DAY, PART] = [2022, 3, 2];

const priorityMap = generatePriorityMap();
const groups = [];
let currentGroup = [];

read(YEAR, DAY).forEach((rucksack) => {
  currentGroup.push(rucksack);

  if (currentGroup.length === 3) {
    groups.push([...currentGroup]);
    currentGroup = [];
  }
});

const prioritySum = groups.reduce((sum, [r1, r2, r3]) => {
  const r2Set = new Set([...r2.split('')]);
  const r1r2Intersection = new Set([...r1.split('').filter((item) => r2Set.has(item))]);
  const commonItem = [...r3.split('').filter((item) => r1r2Intersection.has(item))][0];

  return (sum += priorityMap.get(commonItem));
}, 0);

write(YEAR, DAY, PART, prioritySum);
