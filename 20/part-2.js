import fs from "fs";
import { loadData, enhance } from "./shared.js";

let { image, algo } = loadData();
let result = 0;

const STEPS = 50;

for (let step = 0; step < STEPS; step++) {
  const { enhanced, lit } = enhance(image, algo, step);

  image = enhanced;
  result = lit;
}

fs.writeFileSync("./20/output-2.txt", result.toString());
