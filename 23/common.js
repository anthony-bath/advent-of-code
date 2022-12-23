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

const N = [0, -1];
const NW = [-1, -1];
const NE = [1, -1];
const S = [0, 1];
const SW = [-1, 1];
const SE = [1, 1];
const W = [-1, 0];
const E = [1, 0];

export const ALL_MOVES = [N, S, W, E, NW, NE, SW, SE];

export const NORTH_MOVES = [N, NW, NE];
export const SOUTH_MOVES = [S, SW, SE];
export const WEST_MOVES = [W, NW, SW];
export const EAST_MOVES = [E, NE, SE];
