import { write } from '../../utility.js';
import { loadData, evaluateBoard, sumBoard } from './common.js';

const [YEAR, DAY, PART] = [2021, 4, 1];

const { numbers, boards } = loadData();

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
    write(YEAR, DAY, PART, sumBoard(bestBoard) * number);
    break;
  }
}
