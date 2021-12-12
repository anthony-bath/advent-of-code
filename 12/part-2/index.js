import fs from "fs";
import { Path, getCavesMap } from "../util/index.js";

const data = fs
  .readFileSync("./12/input.txt")
  .toString()
  .split("\n")
  .map((entry) => entry.trim().split("-"));

const cavesByKey = getCavesMap(data);
let paths = 0;

walk(cavesByKey.get("start"), new Path());

function walk(cave, path) {
  if (!cave.isLarge && !path.canVisitCave(cave.key)) {
    return;
  }

  path.addCave(cave);

  if (cave.key === "end") {
    paths++;
    return;
  }

  cave.connections.forEach((cave) => walk(cave, new Path(path)));
}

fs.writeFileSync("./12/part-2/output.txt", paths.toString());
