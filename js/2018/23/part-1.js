import { Point3D, manhattan3D } from '../../../utilities/math.js';
import { Robot } from './common.js';

export function part1({ lines }) {
  const robots = lines
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

  return inRangeCount;
}
