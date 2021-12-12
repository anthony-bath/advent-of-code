import fs from "fs";
import { getCavesMap } from "../util/index.js";

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
  if (cave.key === "start" && path.includes("start")) {
    return;
  }

  const smallCaveVisitsByCaveKey = {};

  path
    .filter((caveKey) => !/[A-Z]/.test(caveKey))
    .forEach((caveKey) => {
      if (!smallCaveVisitsByCaveKey[caveKey]) {
        smallCaveVisitsByCaveKey[caveKey] = 0;
      }

      smallCaveVisitsByCaveKey[caveKey]++;
    });

  const hasASmallCaveAlreadyBeenVisitedTwice = Object.values(
    smallCaveVisitsByCaveKey
  ).some((count) => count === 2);

  if (!cave.isLarge) {
    if (smallCaveVisitsByCaveKey[cave.key] === 2) {
      //already been twice, nope
      return;
    }

    if (
      smallCaveVisitsByCaveKey[cave.key] === 1 &&
      hasASmallCaveAlreadyBeenVisitedTwice
    ) {
      //another small cave has been visited twice, nope
      return;
    }
  }

  path.push(cave.key);

  if (cave.key === "end") {
    paths.push(path);
    return;
  }

  cave.connections.forEach((cave) => walk(cave, [...path]));
}

fs.writeFileSync("./12/part-2/output.txt", paths.length.toString());
