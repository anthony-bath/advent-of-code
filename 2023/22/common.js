export function getData(lines) {
  let [xMin, xMax, yMin, yMax, zMin, zMax] = [
    Infinity,
    -Infinity,
    Infinity,
    -Infinity,
    Infinity,
    -Infinity,
  ];

  const bricks = lines
    .map((line) => {
      const [p1, p2] = line.split('~');
      const brickData = [p1.split(',').map(Number), p2.split(',').map(Number)];

      xMin = Math.min(xMin, brickData[0][0], brickData[1][0]);
      xMax = Math.max(xMax, brickData[0][0], brickData[1][0]);
      yMin = Math.min(yMin, brickData[0][1], brickData[1][1]);
      yMax = Math.max(yMax, brickData[0][1], brickData[1][1]);
      zMin = Math.min(zMin, brickData[0][2], brickData[1][2]);
      zMax = Math.max(zMax, brickData[0][2], brickData[1][2]);

      return new Brick(brickData);
    })
    .sort(sortBricksAsendingZ);

  const space = Array(zMax + 1)
    .fill()
    .map(() =>
      Array(yMax - yMin + 1)
        .fill()
        .map(() => Array(xMax - xMin + 1).fill('.'))
    );

  for (const brick of bricks) {
    drop(brick, space);
    brick.storeRest();
  }

  return { bricks, space };
}

export function canDrop(brick, space) {
  brick.updateSpace(space, '.');

  const result =
    brick.p1[2] - 1 >= 1 &&
    brick.p2[2] - 1 >= 1 &&
    brick.points.every(([x, y, z]) => space[z - 1][y][x] === '.');

  brick.updateSpace(space, '#');

  return result;
}

export function drop(brick, space) {
  let dropped = false;

  brick.updateSpace(space, '.');

  while (true) {
    if (
      brick.p1[2] - 1 >= 1 &&
      brick.p2[2] - 1 >= 1 &&
      brick.points.every(([x, y, z]) => space[z - 1][y][x] === '.')
    ) {
      // every point is empty, continue moving down
      brick.p1[2]--;
      brick.p2[2]--;
      dropped = true;
    } else {
      // cannot move down so come to rest, break
      break;
    }
  }

  // fill space with brick
  brick.updateSpace(space, '#');

  return dropped;
}

class Brick {
  constructor([p1, p2]) {
    this.p1 = p1;
    this.p2 = p2;
  }

  storeRest() {
    this.p1Rest = [...this.p1];
    this.p2Rest = [...this.p2];
  }

  reset() {
    this.p1 = [...this.p1Rest];
    this.p2 = [...this.p2Rest];
  }

  updateSpace(space, type) {
    for (const [x, y, z] of this.points) {
      space[z][y][x] = type;
    }
  }

  get points() {
    const [x1, y1, z1] = this.p1;
    const [x2, y2, z2] = this.p2;

    const points = [];

    for (let z = z1; z <= z2; z++) {
      for (let y = y1; y <= y2; y++) {
        for (let x = x1; x <= x2; x++) {
          points.push([x, y, z]);
        }
      }
    }

    return points;
  }
}

function sortBricksAsendingZ(b1, b2) {
  const b1z = Math.min(b1.p1[2], b1.p2[2]);
  const b2z = Math.min(b2.p1[2], b2.p2[2]);

  return b1z - b2z;
}
