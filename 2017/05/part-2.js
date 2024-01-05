import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 5, 2];

const maze = readOld(YEAR, DAY, PART).map((n) => Number(n));

let location = 0;
let steps = 0;

while (location < maze.length) {
  const offset = maze[location];

  if (offset >= 3) {
    maze[location]--;
  } else {
    maze[location]++;
  }

  location += offset;
  steps++;
}

write(YEAR, DAY, PART, steps);
