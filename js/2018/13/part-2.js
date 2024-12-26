import { getInputElements, sortCarts } from './common.js';

export function part2({ lines }) {
  let { carts, track } = getInputElements(lines);

  while (carts.length > 1) {
    carts.sort(sortCarts);
    const toRemove = [];

    for (const cart of carts) {
      cart.tick(track);
      const collidedCart = carts.find(
        (c) => c !== cart && !toRemove.includes(c) && c.x === cart.x && c.y === cart.y
      );

      if (collidedCart) {
        toRemove.push(cart, collidedCart);
      }
    }

    carts = carts.filter((c) => !toRemove.includes(c));
  }

  return `${carts[0].x},${carts[0].y}`;
}
