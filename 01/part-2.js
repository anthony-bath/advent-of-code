import fs from "fs";

const data = fs
  .readFileSync("./01/input.txt")
  .toString()
  .split("\n")
  .map((x) => parseInt(x, 10));

const windowSize = 3;
let windowIncreaseCount = 0;

for (let i = 1; i < data.length; i++) {
  const currentWindow = data.slice(i, windowSize + i);

  if (currentWindow.length < windowSize) {
    break;
  }

  const previousWindow = data.slice(i - 1, windowSize + i - 1);

  if (sum(currentWindow) > sum(previousWindow)) {
    windowIncreaseCount++;
  }
}

fs.writeFileSync("./01/output-2.txt", windowIncreaseCount.toString());

function sum(array) {
  return array.reduce((result, current) => result + current, 0);
}
