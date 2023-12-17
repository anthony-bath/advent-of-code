export const DIR = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
};

export const deltas = [
  [-1, 0, DIR.LEFT],
  [0, -1, DIR.UP],
  [1, 0, DIR.RIGHT],
  [0, 1, DIR.DOWN],
];

export function key(current) {
  const { x, y, direction, steps } = current;
  return `${x}|${y}|${direction}|${steps}`;
}

export function insertIntoSortedQueue(queue, state) {
  let low = 0;
  let high = queue.length;

  while (low < high) {
    let mid = (low + high) >>> 1;

    if (queue[mid].heatLoss < state.heatLoss) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }

  queue.splice(low, 0, state);
}
