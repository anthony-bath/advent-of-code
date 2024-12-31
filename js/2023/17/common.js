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
