import fs from "fs";
import { getCavesMap } from "./shared.js";

const data = fs
  .readFileSync("./12/input.txt")
  .toString()
  .split("\n")
  .map((entry) => entry.trim().split("-"));

const cavesByKey = getCavesMap(data);
const paths = [];
const startCave = cavesByKey.get("start");

walk(startCave, []);

function walk(cave, path) {
  if (!cave.isLarge && path.includes(cave.key)) {
    return;
  }

  path.push(cave.key);

  if (cave.key === "end") {
    paths.push(path);
    return;
  }

  cave.connections.forEach((cave) => walk(cave, [...path]));
}

fs.writeFileSync("./12/output-1.txt", paths.length.toString());
