import fs from "fs";

export const loadData = () => {
  const data = fs.readFileSync("./21/input.txt").toString().split("\n");
  const p1Start = parseInt(
    data[0].replace("Player 1 starting position: ", "").replace(/[^\d]/g, "")
  );
  const p2Start = parseInt(
    data[1].replace("Player 2 starting position: ", "").replace(/[^\d]/g, "")
  );

  return { p1Start, p2Start };
};

export const ROLLS = [
  3, 4, 5, 4, 5, 6, 5, 6, 7, 4, 5, 6, 5, 6, 7, 6, 7, 8, 5, 6, 7, 6, 7, 8, 7, 8,
  9,
];
