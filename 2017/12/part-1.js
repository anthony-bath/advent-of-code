import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2017, 12, 1];

class Program {
  constructor(id, childrenIds) {
    this.id = id;
    this.childrenIds = childrenIds;
  }
}

const programs = new Map();

read(YEAR, DAY, PART).forEach((line) => {
  const [id, childrenIdsRaw] = line.split(' <-> ');
  const childrenIds = childrenIdsRaw.split(', ').map((n) => Number(n));

  programs.set(Number(id), new Program(Number(id), childrenIds));
});

let visited = { 0: 1 };
let queue = [0];
let count = 1;

while (queue.length) {
  const id = queue.shift();
  const childrenIds = programs.get(id).childrenIds;

  for (const childId of childrenIds) {
    if (!visited[childId]) {
      count++;
      visited[childId] = 1;
      queue.push(childId);
    }
  }
}

write(YEAR, DAY, PART, count);
