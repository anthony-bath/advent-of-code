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

export function manhattan3D(p1, p2) {
  return Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y) + Math.abs(p1.z - p2.z);
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

export class Point3D {
  constructor(x, y, z) {
    this.x = Number(x);
    this.y = Number(y);
    this.z = Number(z);
  }
}

export function factors(num) {
  const isEven = num % 2 === 0;
  const max = Math.sqrt(num);
  const inc = isEven ? 1 : 2;
  const output = [1, num];

  for (let curFactor = isEven ? 2 : 3; curFactor <= max; curFactor += inc) {
    if (num % curFactor !== 0) continue;

    output.push(curFactor);
    const compliment = num / curFactor;

    if (compliment !== curFactor) output.push(compliment);
  }

  return output;
}
