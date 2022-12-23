import { read, write } from '../utility.js';

const SIZE = 50;
const input = read(22);

const WIDTH = Math.max(
  ...input.filter((line) => !/\d/.test(line)).map((line) => line.length)
);

let parsedGrid = false;
const instructions = [];
const board = [];
let startCol = null;

input.forEach((line) => {
  if (!line) {
    parsedGrid = true;
    return;
  }

  if (parsedGrid) {
    const rotations = line.replace(/\d/g, '').split('');
    const steps = line.split(/[RL]/).map((n) => Number(n));

    while (rotations.length || steps.length) {
      if (steps.length) instructions.push(steps.shift());
      if (rotations.length) instructions.push(rotations.shift());
    }
  } else {
    const row = [];

    for (let i = 0; i < WIDTH; i++) {
      if (line[i]?.trim()) {
        row.push(line[i]);

        if (!startCol) startCol = i;
      } else {
        row.push(null);
      }
    }

    board.push(row);
  }
});

function getNextDirection(direction, rotation) {
  switch (rotation) {
    case 'R':
      switch (direction) {
        case 'R':
          return 'D';
        case 'D':
          return 'L';
        case 'L':
          return 'U';
        case 'U':
          return 'R';
      }
      break;
    case 'L':
      switch (direction) {
        case 'R':
          return 'U';
        case 'D':
          return 'R';
        case 'L':
          return 'D';
        case 'U':
          return 'L';
      }
      break;
  }
}

function getCubeSide(row, col, debug) {
  if (row < SIZE) {
    // BOTTOM or RIGHT
    if (col >= SIZE && col < 2 * SIZE) {
      return SIDE.BOTTOM;
    }

    if (col >= 2 * SIZE && col < 3 * SIZE) {
      return SIDE.RIGHT;
    }

    throw `(Bottom/Right) Invalid Range For Cube Side (Row: ${row} Col: ${col}) ${
      debug ? 'DEBUG: ' + debug : ''
    }`;
  }

  if (row < 2 * SIZE) {
    if (col >= SIZE && col < 2 * SIZE) {
      return SIDE.BACK;
    }

    throw `(Back) Invalid Range For Cube Side (Row: ${row} Col: ${col}) ${
      debug ? 'DEBUG: ' + debug : ''
    }`;
  }

  if (row < 3 * SIZE) {
    // LEFT or TOP
    if (col < SIZE) {
      return SIDE.LEFT;
    }

    if (col < 2 * SIZE) {
      return SIDE.TOP;
    }

    throw `(Left/Top) Invalid Range For Cube Side (Row: ${row} Col: ${col}) ${
      debug ? 'DEBUG: ' + debug : ''
    }`;
  }

  return SIDE.FRONT;
}

const SIDE = {
  BOTTOM: 0,
  RIGHT: 1,
  BACK: 2,
  LEFT: 3,
  TOP: 4,
  FRONT: 5,
};

function getSideName(side) {
  switch (side) {
    case SIDE.BOTTOM:
      return 'BOTTOM';
    case SIDE.RIGHT:
      return 'RIGHT';
    case SIDE.BACK:
      return 'BACK';
    case SIDE.LEFT:
      return 'LEFT';
    case SIDE.TOP:
      return 'TOP';
    case SIDE.FRONT:
      return 'FRONT';
  }
}

const DIRECTION = {
  RIGHT: 'R',
  LEFT: 'L',
  UP: 'U',
  DOWN: 'D',
};

const EDGE = {
  BOTTOM: {
    LEFT: SIZE,
    RIGHT: 2 * SIZE - 1,
    TOP: 0,
    BOTTOM: SIZE - 1,
  },
  FRONT: {
    LEFT: 0,
    RIGHT: SIZE - 1,
    TOP: 3 * SIZE,
    BOTTOM: 4 * SIZE - 1,
  },
  LEFT: {
    LEFT: 0,
    RIGHT: SIZE - 1,
    TOP: 2 * SIZE,
    BOTTOM: 3 * SIZE - 1,
  },
  RIGHT: {
    LEFT: 2 * SIZE,
    RIGHT: 3 * SIZE - 1,
    TOP: 0,
    BOTTOM: SIZE - 1,
  },
  BACK: {
    LEFT: SIZE,
    RIGHT: 2 * SIZE - 1,
    TOP: SIZE,
    BOTTOM: 2 * SIZE - 1,
  },
  TOP: {
    LEFT: SIZE,
    RIGHT: 2 * SIZE - 1,
    TOP: 2 * SIZE,
    BOTTOM: 3 * SIZE - 1,
  },
};

