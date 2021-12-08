import fs from "fs";

const inputs = [];
const outputs = [];

fs.readFileSync("./08/input.txt")
  .toString()
  .split("\n")
  .forEach((line) => {
    const [input, output] = line.trim().split(" | ");
    inputs.push(input);
    outputs.push(output);
  });

const easyDigitLengths = [2, 3, 4, 7];

fs.writeFileSync(
  "./08/part-1/output.txt",
  outputs
    .reduce(
      (count, output) =>
        count +
        output
          .split(" ")
          .filter((digit) => easyDigitLengths.includes(digit.length)).length,
      0
    )
    .toString()
);
