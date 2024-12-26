import { getInputElements, sortCarts } from './common.js';

export function part1({ lines }) {
  let { carts, track } = getInputElements(lines);
  let collision = null;

  while (true) {
    carts.sort(sortCarts);

    for (const cart of carts) {
      cart.tick(track);
      collision = carts.find((c) => c !== cart && c.x === cart.x && c.y === cart.y);

      if (collision) {
        break;
      }
    }

    if (collision) {
      break;
    }
  }

  return `${collision.x},${collision.y}`;
}
