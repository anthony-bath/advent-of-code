import { read, write } from '../utility.js';

const input = read(22);

const WIDTH = Math.max(
  ...input.filter((line) => !/\d/.test(line)).map((line) => line.length)
);
const HEIGHT = input.length - 2;

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

function getCubeSide(row, col) {
  if (row < 50) {
    // BOTTOM or RIGHT
    return col < 100 ? SIDE.BOTTOM : SIDE.RIGHT;
  }

  if (row < 100) {
    return SIDE.BACK;
  }

  if (row < 150) {
    // LEFT or TOP
    return col < 50 ? SIDE.LEFT : SIDE.TOP;
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

const DIRECTION = {
  RIGHT: 'R',
  LEFT: 'L',
  UP: 'U',
  DOWN: 'D',
};

const EDGE = {
  BOTTOM: {
    LEFT: 50,
    RIGHT: 99,
    TOP: 0,
    BOTTOM: 49,
  },
  FRONT: {
    LEFT: 0,
    RIGHT: 49,
    TOP: 150,
    BOTTOM: 199,
  },
  LEFT: {
    LEFT: 0,
    RIGHT: 49,
    TOP: 100,
    BOTTOM: 149,
  },
  RIGHT: {
    LEFT: 100,
    RIGHT: 149,
    TOP: 0,
    BOTTOM: 49,
  },
  BACK: {
    LEFT: 50,
    RIGHT: 99,
    TOP: 100,
    BOTTOM: 149,
  },
  TOP: {
    LEFT: 50,
    RIGHT: 99,
    TOP: 100,
    BOTTOM: 149,
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

let direction = 'R';
let row = 0;
let col = startCol;

while (instructions.length) {
  const instruction = instructions.shift();

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
                  currentSide = SIDE.RIGHT;
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
                // puts us on left edge of FRONT for col
                // and our current col will convert to
                // (col + 100) row
                const checkCol = EDGE.FRONT.LEFT;
                const checkRow = col + 100;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = SIDE.FRONT;
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
                // puts us on left edge of LEFT for col
                // and our current col will conver to
                // (49 - col + EDGE.LEFT.TOP) row
                const checkCol = EDGE.LEFT.LEFT;
                const checkRow = 49 - col + EDGE.LEFT.TOP;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = SIDE.LEFT;
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
                  currentSide = SIDE.BACK;
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
              if (row + 1 > EDGE.RIGHT.RIGHT) {
                // need to see if we can wrap to TOP
                // puts us on right edge of TOP for col
                // and our current row will convert to
                // (49 - row + EDGE.FRONT.TOP)
                const checkCol = EDGE.FRONT.RIGHT;
                const checkRow = 49 - row + EDGE.FRONT.TOP;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = SIDE.TOP;
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

            case 'U':
              if (row - 1 < EDGE.RIGHT.TOP) {
                // need to see if we can wrap to to FRONT
                // puts us on bottom edge of FRONT for row
                // and our current col will convert to
                // (col - EDGE.RIGHT.LEFT) col
                const checkRow = EDGE.BOTTOM.FRONT;
                const checkCol = col - EDGE.RIGHT.LEFT;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = SIDE.FRONT;
                  direction = DIRECTION.UP;
                  row = checkRow;
                  col = checkCol;
                  steps--;
                }
              } else if (board[row][col - 1] === '#') {
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
                  currentSide = SIDE.BOTTOM;
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
                // puts us at right edge of BACK for col
                // and our col will be the row
                const checkRow = col;
                const checkCol = EDGE.BACK.RIGHT;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = SIDE.BACK;
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
                // puts at bottom edge of right for row
                // and our row will convert to col
                const checkRow = EDGE.RIGHT.BOTTOM;
                const checkCol = row;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap, done walking
                  doneWalking = true;
                } else {
                  // can wrap, change our side and direction and continue walking
                  currentSide = SIDE.RIGHT;
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
                  currentSide = SIDE.BOTTOM;
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
                  currentSide = SIDE.LEFT;
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
                  currentSide = SIDE.TOP;
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
                  currentSide = SIDE.TOP;
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
                  currentSide = SIDE.BACK;
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
                  currentSide = SIDE.BOTTOM;
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
                  currentSide = SIDE.FRONT;
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
                  currentSide = SIDE.RIGHT;
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
                  currentSide = SIDE.BACK;
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
                  currentSide = SIDE.LEFT;
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
                // row = col + EDGE.TOP.TOP
                const checkCol = EDGE.FRONT.RIGHT;
                const checkRow = col + EDGE.TOP.TOP;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = SIDE.FRONT;
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
                const checkCol = row - 100;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = SIDE.TOP;
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
                  currentSide = SIDE.LEFT;
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
                const checkCol = row - 100;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = SIDE.BOTTOM;
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
                const checkCol = col + 100;

                if (board[checkRow][checkCol] === '#') {
                  // can't wrap
                  doneWalking = true;
                } else {
                  currentSide = SIDE.RIGHT;
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

  console.log(`${1 + row} ${1 + col} ${DIRECTION_SCORE[direction]}`);
}

write(
  22,
  2,
  `${1000 * (row + 1) + 4 * (col + 1) + DIRECTION_SCORE[direction]}`
);
