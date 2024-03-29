import { PriorityQueue } from '../../utilities/queue.js';

const { pow } = Math;

export function part2({ grid: maze }) {
  const keyExpr = /[a-z]/;
  const doorExpr = /[A-Z]/;

  const locationByKey = new Map();
  const keyValue = new Map();
  const doorValue = new Map();
  const robots = [];

  maze.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (keyExpr.test(cell)) {
        keyValue.set(cell, pow(2, cell.charCodeAt(0) - 97));
        locationByKey.set(cell, { x, y });
      } else if (doorExpr.test(cell)) {
        doorValue.set(cell, pow(2, cell.toLowerCase().charCodeAt(0) - 97));
      } else if (cell === '@') {
        robots.push({ x: x - 1, y: y - 1, visited: new Set() });
        robots.push({ x: x + 1, y: y - 1, visited: new Set() });
        robots.push({ x: x - 1, y: y + 1, visited: new Set() });
        robots.push({ x: x + 1, y: y + 1, visited: new Set() });

        maze[y][x] = '#';
        maze[y - 1][x] = '#';
        maze[y + 1][x] = '#';
        maze[y][x - 1] = '#';
        maze[y][x + 1] = '#';
      }
    });
  });

  const deltas = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const allKeys = pow(2, locationByKey.size) - 1;

  function bfs_distance(grid, { x, y }, collected, visited) {
    const lookup = `${x}|${y}|${collected}`;

    if (visited.has(lookup)) {
      return [];
    }

    const initialState = { x, y, steps: 0, collected };
    const queue = [initialState];
    const distances = [];
    visited.add(lookup);

    while (queue.length) {
      let { x, y, steps, collected } = queue.shift();

      for (const [dx, dy] of deltas) {
        const lookup = `${x + dx}|${y + dy}|${collected}`;

        if (grid[y + dy][x + dx] !== '#' && !visited.has(lookup)) {
          const location = grid[y + dy][x + dx];

          if (doorExpr.test(location)) {
            const door = doorValue.get(location);

            if (collected & door) {
              queue.push({
                x: x + dx,
                y: y + dy,
                steps: steps + 1,
                collected,
              });

              visited.add(lookup);
            }

            continue;
          }

          if (keyExpr.test(location)) {
            const key = keyValue.get(location);

            if (!(collected & key)) {
              const nextCollected = collected | key;
              const lookup = `${x + dx}|${y + dy}|${nextCollected}`;

              distances.push({
                steps: steps + 1,
                collected: nextCollected,
                x: x + dx,
                y: y + dy,
              });

              visited.add(lookup);

              queue.push({ x: x + dx, y: y + dy, steps: steps + 1, collected: nextCollected });
            } else {
              visited.add(lookup);
              queue.push({ x: x + dx, y: y + dy, steps: steps + 1, collected });
            }

            continue;
          }

          queue.push({ x: x + dx, y: y + dy, steps: steps + 1, collected });
          visited.add(lookup);
        }
      }
    }

    return distances;
  }

  function getKey(robots, collected) {
    return `${robots.map(({ x, y }) => `${x}|${y}`).join(`|`)}|${collected}`;
  }

  function bfs_path(state) {
    const queue = new PriorityQueue(state, (a, b) => a.steps - b.steps);
    const visited = new Set([getKey(state.robots, state.collected)]);

    while (queue.isNotEmpty()) {
      const current = queue.next();

      if (current.collected === allKeys) {
        return current.steps;
      }

      const distancesPerRobot = current.robots.map((robot) =>
        bfs_distance(maze, robot, current.collected, robot.visited)
      );

      for (const [i, distances] of distancesPerRobot.entries()) {
        for (const { steps, collected, x, y } of distances) {
          const nextState = {
            steps: current.steps + steps,
            collected,
            robots: current.robots.map((robot, j) => {
              if (j === i) {
                return { x, y, visited: robot.visited };
              }

              return { x: robot.x, y: robot.y, visited: robot.visited };
            }),
          };

          visited.add(getKey(nextState.robots, nextState.collected));
          queue.insert(nextState);
        }
      }
    }
  }

  const state = {
    robots,
    collected: 0,
    steps: 0,
  };

  return bfs_path(state);
}
