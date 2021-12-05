import { loadData, evaluateBoard, sumBoard } from "../util/index.js";
import fs from "fs";

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
    fs.writeFileSync(
      "./04/part-1/output.txt",
      (sumBoard(bestBoard) * number).toString()
    );
    break;
  }
}
