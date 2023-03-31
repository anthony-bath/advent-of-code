import { output, read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 17, 1];

const expr = /(x|y)=(?<n1>\d+), (x|y)=(?<n2>\d+)..(?<n3>\d+)/;

let [yMin, yMax, xMin, xMax] = [0, -Infinity, Infinity, -Infinity];
const grid = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const { n1, n2, n3 } = line.match(expr).groups;

  if (line.startsWith('y')) {
    const y = Number(n1);

    if (y > yMax) yMax = y;

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

function canFlowLeft({ x, y }) {
  if (grid.get(`${x - 1}|${y}`) === '#') {
    return false;
  }

  // if (!['#', '~'].includes(grid.get(`${x - 1}|${y + 1}`))) {
  //   return false;
  // }

  return true;
}

function canFlowRight({ x, y }) {
  if (grid.get(`${x + 1}|${y}`) === '#') {
    return false;
  }

  // if (!['#', '~'].includes(grid.get(`${x + 1}|${y + 1}`))) {
  //   return false;
  // }

  return true;
}

function canFlowDown({ x, y }) {
  if (['#', '~'].includes(grid.get(`${x}|${y + 1}`))) {
    return false;
  }

  if (y > yMax) {
    return false;
  }

  return true;
}

function update({ x, y }, symbol) {
  grid.set(`${x}|${y}`, symbol);
}

let current = { x: 500, y: 0 };
const path = [];
const splitPoints = [];

while (true) {
  while (canFlowDown(current)) {
    current.y++;
    update(current, '|');
    path.push({ ...current });
  }

  if (current.y >= yMax) {
    print();
    break;
  }

  // Can no longer go down; search left and see if can end up going down again
  let canGoDownOnLeft = false;
  let search = { ...current };
  const leftPath = [];

  while (canFlowLeft(search)) {
    search.x--;
    leftPath.push({ ...search });

    if (canFlowDown(search)) {
      canGoDownOnLeft = true;
      break;
    }
  }

  // Search right and see if can end up going down again on right
  let canGoDownOnRight = false;
  search = { ...current };
  const rightPath = [];

  while (canFlowRight(search)) {
    search.x++;
    rightPath.push({ ...search });

    if (canFlowDown(search)) {
      canGoDownOnRight = true;
      break;
    }
  }

  if (!canGoDownOnLeft && !canGoDownOnRight) {
    // must be in a cavity, left and right must be at rest
    for (const point of [...leftPath, ...rightPath]) {
      update(point, '~');
    }

    update(current, '~');
    current = path.pop();
  } else {
    // must be at a split point so water will not come to rest
    if (!canGoDownOnLeft) {
      for (const point of [...leftPath, ...rightPath]) {
        update(point, '|');
      }

      current = rightPath.pop();
    } else if (!canGoDownOnRight) {
      for (const point of [...leftPath, ...rightPath]) {
        update(point, '|');
      }

      current = leftPath.pop();
    } else {
      // can go down both ways so will need to come back
      splitPoints.push({ ...current });

      for (const point of leftPath) {
        update(point, '|');
      }

      current = leftPath.pop();
    }
  }

  //print();
}

print();
while (splitPoints.length) {
  current = splitPoints.pop();

  if (grid.get(`${current.x}|${current.y}`) === '~') {
    continue;
  }

  while (canFlowDown(current)) {
    current.y++;
    update(current, '|');
    path.push({ ...current });
  }

  if (current.y >= yMax) {
    continue;
  }

  // Can no longer go down; search left and see if can end up going down again
  let canGoDownOnLeft = false;
  let search = { ...current };
  const leftPath = [];

  while (canFlowLeft(search) && grid.get(`${search.x - 1}|${search.y}`) !== '|') {
    search.x--;
    leftPath.push({ ...search });

    if (canFlowDown(search)) {
      canGoDownOnLeft = true;
      break;
    }
  }

  // Search right and see if can end up going down again on right
  let canGoDownOnRight = false;
  search = { ...current };
  const rightPath = [];

  while (canFlowRight(search)) {
    search.x++;
    rightPath.push({ ...search });

    if (canFlowDown(search)) {
      canGoDownOnRight = true;
      break;
    }
  }

  if (!canGoDownOnLeft && !canGoDownOnRight) {
    // must be in a cavity, left and right must be at rest
    for (const point of [...leftPath, ...rightPath]) {
      update(point, '~');
    }

    update(current, '~');
    current = path.pop();
  } else {
    // must be at a split point so water will not come to rest
    if (!canGoDownOnLeft) {
      for (const point of [...leftPath, ...rightPath]) {
        update(point, '|');
      }

      current = rightPath.pop();
    } else if (!canGoDownOnRight) {
      for (const point of [...leftPath, ...rightPath]) {
        update(point, '|');
      }

      current = leftPath.pop();
    } else {
      // can go down both ways so will need to come back
      splitPoints.push({ ...current });

      for (const point of leftPath) {
        update(point, '|');
      }

      current = leftPath.pop();
    }
  }
}

print();

write(YEAR, DAY, PART, count());
