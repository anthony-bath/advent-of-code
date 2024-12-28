export function part2({ grid }) {
  const W = grid[0].length;
  const H = grid.length;

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
      if (grid[this.y][this.x] === '#') {
        this.treesEncountered++;
      }

      this.x += this.xDelta;
      this.y += this.yDelta;

      if (this.x >= W) this.x = this.x % W;
      if (this.y >= H) this.atBottom = true;
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

  return slopes.reduce((result, slope) => result * slope.treesEncountered, 1);
}
