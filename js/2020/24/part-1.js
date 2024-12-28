import { expr, deltas } from './common.js';

export function part1({ lines }) {
  const tiles = new Set();

  lines.forEach((path) => {
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

  return tiles.size;
}
