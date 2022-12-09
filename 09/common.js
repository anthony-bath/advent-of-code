import fs from 'fs';

export const directions = fs
  .readFileSync('./09/input.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    const [direction, distance] = line.split(' ');
    return direction.repeat(parseInt(distance)).split('');
  })
  .flat();

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

  pull(directions) {
    for (const direction of directions.split('')) {
      switch (direction) {
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

    if (this.link) {
      if (!this.isTouchingLinkedKnot()) {
        const directions = this.link.getDirectionsToKnot(this);
        directions.forEach((direction) => this.link.pull(direction));
      }
    }
  }

  getDirectionsToKnot(knot) {
    const directions = [];
    const { x, y } = knot;

    if (x > this.x) directions.push('R');
    if (x < this.x) directions.push('L');
    if (y > this.y) directions.push('U');
    if (y < this.y) directions.push('D');

    return [directions.join('')];
  }
}
