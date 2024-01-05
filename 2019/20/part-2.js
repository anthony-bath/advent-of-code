import { readOld, write } from '../../utilities/io.js';

const [YEAR, DAY, PART] = [2019, 20, 2];

const maze = readOld(YEAR, DAY, PART).map((line) => line.split(''));

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

        const portal = { x: col, y: row };

        if (row === 2 || row == maze.length - 3 || col === 2 || col === maze[0].length - 3) {
          portal.outer = true;
        } else {
          portal.inner = true;
        }

        portalPointsByLabel[label].push(portal);
      }
    }
  }
}

const portals = new Map();

for (const [p1, p2] of Object.values(portalPointsByLabel)) {
  portals.set(`${p1.x}|${p1.y}`, { x: p2.x, y: p2.y, layerDelta: p1.outer ? -1 : 1 });
  portals.set(`${p2.x}|${p2.y}`, { x: p1.x, y: p1.y, layerDelta: p2.outer ? -1 : 1 });
}

const deltas = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function bfs(state) {
  const queue = [state];
  const visited = { [`${state.x}|${state.y}|${state.layer}`]: 1 };

  while (queue.length) {
    const current = queue.shift();

    if (current.x === end.x && current.y === end.y && current.layer === 0) {
      return current.steps;
    }

    // Am I currently on a Portal?
    const currentLocationKey = `${current.x}|${current.y}`;

    if (portals.has(currentLocationKey)) {
      const { x, y, layerDelta } = portals.get(currentLocationKey);

      const nextKey = `${x}|${y}|${current.layer + layerDelta}`;

      if (!visited[nextKey]) {
        visited[nextKey] = 1;
        queue.push({ x, y, steps: current.steps + 1, layer: current.layer + layerDelta });
      }
    }

    for (const [dx, dy] of deltas) {
      const nextX = current.x + dx;
      const nextY = current.y + dy;

      if (
        portals.has(`${nextX}|${nextY}`) &&
        (nextX === 2 || nextX === maze[0].length - 3 || nextY === 2 || nextY === maze.length - 3) &&
        current.layer === 0
      ) {
        // These outer portals are walls at Layer 0
        continue;
      }

      const nextKey = `${nextX}|${nextY}|${current.layer}`;

      if (!visited[nextKey] && maze[nextY][nextX] === '.') {
        visited[nextKey] = 1;
        queue.push({ x: nextX, y: nextY, steps: current.steps + 1, layer: current.layer });
      }
    }
  }
}

const state = { ...origin, steps: 0, layer: 0 };

write(YEAR, DAY, PART, bfs(state));
