import { getReactions } from './common.js';

export function part1({ lines }) {
  const reactions = getReactions(lines);
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

  return getCost('FUEL', 1);
}
