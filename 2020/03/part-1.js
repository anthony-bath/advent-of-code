import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 3, 1];

const map = read(YEAR, DAY, PART).map((line) => line.split(''));

const WIDTH = map[0].length;
const HEIGHT = map.length;

let treesEncountered = 0;

const position = { x: 0, y: 0 };

while (position.y < HEIGHT) {
  const { x, y } = position;

  if (map[y][x] === '#') {
    treesEncountered += 1;
  }

  position.x += 3;
  position.y += 1;

  if (position.x >= WIDTH) {
    position.x = position.x % WIDTH;
  }
}

write(YEAR, DAY, PART, treesEncountered);
