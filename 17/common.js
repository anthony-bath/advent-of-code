const CAVERN_WIDTH = 7;
const MINUS_ROCK_TEMPLATE = {
  id: 'm',
  points: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ],
};

const PLUS_ROCK_TEMPLATE = {
  id: 'p',
  points: [
    [1, 2],
    [0, 1],
    [1, 1],
    [2, 1],
    [1, 0],
  ],
};

const L_ROCK_TEMPLATE = {
  id: 'l',
  points: [
    [2, 2],
    [2, 1],
    [0, 0],
    [1, 0],
    [2, 0],
  ],
};

const I_ROCK_TEMPLATE = {
  id: 'i',
  points: [
    [0, 3],
    [0, 2],
    [0, 1],
    [0, 0],
  ],
};

const SQUARE_ROCK_TEMPLATE = {
  id: 's',
  points: [
    [0, 1],
    [1, 1],
    [0, 0],
    [1, 0],
  ],
};

export const TEMPLATE_SPAWN_ORDER = [
  MINUS_ROCK_TEMPLATE,
  PLUS_ROCK_TEMPLATE,
  L_ROCK_TEMPLATE,
  I_ROCK_TEMPLATE,
  SQUARE_ROCK_TEMPLATE,
];

export class Rock {
  constructor(template) {
    this.template = template;
    this.points = [];
    this.atRest = false;
    this.restRow = null;
  }

  spawn(offsetX, offsetY) {
    this.points = this.template.points.map(([x, y]) => ({
      x: x + offsetX,
      y: y + offsetY,
    }));
  }

  getMaxVerticalPoint() {
    return Math.max(...this.points.map((point) => point.y));
  }

  fall(occupiedPoints) {
    if (
      this.points
        .map(({ x, y }) => ({ x, y: y - 1 }))
        .some(({ x, y }) => y < 0 || occupiedPoints[`${x},${y}`])
    ) {
      this.atRest = true;
      this.points.forEach(({ x, y }) => (occupiedPoints[`${x},${y}`] = 1));
      const minY = Math.min(...this.points.map((point) => point.y));
      this.restRow = [...Array(7).keys()].map((x) => occupiedPoints[`${x},${minY}`] || '.');
    } else {
      this.points = this.points.map(({ x, y }) => ({ x, y: y - 1 }));
    }
  }

  blow(direction, occupiedPoints) {
    switch (direction) {
      case '<':
        if (
          this.points
            .map(({ x, y }) => ({
              x: x - 1,
              y,
            }))
            .some(({ x, y }) => x < 0 || occupiedPoints[`${x},${y}`])
        ) {
          return;
        } else {
          this.points = this.points.map(({ x, y }) => ({
            x: x - 1,
            y,
          }));
        }
        break;

      case '>':
        if (
          this.points
            .map(({ x, y }) => ({
              x: x + 1,
              y,
            }))
            .some(({ x, y }) => x > CAVERN_WIDTH - 1 || occupiedPoints[`${x},${y}`])
        ) {
          return;
        } else {
          this.points = this.points.map(({ x, y }) => ({
            x: x + 1,
            y,
          }));
        }

        break;
    }
  }
}
