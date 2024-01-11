export function part2({ lines }) {
  const grid = new Map();

  lines.forEach((line, y) => {
    line.split('').map((cell, x) => grid.set(`${x}|${y}`, cell));
  });

  function getGridValue(x, y) {
    const key = `${x}|${y}`;

    if (!grid.has(key)) {
      grid.set(key, '.');
    }

    return grid.get(key);
  }

  const DIR = {
    NORTH: 0,
    EAST: 1,
    SOUTH: 2,
    WEST: 3,
  };

  const STATE = {
    CLEAN: '.',
    WEAKENED: '%',
    FLAGGED: '*',
    INFECTED: '#',
  };

  const BURSTS = 10000000;

  let [x, y] = [12, 12];
  let direction = DIR.NORTH;
  let count = 0;

  for (let burst = 0; burst < BURSTS; burst++) {
    const key = `${x}|${y}`;
    const current = getGridValue(x, y);

    switch (current) {
      case STATE.CLEAN:
        direction = direction - 1 >= 0 ? direction - 1 : DIR.WEST;
        grid.set(key, STATE.WEAKENED);
        break;

      case STATE.WEAKENED:
        count++;
        grid.set(key, STATE.INFECTED);
        break;

      case STATE.FLAGGED:
        direction = (direction + 2) % 4;
        grid.set(key, STATE.CLEAN);
        break;

      case STATE.INFECTED:
        direction = (direction + 1) % 4;
        grid.set(key, STATE.FLAGGED);
    }

    switch (direction) {
      case DIR.NORTH:
        y--;
        break;

      case DIR.EAST:
        x++;
        break;

      case DIR.SOUTH:
        y++;
        break;

      case DIR.WEST:
        x--;
        break;
    }
  }

  return count;
}
