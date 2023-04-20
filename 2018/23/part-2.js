import { read, write } from '../../utilities/io.js';
import { Point3D, manhattan3D } from '../../utilities/math.js';
import { Box } from './common.js';

const [YEAR, DAY, PART] = [2018, 23, 2];

class Robot {
  constructor(location, radius) {
    this.location = location;
    this.radius = radius;
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

let boxes = new Box(new Point3D(minX, minY, minZ), new Point3D(maxX, maxY, maxZ)).divide();
let depth = 0;

while (depth < 23) {
  let best = -Infinity;
  let bestBoxes = [];

  for (const box of boxes) {
    let inRangeCount = 0;

    for (const robot of robots) {
      if (box.inRangeOfRobot(robot)) {
        inRangeCount++;
      }
    }

    if (inRangeCount > best) {
      best = inRangeCount;
      bestBoxes = [box];
    } else if (inRangeCount === best) {
      bestBoxes.push(box);
    }
  }

  console.log(depth + 1, best, boxes.length, boxes[0].w * boxes[0].h * boxes[0].d);

  boxes = bestBoxes.map((box) => box.divide()).flat();

  depth++;
}

boxes.sort((b1, b2) => b1.minDistanceToOrigin() - b2.minDistanceToOrigin());

let min = Infinity;

for (let x = boxes[0].points[0].x; x <= boxes[0].points[26].x; x++) {
  for (let y = boxes[0].points[0].y; y <= boxes[0].points[26].y; y++) {
    for (let z = boxes[0].points[0].z; z <= boxes[0].points[26].z; z++) {
      min = Math.min(min, manhattan3D({ x, y, z }, { x: 0, y: 0, z: 0 }));
    }
  }
}

console.log(min);
write(YEAR, DAY, PART, boxes[0].minDistanceToOrigin());

// 131482463 - Too High
// 130427867 - Too High
// 129431514 - Too High
// 112845906 - Wrong
// 129573539 - Wrong
