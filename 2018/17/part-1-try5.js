import { output, read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 17, 1];

const expr = /(x|y)=(?<n1>\d+), (x|y)=(?<n2>\d+)..(?<n3>\d+)/;

let [yMin, yMax, xMin, xMax] = [1, -Infinity, Infinity, -Infinity];
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

function drop(point) {
  if (point.y >= yMax) return;

  const downPath = [];

  while (!grid.has(`${point.x}|${point.y + 1}`)) {
    point.y++;
    downPath.push({ ...point });
    grid.set(`${point.x}|${point.y}`, '|');
  }

  let search = { ...point };
  let canGoDownOnLeft = false;
  const leftPath = [];

  while (!grid.has(`${search.x - 1}|${search.y}`)) {
    search.x--;
    leftPath.push({ ...search });

    if (!grid.has(`${search.x}|${search.y + 1}`)) {
      canGoDownOnLeft = true;
      break;
    }
  }

  search = { ...point };
  let canGoDownOnRight = false;
  const rightPath = [];

  while (!grid.has(`${search.x + 1}|${search.y}`)) {
    search.x++;
    rightPath.push({ ...search });

    if (!grid.has(`${search.x}|${search.y + 1}`)) {
      canGoDownOnRight = true;
      break;
    }
  }

  if (!canGoDownOnLeft && !canGoDownOnRight) {
    for (const cell of [...leftPath, ...rightPath]) {
      grid.set(`${cell.x}|${cell.y}`, '~');
    }

    point = downPath.pop();

    if (!point) return;
    grid.set(`${point.x}|${point.y}`, '~');
    drop(downPath.pop());
  } else if (!canGoDownOnRight) {
    for (const cell of leftPath) {
      grid.set(`${cell.x}|${cell.y}`, '|');
    }

    drop(leftPath.pop());
  } else if (!canGoDownOnLeft) {
    for (const cell of rightPath) {
      grid.set(`${cell.x}|${cell.y}`, '|');
    }

    drop(rightPath.pop());
  } else {
    for (const cell of [...leftPath, ...rightPath]) {
      grid.set(`${cell.x}|${cell.y}`, '|');
    }

    drop(leftPath.pop());
    drop(rightPath.pop());
  }
}

drop({ x: 500, y: 0 });

print();

write(YEAR, DAY, PART, '');
