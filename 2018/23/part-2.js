import { read, write } from '../../utilities/io.js';
import { Point3D } from '../../utilities/math.js';
import { Box, Robot } from './common.js';

const [YEAR, DAY, PART] = [2018, 23, 2];

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

function byInRangeAndThenVolume(b1, b2) {
  if (b1.inRangeCount === b2.inRangeCount) {
    return b1.box.volume() - b2.box.volume();
  }

  return b2.inRangeCount - b1.inRangeCount;
}

const queue = [
  {
    box: new Box(new Point3D(minX, minY, minZ), new Point3D(maxX, maxY, maxZ)),
  },
];

let foundBox;

while (true) {
  const current = queue.shift();

  if (current.box.volume() <= 1) {
    foundBox = current.box;
    break;
  }

  const divided = current.box.divide().map((box) => {
    let inRangeCount = 0;

    for (const robot of robots) {
      if (box.inRangeOfRobot(robot)) {
        inRangeCount++;
      }
    }

    return { box, inRangeCount };
  });

  queue.push(...divided);
  queue.sort(byInRangeAndThenVolume);
}

let result = Infinity;
let maxCount = -Infinity;
const p1 = foundBox.points[0];
const p2 = foundBox.points[26];

for (let x = p1.x; x <= p2.x; x++) {
  for (let y = p1.y; y <= p2.y; y++) {
    for (let z = p1.z; z <= p2.z; z++) {
      let inRangeCount = 0;

      for (const robot of robots) {
        if (robot.inRangeOfPoint({ x, y, z })) {
          inRangeCount++;
        }
      }

      if (inRangeCount > maxCount) {
        maxCount = inRangeCount;
        result = x + y + z;
      } else if (inRangeCount === maxCount) {
        result = Math.min(result, x + y + z);
      }
    }
  }
}

write(YEAR, DAY, PART, result);
