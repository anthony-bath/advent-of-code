import fs from "fs";

const positions = fs
  .readFileSync("./07/input.txt")
  .toString()
  .split(",")
  .map((n) => parseInt(n));

const maxPos = Math.max(...positions);
const moveCostByDistance = new Map();
let fuelByPosition = Array(maxPos + 1).fill(0);

for (const position of positions) {
  fuelByPosition = fuelByPosition.map((fuel, targetPosition) => {
    const distance = Math.abs(position - targetPosition);

    if (!moveCostByDistance.has(distance)) {
      moveCostByDistance.set(distance, sumN(distance));
    }

    return fuel + moveCostByDistance.get(distance);
  });
}

function sumN(n) {
  return (n * (n + 1)) / 2;
}

fs.writeFileSync(
  "./07/part-2/output.txt",
  Math.min(...fuelByPosition).toString()
);
