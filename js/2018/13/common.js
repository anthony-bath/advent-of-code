import { readOld } from '../../../utilities/io.js';

const [YEAR, DAY] = [2018, 13];

export const DIRECTION = {
  NORTH: 1,
  SOUTH: 2,
  EAST: 3,
  WEST: 4,
};

const INTERSECTION_TURN = {
  LEFT: 0,
  STRAIGHT: 1,
  RIGHT: 2,
};

export class Cart {
  constructor(x, y, direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
    this.nextTurn = INTERSECTION_TURN.LEFT;
  }

  tick(track) {
    const { x, y } = this;

    switch (this.direction) {
      case DIRECTION.NORTH:
        {
          const nextTrackSegment = track[y - 1][x];

          if (nextTrackSegment === '\\') {
            this.direction = DIRECTION.WEST;
          } else if (nextTrackSegment === '/') {
            this.direction = DIRECTION.EAST;
          } else if (nextTrackSegment === '+') {
            switch (this.nextTurn) {
              case INTERSECTION_TURN.LEFT:
                this.direction = DIRECTION.WEST;
                break;
              case INTERSECTION_TURN.RIGHT:
                this.direction = DIRECTION.EAST;
                break;
            }

            this.nextTurn = (this.nextTurn + 1) % 3;
          }

          this.y -= 1;
        }
        break;

      case DIRECTION.SOUTH:
        {
          const nextTrackSegment = track[y + 1][x];

          if (nextTrackSegment === '\\') {
            this.direction = DIRECTION.EAST;
          } else if (nextTrackSegment === '/') {
            this.direction = DIRECTION.WEST;
          } else if (nextTrackSegment === '+') {
            switch (this.nextTurn) {
              case INTERSECTION_TURN.LEFT:
                this.direction = DIRECTION.EAST;
                break;
              case INTERSECTION_TURN.RIGHT:
                this.direction = DIRECTION.WEST;
                break;
            }

            this.nextTurn = (this.nextTurn + 1) % 3;
          }

          this.y += 1;
        }
        break;

      case DIRECTION.EAST:
        {
          const nextTrackSegment = track[y][x + 1];

          if (nextTrackSegment === '\\') {
            this.direction = DIRECTION.SOUTH;
          } else if (nextTrackSegment === '/') {
            this.direction = DIRECTION.NORTH;
          } else if (nextTrackSegment === '+') {
            switch (this.nextTurn) {
              case INTERSECTION_TURN.LEFT:
                this.direction = DIRECTION.NORTH;
                break;
              case INTERSECTION_TURN.RIGHT:
                this.direction = DIRECTION.SOUTH;
                break;
            }

            this.nextTurn = (this.nextTurn + 1) % 3;
          }

          this.x += 1;
        }
        break;

      case DIRECTION.WEST:
        {
          const nextTrackSegment = track[y][x - 1];

          if (nextTrackSegment === '\\') {
            this.direction = DIRECTION.NORTH;
          } else if (nextTrackSegment === '/') {
            this.direction = DIRECTION.SOUTH;
          } else if (nextTrackSegment === '+') {
            switch (this.nextTurn) {
              case INTERSECTION_TURN.LEFT:
                this.direction = DIRECTION.SOUTH;
                break;
              case INTERSECTION_TURN.RIGHT:
                this.direction = DIRECTION.NORTH;
                break;
            }

            this.nextTurn = (this.nextTurn + 1) % 3;
          }

          this.x -= 1;
        }
        break;
    }
  }
}

export function getInputElements(lines) {
  let carts = [];

  const track = lines.map((line, y) => {
    const parts = line.split('');

    for (let x = 0; x < parts.length; x++) {
      let dir = null;

      switch (parts[x]) {
        case '>':
          dir = DIRECTION.EAST;
          parts[x] = '-';
          break;

        case '<':
          dir = DIRECTION.WEST;
          parts[x] = '-';
          break;

        case '^':
          dir = DIRECTION.NORTH;
          parts[x] = '|';
          break;

        case 'v':
          dir = DIRECTION.SOUTH;
          parts[x] = '|';
          break;
      }

      if (dir) {
        carts.push(new Cart(x, y, dir));
      }
    }

    return parts;
  });

  return { track, carts };
}

export function sortCarts(a, b) {
  if (a.y !== b.y) return a.y - b.y;
  return a.x - b.x;
}
