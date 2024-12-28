import { expr, deltas } from './common.js';

export function part2({ lines }) {
  const black = new Set();
  const neighborKeysByKey = new Map();

  function getKey(x, y) {
    return `${x}|${y}`;
  }

  function getNeighborKeys(key) {
    if (!neighborKeysByKey.has(key)) {
      const [x, y] = key.split('|').map((n) => Number(n));

      neighborKeysByKey.set(
        key,
        Object.values(deltas).map(([dx, dy]) => getKey(x + dx, y + dy))
      );
    }

    return neighborKeysByKey.get(key);
  }

  lines.forEach((path) => {
    const moves = path.match(expr);
    let [x, y] = [0, 0];

    moves.forEach((move) => {
      let [dx, dy] = deltas[move];

      x += dx;
      y += dy;
    });

    const key = getKey(x, y);

    if (black.has(key)) {
      black.delete(key);
    } else {
      black.add(key);
    }
  });

  const DAYS = 100;

  for (let day = 0; day < DAYS; day++) {
    const toFlip = new Set();
    const toUnflip = new Set();
    const queue = new Set(black);

    for (const key of black) {
      for (const neighborKey of getNeighborKeys(key)) {
        queue.add(neighborKey);
      }
    }

    for (const key of queue) {
      const isBlack = black.has(key);
      const blackNeighborCount = getNeighborKeys(key).reduce(
        (count, neighbor) => count + (black.has(neighbor) ? 1 : 0),
        0
      );

      if (isBlack && (blackNeighborCount === 0 || blackNeighborCount > 2)) {
        toUnflip.add(key);
      } else if (!isBlack && blackNeighborCount === 2) {
        toFlip.add(key);
      }
    }

    for (const key of toFlip) {
      black.add(key);
    }

    for (const key of toUnflip) {
      black.delete(key);
    }
  }

  return black.size;
}
