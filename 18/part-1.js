import fs from "fs";
import { loadData } from "./shared.js";

const fish = loadData();
const result = fish.reduce((result, f) => result.add(f)).magnitude();

fs.writeFileSync("./18/output-1.txt", result.toString());
