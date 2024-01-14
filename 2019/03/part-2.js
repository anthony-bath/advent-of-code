export function part2({ lines }) {
  const [wire1, wire2] = lines.map((path) => path.split(','));

  function getMoveParts(move) {
    const dir = move.substring(0, 1);
    const dist = Number(move.substring(1));

    return [dir, dist];
  }

  let [w1x, w1y, w1steps, w2x, w2y, w2steps] = [0, 0, 0, 0, 0, 0];
  const w1Locations = new Map();
  const w2Locations = new Map();

  for (let i = 0; i < wire1.length; i++) {
    let [w1dir, w1dist] = getMoveParts(wire1[i]);

    switch (w1dir) {
      case 'R':
        while (w1dist > 0) {
          w1Locations.set(`${w1x++}|${w1y}`, w1steps++);
          w1dist--;
        }
        break;

      case 'L':
        while (w1dist > 0) {
          w1Locations.set(`${w1x--}|${w1y}`, w1steps++);
          w1dist--;
        }
        break;

      case 'U':
        while (w1dist > 0) {
          w1Locations.set(`${w1x}|${w1y++}`, w1steps++);
          w1dist--;
        }

      case 'D':
        while (w1dist > 0) {
          w1Locations.set(`${w1x}|${w1y--}`, w1steps++);
          w1dist--;
        }
    }

    let [w2dir, w2dist] = getMoveParts(wire2[i]);

    switch (w2dir) {
      case 'R':
        while (w2dist > 0) {
          w2Locations.set(`${w2x++}|${w2y}`, w2steps++);
          w2dist--;
        }
        break;

      case 'L':
        while (w2dist > 0) {
          w2Locations.set(`${w2x--}|${w2y}`, w2steps++);
          w2dist--;
        }
        break;

      case 'U':
        while (w2dist > 0) {
          w2Locations.set(`${w2x}|${w2y++}`, w2steps++);
          w2dist--;
        }

      case 'D':
        while (w2dist > 0) {
          w2Locations.set(`${w2x}|${w2y--}`, w2steps++);
          w2dist--;
        }
    }
  }

  const intersections = new Set([...w1Locations.keys()].filter((xy) => w2Locations.has(xy)));
  intersections.delete('0|0');

  const result = Math.min(
    ...[...intersections].map((coords) => {
      return w1Locations.get(coords) + w2Locations.get(coords);
    })
  );

  return result;
}
