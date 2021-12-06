import fs from "fs";

const fish = fs
  .readFileSync("./06/input.txt")
  .toString()
  .split(",")
  .map((n) => parseInt(n));

const DAYS = 80;

for (let day = 0; day < DAYS; day++) {
  let fishCount = fish.length;

  for (let i = 0; i < fishCount; i++) {
    fish[i]--;

    if (fish[i] === -1) {
      fish[i] = 6;
      fish.push(8);
    }
  }
}

fs.writeFileSync("./06/part-1/output.txt", fish.length.toString());
