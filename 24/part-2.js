import { read, write } from '../utility.js';

const input = read(24);

const WIDTH = input[0].length;
const HEIGHT = input.length;

const possibleX = Array.from({ length: WIDTH - 2 }).map((_, i) => i + 1);
const possibleY = Array.from({ length: HEIGHT - 2 }).map((_, i) => i + 1);

class Blizzard {
  constructor(x, y, type, delta, cycle) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.delta = delta;
    this.cycle = cycle;

    this.index = this.type === 'h' ? possibleX.indexOf(x) : possibleY.indexOf(y);
    this.maxIndex = this.type === 'h' ? possibleX.length - 1 : possibleY.length - 1;
  }

  getLocation(minute) {
    let shifts = minute % this.cycle;

    if (shifts === 0) return `${this.x},${this.y}`;

    let targetIndex = this.index;

    while (shifts > 0) {
      targetIndex += this.delta;

      if (targetIndex < 0) {
        targetIndex = this.maxIndex;
      } else if (targetIndex === this.maxIndex + 1) {
        targetIndex = 0;
      }

      shifts--;
    }

    const x = this.type === 'h' ? possibleX[targetIndex] : this.x;
    const y = this.type === 'v' ? possibleY[targetIndex] : this.y;

    return `${x},${y}`;
  }
}

let startX = null;
let endX = null;
const verticalBlizzards = [];
const horizontalBlizzards = [];

input.forEach((row, y) => {
  row.split('').forEach((cell, x) => {
    switch (cell) {
      case '<':
        horizontalBlizzards.push(new Blizzard(x, y, 'h', -1, WIDTH - 2));
        break;
      case '>':
        horizontalBlizzards.push(new Blizzard(x, y, 'h', 1, WIDTH - 2));
        break;
      case '^':
        verticalBlizzards.push(new Blizzard(x, y, 'v', -1, HEIGHT - 2));
        break;
      case 'v':
        verticalBlizzards.push(new Blizzard(x, y, 'v', 1, HEIGHT - 2));
        break;
      case '.':
        if (startX === null) startX = x;
        if (y === HEIGHT - 1) endX = x;
    }
  });
});

// Pre-Calculate Blizzard Locations at all possible minutes per dimensions
const vBlizzardLocationsByMinute = new Map();
const hBlizzardLocationsByMinute = new Map();

for (let minute = 0; minute < WIDTH - 2; minute++) {
  hBlizzardLocationsByMinute.set(
    minute,
    new Set(horizontalBlizzards.map((blizzard) => blizzard.getLocation(minute)))
  );
}

for (let minute = 0; minute < HEIGHT - 2; minute++) {
  vBlizzardLocationsByMinute.set(
    minute,
    new Set(verticalBlizzards.map((blizzard) => blizzard.getLocation(minute)))
  );
}

function isBlizzardOccupied(minute, location) {
  return (
    vBlizzardLocationsByMinute.get(minute % (HEIGHT - 2)).has(location) ||
    hBlizzardLocationsByMinute.get(minute % (WIDTH - 2)).has(location)
  );
}

function bfs(state, visited) {
  const queue = [state];

  visited[`${state.minute}-${state.x}-${state.y}`] = 1;

  while (queue.length) {
    const current = queue.shift();
    const { minute, x, y, goalX, goalY } = current;

    if (x === goalX && y === goalY) {
      return minute;
    } else {
      // Move Down
      let location = `${x},${y + 1}`;
      if (
        ((x !== endX && y + 1 <= HEIGHT - 2) || (x === endX && y + 1 <= HEIGHT - 1)) &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x}-${y + 1}`]
      ) {
        visited[`${minute + 1}-${x}-${y + 1}`] = 1;
        queue.push({ minute: minute + 1, x, y: y + 1, goalX, goalY });
      }

      // Move Right (if not on start or end row)
      location = `${x + 1},${y}`;
      if (
        y !== 0 &&
        y !== HEIGHT - 1 &&
        x + 1 <= WIDTH - 2 &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x + 1}-${y}`]
      ) {
        visited[`${minute + 1}-${x + 1}-${y}`] = 1;
        queue.push({ minute: minute + 1, x: x + 1, y, goalX, goalY });
      }

      // Move Left (if not on start  or end row)
      location = `${x - 1},${y}`;
      if (
        y !== 0 &&
        y !== HEIGHT - 1 &&
        x - 1 >= 1 &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x - 1}-${y}`]
      ) {
        visited[`${minute + 1}-${x - 1}-${y}`] = 1;
        queue.push({ minute: minute + 1, x: x - 1, y, goalX, goalY });
      }

      // Move Up
      location = `${x},${y - 1}`;
      if (
        (y - 1 >= 1 || (x === startX && y - 1 === 0)) &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x}-${y - 1}`]
      ) {
        visited[`${minute + 1}-${x}-${y - 1}`] = 1;
        queue.push({ minute: minute + 1, x, y: y - 1, goalX, goalY });
      }

      // Wait
      location = `${x},${y}`;
      if (!visited[`${minute + 1}-${x}-${y}`] && !isBlizzardOccupied(minute + 1, location)) {
        visited[`${minute + 1}-${x}-${y}`] = 1;
        queue.push({ minute: minute + 1, x, y, goalX, goalY });
      }
    }
  }
}

const initialState = {
  minute: 0,
  x: startX,
  y: 0,
  goalX: endX,
  goalY: HEIGHT - 1,
};

const p1 = bfs(initialState, {});
const p2 = bfs({ minute: p1, x: endX, y: HEIGHT - 1, goalX: startX, goalY: 0 }, {});
const p3 = bfs({ ...initialState, minute: p2 }, {});

write(24, 2, `${p3}`);
