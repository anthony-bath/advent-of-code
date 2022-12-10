import fs from 'fs';
import { write } from '../utility.js';
import { loadData } from './common.js';

const { stacks, instructions } = loadData();

instructions.forEach(([amount, sourceStackNumber, targetStackNumber]) => {
  const sourceStack = stacks[sourceStackNumber - 1];
  const targetStack = stacks[targetStackNumber - 1];
  const movedItems = sourceStack.splice(0, amount);

  targetStack.unshift(...movedItems);
});

write(5, 2, `${stacks.map((stack) => stack[0]).join('')}`);
