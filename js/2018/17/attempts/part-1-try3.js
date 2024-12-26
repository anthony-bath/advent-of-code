import { output, readOld, write } from '../../../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 17, 1];

const expr = /(x|y)=(?<n1>\d+), (x|y)=(?<n2>\d+)..(?<n3>\d+)/;

let [yMin, yMax, xMin, xMax] = [Infinity, -Infinity, Infinity, -Infinity];
const grid = new Map();

readOld(YEAR, DAY, PART).forEach((line) => {
  const { n1, n2, n3 } = line.match(expr).groups;

  if (line.startsWith('y')) {
    const y = Number(n1);

    if (y > yMax) yMax = y;
    if (y < yMin) yMin = y;

    const x1 = Number(n2);
    const x2 = Number(n3);

    if (x1 < xMin) xMin = x1;
    if (x2 > xMax) xMax = x2;
  } else {
    const x = Number(n1);

    if (x > xMax) xMax = x;
    if (x < xMin) xMin = x;

    const y1 = Number(n2);
    const y2 = Number(n3);

    if (y1 < yMin) yMin = y1;
    if (y2 > yMax) yMax = y2;
  }

  for (let n = Number(n2); n <= Number(n3); n++) {
    if (line.startsWith('x')) {
      grid.set(`${n1}|${n}`, '#');
    } else {
      grid.set(`${n}|${n1}`, '#');
    }
  }
});

function print() {
  const data = [];

  for (let y = yMin; y <= yMax; y++) {
    const row = [];

    for (let x = xMin - 1; x <= xMax + 1; x++) {
      if (grid.has(`${x}|${y}`)) {
        row.push(grid.get(`${x}|${y}`));
      } else {
        row.push('.');
      }
    }

    data.push(row);
  }

  output(data.map((row) => row.join('')).join('\n'));
}

function count() {
  let result = 0;

  for (const point of grid.values()) {
    if (['~', '|'].includes(point)) {
      result++;
    }
  }

  return result;
}

function update({ x, y }, symbol) {
  grid.set(`${x}|${y}`, symbol);

  // console.log(yMin, yMax, xMin - 1, xMax + 1);
  //print();
  // console.log(count());
  // console.clear();
}

function canGoDown({ x, y }) {
  return !grid.has(`${x}|${y + 1}`);
}

let current = { y: 0, x: 500 };
const decisionPoints = [];

let iterations = 0;

while (true) {
  // iterations++;

  // if (iterations >= 100000) {
  //   break;
  // }
  while (
    !['~', '#', '|'].includes(grid.get(`${current.x}|${current.y + 1}`)) &&
    current.y + 1 <= yMax
  ) {
    current.y++;
    decisionPoints.push({ ...current });
    update(current, '|');
  }

  // If we are at yMax now, need to go back to the previous decision point and check right
  // since we went left the first time
  if (current.y === yMax) {
    debugger;
    if (decisionPoints.length === 0) {
      // we are done, no further decision points to consider
      break;
    }

    current = decisionPoints.pop();
    let canGoDownAgain = false;
    const rightPath = [];

    while (!grid.has(`${current.x + 1}|${current.y}`)) {
      current.x++;
      rightPath.push({ ...current });

      // If we can now move down, we need to drop out and go down as far as we can
      if (canGoDown(current)) {
        canGoDownAgain = true;
        break;
      }
    }

    if (canGoDownAgain) {
      for (const point of rightPath) {
        update(point, '|');
      }
      continue;
    } else {
    }
  } else {
    // we have reached a decision point and will evaluate left first
    decisionPoints.push({ ...current });

    let canGoDownAgain = false;
    const leftPath = [];

    while (!['~', '#'].includes(grid.get(`${current.x - 1}|${current.y}`))) {
      current.x--;
      leftPath.push({ ...current });

      if (canGoDown(current)) {
        canGoDownAgain = true;
        break;
      }
    }

    if (canGoDownAgain) {
      for (const point of leftPath) {
        update(point, '|');
      }
      continue;
    } else {
      // can't go left any further so need to determine if going right
      // leads to be able going down again. If it doesn't, then we are
      // in a cavity and can mark points as at rest

      current = decisionPoints.pop();
      const decisionPoint = { ...current };
      const rightPath = [];

      while (!['~', '#'].includes(grid.get(`${current.x + 1}|${current.y}`))) {
        current.x++;
        rightPath.push({ ...current });

        // If we can now move down, we need to drop out and go down as far as we can
        if (canGoDown(current)) {
          canGoDownAgain = true;
          break;
        }
      }

      if (canGoDownAgain) {
        for (const point of [...leftPath, ...rightPath]) {
          update(point, '|');
        }

        continue;
      } else {
        // can't go right any further so are in a cavity, mark points as
        // at rest
        for (const point of [...leftPath, ...rightPath]) {
          update(point, '~');
        }

        current = decisionPoint;
        update(current, '~');
        current = decisionPoints.pop();
      }
    }
  }
}

print();

write(YEAR, DAY, PART, count());

//25792 - Too Low