const DIRECTION_SCORE = {
  R: 0,
  D: 1,
  L: 2,
  U: 3,
};

// TOP
// R -> RIGHT (L)
// U -> BACK (U)
// L -> LEFT (L)
// D -> FRONT (L)

// BOTTOM
// R -> RIGHT (R)
// U -> FRONT (R)
// L -> LEFT (R)
// D -> BACK (D)

// LEFT
// R -> TOP (R)
// U -> BACK (R)
// L -> BOTTOM (R)
// D -> FRONT (D)

// RIGHT
// R -> TOP (L)
// U -> FRONT (U)
// L -> BOTTOM (L)
// D -> BACK (L)

// FRONT
// R -> TOP (U)
// U -> LEFT (U)
// L -> BOTTOM (D)
// D -> RIGHT (D)

// BACK
// R -> RIGHT (U)
// U -> BOTTOM (U)
// L -> LEFT (D)
// D -> TOP (D)

let direction = DIRECTION.RIGHT;
let row = 0;
let col = startCol;

const temp = instructions.slice(0, 7);

while (instructions.length) {
  const instruction = instructions.shift();
  //console.log(`instruction: ${instruction} ${direction}`);

  if (Number.isInteger(instruction)) {
    // move steps
    let steps = instruction;
    let currentSide = getCubeSide(row, col);
    let doneWalking = false;

    while (steps > 0) {
      switch (currentSide) {
        case SIDE.BOTTOM:
          switch (direction) {
            case 'R':
              if (col + 1 > EDGE.BOTTOM.RIGHT) {
                // need to see if we can wrap to RIGHT
                // row and col remain unchanged for this transition
                if (board[row][col + 1] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  //can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(row, col + 1, 'BOTTOM->R');
                  direction = DIRECTION.RIGHT;
                  col++;
                  steps--;
                }
              } else if (board[row][col + 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col++;
                steps--;
              }

              break;

            case 'U':
              if (row - 1 < EDGE.BOTTOM.TOP) {
                // need to see if we can wrap to FRONT
                // col = EDGE.FRONT.LEFT
                // row =
                const checkCol = EDGE.FRONT.LEFT;
                const checkRow = col + 2 * SIZE; // CONFIRMED

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'BOTTOM->U');
                  direction = DIRECTION.RIGHT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row - 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row--;
                steps--;
              }

              break;

            case 'L':
              if (col - 1 < EDGE.BOTTOM.LEFT) {
                // need to see if we can wrap to LEFT
                // col: EDGE.LEFT.LEFT
                // row: 3 * SIZE - 1 - col
                const checkCol = EDGE.LEFT.LEFT;
                const checkRow = 3 * SIZE - 1 - row; // CONFIRMED

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'BOTTOM->L');
                  direction = DIRECTION.RIGHT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col--;
                steps--;
              }
              break;

            case 'D':
              if (row + 1 > EDGE.BOTTOM.BOTTOM) {
                // need to see if we can wrap to BACK
                // row and col remain unchanged for this transition
                if (board[row + 1][col] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(row + 1, col, 'BOTTOM->D');
                  direction = DIRECTION.DOWN;
                  row++;
                  steps--;
                }
              } else if (board[row + 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row++;
                steps--;
              }
              break;
          }
          break;

        case SIDE.RIGHT:
          switch (direction) {
            case 'R':
              if (col + 1 > EDGE.RIGHT.RIGHT) {
                // need to see if we can wrap to TOP
                // col = EDGE.TOP.RIGHT
                // row = 3 * SIZE - 1 - row
                const checkCol = EDGE.TOP.RIGHT;
                const checkRow = 3 * SIZE - 1 - row; // CONFIRMED

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'RIGHT->R');
                  direction = DIRECTION.LEFT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col + 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col++;
                steps--;
              }

              break;

            case 'U':
              if (row - 1 < EDGE.RIGHT.TOP) {
                // need to see if we can wrap to to FRONT
                // row = EDGE.FRONT.BOTTOM
                // col = col - (2 * SIZE)
                const checkRow = EDGE.FRONT.BOTTOM;
                const checkCol = col - 2 * SIZE; // CONFIRMED

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'RIGHT->U');
                  direction = DIRECTION.UP;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row - 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row--;
                steps--;
              }
              break;

            case 'L':
              if (col - 1 < EDGE.RIGHT.LEFT) {
                // need to see if we can wrap to BOTTOM
                // row and col remain unchanged for this transition
                if (board[row][col - 1] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(row, col - 1, 'RIGHT->L');
                  direction = DIRECTION.LEFT;
                  col--;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col--;
                steps--;
              }
              break;

            case 'D':
              if (row + 1 > EDGE.RIGHT.BOTTOM) {
                // need to see if we can wrap to BACK
                // col = EDGE.BACK.RIGHT
                // row = col - SIZE
                const checkRow = col - SIZE; // CONFIRMED
                const checkCol = EDGE.BACK.RIGHT;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'RIGHT->D');
                  direction = DIRECTION.LEFT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row + 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row++;
                steps--;
              }
              break;
          }

          break;

        case SIDE.BACK:
          switch (direction) {
            case 'R':
              if (col + 1 > EDGE.BACK.RIGHT) {
                // need to see if we can wrap to RIGHT
                // row = EDGE.RIGHT.BOTTOM
                // col = row + SIZE
                const checkRow = EDGE.RIGHT.BOTTOM;
                const checkCol = row + SIZE;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'BACK->R');
                  direction = DIRECTION.UP;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col + 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col++;
                steps--;
              }
              break;

            case 'U':
              if (row - 1 < EDGE.BACK.TOP) {
                // need to see if we can wrap to BOTTOM
                // row and col remain unchanged for this transition
                if (board[row - 1][col] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(row - 1, col, 'BACK->U');
                  direction = DIRECTION.UP;
                  row--;
                  steps--;
                }
              } else if (board[row - 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row--;
                steps--;
              }
              break;

            case 'L':
              if (col - 1 < EDGE.BACK.LEFT) {
                // need to see if we can wrap to LEFT
                // at top edge of left for row
                // our row will conver to col via
                // row - EDGE.BACK.TOP
                const checkCol = row - EDGE.BACK.TOP;
                const checkRow = EDGE.LEFT.TOP;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(checkRow, checkCol, 'BACK->L');
                  direction = DIRECTION.DOWN;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col--;
                steps--;
              }
              break;

            case 'D':
              if (row + 1 > EDGE.BACK.BOTTOM) {
                // need to see if we can wrap to TOP
                // row and column don't change for this transition
                if (board[row + 1][col] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = getCubeSide(row + 1, col, 'BACK->D');
                  direction = DIRECTION.DOWN;
                  row++;
                  steps--;
                }
              } else if (board[row + 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row++;
                steps--;
              }
              break;
          }
          break;

        case SIDE.LEFT:
          switch (direction) {
            case 'R':
              if (col + 1 > EDGE.LEFT.RIGHT) {
                // need to see if we can wrap to TOP
                // row and col don't change

                if (board[row][col + 1] === '#') {
                  // can't wrap so done walking
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(row, col + 1, 'LEFT->R');
                  direction = DIRECTION.RIGHT;
                  col++;
                  steps--;
                }
              } else if (board[row][col + 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col++;
                steps--;
              }
              break;

            case 'U':
              if (row - 1 < EDGE.LEFT.TOP) {
                // need to see if we can wrap to BACK
                // col = EDGE.BACK.LEFT
                // row = col + EDGE.BACK.TOP
                const checkRow = col + EDGE.BACK.TOP;
                const checkCol = EDGE.BACK.LEFT;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap so done walking
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'LEFT->U');
                  direction = DIRECTION.RIGHT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row - 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row--;
                steps--;
              }
              break;

            case 'L':
              if (col - 1 < EDGE.LEFT.LEFT) {
                // need to see if we can wrap to BOTTOM
                // col = EDGE.BOTTOM.LEFT
                // row = EDGE.LEFT.BOTTOM - row

                const checkCol = EDGE.BOTTOM.LEFT;
                const checkRow = EDGE.LEFT.BOTTOM - row;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'LEFT->L');
                  direction = DIRECTION.RIGHT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                col--;
                steps--;
              }
              break;
            case 'D':
              if (row + 1 > EDGE.LEFT.BOTTOM) {
                // need to check if we can wrap to FRONT
                // row and col don't change
                if (board[row + 1][col] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(row + 1, col, 'LEFT->D');
                  direction = DIRECTION.DOWN;
                  row++;
                  steps--;
                }
              } else if (board[row + 1][col] === '#') {
                // ran into a wall so done walking
                doneWalking = true;
              } else {
                // should be able to walk
                row++;
                steps--;
              }
              break;
          }
          break;

        case SIDE.TOP:
          switch (direction) {
            case 'R':
              if (col + 1 > EDGE.TOP.RIGHT) {
                // need to see if we can wrap to RIGHT
                // col = EDGE.RIGHT.RIGHT
                // row = EDGE.TOP.BOTTOM - row
                const checkCol = EDGE.RIGHT.RIGHT;
                const checkRow = EDGE.TOP.BOTTOM - row;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'TOP->R');
                  direction = DIRECTION.LEFT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col + 1] === '#') {
                // wall
                doneWalking = true;
              } else {
                // should be able to walk
                col++;
                steps--;
              }
              break;

            case 'U':
              if (row - 1 < EDGE.TOP.TOP) {
                // need to see if we can wrap to BACK
                // row and col don't change
                if (board[row - 1][col] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(row - 1, col, 'TOP->U');
                  direction = DIRECTION.UP;
                  row--;
                  steps--;
                }
              } else if (board[row - 1][col] === '#') {
                // wall
                doneWalking = true;
              } else {
                // should be able to walk
                row--;
                steps--;
              }
              break;

            case 'L':
              if (col - 1 < EDGE.TOP.LEFT) {
                // need to see if we can wrap to LEFT
                // row and col don't change
                if (board[row][col - 1] === '#') {
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(row, col - 1, 'TOP->L');
                  direction = DIRECTION.LEFT;
                  col--;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
                // wall
                doneWalking = true;
              } else {
                // should be able to walk
                col--;
                steps--;
              }
              break;

            case 'D':
              if (row + 1 > EDGE.TOP.BOTTOM) {
                // need to see if we can wrap to FRONT
                // col = EDGE.FRONT.RIGHT
                // row = col + (2*SIZE)
                const checkCol = EDGE.FRONT.RIGHT;
                const checkRow = col + 2 * SIZE;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'TOP->D');
                  direction = DIRECTION.LEFT;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row + 1][col] === '#') {
                // wall
                doneWalking = true;
              } else {
                // should be able to walk
                row++;
                steps--;
              }
              break;
          }

          break;

        case SIDE.FRONT:
          switch (direction) {
            case 'R':
              if (col + 1 > EDGE.FRONT.RIGHT) {
                // need to see if we can wrap to TOP
                // row = EDGE.TOP.BOTTOM
                // col = row - 100
                const checkRow = EDGE.TOP.BOTTOM;
                const checkCol = row - 2 * SIZE;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'FRONT->R');
                  direction = DIRECTION.UP;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col + 1] === '#') {
                //wall
                doneWalking = true;
              } else {
                // should be able to keep walking
                col++;
                steps--;
              }
              break;

            case 'U':
              if (row - 1 < EDGE.FRONT.TOP) {
                // need to see if we can wrap to LEFT
                // row and col don't change
                if (board[row - 1][col] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(row - 1, col, 'FRONT->U');
                  direction = DIRECTION.UP;
                  row--;
                  steps--;
                }
              } else if (board[row - 1][col] === '#') {
                //wall
                doneWalking = true;
              } else {
                // should be able to keep walking
                row--;
                steps--;
              }
              break;

            case 'L':
              if (col - 1 < EDGE.FRONT.LEFT) {
                // need to see if we can wrap to BOTTOM
                // row = EDGE.BOTTOM.TOP
                // col = row - 100
                const checkRow = EDGE.BOTTOM.TOP;
                const checkCol = row - 2 * SIZE;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'FRONT->L');
                  direction = DIRECTION.DOWN;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
                // wall
                doneWalking = true;
              } else {
                // should be able to keep walking
                col--;
                steps--;
              }
              break;

            case 'D':
              if (row + 1 > EDGE.FRONT.BOTTOM) {
                // need to see if we can wrap to RIGHT
                // row = EDGE.RIGHT.TOP
                // col = col + 100

                const checkRow = EDGE.RIGHT.TOP;
                const checkCol = col + 2 * SIZE;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = getCubeSide(checkRow, checkCol, 'FRONT->D');
                  direction = DIRECTION.DOWN;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row + 1][col] === '#') {
                // wall
                doneWalking = true;
              } else {
                // should be able to keep walking
                row++;
                steps--;
              }
              break;
          }

          break;
      }

      if (doneWalking) break;
    }
  } else {
    direction = getNextDirection(direction, instruction);
  }

  //console.log(`${1 + row} ${1 + col} ${DIRECTION_SCORE[direction]}`);
}

write(
  22,
  2,
  `${1000 * (row + 1) + 4 * (col + 1) + DIRECTION_SCORE[direction]}`
);
