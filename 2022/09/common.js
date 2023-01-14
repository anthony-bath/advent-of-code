import { read } from '../../utilities/io.js';

const [YEAR, DAY] = [2022, 9];

export class Knot {
  constructor(x, y, link) {
    this.x = x;
    this.y = y;
    this.link = link;
    this.positions = new Set([`${this.x},${this.y}`]);
  }

  isTouchingLinkedKnot() {
    const { x, y } = this.link;
    return Math.abs(this.x - x) <= 1 && Math.abs(this.y - y) <= 1;
  }

  pull(direction) {
    for (const dirPart of direction.split('')) {
      switch (dirPart) {
        case 'R':
          this.x += 1;
          break;
        case 'L':
          this.x -= 1;
          break;
        case 'U':
          this.y += 1;
          break;
        case 'D':
          this.y -= 1;
          break;
      }
    }

    this.positions.add(`${this.x},${this.y}`);

    if (this.link && !this.isTouchingLinkedKnot()) {
      const direction = this.link.getDirectionToKnot(this);
      this.link.pull(direction);
    }
  }

  getDirectionToKnot(knot) {
    const directions = [];
    const { x, y } = knot;

    if (x > this.x) directions.push('R');
    if (x < this.x) directions.push('L');
    if (y > this.y) directions.push('U');
    if (y < this.y) directions.push('D');

    return directions.join('');
  }
}
