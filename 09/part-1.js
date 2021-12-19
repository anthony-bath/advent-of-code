import fs from "fs";

const grid = [];

fs.readFileSync("./09/input.txt")
  .toString()
  .split("\n")
  .forEach((row) =>
    grid.push(
      row
        .trim()
        .split("")
        .map((p) => parseInt(p))
    )
  );

let riskLevel = 0;

for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    let u = i > 0 ? grid[i - 1][j] : 10;
    let d = i < grid.length - 1 ? grid[i + 1][j] : 10;
    let l = j > 0 ? grid[i][j - 1] : 10;
    let r = j < grid[i].length - 1 ? grid[i][j + 1] : 10;

    const point = grid[i][j];

    if ([u, d, l, r].every((x) => x > point)) {
      riskLevel += 1 + point;
    }
  }
}

fs.writeFileSync("./09/output-1.txt", riskLevel.toString());
