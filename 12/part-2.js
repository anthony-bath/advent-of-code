import { read, write } from '../utility.js';

const X_START = 0;
const Y_START = 0;
const expr = /(?<instruction>[NSEWFLR])(?<amount>\d+)/;

const ship = { x: X_START, y: Y_START };
const waypoint = { x: 10, y: -1 };

read(12).forEach((line) => {
  let { instruction, amount } = line.match(expr).groups;
  amount = Number(amount);

  if (instruction === 'L') {
    instruction = 'R';
    amount = 360 - amount;
  }

  const temp_x = waypoint.x;
  const temp_y = waypoint.y;

  const { x, y } = waypoint;

  switch (instruction) {
    case 'N':
      waypoint.y -= amount;
      break;

    case 'S':
      waypoint.y += amount;
      break;

    case 'E':
      waypoint.x += amount;
      break;

    case 'W':
      waypoint.x -= amount;
      break;

    case 'R':
      if (y < 0) {
        if (x > 0) {
          // NORTH EAST
          switch (amount) {
            case 90:
              // to south east
              waypoint.y = temp_x;
              waypoint.x = Math.abs(temp_y);
              break;
            case 180:
              // to south west
              waypoint.y = Math.abs(temp_y);
              waypoint.x = -temp_x;
              break;
            case 270:
              // to north west
              waypoint.y = -temp_x;
              waypoint.x = temp_y;
              break;
          }
        } else if (x === 0) {
          // NORTH
          switch (amount) {
            case 90:
              // to east
              waypoint.y = 0;
              waypoint.x = Math.abs(temp_y);
              break;
            case 180:
              // to south
              waypoint.y = Math.abs(temp_y);
              waypoint.x = 0;
              break;
            case 270:
              // to west
              waypoint.y = 0;
              waypoint.x = temp_y;
              break;
          }
        } else {
          // NORTH WEST
          switch (amount) {
            case 90:
              // to north east
              waypoint.y = temp_x;
              waypoint.x = Math.abs(temp_y);
              break;
            case 180:
              // to south east
              waypoint.y = Math.abs(temp_y);
              waypoint.x = Math.abs(temp_x);
              break;
            case 270:
              // to south west
              waypoint.y = Math.abs(temp_x);
              waypoint.x = temp_y;
              break;
          }
        }
      } else if (y === 0) {
        if (x > 0) {
          // EAST
          switch (amount) {
            case 90:
              // to south
              waypoint.y = temp_x;
              waypoint.x = 0;
              break;
            case 180:
              // to west
              waypoint.y = 0;
              waypoint.x = -temp_x;
              break;
            case 270:
              // to north
              waypoint.y = -temp_x;
              waypoint.x = 0;
              break;
          }
        } else if (x === 0) {
          // CENTER (do nothing)
        } else {
          // WEST
          switch (amount) {
            case 90:
              // to north
              waypoint.y = temp_x;
              waypoint.x = 0;
              break;
            case 180:
              // to east
              waypoint.y = 0;
              waypoint.x = Math.abs(temp_x);
              break;
            case 270:
              // to south
              waypoint.y = Math.abs(temp_x);
              waypoint.x = 0;
              break;
          }
        }
      } else {
        if (x > 0) {
          // SOUTH EAST
          switch (amount) {
            case 90:
              // to south west
              waypoint.y = temp_x;
              waypoint.x = -temp_y;
              break;
            case 180:
              // to north west
              waypoint.y = -temp_y;
              waypoint.x = -temp_x;
              break;
            case 270:
              // to north east
              waypoint.y = -temp_x;
              waypoint.x = temp_y;
              break;
          }
        } else if (x === 0) {
          // SOUTH
          switch (amount) {
            case 90:
              // to west
              waypoint.x = -temp_y;
              waypoint.y = 0;
              break;
            case 180:
              // to north
              waypoint.y = -temp_y;
              waypoint.x = 0;
              break;
            case 270:
              // to east
              waypoint.x = temp_y;
              waypoint.y = 0;
              break;
          }
        } else {
          // SOUTH WEST
          switch (amount) {
            case 90:
              // to north west
              waypoint.x = -temp_y;
              waypoint.y = temp_x;
              break;
            case 180:
              // to north east
              waypoint.y = -temp_y;
              waypoint.x = Math.abs(temp_x);
              break;
            case 270:
              // to south east
              waypoint.y = -temp_x;
              waypoint.x = temp_y;
              break;
          }
        }
      }
      break;

    case 'F':
      ship.x += amount * waypoint.x;
      ship.y += amount * waypoint.y;
      break;
  }
});

write(12, 2, `${Math.abs(ship.x) + Math.abs(ship.y)}`);
