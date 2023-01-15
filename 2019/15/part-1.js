import { read, write } from '../../utilities/io.js';
import { execute } from '../IntCode.js';

const [YEAR, DAY, PART] = [2019, 15, 1];

const program = read(YEAR, DAY, PART, { splitBy: ',' }).map((n) => Number(n));

const deltas = [
  [0, 1, 1],
  [0, -1, 2],
  [-1, 0, 3],
  [1, 0, 4],
];

function search(state) {
  const queue = [state];

  visited.add(`${state.search.x}|${state.search.y}`);

  let found = null;

  while (queue.length) {
    const current = queue.shift();
    const { x, y } = current.search;

    deltas.forEach(([dx, dy, command]) => {
      if (!visited.has(`${x + dx}|${y + dy}`)) {
        visited.add(`${x + dx}|${y + dy}`);

        const ic = { ...current.ic, program: [...current.ic.program] };
        const result = execute(ic, [command]);

        if (result === 2) {
          found = current.search.steps + 1;
        } else if (result === 1) {
          queue.push({
            ...current,
            search: { x: x + dx, y: y + dy, steps: current.search.steps + 1 },
            ic,
          });
        }
      }
    });

    if (found) {
      return found;
    }
  }
}

const visited = new Set();
const state = {
  ic: { pointer: 0, program: [...program], relativeBase: 0 },
  search: { x: 0, y: 0, steps: 0 },
};

write(YEAR, DAY, PART, search(state));
