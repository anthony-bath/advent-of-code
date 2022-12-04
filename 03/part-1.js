import fs from 'fs';
import { generatePriorityMap } from './common';

const priorityMap = generatePriorityMap();

const prioritySum = fs
  .readFileSync('./03/input.txt')
  .toString()
  .split('\n')
  .reduce((sum, rucksack) => {
    const items = rucksack.split('');
    const compartment1 = new Set([...items.slice(0, items.length / 2)]);

    for (let i = items.length / 2; i < items.length; i++) {
      if (compartment1.has(items[i])) {
        return (sum += priorityMap.get(items[i]));
      }
    }

    return sum;
  }, 0);

fs.writeFileSync('./03/output-1.txt', `${prioritySum}`);
