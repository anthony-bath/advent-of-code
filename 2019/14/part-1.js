import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 14, 1];

const reactions = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [inputs, output] = line.split(' => ');
  const [quantity, element] = output.split(' ');

  const input = inputs.split(', ').map((part) => {
    const [quantity, element] = part.split(' ');
    return { element, quantity: Number(quantity) };
  });

  reactions.set(element, { output: Number(quantity), input });
});

const inventory = new Map();

function getCost(element, quantity) {
  if (inventory.has(element)) {
    const available = inventory.get(element);

    if (available === quantity) {
      inventory.delete(element);
      return 0;
    } else if (available > quantity) {
      inventory.set(element, available - quantity);
      return 0;
    } else {
      quantity -= available;
      inventory.delete(element);
    }
  }

  const reaction = reactions.get(element);
  const multiplier = Math.ceil(quantity / reaction.output);
  const output = multiplier * reaction.output;

  if (output > quantity) {
    inventory.set(element, output - quantity);
  }

  if (reaction.input[0].element === 'ORE') {
    return multiplier * reaction.input[0].quantity;
  }

  return reaction.input.reduce((cost, { element: el, quantity: quant }) => {
    return cost + getCost(el, multiplier * quant);
  }, 0);
}

write(YEAR, DAY, PART, getCost('FUEL', 1));
