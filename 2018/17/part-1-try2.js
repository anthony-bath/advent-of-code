import { output, read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2018, 17, 1];

const expr = /(x|y)=(?<n1>\d+), (x|y)=(?<n2>\d+)..(?<n3>\d+)/;

let [minY, maxY, minX, maxX] = [Infinity, -Infinity, Infinity, -Infinity];
const grid = new Map();

read(YEAR, DAY, PART).forEach((line) => {
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

function print() {
  const data = [];

  for (let y = minY; y <= maxY; y++) {
    const row = [];

    for (let x = minX - 1; x <= maxX + 1; x++) {
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

  // print();
  // console.log(count());
  // console.clear();
}

let drop = { x: 500, y: 0 };
let voidedOnLeft = false;
let voidedOnRight = false;
const path = [];

while (!(voidedOnLeft && voidedOnRight)) {
  // drop down as far as possible
  while (!grid.has(`${drop.x}|${drop.y + 1}`) && drop.y + 1 <= maxY) {
    drop.y++;
    update(drop, '|');
    path.push({ ...drop });
  }

  // if we're at maxY, don't want to go left or right and instead need to go back up
  if (drop.y === maxY) {
    while (true) {
      if (
        grid.get(`${drop.x - 1}|${drop.y}`) !== '|' &&
        grid.get(`${drop.x + 1}|${drop.y}`) !== '|'
      ) {
        drop.y--;
      } else {
        console.log('found', drop);
        break;
      }
    }

    if (grid.get(`${drop.x + 1}|${drop.y}`) === '|') {
      voidedOnLeft = true;
      //go right over all the |
      while (grid.get(`${drop.x + 1}|${drop.y}`) === '|') {
        drop.x++;
      }
    } else {
      voidedOnRight = true;
      //go left over all the |
      while (grid.get(`${drop.x - 1}|${drop.y}`) === '|') {
        drop.x--;
      }
    }
  }

  let stopped = { ...drop };

  let canMoveDown = false;
  const horizontalPath = [];

  // can not go any further down if at this point, go left
  while (true) {
    if (!grid.has(`${drop.x - 1}|${drop.y}`)) {
      drop.x--;
      update(drop, '|');
      horizontalPath.push({ ...drop });

      if (!grid.has(`${drop.x}|${drop.y + 1}`)) {
        canMoveDown = true;
        break;
      }
    } else {
      break;
    }
  }

  if (canMoveDown) continue;

  // went all the way left and could not move down, check back to right to see
  drop = stopped;

  while (true) {
    if (!grid.has(`${drop.x + 1}|${drop.y}`)) {
      drop.x++;
      update(drop, '|');
      horizontalPath.push({ ...drop });

      if (!grid.has(`${drop.x}|${drop.y + 1}`)) {
        canMoveDown = true;
        break;
      }
    } else {
      break;
    }
  }

  if (canMoveDown) continue;

  // if we're here, we've exhausted all horizontal movement and could not move down so
  // everything in horizontalPath is at rest
  for (const point of horizontalPath) {
    update(point, '~');
  }

  drop = path.pop();
}

print();

write(YEAR, DAY, PART, count() - 1);

//8777 - Too Low
