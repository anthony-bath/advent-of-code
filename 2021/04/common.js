import { read } from '../../utility.js';

const [YEAR, DAY] = [2021, 4];

export const loadData = () => {
  const numbers = read(YEAR, DAY, { splitBy: ',', part: 1 }).map((x) => Number(x));

  const boards = [];
  let board = [];

  read(YEAR, DAY, { part: 2 }).forEach((row, index) => {
    if ((index + 1) % 6 === 0) {
      boards.push(board);
      board = [];
    } else {
      board.push(
        ...row
          .trim()
          .split(' ')
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
