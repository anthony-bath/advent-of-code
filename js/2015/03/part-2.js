export function part2({ data }) {
  const delta = { v: [0, 1], '^': [0, -1], '<': [-1, 0], '>': [1, 0] };
  const presentsByCoord = { '0|0': 2 };
  const santas = { [true]: [0, 0], [false]: [0, 0] };
  let flip = true;

  data.split('').forEach((dir) => {
    const [dx, dy] = delta[dir];
    const [x, y] = santas[flip];
    const nextX = x + dx;
    const nextY = y + dy;

    santas[flip] = [nextX, nextY];
    const nextKey = `${nextX}|${nextY}`;

    if (!(nextKey in presentsByCoord)) {
      presentsByCoord[nextKey] = 1;
    } else {
      presentsByCoord[nextKey]++;
    }

    flip = !flip;
  });

  return Object.keys(presentsByCoord).length;
}
