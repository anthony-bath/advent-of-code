import { read, write } from '../../utilities/io.js';
import { Point3D, manhattan3D } from '../../utilities/math.js';
import { Box } from './common.js';

const [YEAR, DAY, PART] = [2018, 23, 2];

class Robot {
  constructor(location, radius) {
    this.location = location;
    this.radius = radius;
  }

  inRangeOfBox(box) {
    return [box.fbl, box.ftl, box.fbr, box.ftr, box.bbl, box.btl, box.bbr, box.btr].some(
      (p) => manhattan3D(this.location, p) <= this.radius
    );
  }
}

let [minX, maxX, minY, maxY, minZ, maxZ] = [
  Infinity,
  -Infinity,
  Infinity,
  -Infinity,
  Infinity,
  -Infinity,
];

const robots = read(YEAR, DAY, PART).map((line) => {
  const [x, y, z, r] = line.match(/-?\d+/g).map((n) => Number(n));

  minX = Math.min(minX, x);
  maxX = Math.max(maxX, x);

  minY = Math.min(minY, y);
  maxY = Math.max(maxY, y);

  minZ = Math.min(minZ, z);
  maxZ = Math.max(maxZ, z);

  return new Robot(new Point3D(x, y, z), r);
});

function getRobotsInRange(box) {
  let inRangeCount = 0;

  for (const robot of robots) {
    // if (robot.inRangeOfBox(box)) {
    if (manhattan3D(robot.location, box.c) <= robot.radius) {
      inRangeCount++;
    }
  }

  return inRangeCount;
}

const origin = new Point3D(0, 0, 0);
let boxes = new Box(new Point3D(minX, minY, minZ), new Point3D(maxX, maxY, maxZ)).divide();

while (true) {
  let best = -Infinity;
  let bestBoxes = [];

  for (const box of boxes) {
    let inRangeCount = getRobotsInRange(box);

    if (inRangeCount > best) {
      best = inRangeCount;
      bestBoxes = [box];
    } else if (inRangeCount === best) {
      bestBoxes.push(box);
    }
  }

  bestBoxes.sort((box1, box2) => box1.minDistanceToPoint(origin) - box2.minDistanceToPoint(origin));
  console.log(bestBoxes[0].minDistanceToPoint(origin), bestBoxes[1]?.minDistanceToPoint(origin));

  const shortestD = bestBoxes[0].minDistanceToPoint(origin);

  for (let i = 1; i < bestBoxes.length; i++) {
    if (bestBoxes[i].minDistanceToPoint(origin) === shortestD) {
      boxes.push(bestBoxes[i]);
    } else {
      break;
    }
  }

  boxes = bestBoxes.map((box) => box.divide()).flat();

  if (boxes.some((box) => box.volume() === 1)) {
    for (const box of boxes) {
      if (box.volume() === 1) {
        let inRangeCount = 0;

        for (const robot of robots) {
          // if (robot.inRangeOfBox(box)) {
          if (manhattan3D(robot.location, box.c) <= robot.radius) {
            inRangeCount++;
          }
        }
        console.log(inRangeCount, box.c, manhattan3D(origin, box.c));
        break;
      }
    }
    break;
  }
}

write(YEAR, DAY, PART, '');

// 131482463 - Too High
// 130427867 - Too High
// 129431514 - Too High
// 112845906 - Wrong
