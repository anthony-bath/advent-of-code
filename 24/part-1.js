import { read, write } from '../utility.js';

const input = read(24);

const WIDTH = input[0].length;
const HEIGHT = input.length;

const possibleX = Array.from({ length: WIDTH - 2 }).map((_, i) => i + 1);
const possibleY = Array.from({ length: HEIGHT - 2 }).map((_, i) => i + 1);

class Blizzard {
  constructor(x, y, dx, dy, cycleX, cycleY, icon) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.cycleX = cycleX;
    this.cycleY = cycleY;
    this.startIndex = dx !== 0 ? possibleX.indexOf(x) : possibleY.indexOf(y);
    this.icon = icon;
  }

  getLocation(minute) {
    if (this.cycleY) {
      let shifts = minute % this.cycleY;
      if (shifts === 0) {
        return `${this.x},${this.y}`;
      }

      let targetIndex = this.startIndex;

      switch (this.dy) {
        case -1:
          while (shifts > 0) {
            if (targetIndex - 1 < 0) {
              targetIndex = possibleY.length - 1;
            } else {
              targetIndex--;
            }

            shifts--;
          }

          return `${this.x},${possibleY[targetIndex]}`;

        case 1:
          while (shifts > 0) {
            if (targetIndex + 1 === possibleY.length) {
              targetIndex = 0;
            } else {
              targetIndex++;
            }

            shifts--;
          }

          return `${this.x},${possibleY[targetIndex]}`;
      }
    } else {
      let shifts = minute % this.cycleX;
      if (shifts === 0) {
        return `${this.x},${this.y}`;
      }

      let targetIndex = this.startIndex;

      switch (this.dx) {
        case -1:
          while (shifts > 0) {
            if (targetIndex - 1 < 0) {
              targetIndex = possibleX.length - 1;
            } else {
              targetIndex--;
            }

            shifts--;
          }

          return `${possibleX[targetIndex]},${this.y}`;

        case 1:
          while (shifts > 0) {
            if (targetIndex + 1 === possibleX.length) {
              targetIndex = 0;
            } else {
              targetIndex++;
            }

            shifts--;
          }

          return `${possibleX[targetIndex]},${this.y}`;
      }
    }
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
        horizontalBlizzards.push(new Blizzard(x, y, -1, 0, WIDTH - 2, null, cell));
        break;
      case '>':
        horizontalBlizzards.push(new Blizzard(x, y, 1, 0, WIDTH - 2, null, cell));
        break;
      case '^':
        verticalBlizzards.push(new Blizzard(x, y, 0, -1, null, HEIGHT - 2, cell));
        break;
      case 'v':
        verticalBlizzards.push(new Blizzard(x, y, 0, 1, null, HEIGHT - 2, cell));
        break;
      case '.':
        if (startX === null) startX = x;
        if (y === HEIGHT - 1) endX = x;
    }
  });
});

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

// for (let i = 1; i < 19; i++) {
//   console.log(`Minute ${i}`);
//   print(i);
//   console.log();
// }

// process.exit();

const initialState = {
  minute: 0,
  x: startX,
  y: 0,
  path: [],
};

let minSoFar = Infinity;
const cache = {};
const visited = {};

function bfs(state) {
  const queue = [state];
  let minimum = Infinity;

  visited[`${state.minute}-${state.x}-${state.y}`] = 1;

  while (queue.length) {
    const current = queue.shift();
    const { minute, x, y } = current;

    if (minute > minimum) {
      continue;
    }

    if (x === endX && y === HEIGHT - 1) {
      minimum = Math.min(minimum, minute);
    } else {
      // Compute where blizzards will be at (minute+1) to determine options
      //const nextLocations = new Set(blizzards.map((blizzard) => blizzard.getLocation(minute + 1)));

      // Move Down
      let location = `${x},${y + 1}`;
      if (
        ((x !== endX && y + 1 <= HEIGHT - 2) || (x === endX && y + 1 <= HEIGHT - 1)) &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x}-${y + 1}`]
      ) {
        visited[`${minute + 1}-${x}-${y + 1}`] = 1;
        queue.push({ minute: minute + 1, x, y: y + 1 });
      }

      // Move Right (if not on start row)
      location = `${x + 1},${y}`;
      if (
        y > 0 &&
        x + 1 <= WIDTH - 2 &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x + 1}-${y}`]
      ) {
        visited[`${minute + 1}-${x + 1}-${y}`] = 1;
        queue.push({ minute: minute + 1, x: x + 1, y });
      }

      // Move Left (if not on start row)
      location = `${x - 1},${y}`;
      if (
        y > 0 &&
        x - 1 >= 1 &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x - 1}-${y}`]
      ) {
        visited[`${minute + 1}-${x - 1}-${y}`] = 1;
        queue.push({ minute: minute + 1, x: x - 1, y });
      }

      // Move Up (assuming never move back to starting position which might be a bad assumption)
      location = `${x},${y - 1}`;
      if (
        (y - 1 >= 1 || (x === startX && y - 1 === 0)) &&
        !isBlizzardOccupied(minute + 1, location) &&
        !visited[`${minute + 1}-${x}-${y - 1}`]
      ) {
        visited[`${minute + 1}-${x}-${y - 1}`] = 1;
        queue.push({ minute: minute + 1, x, y: y - 1 });
      }

      // Wait
      location = `${x},${y}`;
      if (!visited[`${minute + 1}-${x}-${y}`] && !isBlizzardOccupied(minute + 1, location)) {
        visited[`${minute + 1}-${x}-${y}`] = 1;
        queue.push({ minute: minute + 1, x, y });
      }
    }
  }

  return minimum;
}

write(24, 1, `${bfs(initialState)}`);
