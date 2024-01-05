import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2020, 3, 2];

const map = readOld(YEAR, DAY, PART).map((line) => line.split(''));

const WIDTH = map[0].length;
const HEIGHT = map.length;

class Slope {
  constructor(xDelta, yDelta) {
    this.xDelta = xDelta;
    this.yDelta = yDelta;
    this.x = 0;
    this.y = 0;

    this.treesEncountered = 0;
    this.atBottom = false;
  }

  progress() {
    if (map[this.y][this.x] === '#') {
      this.treesEncountered++;
    }

    this.x += this.xDelta;
    this.y += this.yDelta;

    if (this.x >= WIDTH) this.x = this.x % WIDTH;
    if (this.y >= HEIGHT) this.atBottom = true;
  }
}

const slopes = [
  new Slope(1, 1),
  new Slope(3, 1),
  new Slope(5, 1),
  new Slope(7, 1),
  new Slope(1, 2),
];

while (slopes.some((slope) => !slope.atBottom)) {
  slopes.forEach((slope) => {
    if (!slope.atBottom) {
      slope.progress();
    }
  });
}

write(
  YEAR,
  DAY,
  PART,
  slopes.reduce((result, slope) => result * slope.treesEncountered, 1)
);
