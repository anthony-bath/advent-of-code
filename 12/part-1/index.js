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

  if (!c1.connections.includes(c2)) {
    c1.addConnection(c2);
  }

  if (!c2.connections.includes(c1)) {
    c2.addConnection(c1);
  }

  cavesByKey.set(c1Key, c1);
  cavesByKey.set(c2Key, c2);
});

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

fs.writeFileSync("./12/part-1/output.txt", paths.length.toString());
