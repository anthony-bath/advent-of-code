import { write } from '../../utility.js';
import { loadData, evaluateBoard, sumBoard } from './common.js';

const [YEAR, DAY, PART] = [2021, 4, 2];

const { numbers, boards } = loadData();

const winningStates = [];
const wonBoardIndices = [];

for (const number of numbers) {
  for (let i = 0; i < boards.length; i++) {
    if (wonBoardIndices.includes(i)) {
      continue;
    }

    const board = boards[i];
    const result = evaluateBoard(number, board);

    if (result) {
      winningStates.push({ board, number });
      wonBoardIndices.push(i);
    }
  }
}

const { board, number } = winningStates.pop();

write(YEAR, DAY, PART, sumBoard(board) * number);
