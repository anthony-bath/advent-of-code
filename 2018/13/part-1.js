import { write } from '../../utilities/io.js';
import { loadData, sortCarts } from './common.js';

const [YEAR, DAY, PART] = [2018, 13, 1];

let { carts, track } = loadData(PART);
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

write(YEAR, DAY, PART, `${collision.x},${collision.y}`);
