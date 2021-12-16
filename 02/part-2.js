import fs from "fs";

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
let aim = 0;

for (const [direction, amount] of data) {
  switch (direction) {
    case "forward":
      horizontal += amount;
      depth += aim * amount;
      break;
    case "up":
      aim -= amount;
      break;
    case "down":
      aim += amount;
      break;
  }
}

fs.writeFileSync("./02/output-2.txt", (horizontal * depth).toString());
