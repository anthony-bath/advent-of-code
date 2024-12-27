import { getReactions } from './common.js';

export function part2({ lines }) {
  const reactions = getReactions(lines);
  let inventory = new Map();

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

  let availableOre = 1000000000000;
  let low = Math.floor(availableOre / getCost('FUEL', 1));
  let high = availableOre;

  while (low < high) {
    const mid = Math.round((low + high) / 2);

    inventory = new Map();

    if (getCost('FUEL', mid) < availableOre) {
      low = mid;
    } else {
      high = mid - 1;
    }
  }

  return low;
}
