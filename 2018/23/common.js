import { Point3D, manhattan3D } from '../../utilities/math.js';

export class Box {
  constructor(p1, p2) {
    this.w = Math.abs(p1.x - p2.x);
    this.d = Math.abs(p1.y - p2.y);
    this.h = Math.abs(p1.z - p2.z);

    const xd = Math.floor(this.w / 2);
    const yd = Math.floor(this.d / 2);
    const zd = Math.floor(this.h / 2);

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
    return this.points.some((point) => manhattan3D(point, location) <= radius);
  }

  minDistanceToOrigin() {
    return Math.min(...this.points.map((point) => manhattan3D(point, { x: 0, y: 0, z: 0 })));
  }
}

// export class Box {
//   constructor(p1, p2) {
//     this.fbl = p1;
//     this.fbr = new Point3D(p2.x, p1.y, p1.z);
//     this.ftl = new Point3D(p1.x, p1.y, p2.z);
//     this.ftr = new Point3D(p2.x, p1.y, p2.z);
//     this.bbl = new Point3D(p1.x, p2.y, p1.z);
//     this.bbr = new Point3D(p2.x, p2.y, p1.z);
//     this.btl = new Point3D(p1.x, p2.y, p2.z);
//     this.btr = p2;

//     this.w = Math.abs(p1.x - p2.x);
//     this.d = Math.abs(p1.y - p2.y);
//     this.h = Math.abs(p1.z - p2.z);

//     const wd = Math.floor(this.w / 2);
//     const dd = Math.floor(this.d / 2);
//     const hd = Math.floor(this.h / 2);

//     // Front Face
//     this.flc = new Point3D(p1.x, p1.y, p1.z + hd);
//     this.fbc = new Point3D(p1.x + wd, p1.y, p1.z);
//     this.frc = new Point3D(p2.x, p1.y, p1.z + hd);
//     this.fmc = new Point3D(p1.x + wd, p1.y, p1.z + hd);
//     this.ftc = new Point3D(p1.x + wd, p1.y, p2.z);

//     // Left Face
//     this.lbc = new Point3D(p1.x, p1.y + dd, p1.z);
//     this.lmc = new Point3D(p1.x, p1.y + dd, p1.z + hd);
//     this.ltc = new Point3D(p1.x, p1.y + dd, p2.z);

//     // Back Face
//     this.blc = new Point3D(p1.x, p2.y, p1.z + hd);
//     this.bbc = new Point3D(p1.x + wd, p2.y, p1.z);
//     this.brc = new Point3D(p2.x, p2.y, p1.z + hd);
//     this.bmc = new Point3D(p1.x + wd, p2.y, p1.z + hd);
//     this.btc = new Point3D(p1.x + wd, p2.y, p2.z);

//     // Right Face
//     this.rbc = new Point3D(p2.x, p1.y + dd, p1.z);
//     this.rmc = new Point3D(p2.x, p1.y + dd, p1.y + hd);
//     this.rtc = new Point3D(p2.x, p1.y + dd, p2.z);

//     // Bottom Face
//     this.bc = new Point3D(p1.x + wd, p1.y + dd, p1.z);

//     // Top Face
//     this.tc = new Point3D(p1.x + wd, p1.y + dd, p2.z);

//     // Center
//     this.c = new Point3D(p1.x + wd, p1.y + dd, p1.z + hd);
//   }

//   divide() {
//     return [
//       // Bottom 4
//       new Box(this.fbl, this.c),
//       new Box(this.lbc, this.bmc),
//       new Box(this.fbc, this.rmc),
//       new Box(this.bc, this.brc),
//       // Top 4
//       new Box(this.flc, this.tc),
//       new Box(this.lmc, this.btc),
//       new Box(this.fmc, this.rtc),
//       new Box(this.c, this.btr),
//     ];
//   }

//   volume() {
//     return this.w * this.d * this.h;
//   }

//   minDistanceToPoint(point) {
//     return Math.min(
//       manhattan3D(this.fbl, point),
//       manhattan3D(this.ftl, point),
//       manhattan3D(this.fbr, point),
//       manhattan3D(this.ftr, point),
//       manhattan3D(this.bbl, point),
//       manhattan3D(this.btl, point),
//       manhattan3D(this.bbr, point),
//       manhattan3D(this.btr, point)
//     );
//   }
// }
