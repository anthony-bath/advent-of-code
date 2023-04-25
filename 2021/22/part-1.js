import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2021, 22, 1];

const input = read(YEAR, DAY, PART).slice(0, 20);

const reactor = Array(100)
  .fill(0)
  .map(() =>
    Array(100)
      .fill(0)
      .map(() => Array(100).fill(0))
  );

for (const line of input) {
  const turnOn = line.startsWith('on');
  const [x1, x2, y1, y2, z1, z2] = line.match(/-?\d+/g).map((n) => Number(n));

  for (let z = z1; z <= z2; z++) {
    for (let y = y1; y <= y2; y++) {
      for (let x = x1; x <= x2; x++) {
        reactor[z + 50][y + 50][x + 50] = turnOn ? 1 : 0;
      }
    }
  }
}

let count = 0;

for (let z = 0; z < 100; z++) {
  for (let y = 0; y < 100; y++) {
    for (let x = 0; x < 100; x++) {
      if (reactor[z][y][x] === 1) count++;
    }
  }
}

write(YEAR, DAY, PART, count);
