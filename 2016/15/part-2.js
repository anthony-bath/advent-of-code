import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 15, 2];

const expr = /\d+/g;

const discs = read(YEAR, DAY, PART).map((line) => {
  const [id, positions, _, startPosition] = line.match(expr).map((n) => Number(n));
  return { id, positions, startPosition };
});

discs.push({ id: 7, positions: 11, startPosition: 0 });

let time = 1;

while (true) {
  if (
    discs.every(({ id, positions, startPosition }) => (time + id + startPosition) % positions === 0)
  ) {
    break;
  }

  time++;
}

write(YEAR, DAY, PART, time);
