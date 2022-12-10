import { write } from '../utility.js';
import { loadData } from './common.js';

const { stacks, instructions } = loadData();

instructions.forEach(([amount, sourceStackNumber, targetStackNumber]) => {
  const sourceStack = stacks[sourceStackNumber - 1];
  const targetStack = stacks[targetStackNumber - 1];
  const movedItems = sourceStack.splice(0, amount);

  targetStack.unshift(...movedItems.reverse());
});

write(5, 1, `${stacks.map((stack) => stack[0]).join('')}`);
