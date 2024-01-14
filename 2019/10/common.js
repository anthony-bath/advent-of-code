export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  isPartOfLine(line) {
    const { p1, p2 } = line;

    if (line.vertical) {
      return this.x === line.x && this.y > Math.min(p1.y, p2.y) && this.y < Math.max(p1.y, p2.y);
    } else {
      const diff = this.y - (line.m * this.x + line.b);
      if (diff > 1e-10 || diff < -1e-10) return false;

      return this.x > Math.min(p1.x, p2.x) && this.x < Math.max(p1.x, p2.x);
    }
  }
}

export class Line {
  constructor(p1, p2) {
    this.p1 = p1;
    this.p2 = p2;

    if (p1.x === p2.x) {
      // Vertical Line
      this.vertical = true;
      this.x = p1.x;
      this.m = Infinity;
    } else {
      this.m = (p2.y - p1.y) / (p2.x - p1.x);
      this.b = p1.y - this.m * p1.x;
    }
  }
}
