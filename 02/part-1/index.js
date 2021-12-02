const fs = require("fs");

const data = fs
  .readFileSync("./02/input.txt")
  .toString()
  .split("\n")
  .map((row) => {
    const [direction, amount] = row.split(" ");
    return [direction, parseInt(amount, 10)];
  });

let horizontal = 0;
let depth = 0;

for (const [direction, amount] of data) {
  switch (direction) {
    case "forward":
      horizontal += amount;
      break;
    case "up":
      depth -= amount;
      break;
    case "down":
      depth += amount;
      break;
  }
}

fs.writeFileSync("./02/part-1/output.txt", (horizontal * depth).toString());
