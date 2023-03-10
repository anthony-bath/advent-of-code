import md5 from 'md5';
import { read, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2016, 17, 1];

const passcode = read(YEAR, DAY, PART, { splitBy: null });

function key({ x, y, path }) {
  return `${x}|${y}|${path.join('')}`;
}

function isOpen(value) {
  return ['b', 'c', 'd', 'e', 'f'].includes(value);
}

function bfs(state, goalX, goalY) {
  const visited = { [key(state)]: 1 };
  const queue = [state];

  const deltas = [
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  while (queue.length) {
    const current = queue.shift();

    if (current.x === goalX && current.y === goalY) {
      return current.path.join('');
    }

    const hash = md5(`${passcode}${current.path.join('')}`);

    for (const [index, [dx, dy]] of deltas.entries()) {
      const nextX = current.x + dx;
      const nextY = current.y + dy;

      if (nextX < 0 || nextY < 0 || nextX > 3 || nextY > 3) {
        continue;
      }

      const nextState = { x: nextX, y: nextY, path: [...current.path] };

      switch (index) {
        case 0:
          {
            if (isOpen(hash[3])) {
              nextState.path.push('R');
              const nextKey = key(nextState);

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push(nextState);
              }
            }
          }
          break;

        case 1:
          {
            if (isOpen(hash[1])) {
              nextState.path.push('D');
              const nextKey = key(nextState);

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push(nextState);
              }
            }
          }
          break;

        case 2:
          {
            if (isOpen(hash[2])) {
              nextState.path.push('L');
              const nextKey = key(nextState);

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push(nextState);
              }
            }
          }
          break;

        case 3:
          {
            if (isOpen(hash[0])) {
              nextState.path.push('U');
              const nextKey = key(nextState);

              if (!visited[nextKey]) {
                visited[nextKey] = 1;
                queue.push(nextState);
              }
            }
          }
          break;
      }
    }
  }
}

const state = { x: 0, y: 0, path: [] };

write(YEAR, DAY, PART, bfs(state, 3, 3));
