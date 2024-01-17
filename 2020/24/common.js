export const expr = /(se|sw|ne|nw|w|e)/g;

export const deltas = {
  se: [0, 1],
  sw: [-1, 1],
  ne: [1, -1],
  nw: [0, -1],
  e: [1, 0],
  w: [-1, 0],
};
