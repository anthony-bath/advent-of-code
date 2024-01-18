import { getInputElements, evaluateBoard, sumBoard } from './common.js';

export function part2({ lines }) {
  const { numbers, boards } = getInputElements(lines);

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

  return sumBoard(board) * number;
}
