import fs from 'fs';

export const movements = fs
  .readFileSync('./09/input.txt', 'utf-8')
  .split('\n')
  .map((line) => {
    const [direction, distance] = line.split(' ');
    return direction.repeat(parseInt(distance)).split('');
  })
  .flat();

export class Point {
  constructor(x, y, child) {
    this.x = x;
    this.y = y;
    this.child = child;
    this.positions = new Set([`${this.x},${this.y}`]);
  }

  isAdjacentToPoint(point) {
    return Math.abs(this.x - point.x) <= 1 && Math.abs(this.y - point.y) <= 1;
  }

  applyMovement(direction) {
    for (const dir of direction.split('')) {
      switch (dir) {
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

    if (this.child) {
      if (!this.isAdjacentToPoint(this.child)) {
        const childMovements = this.child.getMovementsToPoint(this);

        for (const movement of childMovements) {
          this.child.applyMovement(movement);
        }
      }
    }
  }

  getMovementsToPoint(point) {
    if (point.x > this.x && point.y > this.y) {
      return ['RU'];
    }

    if (point.x > this.x && point.y < this.y) {
      return ['RD'];
    }

    if (point.x > this.x && point.y === this.y) {
      return ['R'];
    }

    if (point.x < this.x && point.y === this.y) {
      return ['L'];
    }

    if (point.x < this.x && point.y > this.y) {
      return ['LU'];
    }

    if (point.x < this.x && point.y < this.y) {
      return ['LD'];
    }

    if (point.x === this.x && point.y > this.y) {
      return ['U'];
    }

    if (point.x === this.x && point.y < this.y) {
      return ['D'];
    }
  }
}
