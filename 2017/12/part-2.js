import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 12, 2];

class Program {
  constructor(id, childrenIds) {
    this.id = id;
    this.childrenIds = childrenIds;
  }
}

const programs = new Map();

readOld(YEAR, DAY, PART, { test: true }).forEach((line) => {
  const [id, childrenIdsRaw] = line.split(' <-> ');
  const childrenIds = childrenIdsRaw.split(', ').map((n) => Number(n));

  programs.set(Number(id), new Program(Number(id), childrenIds));
});

let visited = {};
let groups = 0;

for (const programId of programs.keys()) {
  let queue = [programId];

  if (!visited[programId]) {
    groups++;
    visited[programId] = 1;
  }

  while (queue.length) {
    const id = queue.shift();
    const childrenIds = programs.get(id).childrenIds;

    for (const childId of childrenIds) {
      if (!visited[childId]) {
        visited[childId] = 1;
        queue.push(childId);
      }
    }
  }
}

write(YEAR, DAY, PART, groups);
