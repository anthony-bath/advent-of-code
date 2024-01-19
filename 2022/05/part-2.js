import { getInputElements } from './common.js';

export function part2({ lines }) {
  const { stacks, instructions } = getInputElements(lines);

  instructions.forEach(([amount, sourceStackNumber, targetStackNumber]) => {
    const sourceStack = stacks[sourceStackNumber - 1];
    const targetStack = stacks[targetStackNumber - 1];
    const movedItems = sourceStack.splice(0, amount);

    targetStack.unshift(...movedItems);
  });

  return stacks.map((stack) => stack[0]).join('');
}
