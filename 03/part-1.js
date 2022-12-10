import { read, write } from '../utility.js';
import { generatePriorityMap } from './common.js';

const priorityMap = generatePriorityMap();

const prioritySum = read(3).reduce((sum, rucksack) => {
  const items = rucksack.split('');
  const compartment1 = new Set([...items.slice(0, items.length / 2)]);

  for (let i = items.length / 2; i < items.length; i++) {
    if (compartment1.has(items[i])) {
      return (sum += priorityMap.get(items[i]));
    }
  }

  return sum;
}, 0);

write(3, 1, `${prioritySum}`);
