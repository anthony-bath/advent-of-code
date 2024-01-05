import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 3, 1];

const [wire1, wire2] = readOld(YEAR, DAY, PART).map((path) => path.split(','));

function getMoveParts(move) {
  const dir = move.substring(0, 1);
  const dist = Number(move.substring(1));

  return [dir, dist];
}

function getDelta(dir, dist) {
  switch (dir) {
    case 'R':
      return [dist, 0];
    case 'L':
      return [-dist, 0];
    case 'U':
      return [0, dist];
    case 'D':
      return [0, -dist];
  }
}

let [w1x, w1y, w2x, w2y] = [0, 0, 0, 0];
const w1Locations = new Set();
const w2Locations = new Set();

for (let i = 0; i < wire1.length; i++) {
  let [w1dir, w1dist] = getMoveParts(wire1[i]);

  switch (w1dir) {
    case 'R':
      while (w1dist > 0) {
        w1Locations.add(`${w1x++}|${w1y}`);
        w1dist--;
      }
      break;

    case 'L':
      while (w1dist > 0) {
        w1Locations.add(`${w1x--}|${w1y}`);
        w1dist--;
      }
      break;

    case 'U':
      while (w1dist > 0) {
        w1Locations.add(`${w1x}|${w1y++}`);
        w1dist--;
      }

    case 'D':
      while (w1dist > 0) {
        w1Locations.add(`${w1x}|${w1y--}`);
        w1dist--;
      }
  }

  let [w2dir, w2dist] = getMoveParts(wire2[i]);

  switch (w2dir) {
    case 'R':
      while (w2dist > 0) {
        w2Locations.add(`${w2x++}|${w2y}`);
        w2dist--;
      }
      break;

    case 'L':
      while (w2dist > 0) {
        w2Locations.add(`${w2x--}|${w2y}`);
        w2dist--;
      }
      break;

    case 'U':
      while (w2dist > 0) {
        w2Locations.add(`${w2x}|${w2y++}`);
        w2dist--;
      }

    case 'D':
      while (w2dist > 0) {
        w2Locations.add(`${w2x}|${w2y--}`);
        w2dist--;
      }
  }
}

const intersections = new Set([...w1Locations].filter((xy) => w2Locations.has(xy)));
intersections.delete('0|0');

const result = Math.min(
  ...[...intersections].map((coords) => {
    const [x, y] = coords.split('|');

    return Math.abs(Number(x)) + Math.abs(Number(y));
  })
);

write(YEAR, DAY, PART, result);
