import { loadData, evaluateBoard, sumBoard } from "../util/index.js";
import fs from "fs";

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

fs.writeFileSync(
  "./04/part-2/output.txt",
  (sumBoard(board) * number).toString()
);
