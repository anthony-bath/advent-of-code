export function gcd(x, y, ...z) {
  if (!y && z.length > 0) {
    return gcd(x, ...z);
  }

  if (!y) {
    return x;
  }

  return gcd(y, x % y, ...z);
}

export function lcm(x, y, ...z) {
  if (z.length === 0) {
    return (x * y) / gcd(x, y);
  }

  return lcm((x * y) / gcd(x, y), ...z);
}

export function manhattan(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y);
}

export class Point {
  constructor(x, y) {
    this.x = Number(x);
    this.y = Number(y);
  }

  equals(point) {
    return this.x === point.x && this.y === point.y;
  }
}
