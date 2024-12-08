export function part1({ data }) {
  const delta = { v: [0, 1], '^': [0, -1], '<': [-1, 0], '>': [1, 0] };
  const presentsByCoord = { '0|0': 1 };
  let [x, y] = [0, 0];

  data.split('').forEach((dir) => {
    const [dx, dy] = delta[dir];
    x += dx;
    y += dy;
    const nextKey = `${x}|${y}`;

    if (!(nextKey in presentsByCoord)) {
      presentsByCoord[nextKey] = 1;
    } else {
      presentsByCoord[nextKey]++;
    }
  });

  return Object.keys(presentsByCoord).length;
}
