import { write } from '../../utilities/io.js';
import { loadData, sortCarts } from './common.js';

const [YEAR, DAY, PART] = [2018, 13, 2];

let { carts, track } = loadData(PART);

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

write(YEAR, DAY, PART, `${carts[0].x},${carts[0].y}`);
