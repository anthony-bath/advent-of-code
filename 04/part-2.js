import { loadData, evaluateBoard, sumBoard } from "./shared.js";
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

fs.writeFileSync("./04/output-2.txt", (sumBoard(board) * number).toString());
