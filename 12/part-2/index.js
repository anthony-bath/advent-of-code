import fs from "fs";

class Cave {
  constructor(key) {
    this.connections = [];
    this.key = key;
    this.isLarge = /[A-Z]/.test(key);
  }

  addConnection(connectedCave) {
    this.connections.push(connectedCave);
  }
}

const data = fs
  .readFileSync("./12/input.txt")
  .toString()
  .split("\n")
  .map((entry) => entry.trim().split("-"));

const cavesByKey = new Map();

cavesByKey.set("start", new Cave("start"));
cavesByKey.set("end", new Cave("end"));

data.forEach(([c1Key, c2Key]) => {
  const c1 = cavesByKey.get(c1Key) || new Cave(c1Key);
  const c2 = cavesByKey.get(c2Key) || new Cave(c2Key);

  // only want connections one way from start/end
  if (c1Key === "start") {
    if (!c1.connections.includes(c2)) {
      c1.addConnection(c2);
    }
  } else if (c1Key === "end") {
    if (!c2.connections.includes(c1)) {
      c2.addConnection(c1);
    }
  }

  if (c2Key === "start") {
    if (!c2.connections.includes(c1)) {
      c2.addConnection(c1);
    }
  } else if (c2Key === "end") {
    if (!c1.connections.includes(c2)) {
      c1.addConnection(c2);
    }
  }

  if (
    c1Key !== "start" &&
    c2Key !== "start" &&
    c1Key !== "end" &&
    c2Key !== "end"
  ) {
    if (!c1.connections.includes(c2)) {
      c1.addConnection(c2);
    }

    if (!c2.connections.includes(c1)) {
      c2.addConnection(c1);
    }
  }

  cavesByKey.set(c1Key, c1);
  cavesByKey.set(c2Key, c2);
});

const paths = [];
const startCave = cavesByKey.get("start");

walk(startCave, []);

function walk(cave, path) {
  const smallCaveVisitsByCaveKey = {};

  path
    .filter(
      (caveKey) =>
        caveKey !== "start" && caveKey !== "end" && !/[A-Z]/.test(caveKey)
    )
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
