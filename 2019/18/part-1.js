export function part1({ grid: maze }) {
  const keyExpr = /[a-z]/;
  const doorExpr = /[A-Z]/;

  const locationByKey = new Map();
  const keyValue = new Map();
  const doorValue = new Map();
  let origin;

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (keyExpr.test(cell)) {
        keyValue.set(cell, Math.pow(2, cell.charCodeAt(0) - 97));
        locationByKey.set(cell, { x, y });
      } else if (doorExpr.test(cell)) {
        doorValue.set(cell, Math.pow(2, cell.toLowerCase().charCodeAt(0) - 97));
      } else if (cell === '@') {
        maze[y][x] = '.';
        origin = { x, y };
      }
    });
  });

  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const allKeys = Math.pow(2, locationByKey.size) - 1;

  function bfs(state) {
    const visited = { [`${state.x}|${state.y}|${state.collected}`]: 1 };
    const queue = [state];

    while (queue.length) {
      let { x, y, steps, collected } = queue.shift();

      if (collected === allKeys) {
        return steps;
      }

      for (const [dx, dy] of deltas) {
        const location = maze[y + dy][x + dx];
        const lookup = `${x + dx}|${y + dy}|${collected}`;
        const nextState = { x: x + dx, y: y + dy, steps: steps + 1, collected };

        if (location !== '#' && !visited[lookup]) {
          if (doorExpr.test(location) && collected & doorValue.get(location)) {
            queue.push(nextState);
            visited[lookup] = 1;
          } else if (keyExpr.test(location)) {
            const nextCollected = collected | keyValue.get(location);
            const lookup = `${x + dx}|${y + dy}|${nextCollected}`;

            queue.push({ ...nextState, collected: nextCollected });
            visited[lookup] = 1;
          } else if (location === '.') {
            queue.push(nextState);
            visited[lookup] = 1;
          }
        }
      }
    }
  }

  const initialState = { x: origin.x, y: origin.y, steps: 0, collected: 0 };

  return bfs(initialState);
}
