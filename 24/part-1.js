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
const blizzards = [];

input.forEach((row, y) => {
  row.split('').forEach((cell, x) => {
    switch (cell) {
      case '<':
        blizzards.push(new Blizzard(x, y, -1, 0, WIDTH - 2, null, cell));
        break;
      case '>':
        blizzards.push(new Blizzard(x, y, 1, 0, WIDTH - 2, null, cell));
        break;
      case '^':
        blizzards.push(new Blizzard(x, y, 0, -1, null, HEIGHT - 2, cell));
        break;
      case 'v':
        blizzards.push(new Blizzard(x, y, 0, 1, null, HEIGHT - 2, cell));
        break;
      case '.':
        if (startX === null) startX = x;
        if (y === HEIGHT - 1) endX = x;
    }
  });
});

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
      const nextLocations = new Set(blizzards.map((blizzard) => blizzard.getLocation(minute + 1)));

      // Move Down
      if (
        ((x !== endX && y + 1 <= HEIGHT - 2) || (x === endX && y + 1 <= HEIGHT - 1)) &&
        !nextLocations.has(`${x},${y + 1}`) &&
        !visited[`${minute + 1}-${x}-${y + 1}`]
      ) {
        visited[`${minute + 1}-${x}-${y + 1}`] = 1;
        queue.push({ minute: minute + 1, x, y: y + 1 });
      }

      // Move Right (if not on start row)
      if (
        y > 0 &&
        x + 1 <= WIDTH - 2 &&
        !nextLocations.has(`${x + 1},${y}`) &&
        !visited[`${minute + 1}-${x + 1}-${y}`]
      ) {
        visited[`${minute + 1}-${x + 1}-${y}`] = 1;
        queue.push({ minute: minute + 1, x: x + 1, y });
      }

      // Move Left (if not on start row)
      if (
        y > 0 &&
        x - 1 >= 1 &&
        !nextLocations.has(`${x - 1},${y}`) &&
        !visited[`${minute + 1}-${x - 1}-${y}`]
      ) {
        visited[`${minute + 1}-${x - 1}-${y}`] = 1;
        queue.push({ minute: minute + 1, x: x - 1, y });
      }

      // Move Up (assuming never move back to starting position which might be a bad assumption)
      if (
        (y - 1 >= 1 || (x === startX && y - 1 === 0)) &&
        !nextLocations.has(`${x},${y - 1}`) &&
        !visited[`${minute + 1}-${x}-${y - 1}`]
      ) {
        visited[`${minute + 1}-${x}-${y - 1}`] = 1;
        queue.push({ minute: minute + 1, x, y: y - 1 });
      }

      // Wait
      if (!visited[`${minute + 1}-${x}-${y}`] && !nextLocations.has(`${x},${y}`)) {
        visited[`${minute + 1}-${x}-${y}`] = 1;
        queue.push({ minute: minute + 1, x, y });
      }
    }
  }

  return minimum;
}

function dfs(state) {
  if (state.minute > 1000) {
    return Infinity;
  }

  if (state.minute >= minSoFar) {
    return Infinity;
  }

  if (state.x === endX && state.y === HEIGHT - 1) {
    //console.log(`goal: ${JSON.stringify(state)}`);
    return state.minute;
  }

  if (state.x === endX && state.y === HEIGHT - 2) {
    //console.log(`goal: ${JSON.stringify(state)}`);
    return state.minute + 1;
  }

  const { minute, x, y, path } = state;
  const key = `${minute}-${x}-${y}`;

  if (cache[key]) {
    return cache[key];
  }

  // Compute where blizzards will be at (minute+1) to determine options
  const nextLocations = new Set(blizzards.map((blizzard) => blizzard.getLocation(minute + 1)));

  let best = Infinity;
  let moved = false;

  // Move Down
  if (y + 1 <= HEIGHT - 1 && !nextLocations.has(`${x},${y + 1}`)) {
    //console.log(`Minute ${minute + 1}, move down`);
    best = Math.min(best, dfs({ minute: minute + 1, x, y: y + 1, path: [...path, 'down'] }));
    moved = true;
  }

  // Move Right (if not at start position)
  if (y > 0 && x + 1 <= WIDTH - 1 && !nextLocations.has(`${x + 1},${y}`)) {
    //console.log(`Minute ${minute + 1}, move right`);
    best = Math.min(best, dfs({ minute: minute + 1, x: x + 1, y, path: [...path, 'right'] }));
    moved = true;
  }

  // Move Left (if not at start position)
  if (y > 0 && x - 1 >= 1 && !nextLocations.has(`${x - 1},${y}`)) {
    //console.log(`Minute ${minute + 1}, move left`);
    best = Math.min(best, dfs({ minute: minute + 1, x: x - 1, y, path: [...path, 'left'] }));
    moved = true;
  }

  // Move Up (assuming never move back to starting position which might be a bad assumption)
  if ((y - 1 >= 1 || (x === startX && y - 1 === 0)) && !nextLocations.has(`${x},${y - 1}`)) {
    //console.log(`Minute ${minute + 1}, move up`);
    best = Math.min(best, dfs({ minute: minute + 1, x, y: y - 1, path: [...path, 'up'] }));
    moved = true;
  }

  if (!moved) {
    //console.log(`Minute ${minute + 1}, wait`);
    best = Math.min(best, dfs({ minute: minute + 1, x, y, path: [...path, 'wait'] }));
  }

  minSoFar = Math.min(best, minSoFar);
  cache[key] = minSoFar;

  return cache[key];
}

function print(minute) {
  const locations = blizzards.map((blizzard) => ({
    icon: blizzard.icon,
    key: blizzard.getLocation(minute),
  }));
  const data = new Map();

  locations.forEach((location) => {
    if (data.has(location.key)) {
      if (['>', '<', '^', 'v'].includes(data.get(location.key))) {
        data.set(location.key, 2);
      } else {
        data.set(location.key, data.get(location.key) + 1);
      }
    } else {
      data.set(location.key, location.icon);
    }
  });

  const output = [];

  for (let y = 0; y < HEIGHT; y++) {
    const row = [];
    if (y === 0 || y === HEIGHT - 1) {
      for (let x = 0; x < WIDTH; x++) {
        if ((x === endX && y === HEIGHT - 1) || (x === startX && y === 0)) {
          row.push('.');
        } else {
          row.push('#');
        }
      }
    } else {
      for (let x = 0; x < WIDTH; x++) {
        if (x === 0 || x === WIDTH - 1) row.push('#');
        else if (data.has(`${x},${y}`)) row.push(data.get(`${x},${y}`));
        else row.push('.');
      }
    }

    output.push(row.join(''));
  }

  console.log(output.join('\n'));
}

write(24, 1, `${bfs(initialState)}`);
