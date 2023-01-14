import { write } from '../../utilities/io.js';
import { loadData } from './common.js';

const [YEAR, DAY, PART] = [2022, 5, 1];

const { stacks, instructions } = loadData(PART);

instructions.forEach(([amount, sourceStackNumber, targetStackNumber]) => {
  const sourceStack = stacks[sourceStackNumber - 1];
  const targetStack = stacks[targetStackNumber - 1];
  const movedItems = sourceStack.splice(0, amount);

  targetStack.unshift(...movedItems.reverse());
});

write(YEAR, DAY, PART, stacks.map((stack) => stack[0]).join(''));
