import { getPrograms } from './common.js';

export function part2({ lines }) {
  const programs = getPrograms(lines);

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

  return groups;
}
