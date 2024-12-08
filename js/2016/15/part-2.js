export function part2({ lines }) {
  const expr = /\d+/g;

  const discs = lines.map((line) => {
    const [id, positions, _, startPosition] = line.match(expr).map((n) => Number(n));
    return { id, positions, startPosition };
  });

  discs.push({ id: 7, positions: 11, startPosition: 0 });

  let time = 1;

  while (true) {
    if (
      discs.every(
        ({ id, positions, startPosition }) => (time + id + startPosition) % positions === 0
      )
    ) {
      break;
    }

    time++;
  }

  return time;
}
