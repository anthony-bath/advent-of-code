import fs from 'fs';
import { generatePriorityMap } from './common';

const priorityMap = generatePriorityMap();
const groups = [];
let currentGroup = [];

fs.readFileSync('./03/input.txt')
  .toString()
  .split('\n')
  .forEach((rucksack) => {
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

fs.writeFileSync('./03/output-2.txt', `${prioritySum}`);
