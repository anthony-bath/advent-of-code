export class Elf {
  constructor([x, y]) {
    this.location = new Point([x, y]);
    this.proposed = null;
  }

  propose(proposed) {
    this.proposed = proposed;
  }

  moveToProposal() {
    this.location = this.proposed;
  }
}

export class Point {
  constructor([x, y]) {
    this.x = x;
    this.y = y;
  }

  add([x, y]) {
    return new Point([this.x + x, this.y + y]);
  }

  toString() {
    return `${this.x},${this.y}`;
  }
}

export const NORTH_MOVES = [
  [0, -1], //N
  [-1, -1], //NW
  [1, -1], //NE
];

export const SOUTH_MOVES = [
  [0, 1], //S
  [-1, 1], //SW
  [1, 1], //SE
];

export const WEST_MOVES = [
  [-1, 0], //W
  [-1, -1], //NW
  [-1, 1], //SW
];

export const EAST_MOVES = [
  [1, 0], //E
  [1, -1], //NE
  [1, 1], //SE
];
