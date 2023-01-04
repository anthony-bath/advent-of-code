import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2020, 24, 1];

const expr = /(se|sw|ne|nw|w|e)/g;

const deltas = {
  se: [0, 1],
  sw: [-1, 1],
  ne: [1, -1],
  nw: [0, -1],
  e: [1, 0],
  w: [-1, 0],
};

const tiles = new Set();

read(YEAR, DAY).forEach((path) => {
  const moves = path.match(expr);
  let [x, y] = [0, 0];

  moves.forEach((move) => {
    let [dx, dy] = deltas[move];

    x += dx;
    y += dy;
  });

  const key = `${x}-${y}`;

  if (tiles.has(key)) {
    tiles.delete(key);
  } else {
    tiles.add(key);
  }
});

write(YEAR, DAY, PART, tiles.size);
