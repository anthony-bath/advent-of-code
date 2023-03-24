import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 11, 1];

const deltas = {
  n: [0, 1, -1],
  ne: [1, 0, -1],
  se: [1, -1, 0],
  s: [0, -1, 1],
  sw: [-1, 0, 1],
  nw: [-1, 1, 0],
};

let [q, s, r] = [0, 0, 0];

read(YEAR, DAY, PART, { splitBy: ',' }).forEach((move) => {
  const [dq, ds, dr] = deltas[move];
  [q, s, r] = [q + dq, s + ds, r + dr];
});

write(YEAR, DAY, PART, Math.max(Math.abs(q), Math.abs(s), Math.abs(r)));
