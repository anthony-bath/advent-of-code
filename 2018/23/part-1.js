import { readOld, write } from '../../utilities/io.js';
import { Point3D, manhattan3D } from '../../utilities/math.js';

const [YEAR, DAY, PART] = [2018, 23, 1];

class Robot {
  constructor(location, radius) {
    this.location = location;
    this.radius = radius;
  }
}

const robots = readOld(YEAR, DAY, PART)
  .map((line) => {
    const [x, y, z, r] = line.match(/-?\d+/g).map((n) => Number(n));
    return new Robot(new Point3D(x, y, z), r);
  })
  .sort((r1, r2) => r2.radius - r1.radius);

let inRangeCount = 1;

for (let i = 1; i < robots.length; i++) {
  if (manhattan3D(robots[0].location, robots[i].location) <= robots[0].radius) {
    inRangeCount++;
  }
}

write(YEAR, DAY, PART, inRangeCount);
