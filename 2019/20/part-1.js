export function part1({ grid: maze }) {
  const portalPointsByLabel = {};
  const portalExpr = /[A-Z]/;
  let origin;
  let end;

  for (let row = 2; row < maze.length - 2; row++) {
    for (let col = 2; col < maze[0].length - 2; col++) {
      if (maze[row][col] === '.') {
        let label = null;

        if (portalExpr.test(maze[row - 1][col]) && portalExpr.test(maze[row - 2][col])) {
          // Check labels above
          label = `${maze[row - 2][col]}${maze[row - 1][col]}`;
        } else if (portalExpr.test(maze[row][col - 1]) && portalExpr.test(maze[row][col - 2])) {
          // Check labels to the left
          label = `${maze[row][col - 2]}${maze[row][col - 1]}`;
        } else if (portalExpr.test(maze[row][col + 1]) && portalExpr.test(maze[row][col + 2])) {
          // Check labels to the right
          label = `${maze[row][col + 1]}${maze[row][col + 2]}`;
        } else if (portalExpr.test(maze[row + 1][col]) && portalExpr.test(maze[row + 2][col])) {
          // Check labels below
          label = `${maze[row + 1][col]}${maze[row + 2][col]}`;
        }

        if (label) {
          if (label === 'AA') {
            origin = { x: col, y: row };
            continue;
          } else if (label === 'ZZ') {
            end = { x: col, y: row };
            continue;
          }

          if (!portalPointsByLabel[label]) {
            portalPointsByLabel[label] = [];
          }

          portalPointsByLabel[label].push({ x: col, y: row });
        }
      }
    }
  }

  const portals = new Map();

  for (const [p1, p2] of Object.values(portalPointsByLabel)) {
    portals.set(`${p1.x}|${p1.y}`, p2);
    portals.set(`${p2.x}|${p2.y}`, p1);
  }

  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  function bfs(state) {
    const queue = [state];
    const visited = { [`${state.x}|${state.y}`]: 1 };

    while (queue.length) {
      const current = queue.shift();

      if (current.x === end.x && current.y === end.y) {
        return current.steps;
      }

      const currentKey = `${current.x}|${current.y}`;

      if (portals.has(currentKey)) {
        const destination = portals.get(currentKey);

        visited[`${destination.x}|${destination.y}`] = 1;
        queue.push({ ...destination, steps: current.steps + 1 });
      }

      for (const [dx, dy] of deltas) {
        const nextKey = `${current.x + dx}|${current.y + dy}`;

        if (!visited[nextKey] && maze[current.y + dy][current.x + dx] === '.') {
          visited[nextKey] = 1;
          queue.push({ x: current.x + dx, y: current.y + dy, steps: current.steps + 1 });
        }
      }
    }
  }

  const state = { ...origin, steps: 0 };

  return bfs(state);
}
