import { read, write } from '../../utility.js';

const [YEAR, DAY, PART] = [2019, 6, 2];

const directOrbitsByObject = new Map();
const directOrbitersOfObject = new Map();

read(YEAR, DAY).forEach((line) => {
  const [orbitee, orbiter] = line.split(')');
  directOrbitsByObject.set(orbiter, orbitee);

  if (!directOrbitersOfObject.has(orbitee)) {
    directOrbitersOfObject.set(orbitee, []);
  }

  directOrbitersOfObject.get(orbitee).push(orbiter);
});

function bfs(state) {
  visited.add(state.object);

  const queue = [state];

  while (queue.length) {
    const { object, steps, goal } = queue.shift();

    if (object === goal) {
      return steps;
    }

    const options = [
      directOrbitsByObject.get(object),
      ...(directOrbitersOfObject.get(object) || []),
    ];

    for (const option of options) {
      if (!visited.has(option)) {
        visited.add(option);
        queue.push({ object: option, steps: steps + 1, goal });
      }
    }
  }
}

const object = 'YOU';
const goal = 'SAN';
const steps = 0;
const visited = new Set();

write(YEAR, DAY, PART, bfs({ object, steps, goal }) - 2);
