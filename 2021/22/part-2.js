import { read, write } from '../../utilities/io.js';

// NB. May require --max-old-space-size=8192 to run

const [YEAR, DAY, PART] = [2021, 22, 2];

const X_VALUES = [];
const Y_VALUES = [];
const Z_VALUES = [];

const instructions = read(YEAR, DAY, PART).map((line) => {
  const range = line.match(/-?\d+/g).map((n) => Number(n));
  let [x1, x2, y1, y2, z1, z2] = range;

  X_VALUES.push(x1, ++x2);
  Y_VALUES.push(y1, ++y2);
  Z_VALUES.push(z1, ++z2);

  return { value: line.startsWith('on') ? 1 : 0, range: [x1, x2, y1, y2, z1, z2] };
});

X_VALUES.sort((a, b) => a - b);
Y_VALUES.sort((a, b) => a - b);
Z_VALUES.sort((a, b) => a - b);

const SIZE = X_VALUES.length;

const reactor = Array(SIZE)
  .fill()
  .map(() =>
    Array(SIZE)
      .fill()
      .map(() => Array(SIZE).fill(0))
  );

for (const { range, value } of instructions) {
  const [x1, x2, y1, y2, z1, z2] = range;

  const xStart = X_VALUES.indexOf(x1);
  const xEnd = X_VALUES.indexOf(x2);
  const yStart = Y_VALUES.indexOf(y1);
  const yEnd = Y_VALUES.indexOf(y2);
  const zStart = Z_VALUES.indexOf(z1);
  const zEnd = Z_VALUES.indexOf(z2);

  for (let x = xStart; x < xEnd; x++) {
    for (let y = yStart; y < yEnd; y++) {
      for (let z = zStart; z < zEnd; z++) {
        reactor[x][y][z] = value;
      }
    }
  }
}

let count = 0;

for (let x = 0; x < SIZE - 1; x++) {
  for (let y = 0; y < SIZE - 1; y++) {
    for (let z = 0; z < SIZE - 1; z++) {
      if (!reactor[x][y][z]) continue;

      const width = X_VALUES[x + 1] - X_VALUES[x];
      const height = Y_VALUES[y + 1] - Y_VALUES[y];
      const depth = Z_VALUES[z + 1] - Z_VALUES[z];

      count += width * height * depth;
    }
  }
}

write(YEAR, DAY, PART, count);
