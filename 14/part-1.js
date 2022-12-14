import { output, read } from '../utility.js';

const WIDTH = 531;
const HEIGHT = 182;

const cave = [...Array(HEIGHT)].map((_) => Array(WIDTH).fill('.'));

read(14).forEach((line) => {
  const points = line.split(' -> ').map((coords) => {
    const [x, y] = coords.split(',').map((n) => parseInt(n, 10));
    return { x, y };
  });

  for (let i = 1; i < points.length; i++) {
    const p1 = points[i - 1];
    const p2 = points[i];

    if (p1.x === p2.x) {
      // vertical line
      for (let j = Math.min(p1.y, p2.y); j <= Math.max(p1.y, p2.y); j++) {
        cave[j][p1.x] = '#';
      }
    } else {
      // horicontal line
      for (let j = Math.min(p1.x, p2.x); j <= Math.max(p1.x, p2.x); j++) {
        cave[p1.y][j] = '#';
      }
    }
  }
});

let grainsOfSand = 0;
let grain = { x: 500, y: 0, atRest: false };
let cycles = 0;
const debugs = [];

while (true) {
  cycles++;

  // if (grainsOfSand > 250000) {
  //   output(cave.map((row) => row.join('')).join('\n'));
  //   break;
  // }
  if (!grain.atRest) {
    if (willMoveIntoTheAbyss(grain)) {
      //console.log(`${grain.x},${grain.y} moving into abyss`);
      break;
    } else if (canMoveDirectlyDown(grain)) {
      //console.log(`${grain.x},${grain.y} can move down`);
      debugs.push(`${grain.x},${grain.y} can move directly down to ${grain.y + 1},${grain.x}`);
      cave[grain.y][grain.x] = '.';
      cave[grain.y + 1][grain.x] = 'o';
      grain.y++;
    } else if (canMoveDownLeft(grain)) {
      //console.log(`${grain.x},${grain.y} can move down left`);
      debugs.push(`${grain.x},${grain.y} can move down left to ${grain.y + 1},${grain.x - 1}`);
      cave[grain.y][grain.x] = '.';
      cave[grain.y + 1][grain.x - 1] = 'o';
      grain.y++;
      grain.x--;
    } else if (canMoveDownRight(grain)) {
      //console.log(`${grain.x},${grain.y} can move down right`);
      debugs.push(`${grain.x},${grain.y} can move down right to ${grain.y + 1},${grain.x + 1}`);
      cave[grain.y][grain.x] = '.';
      cave[grain.y + 1][grain.x + 1] = 'o';
      grain.y++;
      grain.x++;
    } else {
      debugs.push(`$Grain ${grainsOfSand} at rest at ${grain.x}, ${grain.y}`);
      //console.log(`grain at rest at ${grain.x},${grain.y}`);
      grain.atRest = true;
    }
  } else {
    // grain is at rest, new grain time
    grainsOfSand++;
    grain = { x: 500, y: 0, atRest: false };
    console.log(`grain reset to ${grain.x}, ${grain.y}`);
    cave[grain.y][grain.x] = 'o';
  }
}

console.log(grainsOfSand);
output(cave.map((row) => row.join('')).join('\n'));

function canMoveDirectlyDown({ x, y }) {
  if (y + 1 >= HEIGHT) {
    return false;
  }

  const target = cave[y + 1][x];

  if (target === '#' || target === 'o') {
    return false;
  }

  return true;
}

function canMoveDownLeft({ x, y }) {
  if (x - 1 <= 0) {
    return false;
  }

  const target = cave[y + 1][x - 1];

  if (target === '#' || target === 'o') {
    return false;
  }

  return true;
}

function canMoveDownRight({ x, y }) {
  if (x + 1 >= WIDTH) {
    return false;
  }

  const target = cave[y + 1][x + 1];
  if (target === '#' || target === 'o') {
    return false;
  }

  return true;
}

function willMoveIntoTheAbyss({ x, y }) {
  return x + 1 >= WIDTH || x - 1 <= 0 || y + 1 >= HEIGHT;
}
