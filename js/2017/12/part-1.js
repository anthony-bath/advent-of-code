import { getPrograms } from './common.js';

export function part1({ lines }) {
  const programs = getPrograms(lines);

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

  return count;
}
