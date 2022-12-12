import { read, write } from '../utility.js';

const map = read(3).map((line) => line.split(''));

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

write(3, 1, `${treesEncountered}`);
