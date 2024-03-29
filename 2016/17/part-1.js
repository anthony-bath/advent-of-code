import { createHash } from 'node:crypto';

export function part1({ data }) {
  function isOpen(value) {
    return ['b', 'c', 'd', 'e', 'f'].includes(value);
  }

  function bfs(state, goalX, goalY) {
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

      const hash = createHash('md5')
        .update(`${data}${current.path.join('')}`)
        .digest('hex');

      for (const [index, [dx, dy]] of deltas.entries()) {
        const nextX = current.x + dx;
        const nextY = current.y + dy;

        if (nextX < 0 || nextY < 0 || nextX > 3 || nextY > 3) {
          continue;
        }

        const nextState = { x: nextX, y: nextY, path: [...current.path] };

        switch (index) {
          case 0:
            if (isOpen(hash[3])) {
              nextState.path.push('R');
              queue.push(nextState);
            }
            break;

          case 1:
            if (isOpen(hash[1])) {
              nextState.path.push('D');
              queue.push(nextState);
            }
            break;

          case 2:
            if (isOpen(hash[2])) {
              nextState.path.push('L');
              queue.push(nextState);
            }
            break;

          case 3:
            if (isOpen(hash[0])) {
              nextState.path.push('U');
              queue.push(nextState);
            }
            break;
        }
      }
    }
  }

  const state = { x: 0, y: 0, path: [] };

  return bfs(state, 3, 3);
}
