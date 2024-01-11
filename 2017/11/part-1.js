export function part1({ data }) {
  const deltas = {
    n: [0, 1, -1],
    ne: [1, 0, -1],
    se: [1, -1, 0],
    s: [0, -1, 1],
    sw: [-1, 0, 1],
    nw: [-1, 1, 0],
  };

  let [q, s, r] = [0, 0, 0];

  data.split(',').forEach((move) => {
    const [dq, ds, dr] = deltas[move];
    [q, s, r] = [q + dq, s + ds, r + dr];
  });

  return Math.max(Math.abs(q), Math.abs(s), Math.abs(r));
}
