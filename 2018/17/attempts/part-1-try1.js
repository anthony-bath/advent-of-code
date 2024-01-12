import { readOld, write } from '../../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 17, 1];

const expr = /(x|y)=(?<n1>\d+), (x|y)=(?<n2>\d+)..(?<n3>\d+)/;

let [minY, maxY, minX, maxX] = [Infinity, -Infinity, Infinity, -Infinity];
const grid = new Map();

readOld(YEAR, DAY, PART, { test: true }).forEach((line) => {
  const { n1, n2, n3 } = line.match(expr).groups;

  if (line.startsWith('y')) {
    const y = Number(n1);

    if (y > maxY) maxY = y;
    if (y < minY) minY = y;

    const x1 = Number(n2);
    const x2 = Number(n3);

    if (x1 < minX) minX = x1;
    if (x2 > maxX) maxX = x2;
  } else {
    const x = Number(n1);

    if (x > maxX) maxX = x;
    if (x < minX) minX = x;

    const y1 = Number(n2);
    const y2 = Number(n3);

    if (y1 < minY) minY = y1;
    if (y2 > maxY) maxY = y2;
  }

  for (let n = Number(n2); n <= Number(n3); n++) {
    if (line.startsWith('x')) {
      grid.set(`${n1}|${n}`, '#');
    } else {
      grid.set(`${n}|${n1}`, '#');
    }
  }
});

function getDropDelta({ x, y }) {
  if (y === maxY) {
    return [0, 0];
  }

  if (!grid.has(`${x}|${y + 1}`)) {
    return [0, 1];
  } else if (!grid.has(`${x - 1}|${y}`)) {
    return [-1, 0];
  } else if (!grid.has(`${x + 1}|${y}`)) {
    return [1, 0];
  }

  return [-1, -1];
}

function print() {
  const output = [];

  for (let y = minY; y <= maxY; y++) {
    const row = [];

    for (let x = minX - 1; x <= maxX + 1; x++) {
      if (grid.has(`${x}|${y}`)) {
        row.push(grid.get(`${x}|${y}`));
      } else {
        row.push('.');
      }
    }

    output.push(row);
  }

  console.log(output.map((row) => row.join('')).join('\n'));
}

let drop = { x: 500, y: 0 };
const path = [];
let positions = 0;

while (true) {
  const [dx, dy] = getDropDelta(drop);

  if (drop.x === 500 && drop.y === 0 && dx === -1 && dy === -1) {
    break;
  }

  if (dx === -1 && dy === -1) {
    // can no longer move
    grid.set(`${drop.x}|${drop.y}`, '~');
    positions++;
    drop = path.pop();
    continue;
  } else if (dx === 0 && dy === 0) {
    // this is at the maximum y
    grid.set(`${drop.x}|${drop.y}`, '|');
    drop = path.pop();
    positions++;
    continue;
  }

  const prev = path[path.length - 1];

  if (prev) {
    if (drop.x + dx === prev.x && drop.y + dy === prev.y) {
      // don't want to move back so just come to rest
      grid.set(`${drop.x}|${drop.y}`, '~');
      positions++;
      drop = path.pop();
      continue;
    }
  } else {
    if (drop.x !== 500 && drop.y !== 0) break;
  }

  path.push({ x: drop.x, y: drop.y });
  drop.x += dx;
  drop.y += dy;

  print();
}

write(YEAR, DAY, PART, positions);
