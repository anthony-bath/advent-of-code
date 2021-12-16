import fs from "fs";

const data = fs
  .readFileSync("./01/input.txt")
  .toString()
  .split("\n")
  .map((x) => parseInt(x, 10));

fs.writeFileSync(
  "./01/output-1.txt",
  data
    .reduce((depthIncreaseCount, depth, i) => {
      return i === 0
        ? depthIncreaseCount
        : depthIncreaseCount + (depth > data[i - 1] ? 1 : 0);
    }, 0)
    .toString()
);
