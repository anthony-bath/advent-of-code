const fs = require("fs");

const data = fs
  .readFileSync("./03/input.txt")
  .toString()
  .split("\n")
  .map((x) => x.trim());

const bitCounts = [];

for (const entry of data) {
  [...entry].forEach((value, bit) => {
    if (!bitCounts[bit]) {
      bitCounts[bit] = [0, 0];
    }

    bitCounts[bit][parseInt(value)]++;
  });
}

let gamma = "";
let epsilon = "";

for (const [low, high] of bitCounts) {
  if (high > low) {
    gamma += "1";
    epsilon += "0";
  } else {
    gamma += "0";
    epsilon += "1";
  }
}

fs.writeFileSync(
  "./03/part-1/output.txt",
  (parseInt(gamma, 2) * parseInt(epsilon, 2)).toString()
);
