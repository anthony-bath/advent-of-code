import fs from "fs";

const [[x1, x2], [y1, y2]] = fs
  .readFileSync("./17/input.txt")
  .toString()
  .replace(/[^\.,-\d]/g, "")
  .split(",")
  .map((v) => v.split("..").map((n) => parseInt(n)));

const maxHeight = (-y1 * (-y1 - 1)) / 2;

fs.writeFileSync("./17/output-1.txt", maxHeight.toString());
