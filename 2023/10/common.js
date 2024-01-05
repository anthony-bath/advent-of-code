import { readOld } from '../../utilities/io.js';

export function loadData(year, day, part) {
  let start = null;

  const grid = readOld(year, day, part).map((line, y) => {
    const row = line.split('');
    const s = row.indexOf('S');

    if (s !== -1 && !start) {
      start = { x: s, y };
    }

    return row;
  });

  // Replace Starting Pipe 'S' with actual pipe
  const neighbors = {
    north: grid[start.y - 1][start.x],
    south: grid[start.y + 1][start.x],
    west: grid[start.y][start.x - 1],
    east: grid[start.y][start.x + 1],
  };

  for (const pipe of PIPES) {
    const connectors = VALID_CONNECTORS[pipe];
    const validConnections = ['north', 'south', 'east', 'west'].filter((dir) =>
      connectors[dir].includes(neighbors[dir])
    );

    if (validConnections.length === 2) {
      grid[start.y][start.x] = pipe;
      break;
    }
  }

  return { grid, start };
}

export function walkLoop(grid, start) {
  const [first, last] = getConnectedPipes(grid, start);
  const loop = [start, first];

  let current = first;

  while (!(current.x === last.x && current.y === last.y)) {
    current = getConnectedPipes(grid, current).find((c) => c.dir !== OPPOSITE[current.dir]);
    loop.push(current);
  }

  return loop;
}

function getConnectedPipes(grid, { x, y }) {
  const W = grid[0].length;
  const H = grid.length;

  const pipe = grid[y][x];
  const connectors = VALID_CONNECTORS[pipe];
  const connections = [];

  for (const [dx, dy, dir] of deltas) {
    const next = { x: x + dx, y: y + dy };

    if (next.x < 0 || next.x >= W || next.y < 0 || next.y >= H) continue;

    const nextPipe = grid[next.y][next.x];

    if (connectors[dir].includes(nextPipe)) {
      connections.push({ x: next.x, y: next.y, dir });
    }
  }

  return connections;
}

const OPPOSITE = {
  east: 'west',
  west: 'east',
  north: 'south',
  south: 'north',
};

const deltas = [
  [-1, 0, 'west'],
  [0, -1, 'north'],
  [1, 0, 'east'],
  [0, 1, 'south'],
];

const VALID_CONNECTORS = {
  '-': { north: [], south: [], west: ['-', 'L', 'F'], east: ['-', '7', 'J'] },
  '|': { north: ['|', '7', 'F'], south: ['|', 'J', 'L'], west: [], east: [] },
  J: { north: ['|', '7', 'F'], south: [], west: ['-', 'L', 'F'], east: [] },
  L: { north: ['|', '7', 'F'], south: [], west: [], east: ['-', '7', 'J'] },
  F: { north: [], south: ['|', 'J', 'L'], west: [], east: ['-', '7', 'J'] },
  7: { north: [], south: ['|', 'J', 'L'], west: ['-', 'F', 'L'], east: [] },
};

const PIPES = ['-', '|', 'L', 'J', 'F', '7'];
