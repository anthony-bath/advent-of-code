export function getInputElements(lines) {
  const maze = [];
  const targets = {};

  lines.forEach((line, y) => {
    const points = line.split('');

    for (const [x, point] of points.entries()) {
      if (/\d/.test(point)) {
        targets[point] = { x, y, value: point };
        points[x] = '.';
      }
    }

    maze.push(points);
  });

  const deltas = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  function getDistances({ x, y }, toPoints) {
    const distances = {};
    const visited = { [`${x}|${y}`]: 1 };
    const queue = [{ x, y, distance: 0 }];

    while (queue.length) {
      const current = queue.shift();
      const target = toPoints.find((p) => p.x === current.x && p.y === current.y);

      if (target) {
        distances[target.value] = current.distance;
      }

      for (const [dx, dy] of deltas) {
        const nextX = current.x + dx;
        const nextY = current.y + dy;
        const nextKey = `${nextX}|${nextY}`;

        if (maze[nextY][nextX] !== '.') continue;

        if (!visited[nextKey]) {
          queue.push({ x: nextX, y: nextY, distance: current.distance + 1 });
          visited[nextKey] = 1;
        }
      }
    }

    return distances;
  }

  const distances = {};

  for (const [target, data] of Object.entries(targets)) {
    distances[target] = getDistances(
      data,
      Object.values(targets).filter((t) => t.value !== target)
    );
  }

  return { distances, targets };
}
