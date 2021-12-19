import fs from "fs";
import { loadData } from "./shared.js";

const magnitudes = [];
const fish = loadData();

for (const fish1 of fish) {
  for (const fish2 of fish) {
    magnitudes.push(fish1.add(fish2).magnitude());
  }
}

fs.writeFileSync("./18/output-2.txt", Math.max(...magnitudes).toString());
