import fs from "fs";

const positions = fs
  .readFileSync("./07/input.txt")
  .toString()
  .split(",")
  .map((n) => parseInt(n));

const maxPos = Math.max(...positions);
let fuelByPosition = Array(maxPos + 1).fill(0);

for (const position of positions) {
  fuelByPosition = fuelByPosition.map((fuel, targetPosition) => {
    return (fuel += Math.abs(position - targetPosition));
  });
}

fs.writeFileSync("./07/output-1.txt", Math.min(...fuelByPosition).toString());
