export function part1({ lines }) {
  const expr = /\d+/g;

  const discs = lines.map((line) => {
    const [id, positions, _, startPosition] = line.match(expr).map((n) => Number(n));
    return { id, positions, startPosition };
  });

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
