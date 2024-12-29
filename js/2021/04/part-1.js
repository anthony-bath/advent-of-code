import { getInputElements, evaluateBoard, sumBoard } from './common.js';

export function part1({ lines }) {
  const { numbers, boards } = getInputElements(lines);

  let bestBoard = null;

  for (const number of numbers) {
    for (let board of boards) {
      const result = evaluateBoard(number, board);

      if (result) {
        bestBoard = board;
        break;
      }
    }

    if (bestBoard) {
      return sumBoard(bestBoard) * number;
    }
  }
}
