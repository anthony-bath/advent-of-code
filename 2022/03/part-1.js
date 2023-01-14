import { read, write } from '../../utilities/io.js';
import { generatePriorityMap } from './common.js';

const [YEAR, DAY, PART] = [2022, 3, 1];

const priorityMap = generatePriorityMap();

const prioritySum = read(YEAR, DAY, PART).reduce((sum, rucksack) => {
  const items = rucksack.split('');
  const compartment1 = new Set([...items.slice(0, items.length / 2)]);

  for (let i = items.length / 2; i < items.length; i++) {
    if (compartment1.has(items[i])) {
      return (sum += priorityMap.get(items[i]));
    }
  }

  return sum;
}, 0);

write(YEAR, DAY, PART, prioritySum);
