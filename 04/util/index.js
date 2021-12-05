import fs from "fs";

export const loadData = () => {
  const numbers = fs
    .readFileSync("./04/input-1.txt")
    .toString()
    .split(",")
    .map((x) => parseInt(x));

  const boards = [];
  let board = [];

  fs.readFileSync("./04/input-2.txt")
    .toString()
    .split("\n")
    .forEach((row, index) => {
      if ((index + 1) % 6 === 0) {
        boards.push(board);
        board = [];
      } else {
        board.push(
          ...row
            .trim()
            .split(" ")
            .filter((x) => x)
            .map((x) => parseInt(x))
        );
      }
    });

  boards.push(board);

  return { numbers, boards };
};

export function evaluateBoard(target, board) {
  board.forEach((num, index) => {
    if (num === target) {
      board[index] = -1;
    }
  });

  return checkRows(board) || checkCols(board);
}

export function sumBoard(board) {
  return board.filter((x) => x > -1).reduce((sum, val) => (sum += val), 0);
}

function checkRows(board) {
  for (let row = 1; row <= 5; row++) {
    const start = (row - 1) * 5;

    if (board.slice(start, start + 5).every((x) => x === -1)) {
      return true;
    }
  }

  return false;
}

function checkCols(board) {
  for (let col = 1; col <= 5; col++) {
    if (board.filter((_, i) => (i - col) % 5 === 0).every((x) => x === -1)) {
      return true;
    }
  }

  return false;
}
