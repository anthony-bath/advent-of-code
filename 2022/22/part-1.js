import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2022, 22, 1];

const input = read(YEAR, DAY, PART);

const WIDTH = Math.max(...input.filter((line) => !/\d/.test(line)).map((line) => line.length));
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

let direction = 'R';
let row = 0;
let col = startCol;

while (instructions.length) {
  const instruction = instructions.shift();

  if (Number.isInteger(instruction)) {
    // move steps
    let steps = instruction;
    let doneWalking = false;

    while (steps > 0) {
      switch (direction) {
        case 'R':
          if (col + 1 >= WIDTH || board[row][col + 1] === null) {
            // need to attempt to wrap
            const possibleCol = board[row].findIndex((tile) => tile !== null);

            if (board[row][possibleCol] === '#') {
              // can't wrap, am done walking
              doneWalking = true;
            } else {
              // can wrap, continue walking
              col = possibleCol;
              steps--;
            }
          } else if (board[row][col + 1] === '#') {
            // can't walk further, wall
            doneWalking = true;
          } else {
            // should be able to walk
            col++;
            steps--;
          }

          break;

        case 'L':
          if (col - 1 < 0 || board[row][col - 1] === null) {
            // need to attempt to wrap
            const possibleCol = board[row].findLastIndex((tile) => tile !== null);

            if (board[row][possibleCol] === '#') {
              // can't wrap, am done walking
              doneWalking = true;
            } else {
              // can wrap, continue walking
              col = possibleCol;
              steps--;
            }
          } else if (board[row][col - 1] === '#') {
            // can't walk further, wall
            doneWalking = true;
          } else {
            // should be able to walk
            col--;
            steps--;
          }

          break;
        case 'U':
          if (row - 1 < 0 || board[row - 1][col] === null) {
            // need to attempt to wrap
            let possibleRow = HEIGHT - 1;
            let foundRow = false;

            while (!foundRow) {
              const tile = board[possibleRow][col];

              if (tile === null) {
                possibleRow--;
              } else if (tile === '#') {
                // can't wrap, am done walking
                foundRow = true;
                doneWalking = true;
              } else {
                foundRow = true;
              }
            }

            if (!doneWalking) {
              row = possibleRow;
              steps--;
            }
          } else if (board[row - 1][col] === '#') {
            // can't walk further, wall
            doneWalking = true;
          } else {
            // should be able to walk
            row--;
            steps--;
          }

          break;
        case 'D':
          if (row + 1 >= HEIGHT || board[row + 1][col] === null) {
            // need to attempt to wrap
            let possibleRow = 0;
            let foundRow = false;

            while (!foundRow) {
              const tile = board[possibleRow][col];

              if (tile === null) {
                possibleRow++;
              } else if (tile === '#') {
                // can't wrap, am done walking
                foundRow = true;
                doneWalking = true;
              } else {
                foundRow = true;
              }
            }

            if (!doneWalking) {
              row = possibleRow;
              steps--;
            }
          } else if (board[row + 1][col] === '#') {
            // can't walk further, wall
            doneWalking = true;
          } else {
            // should be able to walk
            row++;
            steps--;
          }
      }

      if (doneWalking) break;
    }
  } else {
    direction = getNextDirection(direction, instruction);
  }
}

const DIRECTION_SCORE = {
  R: 0,
  D: 1,
  L: 2,
  U: 3,
};

write(YEAR, DAY, PART, 1000 * (row + 1) + 4 * (col + 1) + DIRECTION_SCORE[direction]);
