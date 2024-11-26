import { Point3D, manhattan3D } from '../../utilities/math.js';

const { abs, floor, max, min } = Math;

export class Robot {
  constructor(location, radius) {
    this.location = location;
    this.radius = radius;
  }

  inRangeOfPoint(point) {
    return manhattan3D(point, this.location) <= this.radius;
  }
}

export class Box {
  constructor(p1, p2) {
    this.w = abs(p1.x - p2.x);
    this.d = abs(p1.y - p2.y);
    this.h = abs(p1.z - p2.z);

    const xd = floor(this.w / 2);
    const yd = floor(this.d / 2);
    const zd = floor(this.h / 2);

    this.points = [
      // Bottom
      new Point3D(p1.x, p1.y, p1.z),
      new Point3D(p1.x + xd, p1.y, p1.z),
      new Point3D(p2.x, p1.y, p1.z),
      new Point3D(p1.x, p1.y + yd, p1.z),
      new Point3D(p1.x + xd, p1.y + yd, p1.z),
      new Point3D(p2.x, p1.y + yd, p1.z),
      new Point3D(p1.x, p2.y, p1.z),
      new Point3D(p1.x + xd, p2.y, p1.z),
      new Point3D(p2.x, p2.y, p1.z),
      // Center
      new Point3D(p1.x, p1.y, p1.z + zd),
      new Point3D(p1.x + xd, p1.y, p1.z + zd),
      new Point3D(p2.x, p1.y, p1.z + zd),
      new Point3D(p1.x, p1.y + yd, p1.z + zd),
      new Point3D(p1.x + xd, p1.y + yd, p1.z + zd),
      new Point3D(p2.x, p1.y + yd, p1.z + zd),
      new Point3D(p1.x, p2.y, p1.z + zd),
      new Point3D(p1.x + xd, p2.y, p1.z + zd),
      new Point3D(p2.x, p2.y, p1.z + zd),
      // Top
      new Point3D(p1.x, p1.y, p2.z),
      new Point3D(p1.x + xd, p1.y, p2.z),
      new Point3D(p2.x, p1.y, p2.z),
      new Point3D(p1.x, p1.y + yd, p2.z),
      new Point3D(p1.x + xd, p1.y + yd, p2.z),
      new Point3D(p2.x, p1.y + yd, p2.z),
      new Point3D(p1.x, p2.y, p2.z),
      new Point3D(p1.x + xd, p2.y, p2.z),
      new Point3D(p2.x, p2.y, p2.z),
    ];
  }

  volume() {
    return this.w * this.h * this.d;
  }

  divide() {
    const pairs = [
      [1, 14],
      [2, 15],
      [4, 17],
      [5, 18],
      [10, 23],
      [11, 24],
      [13, 26],
      [14, 27],
    ];

    return pairs.map(([p1, p2]) => new Box(this.points[p1 - 1], this.points[p2 - 1]));
  }

  inRangeOfRobot({ location, radius }) {
    const p1 = this.points[0];
    const p2 = this.points[26];

    // Determine the closest point on the cube to the sphere center point
    const closestPoint = new Point3D(
      max(p1.x, min(location.x, p2.x)),
      max(p1.y, min(location.y, p2.y)),
      max(p1.z, min(location.z, p2.z))
    );

    // Check if the distance is less than or equal to the sphere radius
    return manhattan3D(closestPoint, location) <= radius;
  }
}
